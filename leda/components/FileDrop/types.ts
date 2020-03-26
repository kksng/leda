import * as React from 'react';
import { CustomRender, CustomEventHandler } from '../../commonTypes';
import { GlobalDefaultTheme, PartialGlobalDefaultTheme } from '../../utils/useTheme';
import { COMPONENTS_NAMESPACES } from '../../constants';
import { ValidationProps } from '../Validation/types';

export interface FileType extends File {
  /** Код ошибки, подробнее можно посмотреть в leda/constants.ts */
  errorCode?: number,
  /** Сообщение об ошибке */
  errorMessage?: string,
  /** Дата последнего изменения */
  lastModified: number,
  /** Ссылка на скачивание файла. При наличии, файл будет отображен в списке, как скачиваемый */
  link?: string,
  /** Имя файла. Необходимо для отображения в списке и удаления */
  name: string,
  /** Синоним имени файла. Необходимо для отображения в списке и удаления */
  path?: string,
  /** Предварительный просмотр */
  preview?: string,
  /** Тип файла */
  type: string,
}

export interface ChangeEvent {
  component: {
    value: FileType | null,
  },
}

export interface LoadingData {
  error?: Error | null,
  loaded: number,
  total: number,
}

export interface FileDropProps extends ValidationProps {
  /** Разрешенные типы файлов, см. https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input#Attributes. Передача нескольких типов файлов происходит через запятую (.png, image/jpeg). allowedFiles и forbiddenFiles вместе не могут находиться. */
  allowedFiles?: string,
  /** Классы, применяемые к компоненту */
  className?: string,
  /** Список загруженных файлов */
  value: FileType | null,
  /** Запрещенные типы файлов. см. https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input#Attributes. Передача нескольких типов файлов происходит через запятую (.png, image/jpeg). allowedFiles и forbiddenFiles вместе не могут находиться. */
  forbiddenFiles?: string,
  /** Кастомизация описания компонента */
  infoRender?: CustomRender<FileDropProps, {}, InfoProps>,
  /** Признак отключения дропзоны */
  isDisabled?: boolean,
  /** Данные о загрузке, используется для отображения прогресса, чтобы получить эти данные используйте XMLHTTPRequest */
  loadingData?: LoadingData | null,
  /* Максимальная длина имени файла, по-умолчанию 255 символов */
  maxFileNameLength?: number,
  /** Максимальный размер файла, в байтах */
  maxFileSize?: number,
  /** Минимальный размер файла, в байтах */
  minFileSize?: number,
  /** Функция обратного вызова для метода onChange */
  onChange: (event: ChangeEvent) => void,
  /** Функция-обработчик onClick */
  onClick?: (event: React.MouseEvent) => void,
  /** Реф */
  ref?: React.Ref<FileDropRefCurrent>,
  /** Тема для компонента */
  theme?: PartialGlobalDefaultTheme[typeof COMPONENTS_NAMESPACES.fileDrop],
  /** Текст кнопки загрузки файла, может принимать JSX */
  uploadButtonRender?: CustomRender<FileDropProps, {}, UploadButtonProps>,
  /** Кастомизация враппера */
  wrapperRender?: CustomRender<FileDropProps, {}, WrapperProps>,
  /** Классы переданные через _ */
  [x: string]: unknown,
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
  ref: React.Ref<FileDropRefCurrent>,
}

export interface CustomElements {
  Info: React.FC<InfoProps>,
  UploadButton: React.FC<UploadButtonProps>,
  Wrapper: React.FC<WrapperProps>,
}

export interface FileDropError {
  message: string,
  errorCode: number,
}

export interface ChangeEventHandler {
  (
    accepted: FileType[],
    rejected: FileType[],
    ev?: React.DragEvent<HTMLDivElement> | React.MouseEvent<HTMLAnchorElement>,
    removedFile?: FileType
  ): void,
}

export interface FileDropRefCurrent {
  wrapper: HTMLElement | null,
  input: HTMLInputElement | null,
}

export interface ProgressLoaderProps {
  loadingData?: LoadingData | null,
  isLoading: boolean,
  theme: GlobalDefaultTheme[typeof COMPONENTS_NAMESPACES.fileDrop],
}

export interface SingleFileViewProps extends FileDropProps {
  theme: GlobalDefaultTheme[typeof COMPONENTS_NAMESPACES.fileDrop],
  value: FileDropProps['value'],
  UploadButton: React.FC<UploadButtonProps>,
  Info: React.FC<InfoProps>,
  handleRetry: CustomEventHandler<React.MouseEvent<HTMLElement>>,
}
