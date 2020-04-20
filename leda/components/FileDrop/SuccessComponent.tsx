import * as React from 'react';
import { SuccessComponentProps } from './types';
import { Span } from '../Span';
import { Button } from '../Button';


export const SuccessComponent = (props: SuccessComponentProps) => {
  const {
    theme,
    downloadLink,
    handleRetry,
    SuccessItem,
    combinedButtonClassNames,
    isDisabled,
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
      <Button
        className={combinedButtonClassNames}
        onClick={handleRetry}
        isDisabled={isDisabled}
      >
        <Span className={theme.retryIcon} />
        {' '}
        Заменить файл
      </Button>
    </SuccessItem>
  );
};
