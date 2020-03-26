import * as React from 'react';
import * as L from '../../../leda';
import { useInterval } from '../../../leda/utils';

interface ControlledFileDropProps {
  title?: string,
}

export interface Files {
  acceptedFiles: File[],
  rejectedFiles: File[],
}

export const ControlledFileDrop = (props: ControlledFileDropProps) => {
  const [file, setFile] = React.useState<File | null>(null);
  const [loaded, setLoaded] = React.useState<number>(0);
  const [shouldError, setShouldError] = React.useState<boolean>(false);

  useInterval(() => {
    setLoaded(loaded + 1);
    if (loaded === 49) {
      // @ts-ignore
      setFile({ errorCode: 500 });
    }
  }, loaded < 50 && file ? 125 : null);

  const uploadError = shouldError && loaded === 50 ? new Error('Сервер ответил со статусом 500.') : null;

  return (
    <L.Div _box _inner>
      <L.FileDrop
        allowedFiles=".jpg, .gif, .png"
        value={file}
        form="fa-drop"
        name="file"
        isRequired
        requiredMessage="Файл обязателен, сэр"
        maxFileSize={1000000}
        loadingData={file ? {
          loaded,
          total: 50,
          error: uploadError,
        } : null}
        maxFileNameLength={25}
        // infoRender={({ Element, elementProps}) => (
        //   <Element {...elementProps}>
        //     Загрузите чтото-там <L.Button>тык</L.Button>
        //   </Element>
        // )}
        onChange={(ev) => {
          console.log('droped', ev);
          setFile(ev.component.value);
          if (!ev.component.value) {
            setLoaded(0);
          }
        }}
      />
      <br />
      <br />
      <L.Switcher value={shouldError} onChange={() => setShouldError(!shouldError)}>should fail</L.Switcher>
      <br />
      <br />
      <L.Button
        _warning
        _marginTop
        form="fa-drop"
        onClick={(ev) => {
          alert('success');
          console.log(ev.form);
        }}
      >
        Validate
      </L.Button>
      <br />
      <br />
      <L.Button onClick={() => L.form('fa-drop').reset()}>
        Reset
      </L.Button>
    </L.Div>
  );
};
