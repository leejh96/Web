import React from 'react';
import ReactDom from 'react-dom';
import rockScissorsPaper from './rockscissorspaper';
import { hot } from 'react-hot-loader/root';

const Hot = hot(rockScissorsPaper);
ReactDom.render(<Hot />, document.querySelector('#root'))
