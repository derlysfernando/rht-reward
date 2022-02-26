import PropTypes from "prop-types";
import Icon from "../Icon";
import { Container } from "./style";

/**
 * Panel Component
 * @param {object} param0
 * @param {string} param0.className container class name
 * @param {Array<React.ReactNode>} param0.children react dom children
 * @param {string} param0.headerIcon header icon
 * @param {number} param0.title header title
 */
function Panel({ className, children, headerIcon, title }) {
  return (
    <Container className={className}>
      <div className="header-panel">
        <Icon fontSize={20} icon={headerIcon} />
        <div className="title">{title}</div>
      </div>
      <div className="children">{children}</div>
    </Container>
  );
}

Panel.propTypes = {
  className: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  headerIcon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

Panel.defaultProps = {
  className: "",
};

export default Panel;
