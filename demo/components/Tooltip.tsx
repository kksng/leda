import * as React from 'react';
import * as L from '../../leda';

export const Tooltip = () => {
  const [display, setDisplay] = React.useState(true);
  const [open, setOpen] = React.useState<boolean>();

  const displayData = [
    { text: 'show', value: true },
    { text: 'hide', value: false },
  ];

  const openData = [
    { text: 'default', value: undefined },
    { text: 'close', value: false },
    { text: 'open', value: true },
  ];

  return (
    <L.Div _demoStory>
      <L.H4 _title>Tooltip</L.H4>
      <br />
      <L.ButtonGroup
        _warning
        data={openData}
        defaultValue={openData[0]}
        textField="text"
        onChange={(event) => {
          const object = event.component.value;

          setOpen(object?.value);
        }}
      />
      <br />
      <L.ButtonGroup
        _warning
        data={displayData}
        defaultValue={displayData[0]}
        textField="text"
        onChange={(event) => {
          const object = event.component.value;

          setDisplay(object?.value ?? false);
        }}
      />
      <br />
      {display && (
        <L.Div _tooltipDemo>
          <L.Tooltip isOpen={open} position="top" title="Tooltip at top top top top top top top top top top top top top top top top">
            <L.Button _tipTop>Top</L.Button>
          </L.Tooltip>
          <L.Div _tooltipLeftRight>
            <L.Tooltip isOpen={open} position="left" title="Tooltip at left left left left left left left left left left left left">
              <L.Button _tipLeft>Left</L.Button>
            </L.Tooltip>
            <L.Tooltip isOpen={open} position="right" title="Tooltip at right right right right right right right right right right">
              <L.Button _tipRight>Right</L.Button>
            </L.Tooltip>
          </L.Div>
          <L.Tooltip isOpen={open} position="bottom" title="Tooltip at bottom bottom bottom bottom bottom bottom bottom bottom">
            <L.Button onClick={() => setDisplay(!display)} _tipBottom>Bottom</L.Button>
          </L.Tooltip>
        </L.Div>
      )}
    </L.Div>
  );
};
