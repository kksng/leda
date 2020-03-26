import * as React from 'react';
import { Props } from '../../../../system/components/Props';
import { PropRow } from '../../../../system/components/PropRow';

export const En = (): React.ReactElement => (
  <Props>
    <PropRow name="data" type="string[] | StatusItem[]">
      Массив объектов или строк, которые представляют собой шаги
    </PropRow>
  </Props>
);

En.displayName = 'En';
