import React from 'react';

export default function ErrorView(props) {
  return (
    <div>
      <h3>Internal Error</h3>
      {props.stack &&
        <pre>
          <code>{props.stack}</code>
        </pre>
      }
    </div>
  );
}
