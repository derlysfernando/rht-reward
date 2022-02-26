import PropTypes from "prop-types";
import { Container } from "./style";

/**
 * Progress Component
 * @param {object} param0
 * @param {string} param0.className container class name
 * @param {Array<React.ReactNode>} param0.progress react state progress
 */
function Progress({ className, progress }) {
  return (
    <Container className={className}>
      <div className="progress">
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: `${progress}%`, height: "100%" }}
        >
          <span />
        </div>
      </div>
    </Container>
  );
}

Progress.propTypes = {
  className: PropTypes.string,
  progress: PropTypes.string,
};

Progress.defaultProps = {
  className: "",
  progress: "0%",
};

export default Progress;
