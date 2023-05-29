import { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { getImages } from 'services/api';
import { Gallery } from './ImageGallery.styled';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import { Loader } from 'components/Loader/Loader';

export class ImageGallery extends Component {
  state = {
    images: [],
    currrentPage: [],
    isLoading: false,
    modalImg: null,
    page: 1,
    error: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    if (
      prevProps.searchText !== this.props.searchText ||
      prevState.page !== page
    ) {
      this.setState({ isLoading: true });

      getImages(this.props.searchText, page)
        .then(response => response.json())
        .then(data =>
          this.setState(prevState => ({
            images: [...prevState.images, ...data.hits],
            
          }))
        )
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ isLoading: false }));
    }
  }

  handleClickBtn = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  closeModal = () => this.setState({ modalImg: null });

  onClickToGallery = modalImg => {
    this.setState({ modalImg });
  };

  render() {
    const { images, modalImg, isLoading } = this.state;
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
                />
              );
            })}
        </Gallery>

        {images.length > 0 && <Button onClickBtn={this.handleClickBtn} />}
        {modalImg && <Modal onClose={this.closeModal} modalImg={modalImg} />}
      </>
    );
  }
}
