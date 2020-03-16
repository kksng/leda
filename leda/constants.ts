export const NO_DATA_TEMPLATES = {
  default: 'default' as const,
};

export const FILE_SIZE_UNITS = {
  byte: 'byte' as const,
  kB: 'kB' as const,
  MB: 'MB' as const,
  GB: 'GB' as const,
  TB: 'TB' as const,
};

export const FILE_SIZE_RUS_UNITS = {
  [FILE_SIZE_UNITS.byte]: 'байт' as const,
  [FILE_SIZE_UNITS.kB]: 'Кб' as const,
  [FILE_SIZE_UNITS.MB]: 'Мб' as const,
  [FILE_SIZE_UNITS.GB]: 'Гб' as const,
  [FILE_SIZE_UNITS.TB]: 'Тб' as const,
};

export const MAX_FILE_SIZE = 100 * 1024 * 1024;
export const MIN_FILE_SIZE = 0;

export const COMPONENTS_NAMESPACES = {
  autoComplete: 'autoComplete',
  button: 'button',
  buttonGroup: 'buttonGroup',
  checkBox: 'checkBox',
  collapse: 'collapse',
  collapseBody: 'collapseBody',
  collapseHeading: 'collapseHeading',
  collapsePanel: 'collapsePanel',
  currency: 'currency',
  dateTimeInput: 'dateTimeInput',
  dateTimeInputRange: 'dateTimeInputRange',
  dropDown: 'dropDown',
  dropDownLink: 'dropDownLink',
  dropDownSelect: 'dropDownSelect',
  dropZone: 'dropZone',
  fileDrop: 'fileDrop',
  fileUpload: 'fileUpload',
  input: 'input',
  loader: 'loader',
  maskedInput: 'maskedInput',
  modal: 'modal',
  modalBody: 'modalBody',
  modalFooter: 'modalFooter',
  modalHeader: 'modalHeader',
  multiSelect: 'multiSelect',
  notifications: 'notifications',
  numericRange: 'numericRange',
  numericTextBox: 'numericTextBox',
  pagination: 'pagination',
  password: 'password',
  progressBar: 'progressBar',
  radio: 'radio',
  rating: 'rating',
  slider: 'slider',
  statusBar: 'statusBar',
  stickyPanel: 'stickyPanel',
  suggestionList: 'suggestionList',
  switcher: 'switcher',
  tabs: 'tabs',
  tags: 'tags',
  textarea: 'textarea',
  tooltip: 'tooltip',
  vstepper: 'vstepper',
} as const;

/** Ошибки DropZone, FileDrop и FileUpload */
export const ERROR_MESSAGES = [
  { errorCode: 1, message: 'Файл меньше допустимого размера' },
  { errorCode: 2, message: 'Превышен максимальный размер файла' },
  { errorCode: 3, message: 'Недопустимый формат файла' },
  { errorCode: 4, message: 'Файл уже загружен' },
  { errorCode: 5, message: 'Превышено максимальное количество файлов' },
  { errorCode: 6, message: 'Превышена максимальная длина имени файла' },
];
