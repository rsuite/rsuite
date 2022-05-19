// @ts-check
import { renderHook } from '@testing-library/react-hooks/dom';
import CustomProvider from '../CustomProvider';
import { useProps } from '../useProps';

describe('useProps(component, props)', () => {
  it('Should return props as is if not used within CustomProvider', () => {
    const props = {};

    const { result } = renderHook(() => useProps('Message', props));

    expect(result.current).to.eql(props);
  });

  it('Should return props as is if no overrides for `component` is specified', () => {
    const props = {};

    const { result } = renderHook(() => useProps('Message', props), {
      wrapper: CustomProvider,
      initialProps: {
        PREVIEW_components: {}
      }
    });

    expect(result.current).to.eql(props);
  });

  it('Should populate nullish properies on `props` as defined in `defaultProps`', () => {
    const props = {};

    const { result } = renderHook(() => useProps('Message', props), {
      wrapper: CustomProvider,
      initialProps: {
        PREVIEW_components: {
          Message: {
            defaultProps: {
              duration: 3000
            }
          }
        }
      }
    });

    expect(result.current).to.eql({ duration: 3000 });
  });

  it('Should not override non-nullish properies on `props`', () => {
    const props = {
      duration: 4500
    };

    const { result } = renderHook(() => useProps('Message', props), {
      wrapper: CustomProvider,
      initialProps: {
        PREVIEW_components: {
          Message: {
            defaultProps: {
              duration: 3000
            }
          }
        }
      }
    });

    expect(result.current).to.eql({ duration: 4500 });
  });
});
