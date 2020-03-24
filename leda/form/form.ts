import { isString } from 'lodash';
import * as helpers from './helpers';
import * as Types from './types';

const validate = (
  field: Types.Field, validatorWrappers?: Types.ValidatorWrapper[] | Types.ValidatorWrapper,
): Types.Field => {
  const invalidMessages: string[] = [];
  const unifiedValidatorWrappers = ((): Types.ValidatorWrapper[] => {
    if (field.isRequired) {
      return [{
        validator: helpers.checkIsFilled,
        invalidMessage: field.requiredMessage,
      }];
    }
    if (field.value == null || field.value.length === 0) {
      return [];
    }
    if (validatorWrappers == null) {
      return field.validators;
    }
    if (!Array.isArray(validatorWrappers)) {
      return [validatorWrappers];
    }
    return validatorWrappers;
  })().map(helpers.unifyValidatorWrapper);
  unifiedValidatorWrappers.forEach((unifiedValidatorWrapper) => {
    if (!unifiedValidatorWrapper.validate(field.value)) {
      field.isValid = false;
      if (unifiedValidatorWrapper.invalidMessage) {
        invalidMessages.push(unifiedValidatorWrapper.invalidMessage);
      }
    }
  });
  if (!field.isValid) {
    field.invalidMessages = invalidMessages;
  }
  field.setIsValid(field.isValid);
  field.setMessages(field.invalidMessages);
  return field;
};

const getFormFieldHelpers = (formName: string, fieldName: string): Types.FormFieldHelpers => {
  const getField = () => helpers.getField(formName, fieldName);
  return {
    get: getField,
    reset: () => {
      const field = getField();
      try {
        field?.reset();
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        return false;
      }
      return true;
    },
    validate: (wrappedValidator) => {
      const field = getField();
      if (field == null) {
        return undefined;
      }
      return validate(field, wrappedValidator);
    },
  };
};

const getFormFieldsHelpers = (formName: string, fieldNames?: string[]): Types.FormFieldsHelpers => {
  const getFields = () => helpers.getFields(formName, fieldNames);
  return {
    get: getFields,
    reset: () => {
      const fields = getFields();
      try {
        fields.forEach((field) => {
          field?.reset();
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        return false;
      }
      return true;
    },
    validate: () => {
      const fields = getFields();
      return fields.map((field: Types.Field) => validate(field));
    },
  };
};

const form: {
  (name: string, field: string): Types.FormFieldHelpers,
  (name: string, fields?: string[]): Types.FormFieldsHelpers,
} = (formName: string, fieldPick?: string | string[]): any => {
  if (isString(fieldPick)) {
    return getFormFieldHelpers(formName, fieldPick);
  }
  return getFormFieldsHelpers(formName, fieldPick);
};

export {
  form,
};
