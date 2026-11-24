import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Whisper from '../Whisper';
import Tooltip from '../../Tooltip';

function expectDescriptions(trigger: HTMLElement, expectedIds: string[]) {
  const ids = (trigger.getAttribute('aria-describedby') ?? '')
    .split(/[ \t\n\r\f]+/)
    .filter(Boolean);

  expect(ids).toEqual(expectedIds);
  for (const id of ids) {
    const target = trigger.ownerDocument.getElementById(id);
    expect(target).not.toBeNull();
    expect(target?.isConnected).toBe(true);
  }
}

async function mountedSpeaker() {
  const speaker = await screen.findByTestId('description-speaker');
  await waitFor(() => expect(speaker.isConnected).toBe(true));
  return speaker;
}

describe('Whisper explicit descriptions', () => {
  it('preserves an authored hidden description without a controlId', () => {
    render(
      <>
        <span id="author-help" hidden>
          Existing help
        </span>
        <Whisper speaker={<Tooltip>Extra help</Tooltip>}>
          <button type="button" aria-describedby="author-help">
            Trigger
          </button>
        </Whisper>
      </>
    );

    const trigger = screen.getByRole('button', { name: 'Trigger' });
    expect(trigger.ownerDocument.getElementById('author-help')?.hidden).toBe(true);
    expectDescriptions(trigger, ['author-help']);
    expect(screen.queryByRole('tooltip')).toBeNull();
  });

  it('merges and deduplicates explicit and authored descriptions in author order', async () => {
    render(
      <>
        <span id="author-help" hidden>
          Existing help
        </span>
        <span id="author-details" hidden>
          More detail
        </span>
        <Whisper
          controlId="explicit-description"
          defaultOpen
          speaker={<Tooltip data-testid="description-speaker">Extra help</Tooltip>}
        >
          <button
            type="button"
            aria-describedby={
              'author-help\t explicit-description\n author-help\f author-details explicit-description'
            }
          >
            Trigger
          </button>
        </Whisper>
      </>
    );

    const speaker = await mountedSpeaker();
    const trigger = screen.getByRole('button', { name: 'Trigger' });
    expect(trigger.ownerDocument.getElementById('explicit-description')).toBe(speaker);
    expectDescriptions(trigger, ['author-help', 'explicit-description', 'author-details']);
  });

  it('references the preserved speaker id when it differs from controlId', async () => {
    render(
      <Whisper
        controlId="requested-description"
        defaultOpen
        speaker={
          <Tooltip id="speaker-description" data-testid="description-speaker">
            Extra help
          </Tooltip>
        }
      >
        <button type="button">Trigger</button>
      </Whisper>
    );

    const speaker = await mountedSpeaker();
    const trigger = screen.getByRole('button', { name: 'Trigger' });
    expect(speaker.id).toBe('speaker-description');
    expect(trigger.ownerDocument.getElementById('speaker-description')).toBe(speaker);
    expect(trigger.ownerDocument.getElementById('requested-description')).toBeNull();
    expectDescriptions(trigger, ['speaker-description']);
  });

  it('uses controlId when the speaker explicitly supplies an undefined id', async () => {
    render(
      <Whisper
        controlId="fallback-description"
        defaultOpen
        speaker={
          <Tooltip id={undefined} data-testid="description-speaker">
            Extra help
          </Tooltip>
        }
      >
        <button type="button">Trigger</button>
      </Whisper>
    );

    const speaker = await mountedSpeaker();
    const trigger = screen.getByRole('button', { name: 'Trigger' });
    expect(speaker.id).toBe('fallback-description');
    expect(trigger.ownerDocument.getElementById('fallback-description')).toBe(speaker);
    expectDescriptions(trigger, ['fallback-description']);
  });

  it('keeps an explicit description on a generic speaker', async () => {
    render(
      <Whisper
        controlId="generic-description"
        defaultOpen
        speaker={<div data-testid="description-speaker">Custom help</div>}
      >
        <button type="button">Trigger</button>
      </Whisper>
    );

    const speaker = await mountedSpeaker();
    const trigger = screen.getByRole('button', { name: 'Trigger' });
    expect(trigger.ownerDocument.getElementById('generic-description')).toBe(speaker);
    expect(speaker.getAttribute('role')).toBeNull();
    expectDescriptions(trigger, ['generic-description']);
  });

  it('does not add an automatic id or description to a generic speaker', async () => {
    render(
      <Whisper defaultOpen speaker={<div data-testid="description-speaker">Extra help</div>}>
        <button type="button">Trigger</button>
      </Whisper>
    );

    const speaker = await mountedSpeaker();
    const trigger = screen.getByRole('button', { name: 'Trigger' });
    expect(speaker.id).toBe('');
    expect(trigger.getAttribute('aria-describedby')).toBeNull();
  });
});
