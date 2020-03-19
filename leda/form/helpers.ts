import {
  isFunction, isString, isRegExp,
} from 'lodash';
import { PREDEFINED_VALIDATORS } from '../components/Validation/predefinedValidators';
import * as Types from './types';

export const getForm = (name: string): Types.Form | undefined => {
  // @ts-ignore
  const forms: Types.Form[] = window[Symbol.for('leda/validation-forms')] || [];
  return forms.find(({
    name: formName,
  }) => name === formName);
};

const getFormFields = (formName: string): Types.Field[] => getForm(formName)?.fields ?? [];

export const pickField = (
  fields: Types.Field[], fieldName: string,
): Types.Field | undefined => fields.find((formField: Types.Field) => fieldName === formField.name);

export const getField = (formName: string, fieldName: string): Types.Field | undefined => {
  const fields = getFormFields(formName);
  return pickField(fields, fieldName);
};

export const getFields = (formName: string, fieldNames?: string[]): Types.Field[] => {
  const fields = getFormFields(formName);
  if (fieldNames) {
    return fieldNames.reduce<Types.Field[]>((accumulator, fieldName: string) => {
      const field = pickField(fields, fieldName);
      if (field) {
        accumulator.push(field);
      }
      return accumulator;
    }, []);
  }
  return fields;
};

export const unifyValidatorWrapper = (validatorWrapper: Types.ValidatorWrapper): Types.UnifiedValidatorWrapper => {
  const {
    validator,
  } = validatorWrapper;
  const unifiedValidatorWrapper: Types.UnifiedValidatorWrapper = {
    validate: () => true,
  };
  if (Array.isArray(validator)) {
    unifiedValidatorWrapper.validate = (value) => validator.every((element) => {
      const validate = unifyValidatorWrapper({
        validator: element,
      });
      return validate.validate(value);
    });
  } else if (isFunction(validator)) {
    unifiedValidatorWrapper.validate = validator;
  } else if (isRegExp(validator)) {
    unifiedValidatorWrapper.validate = (value: string) => value.match(validator) != null;
  } else if (isString(validator)) {
    const predefinedValidator = PREDEFINED_VALIDATORS[validator];
    unifiedValidatorWrapper.validate = predefinedValidator.validator;
    if (validatorWrapper.invalidMessage == null && predefinedValidator.invalidMessage) {
      unifiedValidatorWrapper.invalidMessage = predefinedValidator.invalidMessage;
    }
  }
  if (unifiedValidatorWrapper.invalidMessage == null && validatorWrapper.invalidMessage) {
    unifiedValidatorWrapper.invalidMessage = validatorWrapper.invalidMessage;
  }
  return unifiedValidatorWrapper;
};
