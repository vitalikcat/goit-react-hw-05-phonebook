import React, { Component } from 'react';
import styles from '../ContactForm/ContactForm.module.css';

export default class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = event => {
    let { name, value } = event.target;

    this.setState({
      [name]: name === 'number' ? value.replace(/[^\-\d]/g, '') : value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    this.props.onAddContact({ ...this.state });

    this.reset();
  };

  reset = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    const { name, number } = this.state;

    return (
      <form className={styles.Form} onSubmit={this.handleSubmit}>
        <label className={styles.Label}>
          Name
          <input
            className={styles.Input}
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
          />
        </label>
        <label className={styles.Label}>
          Number
          <input
            className={styles.Input}
            type="text"
            name="number"
            value={number}
            onChange={this.handleChange}
          />
        </label>
        <button className={styles.Button} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}
