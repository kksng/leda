import * as React from 'react';
import { MainContext } from '../../../system/components/MainContext';
import { Langs } from '../../../lang/types';
import { Ru } from './Ru';
import { En } from './En';

export const Concept = (): React.ReactElement => {
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

Concept.displayName = 'Concept';
