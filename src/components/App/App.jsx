import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';
import filterContacts from '../../filter/filter';
import Notification from '../Notification/Notification';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import styles from './App.module.css';
import slideHeader from '../../transitions/slideHeader.module.css';
import popFilter from '../../transitions/popFilter.module.css';
import slideNotification from '../../transitions/slideNotification.module.css';

export default class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    mounted: false,
    contactExist: false,
  };

  componentDidMount() {
    this.setState({ mounted: true });
  }

  handleInputChange = event => {
    const { value } = event.target;

    this.setState({
      filter: value,
    });
  };

  addContact = contact => {
    const { name } = contact;
    const { contacts } = this.state;

    const matchedName = contacts.some(contacts => contacts.name === name);

    if (matchedName) {
      this.setState({ contactExist: true }, () =>
        setTimeout(() => this.setState({ contactExist: false }), 3000),
      );
    } else {
      const contactToAdd = {
        id: shortid.generate(),
        ...contact,
      };

      this.setState(state => ({
        contacts: [...state.contacts, contactToAdd],
      }));
    }
  };

  deleteContact = id => {
    this.setState(state => ({
      contacts: state.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { contacts, filter, mounted, contactExist } = this.state;
    const filteredContacts = filterContacts(contacts, filter);

    return (
      <div>
        <CSSTransition
          in={contactExist}
          timeout={250}
          classNames={slideNotification}
          unmountOnExit
        >
          <Notification />
        </CSSTransition>

        <CSSTransition
          in={mounted}
          timeout={500}
          classNames={slideHeader}
          unmountOnExit
        >
          <h1 className={styles.H1}>Phonebook</h1>
        </CSSTransition>
        <ContactForm onAddContact={this.addContact} />

        <CSSTransition
          in={contacts.length >= 2}
          timeout={250}
          classNames={popFilter}
          unmountOnExit
        >
          <Filter onChangeFilter={this.handleInputChange} filter={filter} />
        </CSSTransition>

        {!!contacts.length && (
          <ContactList
            items={filteredContacts}
            onDeleteContact={this.deleteContact}
          />
        )}
      </div>
    );
  }
}

App.prpTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),
  filter: PropTypes.string,
};
