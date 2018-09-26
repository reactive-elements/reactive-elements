import * as utils from './utils';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

export default function reactiveElements(elementName, ReactComponent, options) {
  function create(parent, props) {
    var element = React.createElement(ReactComponent, props);
    parent.reactiveElement = element;
    return ReactDOM.render(element, parent.shadowRoot, props.onRender);
  }

  function exposeDefaultMethods(reactComponent, customElement) {
    customElement.forceUpdate = reactComponent.forceUpdate.bind(reactComponent);
  }

  function exposeMethods(reactComponent, customElement) {
    utils.extend(customElement, reactComponent);
  }

  class CustomElement extends HTMLElement {
    constructor() {
      const self = super();

      self.attachShadow({ mode: 'open' });

      const observer = new MutationObserver(() => {
        ReactDOM.unmountComponentAtNode(self);
        const props = utils.getProps(self);
        props.children = utils.getChildren(self);
        create(self, props);
      });

      observer.observe(self, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true,
      });
    }

    connectedCallback() {
      const props = utils.getProps(this);
      props.children = utils.getChildren(this);
      let reactElement = create(this, props);

      if (reactElement !== null) {
        exposeMethods(reactElement, reactElement.props.container);
        exposeDefaultMethods(reactElement, reactElement.props.container);

        utils.getterSetter(
          this,
          'props',
          function() {
            return reactElement.props;
          },
          function(props) {
            reactElement = create(this, props);
          }
        );
      }
    }

    disconnectedCallback() {
      ReactDOM.unmountComponentAtNode(this);
    }
  }

  customElements.define(elementName, CustomElement);

  return CustomElement;
}

export { utils };
