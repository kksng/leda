import { validate } from '../../validators';
import { NormalizedValidatorObject, PredefinedValidator } from './types';

export const PREDEFINED_VALIDATORS: Record<PredefinedValidator, NormalizedValidatorObject> = {
  cadastralNumber: {
    validator: validate.cadastralNumber,
    invalidMessage: 'Введите кадастровый номер',
  },
  email: {
    validator: validate.email,
    invalidMessage: 'Введите e-mail',
  },
  inn: {
    validator: validate.inn,
    invalidMessage: 'Введите ИНН',
  },
  innCorp: {
    validator: validate.innCorp,
    invalidMessage: 'Введите ИНН юридического лица',
  },
  innPrivate: {
    validator: validate.innPrivate,
    invalidMessage: 'Введите ИНН физического лица',
  },
  password: {
    validator: validate.password,
    invalidMessage: 'Пароль должен содержать не менее 8-и символов, латинские строчные, прописные буквы и цифры',
  },
  postalCode: {
    validator: validate.postalCode,
    invalidMessage: 'Введите почтовый индекс',
  },
  snils: {
    validator: validate.snils,
    invalidMessage: 'Введите СНИЛС',
  },
  url: {
    validator: validate.url,
    invalidMessage: 'Введите URL',
  },
  ogrn: {
    validator: validate.ogrn,
    invalidMessage: 'Введите ОГРН',
  },
  ogrnIp: {
    validator: validate.ogrnIp,
    invalidMessage: 'Введите ОГРНИП',
  },
  kpp: {
    validator: validate.kpp,
    invalidMessage: 'Введите КПП',
  },
  okpo: {
    validator: validate.okpo,
    invalidMessage: 'Введите ОКПО',
  },
};
