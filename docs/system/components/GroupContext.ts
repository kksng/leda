import * as React from 'react';

export interface GroupContextContent {
  groupNames: string[],
}

export const GroupContext = React.createContext<GroupContextContent>({
  groupNames: [],
});
