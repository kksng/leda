import React from 'react';
import { LedaContext } from './LedaContext';
import { globalDefaultTheme } from './globalDefaultTheme';
import { LedaProps } from './types';
import { globalDefaultRenders } from './globalDefaultRenders';

export const Leda = ((props: LedaProps): React.ReactElement => {
  const {
    children,
    theme = globalDefaultTheme,
    renders = globalDefaultRenders,
  } = props;

  const context = {
    theme, renders,
  };

  return (
    <LedaContext.Provider value={context}>
      {children}
    </LedaContext.Provider>
  );
}) as React.FC<LedaProps>;

export { LedaContext } from './LedaContext';
export { globalDefaultTheme } from './globalDefaultTheme';
