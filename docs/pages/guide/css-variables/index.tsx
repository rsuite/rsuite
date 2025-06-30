import React, { useMemo, useState } from 'react';
import classNames from 'classnames';
import startCase from 'lodash/startCase';
import ThemeGroup from '@/components/ThemeGroup';
import DefaultPage from '@/components/layout/Page';
import ColorPreview from '@/components/ColorPreview';
import themeVariables from './themes.json';
import themeLightVariables from './theme-light.json';
import themeDarkVariables from './theme-dark.json';
import themeHighContrastVariables from './theme-high-contrast.json';
import styles from './index.module.scss';
import { Heading, Text } from 'rsuite';

type ThemeVariable = {
  name: string;
  value: string;
  type: string;
  category: string;
};

// Check if a variable is a color value
const isColorValue = (value: string, visited = new Set<string>()): boolean => {
  // Skip if we've already checked this value to prevent infinite recursion
  if (visited.has(value)) {
    return false;
  }
  visited.add(value);

  // Check for hex colors, rgb, rgba, hsl, or hsla values
  const isColor =
    /^#([0-9A-F]{3}){1,2}$/i.test(value) ||
    /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/i.test(value) ||
    /^rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+\s*\)$/i.test(value) ||
    /^hsl\(\s*\d+\s*,\s*[\d.]+%\s*,\s*[\d.]+%\s*\)$/i.test(value) ||
    /^hsla\(\s*\d+\s*,\s*[\d.]+%\s*,\s*[\d.]+%\s*,\s*[\d.]+\s*\)$/i.test(value) ||
    value.includes('rgb(') ||
    value.includes('rgba(') ||
    value.includes('hsl(') ||
    value.includes('hsla(') ||
    value.includes('--rs-primary') ||
    value.includes('--rs-gray') ||
    value.includes('--rs-color');

  if (isColor) {
    return true;
  }

  // Check if this is a CSS variable reference
  const varMatch = value.match(/var\((--[^,)]+)(?:,\s*([^)]+))?\)/);
  if (varMatch) {
    const varName = varMatch[1];
    const fallback = varMatch[2];

    // First check the fallback value if it exists
    if (fallback && isColorValue(fallback, new Set(visited))) {
      return true;
    }

    // Then look up the variable in our theme
    const item = [
      ...themeVariables,
      ...themeLightVariables,
      ...themeDarkVariables,
      ...themeHighContrastVariables
    ].find(v => v.name === varName);

    if (item) {
      // Recursively check the variable's value
      if (isColorValue(item.value, new Set(visited))) {
        return true;
      }
    }
  }

  // Check if this is a direct reference to a color variable
  if (value.startsWith('--rs-')) {
    const item = [
      ...themeVariables,
      ...themeLightVariables,
      ...themeDarkVariables,
      ...themeHighContrastVariables
    ].find(v => value.includes(v.value) || value.includes(v.name));

    if (item?.category === 'colors') {
      return true;
    }
  }

  return false;
};

// Check if a variable is a color reference (var(--rs-*))
const isColorReference = (name: string, item: ThemeVariable): boolean => {
  return (
    name.includes('color') ||
    name.includes('bg') ||
    name.includes('background') ||
    name.includes('border') ||
    name.includes('shadow-') ||
    item?.category === 'colors'
  );
};

export default function Page() {
  const [activeTheme, setActiveTheme] = useState<string>('light');

  // Group variables by category and type
  const groupedVariables = useMemo(() => {
    // First group by category field
    const groups: Record<string, Record<string, ThemeVariable[]>> = {};

    // Select variables based on active theme
    let themeVars: ThemeVariable[] = [];
    switch (activeTheme) {
      case 'light':
        themeVars = [...themeVariables, ...themeLightVariables];
        break;
      case 'dark':
        themeVars = [...themeVariables, ...themeDarkVariables];
        break;
      case 'high-contrast':
        themeVars = [...themeVariables, ...themeHighContrastVariables];
        break;
      default:
        themeVars = [...themeVariables];
    }

    // Group variables by their category first, then by type
    themeVars.forEach((variable: ThemeVariable) => {
      if (!groups[variable.category]) {
        groups[variable.category] = {};
      }

      if (!groups[variable.category][variable.type]) {
        groups[variable.category][variable.type] = [];
      }

      // Check if this variable already exists in the array (to avoid duplicates)
      const existingVarIndex = groups[variable.category][variable.type].findIndex(
        v => v.name === variable.name
      );

      if (existingVarIndex === -1) {
        // Add the variable if it doesn't exist yet
        groups[variable.category][variable.type].push(variable);
      }
    });

    return groups;
  }, [activeTheme]);

  // Define the order of categories
  const categoryOrder = [
    'typography',
    'colors',
    'spacing',
    'radius',
    'shadow',
    'z-index',
    'components',
    'misc'
  ];

  // Sort categories by the defined order
  const sortedCategories = Object.keys(groupedVariables).sort(
    (a, b) => categoryOrder.indexOf(a) - categoryOrder.indexOf(b)
  );

  return (
    <DefaultPage>
      <ThemeGroup
        mt="2rem"
        onChange={value => {
          setActiveTheme(value as string);
        }}
      />
      {sortedCategories.map(category => (
        <div key={category} className={classNames(styles.groupSection, 'rcv-markdown')}>
          <Heading level={2} my="2rem" className={styles.categoryHeading}>
            {startCase(category)} variables
          </Heading>

          {Object.entries(groupedVariables[category]).map(([type, variables]) => {
            // Check if this category has only one type
            const hasOnlyOneType = Object.keys(groupedVariables[category]).length === 1;

            return (
              <div key={`${category}-${type}`} className={classNames(styles.typeSection)}>
                {!hasOnlyOneType && (
                  <Heading level={3} my="1rem" className={styles.typeHeading}>
                    {startCase(type)}
                  </Heading>
                )}

                <table className={styles.variablesTable}>
                  <thead>
                    <tr>
                      <th style={{ width: '300px' }}>Variable</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(variables) &&
                      variables.map(variable => {
                        const hasColorPreview =
                          isColorValue(variable.value) ||
                          isColorReference(variable.name, variable) ||
                          category === 'colors';

                        return (
                          <tr key={variable.name}>
                            <td className={styles.variableName}>
                              <Text as="code">{variable.name}</Text>
                            </td>
                            <td className={styles.variableValue}>
                              {hasColorPreview && (
                                <ColorPreview colorValue={`var(${variable.name})`} shape="square" />
                              )}
                              {variable.value}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>
      ))}
    </DefaultPage>
  );
}
