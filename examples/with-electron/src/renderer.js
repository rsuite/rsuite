/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import React, { useState, useCallback } from 'react';
import * as ReactDOM from 'react-dom';
import { Button, Divider, Badge, Notification, ButtonToolbar } from 'rsuite';
import './index.less';

const Hello = function() {
  const [clickTime, setClickTime] = useState(0);
  const handleClick = useCallback(() => {
    setClickTime(c => c + 1);
  }, []);

  const handleNotify = useCallback(() => {
    Notification.open({
      title: 'Notice',
      description: `You clicked ${clickTime}`,
      duration: 2000
    });
  }, [clickTime]);

  return (
    <>
      <ButtonToolbar>
        <Button appearance="primary" onClick={handleClick}>
          Click Me To Test
        </Button>
        <Button appearance="ghost" onClick={handleNotify}>
          Notification
        </Button>
      </ButtonToolbar>
      <Divider />
      <span>
        You clicked <Badge content={clickTime} /> Times
      </span>
    </>
  );
};

console.log('👋 This message is being logged by "renderer.js", included via webpack');
ReactDOM.render(<Hello />, document.getElementById('example'));
