import PropTypes from 'prop-types';

import { Avatar } from 'antd';
import { Container } from './style';

/**
 * Avatar Icon Component
 * @param {object} param0
 * @param {string} param0.className container class name
 * @param {string} param0.avatar avatar image src
 * @param {number} param0.size avatar image size
 * @param {string} param0.name avatar image name
 */
function AvatarIcon({ className, avatar, size, name }) {
  return (
    <Container className={className}>
      <Avatar size={size} src={avatar}>
        {name ? name.chartAt(0) : ''}
      </Avatar>
    </Container>
  );
}

AvatarIcon.propTypes = {
  className: PropTypes.string,
  size: PropTypes.number,
  avatar: PropTypes.string,
  name: PropTypes.string,
};

AvatarIcon.defaultProps = {
  className: '',
  size: 120,
  avatar: undefined,
  name: '',
};

export default AvatarIcon;
