import * as React from 'react';
import { MainContext } from '../../../../system/components/MainContext';
import { Langs } from '../../../../lang/types';
import { En } from './En';
import { Ru } from './Ru';

export const StatusBarApi = (): React.ReactElement => {
  const { lang } = React.useContext(MainContext);

  switch (lang.langName) {
    case Langs.En:
      return <En />;
    case Langs.Ru:
      return <Ru />;
    default:
      return <En />;
  }
};

StatusBarApi.displayName = 'StatusBarApi';
