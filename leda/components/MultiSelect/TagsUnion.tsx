import * as React from 'react';
import { TagsUnionProps } from './types';
import { Div } from '../Div';

export const TagsUnion = (props: TagsUnionProps): React.ReactElement | null => {
  const { value, theme } = props;

  return (
    <Div className={theme.tagsUnion}>
      Выбрано {value.length}
    </Div>
  );
};

TagsUnion.displayName = 'TagsUnion';
