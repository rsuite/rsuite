import { canUseDOM } from '../DOMHelper';
import { useIsomorphicLayoutEffect } from '@/internals/hooks';
import type { CustomProviderProps } from '@/internals/Provider/CustomContext';
import { registerThemeClass } from './themeClassManager';

export default function useThemeClass(classPrefix: string, theme: CustomProviderProps['theme']) {
  useIsomorphicLayoutEffect(() => {
    if (canUseDOM && theme && document.body) {
      return registerThemeClass(document.body, classPrefix, theme);
    }
  }, [classPrefix, theme]);
}
