import {
  Form, Field, PredefinedValidator,
} from '../components/Validation/types';

export {
  Form, Field,
};

export interface FunctionalValidator {
  (value: any): boolean,
}

export type Validator = FunctionalValidator | PredefinedValidator | RegExp;

export type InvalidMessage = string;

export interface SingleFunctionValidator {
  validate: FunctionalValidator,
  invalidMessage?: InvalidMessage,
}

export interface ExternalValidator {
  validator: Validator | Validator[],
  invalidMessage?: string,
}

export interface FormFieldHelpers {
  get: () => Field | undefined,
  reset: () => boolean,
  validate: (warpedValidator?: ExternalValidator | ExternalValidator[]) => Field | undefined,
}

export interface FormFieldsHelpers {
  get: () => Field[],
  reset: () => boolean,
  validate: () => Field[],
}
