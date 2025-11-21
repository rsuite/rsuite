import React from 'react';
import PasswordStrengthMeter from '../PasswordStrengthMeter';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/cases';

describe('PasswordStrengthMeter', () => {
  testStandardProps(<PasswordStrengthMeter />);

  it('Should render with default class', () => {
    render(<PasswordStrengthMeter data-testid="password-strength-meter" />);
    expect(screen.getByTestId('password-strength-meter')).to.exist;
    expect(screen.getByTestId('password-strength-meter')).to.have.class(
      'rs-password-strength-meter'
    );
  });

  it('Should render correct number of segments (default 4)', () => {
    render(<PasswordStrengthMeter data-testid="password-strength-meter" />);
    const segments = screen
      .getByTestId('password-strength-meter')
      .querySelectorAll('.rs-password-strength-meter-segment');
    expect(segments.length).to.equal(4);
  });

  it('Should render correct number of segments when max is set', () => {
    render(<PasswordStrengthMeter max={6} data-testid="password-strength-meter" />);
    const segments = screen
      .getByTestId('password-strength-meter')
      .querySelectorAll('.rs-password-strength-meter-segment');
    expect(segments.length).to.equal(6);
  });

  it('Should highlight segments up to level', () => {
    render(<PasswordStrengthMeter level={2} data-testid="password-strength-meter" />);
    const segments = screen
      .getByTestId('password-strength-meter')
      .querySelectorAll('.rs-password-strength-meter-segment');
    expect(segments[0].getAttribute('data-active')).to.equal('true');
    expect(segments[1].getAttribute('data-active')).to.equal('true');
    expect(segments[2].getAttribute('data-active')).to.equal('true');
    expect(segments[3].getAttribute('data-active')).to.equal('false');
  });

  it('Should render label', () => {
    render(<PasswordStrengthMeter label="Strong" />);
    expect(screen.getByText('Strong')).to.exist;
  });

  it('Should accept custom className', () => {
    render(
      <PasswordStrengthMeter className="custom-meter" data-testid="password-strength-meter" />
    );
    expect(screen.getByTestId('password-strength-meter')).to.have.class('custom-meter');
  });
});
