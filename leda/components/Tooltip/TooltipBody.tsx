import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { COMPONENTS_NAMESPACES } from '../../constants';
import { getClassNames, useTheme } from '../../utils';
import { TooltipBodyProps } from './types';

export const TooltipBody = React.forwardRef((props: TooltipBodyProps, ref?: React.Ref<HTMLDivElement>) => {
  const {
    style, position = 'top', title, theme: themeProp,
  } = props;

  const theme = useTheme(themeProp, COMPONENTS_NAMESPACES.tooltip);

  const body = document.querySelector('body');

  const tooltipClassNames = getClassNames([theme[position]]);

  if (body !== null) {
    return ReactDOM.createPortal(
      <div
        style={style}
        className={tooltipClassNames}
        ref={ref}
      >
        <div>
          {title}
        </div>
      </div>,
      body,
    );
  }

  return null;
}) as React.FC<TooltipBodyProps>;

TooltipBody.displayName = 'TooltipBody';
