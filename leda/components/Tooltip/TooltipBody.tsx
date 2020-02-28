import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { COMPONENTS_NAMESPACES } from '../../constants';
import { getClassNames, useTheme } from '../../utils';
import { TooltipBodyProps } from './types';

export const TooltipBody = React.forwardRef((props: TooltipBodyProps, ref?: React.Ref<HTMLDivElement>) => {
  const {
    position = 'top',
    style,
    theme: themeProp,
    title,
  } = props;

  const theme = useTheme(themeProp, COMPONENTS_NAMESPACES.tooltip);

  const tooltipClassNames = getClassNames([theme[position]]);

  const tooltip = (
    <div
      className={tooltipClassNames}
      ref={ref}
      style={style}
    >
      <div>
        {title}
      </div>
    </div>
  );

  return ReactDOM.createPortal(tooltip, document.body);
}) as React.FC<TooltipBodyProps>;

TooltipBody.displayName = 'TooltipBody';
