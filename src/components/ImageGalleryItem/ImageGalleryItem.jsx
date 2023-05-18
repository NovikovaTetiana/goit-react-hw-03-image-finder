
import PropTypes from 'prop-types';
import { Item } from './ImageGalleryItem.styled'

export const ImageGalleryItem = ({ item, onImageClick }) => {
  const {webformatURL, largeImageURL, tags} = item
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
  item: PropTypes.object.isRequired,
  onImageClick:PropTypes.func.isRequired
};