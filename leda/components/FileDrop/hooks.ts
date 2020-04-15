import * as React from 'react';
import {
  CustomElements, FileDropProps, UploadButtonProps,
} from './types';
import { useElement, useProps } from '../../utils';
import { Div } from '../Div';
import { Span } from '../Span';
import { Button } from '../Button';
import { LedaContext } from '../LedaProvider';
import { COMPONENTS_NAMESPACES } from '../../constants';

export const useCustomElements = (props: FileDropProps): CustomElements => {
  const {
    customErrorRender,
    customLoadingRender,
    customSuccessRender,
    customDefaultRender,
    uploadButtonRender,
    wrapperRender,
  } = props;

  const context = React.useContext(LedaContext);

  const Wrapper = useElement(
    'Wrapper',
    Div,
    wrapperRender || context.renders[COMPONENTS_NAMESPACES.dropZone].wrapperRender,
    props,
  );

  const ErrorItem = useElement(
    'ErrorItem',
    Div,
    customErrorRender || context.renders[COMPONENTS_NAMESPACES.dropZone].errorItemRender,
    props,
  );

  const LoadingItem = useElement(
    'LoadingItem',
    Div,
    customLoadingRender || context.renders[COMPONENTS_NAMESPACES.dropZone].loadingItemRender,
    props,
  );

  const SuccessItem = useElement(
    'SuccessItem',
    Div,
    customSuccessRender || context.renders[COMPONENTS_NAMESPACES.dropZone].successItemRender,
    props,
  );

  const DefaultItem = useElement(
    'DefaultItem',
    Div,
    customDefaultRender || context.renders[COMPONENTS_NAMESPACES.dropZone].defaultItemRender,
    props,
  );

  const UploadButton = useElement<FileDropProps, {}, UploadButtonProps>(
    'UploadButton',
    Button,
    uploadButtonRender || context.renders[COMPONENTS_NAMESPACES.dropZone].uploadButtonRender,
    props,
  );

  return {
    UploadButton,
    Wrapper,
    ErrorItem,
    LoadingItem,
    SuccessItem,
    DefaultItem,
  };
};

export const useFileDropRestProps = (props: FileDropProps): {} => {
  const {
    // не должно попасть в restProps
    acceptedFilesRender,
    allowedFiles,
    className,
    dropZoneFilesNode,
    forbiddenFiles,
    customErrorRender,
    customLoadingRender,
    customSuccessRender,
    customDefaultRender,
    invalidMessage,
    invalidMessageRender,
    isDisabled,
    isLoading,
    isRequired,
    isValid,
    loadingData,
    loadingProgress,
    maxFileNameLength,
    maxFileSize,
    maxFilesNumber,
    minFileSize,
    onChange,
    onDrop,
    onRemove,
    rejectedFilesRender,
    requiredMessage,
    shouldValidateUnmounted,
    theme,
    uploadButtonRender,
    validator,
    value,
    // конец того, что не должно попасть в restProps
    ...restProps
  } = useProps(props);

  return restProps;
};
