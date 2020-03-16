import React from 'react';
import { PartialGlobalDefaultTheme } from '../../utils/useTheme';
import { GlobalDefaultRenders } from './globalDefaultRenders';

export interface LedaProps {
  children: React.ReactNode,
  theme?: PartialGlobalDefaultTheme,
  renders?: GlobalDefaultRenders,
}
