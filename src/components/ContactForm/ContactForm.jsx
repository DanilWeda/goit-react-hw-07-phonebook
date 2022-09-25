import { useState } from 'react'
import classes from './ContactForm.module.scss'
import { PropTypes } from 'prop-types'
import { v4 as uid4 } from 'uuid';

const ContactForm = ({ onCreate }) => {
  const [name, setName] = useState('')
  const [nameError, setNameError] = useState('')
  const [number, setNumber] = useState('')
  const [numberError, setNumberError] = useState('')

  const handleNameChange = (e) => {
    setNameError('')
    setName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNumberError('')
    setNumber(e.target.value.replace(/^[a-zA-Zа-яА-Я]+((['/ -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/, ''))
  }

  const handleClick = (e) => {
    const validName = new RegExp(
      '^[a-zA-Zа-яА-Я]+(([\' -][a-zA-Zа-яА-Я])?[a-zA-Zа-яА-Я]*)*$'
    );

    if (!name || !number) {
      if (!name) setNameError('Please type name')
      if (!number) setNumberError('Please type number')
      return
    }

    if (!validName.test(name)) {
      setNameError('only letters, apostrophe, dash and spaces')
      return
    }

    onCreate({ id: uid4(), name, number, })
    setName('')
    setNumber('')
  }

    return (
      <div className={classes.section}>
        <div className={classes.inputWrapper}>
          <input
            onChange={handleNameChange}
            type="text"
            name="name"
            value={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
          <span>{nameError}</span>
        </div>
        <div className={classes.inputWrapper}>
          <input
            onChange={handleNumberChange}
            type="tel"
            name="number"
            value={number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
          <span>{numberError}</span>
        </div>
        <button onClick={handleClick}>Add contact</button>
      </div>
    )
}

ContactForm.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired
  })),
  onCreate: PropTypes.func.isRequired,
}

export default ContactForm
