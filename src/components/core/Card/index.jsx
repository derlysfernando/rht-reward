import PropTypes from "prop-types";
import { Container } from "./style";

/**
 * Card Component
 * @param {object} param0
 * @param {string} param0.className container class name
 * @param {Array<React.ReactNode>} param0.children react dom children
 */
function Card({ className, children }) {
  return <Container className={className}>{children}</Container>;
}

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

Card.defaultProps = {
  className: "",
};

export default Card;
