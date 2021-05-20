import React from 'react';
import ReactDom from 'react-dom';
import ReactionSpeed from './reactionSpeed';
import { hot } from 'react-hot-loader/root';

const Hot = hot(ReactionSpeed);

ReactDom.render(<Hot />, document.querySelector('#root'));