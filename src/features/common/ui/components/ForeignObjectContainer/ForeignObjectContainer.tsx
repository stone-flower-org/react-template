import throttle from 'lodash/throttle';
import React, { FC, forwardRef, Ref, SVGAttributes, useCallback, useEffect, useState } from 'react';

import { useRefChangeHandler } from '@src/features/common/ui/hooks';

import { DEFAULT_PROPS } from './constants';
export interface ForeignObjectContainerProps extends SVGAttributes<SVGForeignObjectElement> {
  'data-test-id'?: string;
  ref?: Ref<SVGForeignObjectElement>;
}

export const ForeignObjectContainer: FC<ForeignObjectContainerProps> = forwardRef(
  (
    {
      'data-test-id': dataName = DEFAULT_PROPS['data-test-id'],
      className,
      children,
      ...props
    }: ForeignObjectContainerProps,
    ref,
  ) => {
    const { el: foEl, onRefChange } = useRefChangeHandler(ref);

    const [HMTLContainerStyles, setHMTLContainerStyles] = useState({
      height: '0',
      width: '0',
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onResize = useCallback(
      throttle(() => {
        setHMTLContainerStyles((prev) => ({
          ...prev,
          height: `${foEl?.clientHeight ?? 0}px`,
          width: `${foEl?.clientWidth ?? 0}px`,
        }));
      }, 50),
      [foEl],
    );

    useEffect(() => {
      onResize();
      window.addEventListener('resize', onResize);
      return () => {
        onResize.cancel();
        window.removeEventListener('resize', onResize);
      };
    }, [onResize]);

    return (
      <foreignObject
        {...props}
        data-test-id={dataName}
        ref={onRefChange}
      >
        <div
          {...({ xmlns: 'http://www.w3.org/1999/xhtml' } as any)}
          style={HMTLContainerStyles}
        >
          <div className={className}>{children}</div>
        </div>
      </foreignObject>
    );
  },
);
ForeignObjectContainer.displayName = 'ForeignObjectContainer';
