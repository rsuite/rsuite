import React from 'react';
import { act } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import {
  ResetView,
  edit,
  expectCoherent,
  scriptedReset,
  taskAndCommit,
  trustedEdit
} from './resetCoherenceTestUtils';
import {
  expectNativeDefault,
  expectNotification,
  mountContinuation,
  recordNativeState
} from './nativeContinuationTestUtils';

describe('Toggle native continuation default ownership', () => {
  it('TCN-01 keeps clean defaultChecked true to false after completed reset', async () => {
    const { form, input, probe } = mountContinuation(true);
    try {
      edit(input);
      await scriptedReset(form, 'TCN-01', input);
      input.defaultChecked = false;
      recordNativeState('TCN-01', 'immediate-default-mutation', input);
      expectNativeDefault(input, false, false);
      const before = probe.changes.length;
      await trustedEdit('TCN-01', input);
      probe.record('TCN-01', 'trusted-edit-returned');
      expectNotification(probe, before, true, input, true);
      expectCoherent(input, true);
    } finally {
      probe.detach();
    }
  });

  it('TCN-02 keeps clean defaultChecked false to true after completed reset', async () => {
    const { form, input, probe } = mountContinuation(false);
    try {
      edit(input);
      await scriptedReset(form, 'TCN-02', input);
      input.defaultChecked = true;
      recordNativeState('TCN-02', 'immediate-default-mutation', input);
      expectNativeDefault(input, true, true);
      const before = probe.changes.length;
      await trustedEdit('TCN-02', input);
      probe.record('TCN-02', 'trusted-edit-returned');
      expectNotification(probe, before, false, input, true);
      expectCoherent(input, false);
    } finally {
      probe.detach();
    }
  });

  it('TCN-03 preserves native ownership on a clean defaultChecked prop update', async () => {
    const { mounted, form, input, probe } = mountContinuation(true);
    try {
      edit(input);
      await scriptedReset(form, 'TCN-03', input);
      mounted.rerender(
        <ResetView defaultChecked={false} onChange={probe.onChange} onInput={probe.onInput} />
      );
      expect(mounted.getByRole('switch')).toBe(input);
      recordNativeState('TCN-03', 'immediate-default-prop-commit', input);
      expectNativeDefault(input, false, false);
      const before = probe.changes.length;
      await trustedEdit('TCN-03', input);
      probe.record('TCN-03', 'trusted-edit-returned');
      expectNotification(probe, before, true, input, true);
      expectCoherent(input, true);
    } finally {
      probe.detach();
    }
  });

  it('TCN-04 reads the dirty updated native default at reset', async () => {
    const { mounted, form, input, probe } = mountContinuation(true);
    try {
      edit(input);
      mounted.rerender(
        <ResetView defaultChecked={false} onChange={probe.onChange} onInput={probe.onInput} />
      );
      recordNativeState('TCN-04', 'dirty-default-prop-commit', input);
      expectNativeDefault(input, false, false);
      await scriptedReset(form, 'TCN-04', input);
      expectNativeDefault(input, false, false);
      const before = probe.changes.length;
      await trustedEdit('TCN-04', input);
      probe.record('TCN-04', 'trusted-edit-returned');
      expectNotification(probe, before, true, input, true);
      expectCoherent(input, true);
    } finally {
      probe.detach();
    }
  });

  it('TCN-05 records explicit checked setter as the dirty negative control', async () => {
    const { form, input, probe } = mountContinuation(true);
    try {
      edit(input);
      await scriptedReset(form, 'TCN-05', input);
      // An explicit test-only setter establishes dirty checkedness in both trees.
      const currentChecked = input.checked;
      input.checked = currentChecked;
      input.defaultChecked = false;
      recordNativeState('TCN-05', 'explicit-dirty-setter-negative-control', input);
      expectNativeDefault(input, true, false);
      const before = probe.changes.length;
      await trustedEdit('TCN-05', input);
      probe.record('TCN-05', 'trusted-edit-returned');
      expectNotification(probe, before, false, input, true);
      expectCoherent(input, false);
    } finally {
      probe.detach();
    }
  });

  it('TCN-06 retains clean default ownership after late reset cancellation', async () => {
    const { mounted, form, input, probe } = mountContinuation(true);
    const cancel = (event: Event) => event.preventDefault();
    try {
      await scriptedReset(form, 'TCN-06', input);
      mounted.container.addEventListener('reset', cancel);
      await scriptedReset(form, 'TCN-06', input);
      mounted.container.removeEventListener('reset', cancel);
      input.defaultChecked = false;
      recordNativeState('TCN-06', 'clean-canceled-reset-default-mutation', input);
      expectNativeDefault(input, false, false);
      expect(probe.changes).toHaveLength(0);
      await trustedEdit('TCN-06', input);
      probe.record('TCN-06', 'trusted-edit-returned');
      expectNotification(probe, 0, true, input, true);
      expectCoherent(input, true);
    } finally {
      mounted.container.removeEventListener('reset', cancel);
      probe.detach();
    }
  });

  it('TCN-07 retains dirty native edit after late reset cancellation', async () => {
    const { mounted, form, input, probe } = mountContinuation(true);
    const cancel = (event: Event) => event.preventDefault();
    try {
      edit(input);
      const before = probe.changes.length;
      mounted.container.addEventListener('reset', cancel);
      await scriptedReset(form, 'TCN-07', input);
      mounted.container.removeEventListener('reset', cancel);
      input.defaultChecked = true;
      recordNativeState('TCN-07', 'dirty-canceled-reset-default-mutation', input);
      expectNativeDefault(input, false, true);
      expect(probe.changes).toHaveLength(before);
      await trustedEdit('TCN-07', input);
      probe.record('TCN-07', 'trusted-edit-returned');
      expectNotification(probe, before, true, input, true);
      expectCoherent(input, true);
    } finally {
      mounted.container.removeEventListener('reset', cancel);
      probe.detach();
    }
  });

  it('TCN-08 preserves clean native ownership across same-input owner reassociation', async () => {
    const { mounted, form, input, probe } = mountContinuation(true, { form: 'trc-a' });
    try {
      edit(input);
      act(() => form.reset());
      mounted.rerender(
        <ResetView
          defaultChecked
          form="trc-b"
          tick={1}
          onChange={probe.onChange}
          onInput={probe.onInput}
        />
      );
      expect(mounted.getByRole('switch')).toBe(input);
      expect(input.form?.id).toBe('trc-b');
      await taskAndCommit('TCN-08', input);
      input.defaultChecked = false;
      recordNativeState('TCN-08', 'new-owner-clean-default-mutation', input);
      expectNativeDefault(input, false, false);
      const before = probe.changes.length;
      await trustedEdit('TCN-08', input);
      probe.record('TCN-08', 'trusted-edit-returned');
      expectNotification(probe, before, true, input, true);
      expectCoherent(input, true);
    } finally {
      probe.detach();
    }
  });

  it('TCN-09 preserves disabled reset default mutation before unlock', async () => {
    const { mounted, form, input, probe } = mountContinuation(true);
    try {
      edit(input);
      mounted.rerender(
        <ResetView defaultChecked disabled onChange={probe.onChange} onInput={probe.onInput} />
      );
      await scriptedReset(form, 'TCN-09', input);
      input.defaultChecked = false;
      recordNativeState('TCN-09', 'disabled-clean-default-mutation', input);
      expectNativeDefault(input, false, false);
      const before = probe.changes.length;
      mounted.rerender(
        <ResetView defaultChecked={false} onChange={probe.onChange} onInput={probe.onInput} />
      );
      expect(mounted.getByRole('switch')).toBe(input);
      expect(probe.changes).toHaveLength(before);
      await trustedEdit('TCN-09', input);
      probe.record('TCN-09', 'unlocked-trusted-edit-returned');
      expectNotification(probe, before, true, input, true);
      expectCoherent(input, true);
    } finally {
      probe.detach();
    }
  });

  it('TCN-10 adopts latest native default mutation before deferred reset delivery', async () => {
    const { form, input, probe } = mountContinuation(true);
    try {
      edit(input);
      act(() => {
        form.reset();
        input.defaultChecked = false;
      });
      recordNativeState('TCN-10', 'same-stack-default-mutation', input);
      expectNativeDefault(input, false, false);
      await taskAndCommit('TCN-10', input);
      expectCoherent(input, false);
      const before = probe.changes.length;
      await trustedEdit('TCN-10', input);
      probe.record('TCN-10', 'trusted-edit-returned');
      expectNotification(probe, before, true, input, true);
      expectCoherent(input, true);
    } finally {
      probe.detach();
    }
  });
});
