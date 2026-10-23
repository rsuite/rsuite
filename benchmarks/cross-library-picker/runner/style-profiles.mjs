import path from 'node:path';
import { createRequire } from 'node:module';

export const styleProfiles = ['full', 'component'];

export function styleBuild(root, profile = 'full', separate = false) {
  if (!styleProfiles.includes(profile)) throw new Error('Unknown picker style profile');
  if (profile !== 'full' && !separate) {
    throw new Error('Component styles require --style-output; ordinary timing builds stay full');
  }
  return {
    profile,
    separate,
    directory: separate ? path.join(root, 'dist-styles', profile) : path.join(root, 'dist')
  };
}

export function libraryStyles(root, library, profile) {
  if (!styleProfiles.includes(profile)) throw new Error('Unknown picker style profile');
  const require = createRequire(path.join(root, 'package.json'));
  if (library === 'rsuite') {
    const entry =
      profile === 'full' ? 'rsuite/dist/rsuite.min.css' : 'rsuite/SelectPicker/styles/index.css';
    return { entry: require.resolve(entry), imports: [entry], mechanism: 'published CSS entry' };
  }
  if (library === 'heroui') {
    return {
      entry: path.join(
        root,
        'src/adapters',
        profile === 'full' ? 'heroui.css' : 'heroui.component.css'
      ),
      imports:
        profile === 'full'
          ? ['tailwindcss', '@heroui/styles']
          : [
              'tailwindcss',
              'tw-animate-css',
              '@heroui/styles/base',
              '@heroui/styles/base/scrollbar.css',
              '@heroui/styles/utilities',
              '@heroui/styles/variants',
              '@heroui/styles/themes/default',
              '@heroui/styles/components/combo-box.css',
              '@heroui/styles/components/input.css',
              '@heroui/styles/components/list-box.css',
              '@heroui/styles/components/list-box-item.css'
            ],
      mechanism: 'Tailwind plus published CSS entries',
      theme: 'Complete official default theme, including its component customizations',
      utilitySources: 'Browser src directory and index.html only'
    };
  }
  if (library === 'antd' || library === 'chakra') {
    return {
      entry: null,
      imports: [],
      mechanism:
        'Automatic CSS in JavaScript; serialized styles are included in JavaScript payload',
      provider: library === 'antd' ? 'Existing ConfigProvider theme' : 'Existing defaultSystem',
      providerPruned: false
    };
  }
  throw new Error('Unknown picker library');
}
