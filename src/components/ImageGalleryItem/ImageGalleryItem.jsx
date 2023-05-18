
import PropTypes from 'prop-types';
import { Item } from './ImageGalleryItem.styled'

export const ImageGalleryItem = ({ itemList, onImageClick }) => {
  const {webformatURL, largeImageURL, tags} = itemList
  return (
    <Item>
      <img
        onClick={() => onImageClick({largeImageURL, tags})}
        src={webformatURL}
        alt={tags}
      />
    </Item>
  );
};


ImageGalleryItem.propTypes ={
  itemList: PropTypes.object.isRequired,
  onImageClick:PropTypes.func.isRequired
};