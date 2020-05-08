import * as React from 'react';
import { Div } from '../Div';
import { CheckBox } from '../CheckBox';
import { getClassNames, useElement } from '../../utils';
import { defaultMultiSelectTheme } from './theme';
import { SuggestionListProps } from '../../src/SuggestionList/types';
import { selectAllSuggestion, SelectedState } from './constants';
import { COMPONENTS_NAMESPACES } from '../../constants';
import { LedaContext } from '../LedaProvider';
import { Span } from '../Span';

export const createCheckBoxesRender = ({ theme }: { theme: typeof defaultMultiSelectTheme }): SuggestionListProps['itemRender'] => ({ componentProps, Element, elementProps }) => {
  const {
    isSelected, isSelectAllItem, selectAllState, selectAllItemRender,
  } = componentProps;

  const checkBoxItemClassNames = getClassNames(
    theme.checkBoxItem,
    elementProps.className,
  );

  const checkBoxClassNames = getClassNames({
    [theme.checkBoxSemi]: isSelectAllItem && selectAllState === SelectedState.Some,
  });

  const { renders: { [COMPONENTS_NAMESPACES.multiSelect]: multiSelectRenders } } = React.useContext(LedaContext);

  const SelectAllItem = useElement(
    'SelectAllItem',
    Span,
    selectAllItemRender || multiSelectRenders.selectAllItemRender,
    {},
    {},
  );

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
      {isSelectAllItem && (
        <SelectAllItem>
          {selectAllSuggestion.text}
        </SelectAllItem>
      )}
      {!isSelectAllItem && elementProps.children}
    </Element>
  );
};
