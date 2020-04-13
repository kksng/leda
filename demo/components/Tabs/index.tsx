import * as React from 'react';
import { Story } from '../Story';
import { Tabs as TabsMain } from './Tabs';
import { TabsNode } from './TabsNode';

export const Tabs = () => (
  <Story title="Tabs">
    <TabsMain title="Tabs" />
    <TabsNode title="Tabs Node" />
  </Story>
);
