import React, { Component } from 'react'
import classes from './ContactForm.module.scss'
import { PropTypes } from 'prop-types'
import { v4 as uid4 } from 'uuid';

class ContactForm extends Component {

  constructor() {
    super();

    this.state = {
      name: '',
      nameError: '',
      number: '',
      numberError: '',
    };
  }

  handleNameChange = (e) => {
    this.setState({ nameError: '' })
    this.setState({ name: e.target.value })
  }

  handleNumberChange = (e) => {
    this.setState({ numberError: '' })
    this.setState({
      number: e.target.value.replace(/^[a-zA-Zа-яА-Я]+((['/ -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/, '')
    })
  }

  handleClick = (e) => {
    const validName = new RegExp(
      '^[a-zA-Zа-яА-Я]+(([\' -][a-zA-Zа-яА-Я])?[a-zA-Zа-яА-Я]*)*$'
    );

    if (!this.state.name || !this.state.number) {
      if (!this.state.name) this.setState({ nameError: 'Please type name' })
      if (!this.state.number) this.setState({ numberError: 'Please type number' })
      return
    }

    if (!validName.test(this.state.name)) {
      this.setState({ nameError: 'only letters, apostrophe, dash and spaces' })
      return
    }

    this.props.onCreate({ id: uid4(), name: this.state.name, number: this.state.number })
    this.setState({ name: '', number: '' })
  }

  static propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired
    })),
    onCreate: PropTypes.func.isRequired,
  }

  render() {
    return (
      <div className={classes.section}>
        <div className={classes.inputWrapper}>
          <input
            onChange={this.handleNameChange}
            type="text"
            name="name"
            value={this.state.name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
          <span>{this.state.nameError}</span>
        </div>
        <div className={classes.inputWrapper}>
          <input
            onChange={this.handleNumberChange}
            type="tel"
            name="number"
            value={this.state.number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
          <span>{this.state.numberError}</span>
        </div>
        <button onClick={this.handleClick}>Add contact</button>
      </div>
    )
  }
}


export default ContactForm
