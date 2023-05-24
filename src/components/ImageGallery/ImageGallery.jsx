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
    isShowModal: false,
    modalImg: null,
    isShowBtn: false,
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

      console.log(this.props.searchText);

      getImages(this.props.searchText)
        .then(response => response.json())
        .then((data) =>
          this.setState(prevState => ({
            images: [...prevState.images, ...data.hits],
            // handleClickBtn: Math.floor(data.totalHits / 12),
            // handleClickBtn:page < Math.ceil(data.totalHits / 12)
            // handleClickBtn:Math.ceil(data.totalHits / 12)
            // handleClickBtn:prevState.page < Math.ceil(data.totalHits / 12)
            handleClickBtn:prevState.page < Math.floor(data.totalHits / 12)
          }))
        )
        .catch(error => this.setState({ error }))
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

  onClickToGallery = modalImg => {
    this.setState({ modalImg });
  };

  render() {
    const { images, isShowModal, modalImg, isLoading} = this.state;
    return (
      <>
        {isLoading && <Loader visible={true} />}
        {isShowModal && (
          <Modal onClose={this.toggleModal} modalImg={modalImg} />
        )}
        {/* {isShowBtn && <Button onClickBtn ={this.handleClickBtn}/> } */}
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

        <Button onClickBtn={this.handleClickBtn} />
      </>
    );
  }
}
