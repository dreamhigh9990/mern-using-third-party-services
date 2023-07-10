import React from 'react';
import ReactModal from 'react-modal';
import theme from 'styles/theme';

const style = {
  overlay: {
    zIndex: 100,
    position: 'fixed',
    top: 0,
    left: 0,
    // width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, .8)'
  },
  content: {
    position: 'relative',
    top: 'auto',
    right: 'auto',
    bottom: 'auto',
    left: 'auto',
    borderRadius: theme.radii[1],
    border: 'none',
    boxShaodw: theme.shadows.card,
    padding: '0',
    background: theme.colors.background,
    WebkitOverflowScrolling: 'touch',
    outline: 'none',
    overflow: 'visible'
  }
};

const Modal = ({ ...props }) => (
  <ReactModal style={style} ariaHideApp={false} {...props} />
);

export default Modal;
