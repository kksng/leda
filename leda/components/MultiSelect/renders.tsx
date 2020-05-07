import * as React from 'react';
import { Div } from '../Div';
import { CheckBox } from '../CheckBox';
import { getClassNames } from '../../utils';
import { defaultMultiSelectTheme } from './theme';
import { SuggestionListProps } from '../../src/SuggestionList/types';
import { selectAllSuggestion, SelectedState } from './constants';

export const createCheckBoxesRender = ({ theme }: { theme: typeof defaultMultiSelectTheme }): SuggestionListProps['itemRender'] => ({ componentProps, Element, elementProps }) => {
  const {
    isSelected, isSelectAllItem, selectAllState, selectAllItem,
  } = componentProps;
  const checkBoxItemClassNames = getClassNames(
    theme.checkBoxItem,
    elementProps.className,
  );

  const checkBoxClassNames = getClassNames({
    [theme.checkBoxSemi]: isSelectAllItem && selectAllState === SelectedState.Some,
  });

  const isCheckBoxSelected = (() => {
    if (isSelectAllItem) {
      if (selectAllState === SelectedState.Nothing) return false;
      return true;
    }
    return !!isSelected;
  })();

  return (
    <Element {...elementProps} className={checkBoxItemClassNames}>
      <CheckBox
        value={isCheckBoxSelected}
        // заменить label на div, чтобы при клике на чекбокс фокус не переходил из мультиселекта и не закрывался список
        labelRender={({ elementProps: labelElementProps }) => <Div {...labelElementProps} />}
        className={checkBoxClassNames}
      />
      {isSelectAllItem ? (selectAllItem ?? selectAllSuggestion.text) : elementProps.children}
    </Element>
  );
};
