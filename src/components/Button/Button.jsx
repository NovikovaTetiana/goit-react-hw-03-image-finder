import PropTypes from 'prop-types';
import { Btn, BtnWrap } from './Button.styled';

export const Button = ({ onClickBtn }) => {
  return (
    <BtnWrap>
      <Btn type="button" onClick={onClickBtn}>
        Load more
      </Btn>
    </BtnWrap>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
