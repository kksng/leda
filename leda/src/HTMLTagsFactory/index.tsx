import * as React from 'react';
import { bindFunctionalRef, mergeClassNames } from '../../utils';
import { LedaContext } from '../../components/LedaProvider';

export const htmlTagFactory = (tagName: string): React.ForwardRefExoticComponent<React.RefAttributes<unknown>> => {
  const tagComponent = React.forwardRef(<P, R>(props: P, ref: React.Ref<R>): React.ReactElement => {
    const { underscoreClassesTransform } = React.useContext(LedaContext);
    const newProps = mergeClassNames(props, { underscoreClassesTransform });

    const ElementName = tagName.toLowerCase() as React.ElementType;

    return (
      <ElementName
        {...newProps}
        ref={ref && ((component: {}) => bindFunctionalRef(component, ref, component && {
          wrapper: component,
        }))}
      />
    );
  });

  tagComponent.displayName = tagName;

  return tagComponent;
};
