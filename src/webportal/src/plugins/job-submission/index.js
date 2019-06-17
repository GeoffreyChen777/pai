/*
 * Copyright (c) Microsoft Corporation
 * All rights reserved.
 *
 * MIT License
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

 // TODO: This file need to change in the future. Submit job may no be a plugin
const React = require('react');
const ReactDOM = require('react-dom');

const {parse} = require('querystring');
const {App} = require('./components/App');

// declare interface IWindow {
//   PAI_PLUGINS: Array<{ id?: string, uri?: string, title?: string }>;
// }

/* eslint-disable no-unused-vars */
class PAIPluginElement extends HTMLElement {
  connectedCallback() {
    const api = this.getAttribute('pai-rest-server-uri');
    const user = this.getAttribute('pai-user');
    const token = this.getAttribute('pai-rest-server-token');
    if (user === null || token === null) {
      window.location.href = '/login.html';
      return;
    }

    const query = parse(window.location.search.replace(/^\?/, ''));

    ReactDOM.render(React.createElement(App), this);
  }

  disconnectedCallback() {
    ReactDOM.unmountComponentAtNode(this);
  }
}

window.customElements.define('pai-plugin', PAIPluginElement);