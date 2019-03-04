import * as utils from './utils';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

const getRenderRoot = (element, useShadowDom) =>
  useShadowDom ? element.shadowRoot : element;

function reactiveElements(elementName, ReactComponent, options) {
  const { useShadowDom = false } = options;

  function create(parent, props) {
    var element = React.createElement(ReactComponent, props);
    parent.reactiveElement = element;
    return ReactDOM.render(
      element,
      getRenderRoot(parent, useShadowDom),
      props.onRender
    );
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

      if (useShadowDom) self.attachShadow({ mode: 'open' });

      const observer = new MutationObserver(() => {
        const props = utils.getProps(self);
        // we reuse the `childrenFragment`, rather than creating a new fragment,
        // as this will cause a mutation in the current React component (because
        // of the way that DOM nodes must be unique)
        // but the fragment is a reference, so this is fine to keep a hold of
        props.children = this.childrenFragment;
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
      // save a `childrenFragment` to reuse later, on mutations (this is okay
      // because the fragment is effectively a reference to the children)
      this.childrenFragment = props.children = utils.getChildren(this);
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
      ReactDOM.unmountComponentAtNode(getRenderRoot(this, useShadowDom));
    }
  }

  customElements.define(elementName, CustomElement);

  return CustomElement;
}

reactiveElements.utils = utils;
export default reactiveElements;
