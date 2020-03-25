import * as React from 'react';
import {
  bindFunctionalRef, mergeClassNames, getClassNames, useTheme, useElement, useAdaptivePosition,
} from '../../utils';
import { COMPONENTS_NAMESPACES } from '../../constants';
import { DropDownProps, DropDownRefCurrent, WrapperProps } from './types';
import { Span } from '../Span';
import { LedaContext } from '../LedaProvider';
import { DivRefCurrent } from '../Div';
import { Ul } from '../Ul';

export const DropDown = React.forwardRef((props: DropDownProps, ref?: React.Ref<DropDownRefCurrent>): React.ReactElement => {
  const { underscoreClassesTransform } = React.useContext(LedaContext);

  const {
    boundingContainerRef,
    children,
    className,
    isOpen: isOpenProp,
    theme: themeProp,
    wrapperRender,
    ...restProps
  } = mergeClassNames(props, { underscoreClassesTransform });

  const [isOpenState, setIsOpen] = React.useState(false);

  const isOpen = isOpenProp ?? isOpenState;

  const theme = useTheme(themeProp, COMPONENTS_NAMESPACES.dropDown);

  const combinedClassNames = getClassNames([theme.wrapper], className, {
    opened: isOpen,
  });

  const containerRef = React.useRef<DivRefCurrent | null>(null);

  const context = React.useContext(LedaContext);

  const Wrapper = useElement<DropDownProps, {}, WrapperProps>(
    'Wrapper',
    Span,
    wrapperRender || context.renders[COMPONENTS_NAMESPACES.dropDown].wrapperRender,
    props,
  );

  const classMap = React.useMemo(() => ({
    top: theme.wrapperTop,
    right: theme.wrapperRight,
    visible: theme.wrapperVisible,
  }), [theme.wrapperTop, theme.wrapperVisible, theme.wrapperRight]);

  useAdaptivePosition({
    boundingContainerRef,
    classNames: classMap,
    elRef: containerRef,
    isOpen,
  });

  return (
    <Wrapper
      className={combinedClassNames}
      onMouseOver={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      {...restProps}
      ref={ref && ((component) => bindFunctionalRef(component, ref, component && {
        wrapper: component.wrapper || component,
      }))}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === Ul) {
          return React.cloneElement(child, { ref: containerRef });
        }

        return child;
      })}
    </Wrapper>
  );
}) as React.FC<DropDownProps>;

DropDown.displayName = 'DropDown';
