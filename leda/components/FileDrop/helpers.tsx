import * as React from 'react';
import accept from 'attr-accept';
import { isString } from 'lodash';
import {
  COMPONENTS_NAMESPACES, ERROR_MESSAGES, MAX_FILE_SIZE, MIN_FILE_SIZE,
} from '../../constants';
import { mergeClassNames } from '../../utils';
import { Div } from '../Div';
import {
  FileDropError, FileType, FileDropProps,
} from './types';
import { A } from '../A';
import { globalDefaultTheme } from '../LedaProvider';
import { UnderscoreClasses } from '../LedaProvider/underscoreClasses';

export const compareFiles = (firstFile: FileType, secondFile: FileType): boolean => {
  if (firstFile.size !== secondFile.size) return false;

  const firstFileDate = new Date(firstFile.lastModified);

  const secondFileDate = new Date(secondFile.lastModified);

  return firstFileDate.getTime() !== secondFileDate.getTime();
};

// Проверка не добавлен ли уже один из выбранных файлов
export const checkForAddedFile = (props: FileDropProps, file: FileType): boolean => {
  const { value } = props;
  // Если файл найден по имени, то проверяем равен по размеру и дате последнего изменения
  return !!value && !compareFiles(value, file);
};

export const getErrorCode = (props: FileDropProps, file: FileType): number => {
  const {
    allowedFiles,
    forbiddenFiles,
    maxFileNameLength = 255,
    minFileSize = MIN_FILE_SIZE,
    maxFileSize = MAX_FILE_SIZE,
  } = props;

  // Ошибка - файл уже существует
  if (checkForAddedFile(props, file)) return 4;

  // Ошибка типа
  if (allowedFiles) {
    const isAccepted = accept({
      name: file.name,
      type: file.type,
    }, allowedFiles);
    if (!isAccepted) return 3;
  }

  // Ошибка типа. Запрещенные файлы
  if (forbiddenFiles) {
    const isAcceptedForbidden = accept({
      name: file.name,
      type: file.type,
    }, forbiddenFiles);

    if (isAcceptedForbidden) return 3;
  }

  // Ошибка по минимальному размеру
  if (file.size < minFileSize) return 1;

  // Ошибка по максимальному размеру
  if (file.size > maxFileSize) return 2;

  // Ошибка по максимальной длине имени файла
  if (file.name.length > maxFileNameLength) return 6;

  // Ошибка не найдена
  return 0;
};

export const getError = (file: FileType): FileDropError => ERROR_MESSAGES.find(
  (error: FileDropError): boolean => file.errorCode === error.errorCode,
) as FileDropError;

export const getErrorDescription = (file: FileType): string => getError(file)?.message ?? 'Неизвестная ошибка';

// Проверка на количество файлов и уже добавленные файлы
export const checkFiles = (
  props: FileDropProps,
  accepted: FileType[],
  rejected: FileType[],
): FileType => {
  const rejectedFile = rejected[0];

  if (rejected.length > 1) {
    // превышено максимальное количество файлов
    return {
      ...rejectedFile,
      errorCode: 5,
      errorMessage: ERROR_MESSAGES.find((error) => error.errorCode === 5)?.message,
    };
  }

  if (rejectedFile) {
    return {
      ...rejectedFile,
      errorCode: getErrorCode(props, rejectedFile),
      errorMessage: getErrorDescription(rejectedFile),
    };
  }

  const acceptedFile = accepted[0];

  const errorCode = acceptedFile && getErrorCode(props, acceptedFile);
  // если ошибок нет errorCode равен 0
  if (errorCode && errorCode !== 0) {
    return {
      ...acceptedFile,
      errorCode: getErrorCode(props, acceptedFile),
      errorMessage: getErrorDescription(acceptedFile),
    };
  }

  return acceptedFile;
};

export const getRestProps = (props: FileDropProps, underscoreClassesTransform: UnderscoreClasses): {} => {
  const {
    acceptedFilesRender,
    allowedFiles,
    className,
    dropZoneFilesNode, // не должно попасть в restProps
    loadingData,
    forbiddenFiles,
    infoRender,
    maxFileNameLength, // не должно попасть в restProps
    maxFileSize, // не должно попасть в restProps
    maxFilesNumber,
    minFileSize, // не должно попасть в restProps
    onDrop, // не должно попасть в restProps
    onRemove, // не должно попасть в restProps
    onChange,
    rejectedFilesRender,
    theme: themeProp,
    uploadButtonRender,
    value,
    isDisabled,
    invalidMessageRender,
    invalidMessage,
    isRequired,
    isValid,
    requiredMessage,
    validator,
    shouldValidateUnmounted,
    ...restProps
  } = mergeClassNames(props, { underscoreClassesTransform });

  return restProps;
};

export const DescriptionMessage = (props: { children: string }): React.ReactElement => {
  const { children: message } = props;

  const shouldWrapMessage = isString(message) && message.length;

  return (shouldWrapMessage ? <Div _block-inline _txt-gray _txt-small>{message}</Div> : message) as React.ReactElement;
};

export const createDownloadLink = (blob: Blob, fileName: string | undefined, theme: typeof globalDefaultTheme[typeof COMPONENTS_NAMESPACES.fileDrop]): React.ReactElement | null => {
  if (!fileName) return null;

  const isIE = !!window.navigator?.msSaveOrOpenBlob;

  const linkProps = isIE
    ? { onClick: (): boolean => window.navigator.msSaveOrOpenBlob(blob, fileName) }
    : { href: URL.createObjectURL(blob), download: fileName };

  return (
    <A theme={theme.fileDownloadLink} {...linkProps}>
      {fileName}
    </A>
  );
};
