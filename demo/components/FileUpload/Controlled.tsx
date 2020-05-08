import * as React from 'react';
import * as L from '../../../leda';
import { StateButtonGroup } from '../StateButtonGroup';

export const Controlled = (componentProps: any) => {
  const [props, setProps] = React.useState({});

  return (
    <L.Div _box _inner _demoBg>
      <L.FileUpload
        form="fupload"
        name="file"
        isRequired
        requiredMessage="Алоэ"
        allowedFiles=".jpg, .gif, .png"
        maxFileSize={1500000000}
        onChange={(ev) => {
          console.log('ev.component', ev.component)
        }}
        onFileLoad={(ev) => {
          console.log('Вы загрузили файл!', ev.component.value.acceptedFiles, ev.component.value.rejectedFiles);
          setProps({ isLoading: true });
          setTimeout(() => {
            setProps({ isLoading: false });
            alert(ev.component.value.acceptedFiles.length !== 0 ? 'Файл загружен!' : 'При загрузке возникла ошибка!');
          }, 2000);
        }}
        {...props}
      />
      <br />
      <br />
      <StateButtonGroup
        data={[
          {
            text: 'Default',
            props: {},
          },
          {
            text: 'Loading',
            props: { isLoading: true },
          },
        ]}
        setProps={setProps}
      />
    </L.Div>
  );
};
