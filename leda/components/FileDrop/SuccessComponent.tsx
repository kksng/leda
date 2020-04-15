import * as React from 'react';
import { SingleFileViewProps } from './types';
import { Span } from '../Span';
import { Button } from '../Button';


export const SuccessComponent = (props: SingleFileViewProps) => {
  const {
    theme,
    downloadLink,
    handleRetry,
    SuccessItem,
  } = props;

  return (
    <SuccessItem className={theme.description}>
      <Span className={theme.successIcon} />
      <Span>
        Файл
        {' '}
        {downloadLink}
        {' '}
        успешно загружен
      </Span>
      <Button className={theme.retryButton} onClick={handleRetry}>
        <Span className={theme.retryIcon} />
        {' '}
        Заменить файл
      </Button>
    </SuccessItem>
  );
};
