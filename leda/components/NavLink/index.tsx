import React from 'react';
import {
  NavLink as Link, Route, match,
} from 'react-router-dom';
import { A as LedaLink } from '../A';
import { Li } from '../Li';
import {
  bindFunctionalRef, getClassNames, useElement, useProps,
} from '../../utils';
import { getLocationPath } from './helpers';
import { NavLinkProps, NavLinkRefCurrent } from './types';

export const NavLink = React.forwardRef((props: NavLinkProps, ref?: React.Ref<NavLinkRefCurrent>): React.ReactElement | null => {
  const {
    activeClassName = 'active',
    children,
    className,
    dropDownRender,
    isHidden,
    iconRender,
    isActive: getIsActive,
    isExact,
    isExternal,
    isStrict,
    location = getLocationPath(),
    target,
    href,
  } = useProps<NavLinkProps>(props);

  // Regex taken from: https://github.com/pillarjs/path-to-regexp/blob/master/index.js#L202
  const path = href && href.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1');
  const Icon = useElement(
    'Icon',
    React.Fragment,
    iconRender,
    props,
  );

  const DropDown = useElement(
    'DropDown',
    React.Fragment,
    dropDownRender,
    props,
  );

  if (isHidden) return null;

  return (
    <Route
      path={path}
      exact={isExact}
      strict={isStrict}
      location={{
        pathname: location, state: '', hash: '', search: '',
      }}
    >
      {({ location: routeLocation, match: routeMatch }) => {
        const isActive = (getIsActive ? getIsActive(routeLocation, routeMatch as match<{}>) : getLocationPath() === href);

        const listItemClassNames = getClassNames(
          className,
          {
            [activeClassName]: isActive,
          },
        );

        return (
          <Li
            _level-1
            _dropdown={!!dropDownRender}
            className={listItemClassNames}
            ref={ref && ((component) => bindFunctionalRef(component, ref, component && {
              wrapper: component.wrapper,
            }))}
          >
            {isExternal
              ? (
                <LedaLink
                  href={href}
                  target={target || '_blank'}
                >
                  {children}
                </LedaLink>
              ) : (
                <Link
                  to={href}
                  target={target}
                >
                  {children}
                  &nbsp;
                  <Icon />
                </Link>
              )}
            <DropDown />
          </Li>
        );
      }}
    </Route>
  );
}) as React.FC<NavLinkProps>;

NavLink.displayName = 'NavLink';
