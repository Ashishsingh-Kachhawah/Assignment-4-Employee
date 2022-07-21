import React, { Component } from 'react'
import ReactDOM from "react-dom" 
import '../cssComponents/App.css';

const modalRootEl = document.getElementById('modal-otp-root');


// Let's create a Modal component that is an abstraction around
// the portal API.
class OtpModal extends React.Component {
  constructor(props) {
    super(props);
    // Create a div that we'll render the modal into. Because each
    // Modal component has its own element, we can render multiple
    // modal components into the modal container.
    this.el = document.createElement('div');
  }

  componentDidMount() {
    // Append the element into the DOM on mount. We'll render
    // into the modal container element (see the HTML tab).
    modalRootEl.appendChild(this.el);
    document.getElementById('root').style.filter = 'blur(10px)';
  }

  componentWillUnmount() {
    // Remove the element from the DOM when we unmount
    modalRootEl.removeChild(this.el);
    document.getElementById('root').style.filter = 'blur(0px)';
  }
  
  render() {
    // Use a portal to render the children into the element
    return ReactDOM.createPortal(
      // Any valid React child: JSX, strings, arrays, etc.
      this.props.children,
      // A DOM element
      this.el,
    );
  }
}

export default OtpModal;