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
    isLoading: false,
    modalImg: null,
    currentPage: 1,
    error: '',
  };

  async componentDidUpdate(prevProps, prevState) {
    const { currentPage } = this.state;
    const { searchText, page } = this.props;
    if (prevProps.searchText !== this.props.searchText) {
      try {
        this.setState({ isLoading: true, images: [] });

        const images = await getImages(searchText, page);
        this.setState({
          images: [...this.state.images, ...images.hits],
          isLoading: false,
        });
      } catch (error) {
        this.setState({ error: true, isLoading: false });
      }
    }

    if (prevState.currentPage !== currentPage) {
      try {
        this.setState({ isLoading: true });

        const images = await getImages(searchText, currentPage);
        this.setState({
          images: [...this.state.images, ...images.hits],
          isLoading: false,
        });
      } catch (error) {
        this.setState({ error: true, isLoading: false });
      }
    }
  }

  handleClickBtn = () => {
    this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
  };

  closeModal = () => this.setState({ modalImg: null });

  onClickToGallery = modalImg => {
    this.setState({ modalImg });
  };

  render() {
    const { images, modalImg, isLoading, error } = this.state;
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
        {error && <p>Ой! Щось пішло не так... Перезавантажте сторінку!</p>}
        {images.length > 0 && <Button onClickBtn={this.handleClickBtn} />}
        {modalImg && <Modal onClose={this.closeModal} modalImg={modalImg} />}
      </>
    );
  }
}
