import * as React from 'react';
import { Story } from '../Story';

import { BasicUsage } from './BasicUsage';
import { Required } from './Required';
import { Form } from './Form';
import { InvalidMessage } from './InvalidMessage';
import { IsValid } from './IsValid';
import { PredefinedValidator } from './PredefinedValidator';
import { Validator } from './Validator';
import { ShouldValidateUnmounted } from './ShouldValidateUnmounted';
import { ValidationMessageRender } from './ValidationMessageRender';
import { Submit } from './Submit';
import { Scroll } from './Scroll';
import { TriggerValidation } from './TriggerValidation';
import { RequiredSubmit } from './RequiredSubmit';
import { FormControlled } from './FormControlled';
import { FormUncontrolled } from './FormUncontrolled';
import { MixedValidation } from './MixedValidation';
import { Refactoring } from './Refactoring';
import { IsRequired } from './IsRequired';

export const Validation = () => (
  <>
    <Story title="Validation various">
      <BasicUsage title="Playground" />
      <IsRequired title="isRequired changes" />
    </Story>
    <Story title="Валидация">
      <FormUncontrolled title="reset uncontrolled" />
      <FormControlled title="reset controlled" />
      <Required title="isRequired" />
      <Form title="form" />
      <Validator title="validator" />
      <PredefinedValidator title="predefined validator" />
      <InvalidMessage title="invalid message" />
      <Submit title="submit" />
      <Scroll title="scroll" />
      <ValidationMessageRender title="custom validation message" />
    </Story>
    <Story title="Валидация - упоротые кейсы">
      <Refactoring title="Refactoring" />
      <IsValid title="outer isValid" />
      <ShouldValidateUnmounted title="validate unmounted" />
      <TriggerValidation title="trigger validation" />
      <RequiredSubmit title="All required and invalid" />
      <MixedValidation title="Mixed validation" />
    </Story>
  </>
);
