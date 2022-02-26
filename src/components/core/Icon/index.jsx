import PropTypes from "prop-types";
import { createFromIconfontCN } from "@ant-design/icons";
import { Container } from "./style";

const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_2978218_3rdhobdbte.js",
});

/**
 * Icon Component
 * @param {object} param0
 * @param {string} param0.className container class name
 * @param {string} param0.icon icon
 * @param {number} param0.fontSize icon font size
 * @param {string} param0.color icon color
 */
function Icon({ className, icon, fontSize, color }) {
  return (
    <Container className={className}>
      <IconFont
        style={{
          fontSize,
          color,
        }}
        type={icon}
      />
    </Container>
  );
}

Icon.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string.isRequired,
  fontSize: PropTypes.number,
  color: PropTypes.string,
};

Icon.defaultProps = {
  className: "",
  fontSize: 25,
  color: "white",
};

export default Icon;
