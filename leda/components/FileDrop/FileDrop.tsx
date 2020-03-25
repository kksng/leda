import React from 'react';
import { DropzoneRef, useDropzone } from 'react-dropzone';
import {
  bindFunctionalRef, getClassNames, mergeClassNames, useTheme,
} from '../../utils';
import { MAX_FILE_SIZE } from '../../constants';
import { Div } from '../Div';
import {
  getRestProps,
} from './helpers';
import { createChangeHandler, createClickHandler, createRetryHandler } from './handlers';
import {
  FileDropProps, FileDropRefCurrent,
} from './types';
import { useCustomElements } from './hooks';
import { SingleFileView } from './SingleFileView';
import { useValidation } from '../Validation';
import { LedaContext } from '../LedaProvider';

export const FileDrop = React.forwardRef((props: FileDropProps, ref: React.Ref<FileDropRefCurrent>): React.ReactElement => {
  const { underscoreClassesTransform } = React.useContext(LedaContext);

  const {
    allowedFiles,
    className,
    isDisabled,
    maxFileSize = MAX_FILE_SIZE,
    value,
  } = mergeClassNames<FileDropProps>(props, { underscoreClassesTransform });

  const fileDropRef = React.useRef<DropzoneRef | null>(null);

  const theme = useTheme(props.theme, 'fileDrop');

  const handleChange = createChangeHandler(props);

  const state = React.useMemo(() => ({ }), []);

  const extra = React.useMemo(() => ({ reset: () => handleChange([], []) }), [handleChange]);

  const { isValid, InvalidMessage, validateCurrent } = useValidation(props, state, extra);

  const handleClick = createClickHandler(props, fileDropRef);

  const combinedContentClassNames = getClassNames(theme.content, { [theme.disabled]: isDisabled });

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop: (acceptedFiles, rejectedFiles, event) => {
      const newValue = handleChange(acceptedFiles, rejectedFiles, event as React.DragEvent<HTMLDivElement>);
      validateCurrent(newValue);
    },
    accept: allowedFiles,
    maxSize: maxFileSize,
    multiple: false,
    disabled: isDisabled,
  });

  const combinedClassNames = getClassNames(className, theme.wrapper, { [theme.disabled]: isDisabled, [theme.invalid]: !isValid });

  fileDropRef.current = { open };

  const {
    Info, UploadButton, Wrapper,
  } = useCustomElements(props);

  const rootProps = getRootProps();

  const handleRetry = createRetryHandler(props);

  const inputProps = { ...getInputProps(), ...getRestProps(props, underscoreClassesTransform) };

  return (
    <>
      <Wrapper
        className={combinedClassNames}
        ref={ref && ((component) => bindFunctionalRef(component, ref, component && {
          wrapper: component.wrapper,
          input: component.wrapper && component.wrapper.querySelector('input'),
        }))}
      >
        <Div
          {...rootProps}
          onClick={handleClick}
          className={combinedContentClassNames}
          ref={(component) => {
            rootProps.ref.current = component ? component.wrapper : null;
          }}
        >
          <input {...inputProps} />
          {' '}
          <SingleFileView
            {...props}
            theme={theme}
            value={value}
            handleRetry={handleRetry}
            UploadButton={UploadButton}
            Info={Info}
          />
        </Div>
      </Wrapper>
      <InvalidMessage />
    </>
  );
}) as React.FC<FileDropProps>;

FileDrop.displayName = 'FileDrop';
