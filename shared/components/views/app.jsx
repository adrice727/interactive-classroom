import React from 'react';

const css = [];

export default class Index extends React.Component {
  render() {
    return (
      <html>
        <head>
          <title>React Starter</title>
          {css.map((href, k) => <link key={k} rel="stylesheet" type="text/css" href={href} />)}
        </head>
        <body>
          <div id="app"></div>
        </body>
        <script src="http://localhost:9000/js/app.js" defer="defer"></script>
      </html>
    );
  }
}