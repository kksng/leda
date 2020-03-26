import * as React from 'react';
import * as L from '../../../leda';

const Accepted = ({ value, onChange }: { onChange?: Function, value: { acceptedFiles: File[], rejectedFiles: File[]}}) => (
  <L.Ul _listItem>
    {value.acceptedFiles.map((file) => (
      <L.Li key={file.name}>
        <L.Span _txtSuccess>{file.name}</L.Span>
        {' '}
        <L.Tooltip title="Скачать?">
          <L.A href={URL.createObjectURL(new Blob([file], { type: file.type }))} download={file.name}>
            <L.I _uiconDocCheck />
          </L.A>
        </L.Tooltip>
        <L.Tooltip title="Удолить?">
          <L.A>
            <L.I
              _uiconDocOverdue
              onClick={(ev: React.MouseEvent) => (onChange ? onChange(value.acceptedFiles, value.rejectedFiles, ev, file) : undefined)}
            />
          </L.A>
        </L.Tooltip>
      </L.Li>
    ))}
  </L.Ul>
);

interface ControlledDropZoneProps {
  title?: string,
}

export const ControlledDropZone = (props: ControlledDropZoneProps) => {
  const [files, setFiles] = React.useState<{ acceptedFiles: any, rejectedFiles: any}>({ acceptedFiles: [], rejectedFiles: [] });

  return (
    <L.Div _box _inner>
      <L.DropZone
        allowedFiles=".jpg, .gif, .png"
        maxFilesNumber={2}
        form="dd-zone"
        name="file"
        isRequired
        requiredMessage="Загрузите пожалуйста файл"
        value={files}
        infoRender={({
          Element,
          elementProps,
          componentProps: { maxFilesNumber },
        }: any) => <Element {...elementProps}>Контролируемая <L.Span _txtWarning>Dropzone</L.Span>. Не более {maxFilesNumber} файлов.</Element>}
        maxFileSize={1000000}
        maxFileNameLength={25}
        onChange={(ev) => {
          console.log('droped', ev);
          setFiles(ev.component.value);
        }}
        uploadButtonRender={({ elementProps }: any) => <L.Button {...elementProps} _warning>Загрузить!</L.Button>}
        // acceptedFilesRender={({ elementProps, componentProps: { value } }: any) => <Accepted {...elementProps} value={value} />}
      />
      <L.Button
        _warning
        _marginTop
        form="dd-zone"
        onClick={(ev) => {
          alert('success');
          console.log(ev.form);
        }}
      >
        Validate
      </L.Button>
      <br />
      <br />
      <L.Button onClick={() => L.form('dd-zone').reset()}>
        Reset
      </L.Button>
    </L.Div>
  );
};
