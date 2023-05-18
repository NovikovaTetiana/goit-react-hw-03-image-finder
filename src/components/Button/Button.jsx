import PropTypes from 'prop-types';
import { Btn, BtnWrap } from './Button.styled';

export const Button = ({ onClick, isDisabled }) => {
  return (
    <BtnWrap>
      <Btn type="button" disabled={isDisabled} onClick={onClick}>
        Load more
      </Btn>
    </BtnWrap>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
