import React, { useState } from 'react';
import { EventEmitter } from 'events';

const Store = (props) => {
  const eventEmitter = new EventEmitter();

  //Main App State
  const [appName, setAppName] = useState('Stefan');
  return React.Children.map(props.children, (child) => {
    return React.cloneElement(child, { appName, eventEmitter });
  });
};

export default Store;
