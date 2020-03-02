import * as React from 'react';
import * as L from '../../leda';

export const Tooltip = () => {
  const [visibility, setVisibility] = React.useState(true);
  const [mount, setMount] = React.useState(true);

  return (
    <L.Div _demoStory>
      <L.H4 _title>Tooltip</L.H4>
      <L.Div>
        <L.Button onClick={() => setVisibility(!visibility)}>Toggle</L.Button>
        <L.Button onClick={() => setMount(!mount)}>Mount</L.Button>
      </L.Div>
      {visibility && (
        <L.Div _tooltipDemo>
          <L.Tooltip position="top" title="Tooltip at top top top top top top top top top top top top top top top top">
            <L.Button _tipTop>Top</L.Button>
          </L.Tooltip>
          <L.Div _tooltipLeftRight>
            <L.Tooltip position="left" title="Tooltip at left left left left left left left left left left left left">
              <L.Button _tipLeft>Left</L.Button>
            </L.Tooltip>
            <L.Tooltip position="right" title="Tooltip at right right right right right right right right right right">
              <L.Button _tipRight>Right</L.Button>
            </L.Tooltip>
          </L.Div>
          <L.Tooltip position="bottom" title="Tooltip at bottom bottom bottom bottom bottom bottom bottom bottom">
            {mount && <L.Button onClick={() => setMount(!mount)} _tipBottom>Bottom</L.Button>}
          </L.Tooltip>
        </L.Div>
      )}
    </L.Div>
  );
};
