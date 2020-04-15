import * as React from 'react';
import * as L from '../../../leda';
import { useInterval } from '../../../leda/utils';
import { FileDropError } from '../../../leda/components/FileDrop/types';

export const ControlledFileDrop = () => {
  const [file, setFile] = React.useState<File | null>(null);
  const [error, setError] = React.useState<FileDropError>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [shouldError, setShouldError] = React.useState<boolean>(false);
  const [loaded, setLoaded] = React.useState<number>(0);

  useInterval(() => {
    setLoaded(loaded + 5);
  }, isLoading ? 100 : null);

  return (
    <L.Div _box _inner>
      <L.FileDrop
        allowedFiles=".jpg, .gif, .png"
        value={file}
        form="fa-drop"
        name="file"
        isRequired
        requiredMessage="Файл обязателен, сэр"
        maxFileSize={100000}
        isLoading={isLoading}
        loadingProgress={loaded}
        error={error}
        maxFileNameLength={250}
        errorRender={
          ({ Element, elementProps, componentProps }: any) => {
            const { error, handleRetry } = componentProps;
            return (
              <Element {...elementProps}>
                <L.Ul>
                  <L.Li>Не удалось загрузить файл{error.errorMessage ? `. ${error.errorMessage}` : null}</L.Li>
                  <L.Li><L.Button onClick={handleRetry} _warning>Заменить файл</L.Button></L.Li>
                </L.Ul>
              </Element>
            );
          }
        }
        onChange={(ev) => {
          console.log('droped', ev.component);
          setFile(ev.component.value);
          setError(ev.component.error);
          if (ev.component.value) {
            setIsLoading(true);
            setTimeout(() => {
              setIsLoading(false);
              setLoaded(0);
              if (shouldError) {
                setError('Server error');
                setFile(null);
              }
            }, 2000);
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
