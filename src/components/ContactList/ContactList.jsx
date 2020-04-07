import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import styles from '../ContactList/ContactList.module.css';
import slideList from '../../transitions/slideList.module.css';

const ContactList = ({ items, onDeleteContact }) => (
  <TransitionGroup component="ul" className={styles.Ul}>
    {items.map(({ id, name, number }) => (
      <CSSTransition
        key={id}
        timeout={250}
        unmountOnExit
        classNames={slideList}
      >
        <li className={styles.Li}>
          <span>{name}</span>
          <span>{number}</span>
          <button className={styles.Button} onClick={() => onDeleteContact(id)}>
            &#10006;
          </button>
        </li>
      </CSSTransition>
    ))}
  </TransitionGroup>
);

ContactList.propTypes = {
  onDeleteContact: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default ContactList;
