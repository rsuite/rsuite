function distribution(samples, metric) {
  const sorted = samples.map(sample => sample[metric]).sort((a, b) => a - b);
  const quantile = p => sorted[Math.max(0, Math.ceil(sorted.length * p) - 1)];
  return {
    count: sorted.length,
    min: sorted[0],
    p50: quantile(0.5),
    p95: quantile(0.95),
    max: sorted.at(-1)
  };
}

export function summarize(samples) {
  return Object.fromEntries(
    Object.entries(samples).map(([name, data]) => [
      name,
      {
        domReadyMs: distribution(data.flat(), 'domReadyMs'),
        frameReadyMs: distribution(data.flat(), 'frameReadyMs'),
        estimator: 'nearest-rank; descriptive only; keyboard observations are nested within trials'
      }
    ])
  );
}
