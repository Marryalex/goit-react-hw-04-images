import PropTypes from 'prop-types';
import styles from './Button.module.css';

export const Button = ({ handleLoadMore }) => {
  return (
    <button type="button" className={styles.button} onClick={handleLoadMore}>
      Load more
    </button>
  );
};

Button.propTypes = {
  handleLoadMore: PropTypes.func.isRequired,
};