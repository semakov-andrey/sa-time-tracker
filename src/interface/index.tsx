import React from 'react';
import ReactDOM from 'react-dom';

import { App } from 'interface/components/App/App';
import { register } from 'utils/serviceWorker';

import 'interface/constants/common.css';
import 'interface/index.css';
import 'normalize.css';

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);

// if (process.env.NODE_ENV === 'production') {
register();
// }
