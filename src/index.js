import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Promise from 'promise-polyfill';
import 'semantic-ui-css/semantic.min.css';
import registerServiceWorker from './registerServiceWorker';
import './Animation.css';

if (!window.Promise){
    window.Promise = Promise;
}
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
