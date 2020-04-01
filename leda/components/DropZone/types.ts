import * as React from 'react';
import { CustomRender, CustomEventHandler } from '../../commonTypes';
import { PartialGlobalDefaultTheme } from '../../utils/useTheme';
import { COMPONENTS_NAMESPACES } from '../../constants';
import { globalDefaultTheme } from '../LedaProvider';
import { ValidationProps } from '../Validation/types';

export { FileErrorCodes } from '../../constants';

export interface ExternalFile {
  /** Имя файла. Необходимо для отображения в списке и удаления */
  name: string,
  /** Ссылка на скачивание файла. При наличии, файл будет отображен в списке, как скачиваемый */
  link?: string,
  /** Синоним имени файла. Необходимо для отображения в списке и удаления */
  path?: string,
  /** Тип файла */
  type?: string,
}

export interface DropZoneFileType extends File {
  path?: string,
  preview?: string,
  lastModified: number,
  errorCode?: number,
}

export type FileType = ExternalFile | DropZoneFileType;

export interface ChangeEvent {
  component: {
    dropped: {
      acceptedFiles: FileType[],
      rejectedFiles: FileType[],
    },
    value: {
      acceptedFiles: FileType[],
      rejectedFiles: FileType[],
    },
    removedFile?: FileType,
  },
}

export interface DropZoneProps extends ValidationProps {
  /** Отображение добавленных файлов */
  acceptedFilesRender?: CustomRender<DropZoneProps, DropZoneState, AcceptedFilesProps>,
  /** Разрешенные типы файлов, см. https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input#Attributes. Передача нескольких типов файлов происходит через запятую (.png, image/jpeg). allowedFiles и forbiddenFiles вместе не могут находиться. */
  allowedFiles?: string,
  /** Классы, применяемые к компоненту */
  className?: string,
  /** DOM-нода в которой будет отрендерен список файлов */
  dropZoneFilesNode?: Element,
  /** Список загруженных файлов */
  value?: {
    acceptedFiles: ExternalFile[],
    rejectedFiles: ExternalFile[],
  },
  /** Запрещенные типы файлов. см. https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input#Attributes. Передача нескольких типов файлов происходит через запятую (.png, image/jpeg). allowedFiles и forbiddenFiles вместе не могут находиться. */
  forbiddenFiles?: string,
  /** Кастомизация описания компонента */
  infoRender?: CustomRender<DropZoneProps, DropZoneState, InfoProps>,
  /** Признак отключения дропзоны */
  isDisabled?: boolean,
  /* Максимальная длина имени файла, по-умолчанию 255 символов */
  maxFileNameLength?: number,
  /** Максимальное количество файлов */
  maxFilesNumber?: number,
  /** Максимальный размер файла, в байтах */
  maxFileSize?: number,
  /** Минимальный размер файла, в байтах */
  minFileSize?: number,
  /** Функция обратного вызова для метода onChange */
  onChange?: (event: ChangeEvent) => void,
  /** Отображение отклоненных файлов */
  rejectedFilesRender?: CustomRender<DropZoneProps, DropZoneState, RejectedFilesProps>,
  ref?: React.Ref<DropZoneRefCurrent>,
  /* Тема для компонента */
  theme?: PartialGlobalDefaultTheme[typeof COMPONENTS_NAMESPACES.dropZone],
  /** Текст кнопки загрузки файла, может принимать JSX */
  uploadButtonRender?: CustomRender<DropZoneProps, DropZoneState, UploadButtonProps>,
  /** Кастомизация враппера */
  wrapperRender?: CustomRender<DropZoneProps, DropZoneState, WrapperProps>,
  /** Классы переданные через _ */
  [x: string]: unknown,
}

export interface DropZoneState {
  /* список принятых файлов */
  acceptedFiles: DropZoneFileType[],
  /* список файлов, не прошедших валидацию по типу или размеру */
  rejectedFiles: DropZoneFileType[],
}

export interface AcceptedFilesProps {
  children?: React.ReactNode,
  dropZoneFilesNode?: Element,
  onChange?: ChangeEventHandler,
}

export interface RejectedFilesProps {
  children?: React.ReactNode,
  className?: string,
}

export interface UploadButtonProps {
  children?: React.ReactNode,
  className?: string,
  onClick?: CustomEventHandler<React.MouseEvent>,
  [x: string]: unknown,
}

export interface InfoProps {
  children?: React.ReactNode,
  className?: string,
}

export interface WrapperProps {
  children?: React.ReactNode,
  className?: string,
  ref: React.Ref<DropZoneRefCurrent>,
}

export interface CustomElements {
  AcceptedFiles: React.FC<AcceptedFilesProps>,
  RejectedFiles: React.FC<RejectedFilesProps>,
  Info: React.FC<InfoProps>,
  UploadButton: React.FC<UploadButtonProps>,
  Wrapper: React.FC<WrapperProps>,
}

export interface DropZoneFilesProps {
  /** Массив файлов, который будет отображен в виде списка */
  files: ExternalFile[],
  /** Обработчик удаления файла */
  onChange: (
    acceptedFiles: ExternalFile[] | DropZoneFileType[],
    rejectedFiles: ExternalFile[] | DropZoneFileType[],
    ev: React.DragEvent<HTMLDivElement> | React.MouseEvent<HTMLAnchorElement>,
    removedFile: ExternalFile | DropZoneFileType
  ) => void,
  /** Флаг обозначающий нужно ли отображать файлы */
  shouldRender: boolean,
  /** Принятые и отклоненные файлы */
  value: DropZoneState | NonNullable<DropZoneProps['value']>,
  /** Тема компонента */
  theme: typeof globalDefaultTheme[typeof COMPONENTS_NAMESPACES.dropZone],
}

export interface DropZoneError {
  message: string,
  errorCode: number,
}

export interface RejectedFilesListProps {
  theme: typeof globalDefaultTheme[typeof COMPONENTS_NAMESPACES.dropZone],
  value: DropZoneState | NonNullable<DropZoneProps['value']>,
  maxFilesNumber?: number,
}

export interface ChangeEventHandler {
  (
    accepted: FileType[],
    rejected: FileType[],
    ev?: React.DragEvent<HTMLElement> | React.MouseEvent<HTMLElement>,
    removedFile?: FileType
  ): void,
}

export interface DropZoneRefCurrent {
  wrapper: HTMLElement | null,
  input: HTMLInputElement | null,
}
