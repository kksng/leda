import * as React from 'react';
import { isFunction } from 'lodash';
import { SetState } from '../../commonTypes';
import { PasswordProps } from './types';

export const useReset = (
  props: PasswordProps,
  setValue: SetState<string>,
) => React.useCallback(() => {
  const newValue = props.defaultValue || '';

  setValue(newValue);

  if (isFunction(props.onChange)) {
    const newEvent = {
      component: {
        name: props.name,
        value: newValue,
      },
    };

    props.onChange(newEvent);
  }
}, [props, setValue]);
