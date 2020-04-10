import * as React from 'react';
import { Story } from '../Story';
import { Tabs as TabsMain } from './Tabs';
import { TabsNode } from './TabsNode';
import { TabsRef } from './TabsRef';


export const Tabs = () => (
  <Story title="Tabs">
    <TabsMain title="Tabs" />
    <TabsRef title="Tabs Ref" />
    <TabsNode title="Tabs Node" />
  </Story>
);
