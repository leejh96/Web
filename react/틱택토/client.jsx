import React from 'react';
import ReactDom from 'react-dom';
import { hot } from 'react-hot-loader/root';
import TTT from './TTT';

const Hot = hot(TTT);
ReactDom.render(<Hot />, document.querySelector('#root'));

