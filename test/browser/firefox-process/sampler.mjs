import fs from 'node:fs/promises';
import path from 'node:path';
import { parseSchedule, parseStat } from './proc.mjs';

export async function startSampler({
  rootPID,
  directory,
  procRoot = '/proc',
  intervalMS = 200,
  platform = process.platform,
  parentPID = process.pid
}) {
  const summary = {
    supported: platform === 'linux',
    observerPID: process.pid,
    intervalMS,
    rootPID,
    samples: 0,
    maxProcesses: 0,
    sawFirefox: false,
    sawFirefoxScheduler: false,
    sawContentScheduler: false,
    truncated: false,
    errors: []
  };
  if (!summary.supported) return { summary, stop: async () => summary };
  const output = await fs.open(path.join(directory, 'process-samples.jsonl'), 'wx', 0o600);
  let rootStartTicks;
  let stopped = false;
  let timer;
  let pending = Promise.resolve();
  const optional = async file => {
    try {
      return { available: true, value: (await fs.readFile(file, 'utf8')).trim() };
    } catch (error) {
      return { available: false, error: error.code || error.name };
    }
  };
  const sample = async () => {
    const startedAt = Date.now();
    // /proc/<pid>/task/<pid>/children omits children forked by other threads.
    const names = (await fs.readdir(procRoot)).filter(name => /^\d+$/.test(name));
    if (names.length > 4096) summary.truncated = true;
    const stats = new Map();
    for (let offset = 0; offset < Math.min(names.length, 4096); offset += 16) {
      await Promise.all(
        names.slice(offset, offset + 16).map(async name => {
          try {
            const stat = parseStat(await fs.readFile(path.join(procRoot, name, 'stat'), 'utf8'));
            if (stat.pid === Number(name)) stats.set(stat.pid, stat);
          } catch {
            // A process may exit or be inaccessible during enumeration.
          }
        })
      );
    }
    const root = stats.get(rootPID);
    if (root && rootStartTicks === undefined) rootStartTicks = root.startTicks;
    const queue = root?.parentPID === parentPID && root.startTicks === rootStartTicks ? [root] : [];
    const seen = new Set();
    const processes = [];
    while (queue.length && seen.size < 64) {
      const stat = queue.shift();
      const { pid } = stat;
      if (seen.has(pid)) continue;
      seen.add(pid);
      try {
        const folder = path.join(procRoot, String(pid));
        const main = path.join(folder, 'task', String(pid));
        const [thread, schedule, wait] = await Promise.all([
          optional(path.join(main, 'stat')),
          optional(path.join(main, 'schedstat')),
          optional(path.join(main, 'wchan'))
        ]);
        const current = parseStat(await fs.readFile(path.join(folder, 'stat'), 'utf8'));
        if (current.startTicks !== stat.startTicks || current.parentPID !== stat.parentPID)
          continue;
        const mainThread = thread.available ? parseStat(thread.value) : thread;
        if (
          thread.available &&
          (mainThread.pid !== pid || mainThread.startTicks !== stat.startTicks)
        ) {
          continue;
        }
        processes.push({
          ...current,
          mainThread: thread.available ? { available: true, ...mainThread } : mainThread,
          scheduler: schedule.available
            ? { available: true, ...parseSchedule(schedule.value) }
            : schedule,
          waitChannel: wait
        });
        if (/firefox|geckomain|isolated web|web content/i.test(stat.name)) {
          summary.sawFirefox = true;
          if (schedule.available) summary.sawFirefoxScheduler = true;
          if (schedule.available && /isolated web|web content/i.test(stat.name)) {
            summary.sawContentScheduler = true;
          }
        }
        queue.push(...[...stats.values()].filter(child => child.parentPID === pid));
      } catch (error) {
        if (!['ENOENT', 'ESRCH'].includes(error.code) && summary.errors.length < 16) {
          summary.errors.push({ pid, error: error.code || error.message });
        }
      }
    }
    if (queue.length) summary.truncated = true;
    summary.samples++;
    summary.maxProcesses = Math.max(summary.maxProcesses, processes.length);
    const pressure = {};
    if (summary.samples % 5 === 1) {
      for (const resource of ['cpu', 'memory', 'io']) {
        pressure[resource] = await optional(path.join(procRoot, 'pressure', resource));
      }
    }
    await output.writeFile(
      JSON.stringify({
        startedAt,
        finishedAt: Date.now(),
        observerCPUUS: process.cpuUsage(),
        processes,
        pressure
      }) + '\n'
    );
  };
  summary.kernelSchedulerStats = await optional(path.join(procRoot, 'sys/kernel/sched_schedstats'));
  const tick = () => {
    pending = sample()
      .catch(error => {
        if (summary.errors.length < 16) summary.errors.push({ error: error.message });
      })
      .finally(() => {
        if (!stopped && summary.samples < 10000) timer = setTimeout(tick, intervalMS);
        else if (!stopped) summary.truncated = true;
      });
  };
  tick();
  return {
    summary,
    async stop() {
      stopped = true;
      clearTimeout(timer);
      await pending;
      await output.close();
      summary.observerCPUUS = process.cpuUsage();
      return summary;
    }
  };
}
