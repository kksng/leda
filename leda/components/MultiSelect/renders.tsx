import * as React from 'react';
import { Div } from '../Div';
import { CheckBox } from '../CheckBox';
import { getClassNames } from '../../utils';
import { defaultMultiSelectTheme } from './theme';
import { SuggestionListProps } from '../../src/SuggestionList/types';

export const createCheckBoxesRender = ({ theme }: { theme: typeof defaultMultiSelectTheme }): SuggestionListProps['itemRender'] => ({ componentProps, Element, elementProps }) => {
  const { isSelected } = componentProps;
  const checkBoxItemClassNames = getClassNames(
    theme.checkBoxItem,
    elementProps.className,
  );

  return (
    <Element {...elementProps} className={checkBoxItemClassNames}>
      <CheckBox
        value={!!isSelected}
        // заменить label на div, чтобы при клике на чекбокс фокус не переходил из мультиселекта и не закрывался список
        labelRender={({ elementProps: labelElementProps }) => <Div {...labelElementProps} />}
      />
      {elementProps.children}
    </Element>
  );
};
