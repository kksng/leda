import * as React from 'react';
import * as L from '../../../../../leda';

export const StatusItemType = (): React.ReactElement => (
  <L.Tooltip
    title={
<pre>
{`
interface StatusItem {
  [text: string]: any,
}
`}
</pre>
    }
  >
    <L.Span _txtType>
      StatusItem
    </L.Span>
  </L.Tooltip>
);

StatusItemType.displayName = 'StatusItemType';
