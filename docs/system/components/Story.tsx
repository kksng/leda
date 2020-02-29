import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { GroupContext } from './GroupContext';
import * as L from '../../../leda';
import { MainContext } from './MainContext';

export interface StoryProps {
  name: string,
  children?: React.ReactNode | React.ReactNode[],
  url: string,
}

export const Story = (props: StoryProps): React.ReactElement => {
  const { name, url } = props;

  const { groupNames } = React.useContext(GroupContext);
  const { setStoryContext, lang } = React.useContext(MainContext);

  React.useEffect((): void => {
    console.log('effect');
    setStoryContext(url, groupNames);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  return (
    <L.Li className={`level-${groupNames.length}`}>
      <NavLink to={url} exact>
        {name}
      </NavLink>
    </L.Li>
  );
};

Story.displayName = 'Story';
