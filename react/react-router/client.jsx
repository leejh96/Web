import React from 'react';
import ReactDom from 'react-dom';
import { hot } from 'react-hot-loader/root';
import Games from './games';

const Hot = hot(Games);
ReactDom.render(<Hot />, document.querySelector('#root'));

