import React from 'react';
import styles from '../Filter/Filter.module.css';
import PropTypes from 'prop-types';

const Filter = ({ onChangeFilter, filter }) => (
  <form className={styles.Form}>
    <label className={styles.Label}>Find contacts by name</label>
    <input
      type="text"
      name="filter"
      value={filter}
      onChange={onChangeFilter}
      className={styles.Input}
    />
  </form>
);

Filter.propTypes = {
  onChangeFilter: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  contacts: PropTypes.arrayOf(PropTypes.object),
};

export default Filter;
