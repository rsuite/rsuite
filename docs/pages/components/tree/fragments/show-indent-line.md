<!--start-code-->

```js
import { Tree } from 'rsuite';
import FolderFillIcon from '@rsuite/icons/FolderFill';
import PageIcon from '@rsuite/icons/Page';

const data = [
  {
    label: 'docs',
    value: 'docs',
    children: [
      {
        label: 'pages',
        value: 'pages',
        children: [
          {
            label: 'components',
            value: 'pages-components',
            children: [
              {
                label: 'tree',
                value: 'pages-tree',
                children: [
                  {
                    label: 'fragments',
                    value: 'pages-fragments',
                    children: [
                      {
                        label: 'async',
                        value: 'pages-async',
                        children: [
                          {
                            label: 'index.tsx',
                            value: 'pages-index.tsx'
                          },
                          {
                            label: 'styles.css',
                            value: 'pages-styles.css'
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    label: 'packages',
    value: 'packages',
    children: [
      {
        label: 'rsuite',
        value: 'packages-rsuite',
        children: [
          {
            label: 'src',
            value: 'packages-src',
            children: [
              {
                label: 'components',
                value: 'packages-components',
                children: [
                  {
                    label: 'Tree',
                    value: 'packages-Tree',
                    children: [
                      {
                        label: 'index.tsx',
                        value: 'packages-index.tsx'
                      },
                      {
                        label: 'styles.css',
                        value: 'packages-styles.css'
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    label: 'node_modules',
    value: 'node_modules',
    children: [
      {
        label: 'rsuite',
        value: 'node_modules-rsuite',
        children: [
          {
            label: 'src',
            value: 'node_modules-src',
            children: [
              {
                label: 'components',
                value: 'node_modules-components',
                children: [
                  {
                    label: 'Tree',
                    value: 'node_modules-Tree',
                    children: [
                      {
                        label: 'index.tsx',
                        value: 'node_modules-index.tsx'
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            label: 'package.json',
            value: 'node_modules-package.json'
          }
        ]
      }
    ]
  },
  {
    label: 'README.md',
    value: 'README.md',
    children: null
  },
  {
    label: 'LICENSE',
    value: 'LICENSE',
    children: null
  },
  {
    label: 'package.json',
    value: 'package.json',
    children: null
  },
  {
    label: 'tsconfig.json',
    value: 'tsconfig.json',
    children: null
  },
  {
    label: 'webpack.config.js',
    value: 'webpack.config.js',
    children: null
  }
];

const App = () => (
  <Tree
    data={data}
    showIndentLine
    defaultExpandItemValues={['node_modules', 'node_modules-rsuite']}
    renderTreeNode={node => {
      return (
        <>
          {node.children ? <FolderFillIcon /> : <PageIcon />} {node.label}
        </>
      );
    }}
  />
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
