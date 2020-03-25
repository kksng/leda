import * as React from 'react';
import accept from 'attr-accept';
import { isString } from 'lodash';
import { ERROR_MESSAGES, MAX_FILE_SIZE, MIN_FILE_SIZE } from '../../constants';
import { mergeClassNames } from '../../utils';
import { Div } from '../Div';
import {
  DropZoneError, DropZoneFileType, DropZoneProps, DropZoneState, FileType, ExternalFile,
} from './types';
import { LedaContext } from '../LedaProvider';
import { UnderscoreClasses } from '../LedaProvider/underscoreClasses';

export const compareFiles = (firstFile: DropZoneFileType, secondFile: DropZoneFileType): boolean => {
  if (firstFile.size !== secondFile.size) return false;

  const firstFileDate = new Date(firstFile.lastModified);

  const secondFileDate = new Date(secondFile.lastModified);

  return firstFileDate.getTime() !== secondFileDate.getTime();
};

// Проверка не добавлен ли уже один из выбранных файлов
export const checkForAddedFile = (props: DropZoneProps, state: DropZoneState, file: FileType): boolean => {
  const { value: valueProp } = props;

  const value = valueProp || state;

  const alreadyAccepted = value.acceptedFiles;

  const itemIndex = alreadyAccepted.findIndex((acceptedItem: FileType): boolean => acceptedItem.name === file.name);
  // Если файл найден по имени, то проверяем равен по размеру и дате последнего изменения
  return itemIndex !== -1 && !compareFiles((alreadyAccepted[itemIndex] as DropZoneFileType), file as DropZoneFileType);
};

export const getErrorCode = (props: DropZoneProps, state: DropZoneState, file: FileType, lastDropped: number): number => {
  const {
    allowedFiles,
    value: valueProp,
    forbiddenFiles,
    maxFileNameLength = 255,
    maxFilesNumber,
    minFileSize = MIN_FILE_SIZE,
    maxFileSize = MAX_FILE_SIZE,
  } = props;

  const value = valueProp || state;

  const { acceptedFiles } = state;

  // Сколько всего файлов
  const allFilesCount = (value.acceptedFiles ? value.acceptedFiles.length : acceptedFiles.length) + lastDropped;
  const hasMaxFilesError = maxFilesNumber && allFilesCount > maxFilesNumber;

  // Ошибка - превышено максимальное количество файлов
  if (hasMaxFilesError) return 5;

  // Ошибка - файл уже существует
  if (checkForAddedFile(props, state, file)) return 4;

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
  if ((file as DropZoneFileType).size < minFileSize) return 1;

  // Ошибка по максимальному размеру
  if ((file as DropZoneFileType).size > maxFileSize) return 2;

  // Ошибка по максимальной длине имени файла
  if (file.name.length > maxFileNameLength) return 6;

  // Ошибка не найдена
  return 0;
};

// Проверка на количество файлов и уже добавленные файлы
export const checkFiles = (
  props: DropZoneProps,
  state: DropZoneState,
  accepted: FileType[],
  rejected: FileType[],
): [FileType[], FileType[]] => {
  // Количество файлов, выбранных в диалоговом окне в последний раз
  const numberOfDropped = accepted.length + rejected.length;
  // Проверка отклоненных файлов
  const rejectedFiles: FileType[] = rejected.map((file): FileType => ({ ...file, errorCode: getErrorCode(props, state, file, numberOfDropped) }));

  const acceptedFiles: FileType[] = accepted.filter((file): boolean => {
    const errorCode = getErrorCode(props, state, file, numberOfDropped);
    // Если ошибки обнаружены (0 - отсутствие ошибок)
    if (errorCode !== 0) {
      const rejectedFile: FileType = file;

      (rejectedFile as DropZoneFileType).errorCode = errorCode;

      rejectedFiles.push(rejectedFile);

      return false;
    }
    // Если файла еще нет то добавляем в acceptedFiles
    return true;
  });

  return [acceptedFiles, rejectedFiles];
};

export const getRestProps = (props: DropZoneProps, underscoreClassesTransform: UnderscoreClasses): {} => {
  const {
    acceptedFilesRender,
    allowedFiles,
    className,
    dropZoneFilesNode, // не должно попасть в restProps
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
    requiredMessage,
    invalidMessageRender,
    invalidMessage,
    isRequired,
    isValid,
    shouldValidateUnmounted,
    validator,
    wrapperRender,
    ...restProps
  } = mergeClassNames(props, { underscoreClassesTransform });

  return restProps;
};

export const DescriptionMessage = (props: { children: string }): React.ReactElement => {
  const { children: message } = props;

  const shouldWrapMessage = isString(message) && message.length;

  return (shouldWrapMessage ? <Div _block-inline>{message}</Div> : message) as React.ReactElement;
};

const getError = (file: DropZoneFileType | ExternalFile): DropZoneError => (ERROR_MESSAGES.find(
  (error: DropZoneError): boolean => (file as DropZoneFileType).errorCode === error.errorCode,
)) as DropZoneError;

export const getErrorDescription = (file: DropZoneFileType | ExternalFile): string => getError(file)?.message ?? 'Неизвестная ошибка';
