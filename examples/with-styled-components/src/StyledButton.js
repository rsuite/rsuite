import styled from 'styled-components';
import Button from 'rsuite/es/Button';

const StyledButton = styled(Button)`
  border-radius: 3px;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);
  background: ${props =>
    props.appearance === 'primary'
      ? 'linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)'
      : '#f7f7fa'};
  color: ${props => (props.appearance === 'primary' ? 'white' : 'palevioletred')};
`;

export default StyledButton;
