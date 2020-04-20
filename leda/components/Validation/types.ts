/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { CustomRender, SetState } from '../../commonTypes';

export interface ValidationProps {
  form?: string,
  name?: string,
  isRequired?: boolean,
  isValid?: boolean,
  value?: any,
  validator?: Validator | PredefinedValidator | RegExp | ValidatorObject[],
  invalidMessage?: string,
  requiredMessage?: string,
  shouldValidateUnmounted?: boolean,
  invalidMessageRender?: CustomRender<ValidationProps, ValidationState, InvalidMessageProps>,
}

export interface ValidationButtonProps {
  form?: string | string[],
}

export interface Validator {
  (value: any): boolean,
}

export interface ValidatorObject {
  validator: string | RegExp | Validator,
  invalidMessage?: string,
}

export interface NormalizedValidatorObject extends ValidatorObject {
  validator: Validator,
}

export interface ValidationState {
  value?: any,
}

// результат - isValid, validateField, validateForm
export interface ValidationResult {
  isValid: boolean,
  validateCurrent: (value?: any) => boolean,
  InvalidMessage: React.FC<{}>,
}

export interface Field {
  name: string,
  isValid: boolean,
  value: any,
  shouldValidateUnmounted: boolean,
  setIsValid: SetState<boolean>,
  setMessages: SetState<string[] | undefined>,
  validators: NormalizedValidatorObject[],
  invalidMessages?: string[],
  requiredMessage?: string,
  isRequired: boolean,
  reset: () => void,
}

export interface Form {
  name: string,
  fields: Field[],
}

export interface FormsObject {
  [formName: string]: {
    [fieldName: string]: Field,
  },
}

export interface InvalidMessageProps {
  isValid: boolean,
  messages?: string[],
}

export type PredefinedValidator =
  | 'cadastralNumber'
  | 'email'
  | 'inn'
  | 'innCorp'
  | 'innPrivate'
  | 'password'
  | 'postalCode'
  | 'snils'
  | 'url'
  | 'ogrn'
  | 'ogrnIp'
  | 'kpp'
  | 'okpo';

export interface AddFieldData {
  formName: string,
  fieldName: string,
  value: unknown,
  setIsValid: SetState<boolean>,
  setMessages: SetState<string[] | undefined>,
  shouldValidateUnmounted?: boolean,
  validators: NormalizedValidatorObject[],
  isRequired?: boolean,
  requiredMessage?: string,
  reset: () => void,
}

export interface UpdateFieldData {
  formName: string,
  fieldName: string,
  value: unknown,
  isValidProp?: boolean,
  isRequired?: boolean,
  requiredMessage?: string,
  shouldValidateUnmounted?: boolean,
  validators: NormalizedValidatorObject[],
}

export interface ValidationExtra {
  reset: () => void,
}

export interface RemoveFieldOptions {
  shouldRemoveUnmounted?: boolean,
}
