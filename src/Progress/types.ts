export interface ProgressSection {
  /** Percent of this section */
  percent: number;

  /** Color of this section */
  color: string;

  /** Label of this section */
  label?: React.ReactNode;

  /** Tooltip of this section */
  tooltip?: React.ReactNode;
}
