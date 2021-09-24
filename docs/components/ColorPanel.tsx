import React from 'react';
import Color from 'color';
import { Popover, Whisper } from 'rsuite';
import Question2 from '@rsuite/icons/legacy/Question2';
import type { PositionChildProps } from 'rsuite/es/Overlay/Position';

interface ColorType {
  hex: string;
  name: string;
}

interface ColorPanelProps {
  colors: ColorType[];
}

export default function ColorPanel(props: ColorPanelProps) {
  const { colors } = props;
  return (
    <table className="panel-color">
      <thead>
        <tr>
          <th>Color</th>
          <th>
            <Whisper placement={'top'} trigger="hover" speaker={<Speaker />}>
              <a href="https://www.w3.org/TR/WCAG20/#visual-audio-contrast-contrast">
                Ratio <Question2 />
              </a>
            </Whisper>
          </th>
          <th>Noraml</th>
          <th>Large</th>
        </tr>
      </thead>
      <tbody>
        {colors.map((item, index) => {
          const a = Color('#575757').contrast(Color(item.hex));
          const b = Color('#fff').contrast(Color(item.hex));
          const contrast = Math.max(a, b);

          const styles = {
            background: item.hex,
            color: a > b ? '#575757' : '#fff'
          };

          let levelNoraml = '⚠️';
          let levelLarge = '⚠️';

          if (contrast >= 3) {
            levelLarge = 'AA';
          }

          if (contrast >= 4.5) {
            levelNoraml = 'AA';
            levelLarge = 'AAA';
          }

          if (contrast >= 7) {
            levelNoraml = 'AAA';
          }

          return (
            <tr key={index} data-index={index} style={styles}>
              <td>
                {item.name}:{item.hex}
              </td>
              <td className="contrast">{contrast.toFixed(1)} : 1</td>
              <td>{levelNoraml}</td>
              <td style={{ fontWeight: 'bold' }}>{levelLarge}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

const Speaker = React.forwardRef(({ style, ...rest }: PositionChildProps, ref) => {
  return (
    <Popover ref={ref} style={{ width: 700, ...style }} title="Contrast Ratio" {...rest}>
      <p>
        The latest accessibility guidelines (e.g.,
        <a
          href="https://www.w3.org/TR/WCAG20/#visual-audio-contrast-contrast"
          target="_blank"
          rel="noopener noreferrer"
        >
          WCAG 2.0 1.4.3)
        </a>
        require that text (and images of text) provide adequate contrast for people who have visual
        impairments. Contrast is measured using a{' '}
        <a
          href="https://www.w3.org/TR/WCAG20/#contrast-ratiodef"
          target="_blank"
          rel="noopener noreferrer"
        >
          formula
        </a>
        that gives a ratio ranging from 1:1 (no contrast, e.g., black text on a black background) to
        21:1 (maximum contrast, e.g., black text on a white background). Using this formula, the
        requirements are:
      </p>
      <ul>
        <li>
          <strong>3 : 1</strong> - minimum contrast for &quot;large scale&quot; text (18 pt or 14 pt
          bold, or larger) under WCAG 2.0 1.4.3 (Level AA)
        </li>
        <li>
          <strong>4.5 : 1</strong> - minimum contrast for regular sized text under WCAG 2.0 1.4.3
          (Level AA)
        </li>
        <li>
          <strong>7 : 1</strong> - &quot;enhanced&quot; contrast for regular sized text under WCAG
          2.0 1.4.6 (Level AAA)
        </li>
      </ul>
    </Popover>
  );
});
