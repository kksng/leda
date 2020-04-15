import * as React from 'react';
import { DropZoneViewTypes } from './constants';
import { createDownloadLink, getErrorMessage } from './helpers';
import {
  FileType, SingleFileViewProps,
} from './types';
import { getClassNames } from '../../utils';
import { ErrorComponent } from './ErrorComponent';
import { SuccessComponent } from './SuccessComponent';
import { LoadingComponent } from './LoadingComponent';
import { DefaultComponent } from './DefaultComponent';

export const SingleFileView = (props: SingleFileViewProps): React.ReactElement | null => {
  const {
    error,
    value,
    isLoading,
    theme,
    isDisabled,
  } = props;

  const combinedButtonClassNames = getClassNames(theme.button, { [theme.disabled]: isDisabled });

  const currentView = (() => {
    if (error) return DropZoneViewTypes.Error;

    if (isLoading) return DropZoneViewTypes.Loading;

    // todo: handle uncontrolled
    if (value) return DropZoneViewTypes.Success;

    return DropZoneViewTypes.Default;
  })();

  if (currentView === DropZoneViewTypes.Loading) {
    return (
      <LoadingComponent {...props} />
    );
  }

  if (currentView === DropZoneViewTypes.Success) {
    const file = value ?? {} as Partial<FileType>;

    const blob = new Blob([file.name ?? ''], { type: file.type });

    const downloadLink = file.link || createDownloadLink(blob, file.name, theme);

    return (
      <SuccessComponent {...props} downloadLink={downloadLink} />
    );
  }

  if (currentView === DropZoneViewTypes.Error) {
    if (error == null) return null;

    const errorMessage = getErrorMessage(error);
    return (
      <ErrorComponent
        {...props}
        errorMessage={errorMessage}
      />
    );
  }

  return (
    <DefaultComponent {...props} combinedButtonClassNames={combinedButtonClassNames} />
  );
};
