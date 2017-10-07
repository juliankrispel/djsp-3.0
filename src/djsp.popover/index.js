import React, { Component } from 'react';
import { Portal } from 'react-portal';
import PropTypes from 'prop-types';

class Popover extends Component {
  state = {
    popupStyle: {}
  };

  updatePosition = () => {
    const {
      left,
      height,
      top,
    } = this.props.position;

    console.log('this node', this.node);

    const popupStyle = {
      position: 'fixed',
      left,
      top: top + height,
    };

    this.setState({ popupStyle });
  }

  componentDidMount() {
    this.updatePosition();
  }

  componentWillReceiveProps() {
    setTimeout(() => {
      this.updatePosition();
    })
  }

  render() {
    const {
      position,
      isOpen,
      children,
    } = this.props;

    if (!position || !isOpen) {
      return null;
    }

    return (<Portal>
      <div
        style={this.state.popupStyle}
        ref={node => { this.node = node }}
      >
        {children}
      </div>
    </Portal>);
  }
};

Popover.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  position: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]).isRequired,
  isOpen: PropTypes.bool
};

Popover.defaultProps = {
  isOpen: true,
};

export default Popover;
