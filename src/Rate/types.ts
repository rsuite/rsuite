/**
 * Represents the status of a star in a rating system.
 * 0: Empty star
 * 0.5: Half-filled star
 * 1: Fully filled star
 * number: Any other fractional value for custom fill levels
 */
export type StarStatus = 0 | 0.5 | 1 | number;
