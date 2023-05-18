import { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { getImages } from 'services/api';
import { Gallery } from './ImageGallery.styled';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import { Loader } from 'components/Loader/Loader';

export class ImageGallery extends Component {
  state = {
    images: null,
    isLoading: false,
    isShowModal: false,
    modalImg: null,
    isShowBtn: false,
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    if (
      prevProps.searchText !== this.props.searchText ||
      prevState.page !== page
    ) {
      this.setState({ isLoading: true });
      getImages(this.props.searchText)
        .then(response => response.json())
        .then(images =>
          this.setState({
            images:
              page === 1 ? images.hits : [...prevState.images, ...images.hits],
            totalPages: Math.floor(images.totalHits / 12),
          })
        )
        .catch(error => {
          this.setState({ error });
        })
        .finally(() => this.setState({ isLoading: false }));
    }
  }
  
  handleClickBtn = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  toggleModal = () => {
    this.setState(({ isShowModal }) => ({
      isShowModal: !isShowModal,
    }));
  };

  onClickToGallery = (modalImg) => {
    this.setState({ modalImg });
  };

  render() {
    const { images, isShowModal, modalImg, isLoading, isShowBtn } = this.state;
    return (
      <>
        {isLoading && <Loader visible={true} />}

        <Gallery>
          {images &&
            images.map(image => {
              return (
                <ImageGalleryItem
                  key={image.id}
                  itemList={image}
                  onImageClick={this.onClickToGallery}
                  onClick={this.toggleModal}
                />
              );
            })}
        </Gallery>
     
        {isShowModal && <Modal onClick={this.toggleModal} modalImg={modalImg} /> }

        {/* {isShowBtn && <Button onClickBtn ={this.handleClickBtn}/> } */}

        <Button onClickBtn ={this.handleClickBtn} />
      </>
    );
  }
}
