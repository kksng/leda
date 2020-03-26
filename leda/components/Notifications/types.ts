import * as React from 'react';
import { GlobalDefaultTheme, PartialGlobalDefaultTheme } from '../../utils/useTheme';
import { COMPONENTS_NAMESPACES } from '../../constants';
import { CustomRender } from '../../commonTypes';
import { DivProps } from '../Div';
import { ChangeMethods } from './constants';

export interface Item {
  // текст, можно использовать html
  text: string,
  // по умолчанию 5000 мс, чтобы уведомление не закрывалось по timeout - передайте 0
  delay?: number,
  id: string | number,
  className?: string,
  iconClassName?: string,
  // можно передать любые дополнительные данные
  [x: string]: unknown,
}

// todo: extend ChangeEvent
export interface ChangeEvent {
  component: {
    value: Item[],
    name?: string,
    method: ChangeMethods,
  },
}

export interface NotificationItemProps {
  /** Объект с уведомлением */
  item: Item,
  /** Кастомизация иконки */
  iconRender?: CustomRender<NotificationItemProps, {}, DivProps>,
  /** Кастомизация кнопки внутри оповещения, по-умолчанию не отображается */
  actionButtonRender?: CustomRender<NotificationItemProps, {}, React.PropsWithChildren<{}>>,
  /** Обработчик изменения, срабатывает при клике по крестику или по таймауту */
  onChange: (item: Item, method: ChangeMethods) => void,
  /** Сообщение внутри оповещения. Принимается функция. */
  contentRender?: CustomRender<NotificationItemProps, {}, DivProps>,
  /** Тема компонента */
  theme: GlobalDefaultTheme[typeof COMPONENTS_NAMESPACES.notifications],
}

export interface NotificationsProps {
  /** Сообщение внутри оповещения. Принимается функция. */
  contentRender?: CustomRender<NotificationItemProps, {}, DivProps>,
  /** Кастомизация иконки */
  iconRender?: CustomRender<NotificationItemProps, {}, DivProps>,
  /** Кастомизация кнопки внутри оповещения, по-умолчанию не отображается */
  actionButtonRender?: CustomRender<NotificationItemProps, {}, React.PropsWithChildren<{}>>,
  /** Уведомления, если передано больше, чем maxItems - отображаются в порядке очереди */
  value: Item[],
  /** Максимальное количество оповещений на экране, по-умолчанию 3 */
  maxItems?: number,
  /** Реф */
  ref?: React.Ref<NotificationRefCurrent>,
  /** Обработчик изменения, срабатывает при клике по крестику или по таймауту  */
  onChange: (event: ChangeEvent) => void,
  /** Тема компонента */
  theme?: PartialGlobalDefaultTheme[typeof COMPONENTS_NAMESPACES.notifications],
  /** Классы, переданные через _ */
  [x: string]: unknown,
}

export interface NotificationRefCurrent {
  wrapper: HTMLElement | null,
}
