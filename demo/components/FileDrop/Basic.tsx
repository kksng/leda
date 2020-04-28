import * as React from 'react';
import * as L from '../../../leda';
import { FileDropError } from '../../../leda/components/FileDrop/types';

export const BasicFileDrop = (props: { title: string }) => {
  const [file, setFile] = React.useState<File | null>(null);
  const [error, setError] = React.useState<FileDropError>(null);

  return (
    <L.Div _box _inner>
      <L.FileDrop
        value={file}
        error={error}
        onChange={(ev) => {
          console.log('droped', ev.component);
          console.log('ev.component.value', ev.component.value)
          setFile(ev.component.value);
          setError(ev.component.error);
        }}
      />

      <br/>
      <br/>

      <L.Button
        onClick={() => {
          setFile(null)
        }}
      >
        Set null
      </L.Button>
    </L.Div>
  );
};
