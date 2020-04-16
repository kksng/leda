import * as React from 'react';
import { Story } from '../Story';
import { ControlledFileDrop } from './ControlledFileDrop';
import { Customization } from './Customization';

export const FileDrop = (): React.ReactElement => (
  <Story title="FileDrop">
    <ControlledFileDrop title="Контролируемый режим" />
    <Customization title="Кастомизация" />
  </Story>
);
