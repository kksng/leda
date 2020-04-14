import * as React from 'react';
import { Span } from '../Span';
import { Button } from '../Button';
import { Div } from '../Div';
import { ErrorComponentProps } from './types';
import { useElement } from '../../utils';

export const ErrorComponent = (props: ErrorComponentProps) => {
  const {
    theme, handleRetry, errorMessage, customErrorLayout,
  } = props;

  const CustomError = useElement(
    'CustomError',
    Div,
    customErrorLayout,
    props,
  );

  if (customErrorLayout) {
    return <CustomError theme={theme} errorMessage={errorMessage} handleRetry={handleRetry} />;
  }

  return (
    <Div className={theme.description}>
      <Span className={theme.errorIcon} />
      <Span>
        Не удалось загрузить файл
        {errorMessage ? `. ${errorMessage}` : null}
      </Span>
      <Button className={theme.retryButton} onClick={handleRetry}>
        <Span className={theme.retryIcon} />
        {' '}
        Заменить файл
      </Button>
    </Div>
  );
};
