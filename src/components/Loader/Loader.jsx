import PropTypes from 'prop-types';
import { Dna } from 'react-loader-spinner';

export function Loader({ visible }) {
  return (
    <Dna
      visible={visible }
      height="120"
      width="120"
      ariaLabel="dna-loading"
      wrapperStyle={{
        position: 'relative',
        left: '50%',
        transform: 'translateX(-50%)',
      }}
      wrapperClass="dna-wrapper"
    />
  );
}

Loader.propTypes = {
  visible: PropTypes.bool.isRequired,
};
