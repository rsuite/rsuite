export const html = '<div id="root"></div>';
export const viteHtml = `${html}\n<script type="module" src="/src/index.jsx"></script>`;
export const css = '@import "rsuite/dist/rsuite.css";\n\n#root{ padding: 10px; }';
export const dependencies = {
  react: '^18.0.0',
  'react-dom': '^18.0.0',
  rsuite: 'latest',
  '@rsuite/icons': 'latest',
  '@babel/runtime': '^7.8.4'
};

export function createVitePackageJson(projectDependencies: Record<string, string>) {
  return JSON.stringify(
    {
      name: 'rsuite-example',
      private: true,
      version: '0.0.0',
      scripts: {
        dev: 'vite --host 0.0.0.0'
      },
      dependencies: projectDependencies,
      devDependencies: {
        vite: '^7.0.0'
      }
    },
    null,
    2
  );
}
