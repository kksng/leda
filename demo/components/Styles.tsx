import * as React from 'react';

export const Styles = (props: {
  theme?: string,
}): React.ReactElement | null => {
  React.useEffect((): void => {
    const prestyles = document.getElementById('prestyles');

    if (prestyles) {
      prestyles.innerHTML = '';
    }
  }, []);

  if (props.theme === 'Nova') {
    return (
      <>
      </>
    );
  }

  if (props.theme === 'Bootstrap') {
    return (
      <>
        <link rel="stylesheet" type="text/css" media="screen, projection" href="/demo/demo.css" />
        <link
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />
        <link rel="stylesheet" type="text/css" media="screen, projection" id="leda-styles" href="/assets/css/leda/leda.bootstrap.css" />
      </>
    );
  }

  return null;
};
