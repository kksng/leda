import * as React from 'react';
import { SetState } from '../../commonTypes';
import { InputProps } from './types';

export const useReset = (
  props: InputProps,
  setValue: SetState<string>,
) => React.useCallback(() => {
  const newValue = props.defaultValue || '';

  setValue(newValue);

  props.onChange?.({
    component: {
      name: props.name,
      value: newValue,
    },
  });
}, [props, setValue]);
