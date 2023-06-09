import { Component } from 'react';
import { Backdrop, ModalStyle } from './Modal.styled';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleClickBackdrop = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
    console.log('object')
  }
  render() {
    const { largeImageURL, tags} = this.props.modalImg;
 
    return createPortal(
      <Backdrop onClick={this.handleClickBackdrop}>
        <ModalStyle>
        <img src={largeImageURL} alt={tags} />
        </ModalStyle>
      </Backdrop>,
      modalRoot
    );
  }
}

