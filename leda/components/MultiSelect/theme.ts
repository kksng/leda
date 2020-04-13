/* eslint-disable key-spacing */
import { defaultSuggestionListTheme } from '../../src/SuggestionList/theme';

export const defaultMultiSelectTheme = {
  clearIcon:                 'multiselect-clear-icon',
  input:                     'multiselect-input',
  inputFocused:              'focused',
  inputWrapper:              'multiselect-input-wrapper',
  inputWrapperFocused:       'focused',
  inputWrapperDisabled:      'disabled',
  inputWrapperInvalid:       'danger',
  inputWrapperRequired:      'required',
  wrapper:                   'multiselect-wrapper',
  tagsContainer:             'multiselect-tags-container',
  tagsUnion:                 'multiselect-tags-union',
  /** SuggestionList theme */
  ...defaultSuggestionListTheme,
};
