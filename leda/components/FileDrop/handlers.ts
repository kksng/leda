import * as React from 'react';
import { DropzoneRef } from 'react-dropzone';
import { checkFiles } from './helpers';
import {
  ChangeEventHandler, FileDropProps, FileType,
} from './types';

export const createClickHandler = (
  { onClick, isDisabled }: FileDropProps,
  ref: React.MutableRefObject<DropzoneRef | null>,
): React.MouseEventHandler => (ev: React.MouseEvent<HTMLDivElement>): void => {
  if (!isDisabled && (ev.target as HTMLElement).tagName === 'BUTTON') ref.current?.open();

  onClick?.(ev);
};


export const createChangeHandler = (
  props: FileDropProps,
): ChangeEventHandler => (
  accepted,
  rejected,
  ev,
): FileType => {
  const { onChange } = props;

  // В обработчик передаем только те принятые файлы, которые еще не были добавлены
  const checkedFile = checkFiles(props, accepted, rejected);

  const customEvent = {
    ...ev,
    component: {
      value: checkedFile,
    },
  };

  onChange?.(customEvent);

  return checkedFile;
};

export const createRetryHandler = (props: FileDropProps) => (ev: React.MouseEvent<HTMLElement>): void => {
  const { onChange } = props;

  ev.stopPropagation();

  const customEvent = {
    ...ev,
    component: {
      value: null,
    },
  };

  onChange?.(customEvent);
};
