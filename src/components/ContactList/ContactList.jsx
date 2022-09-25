import { useState, useEffect } from 'react'
import classes from './ContactList.module.scss'
import { PropTypes } from 'prop-types'

const ContactList = ({ contacts, filterQuery, onRemove }) => {
  const [filtredContacts, setFiltredContacts] = useState([])

  useEffect(() => {
    setFiltredContacts(contacts)
  }, [])

  useEffect(() => {
    setFiltredContacts(contacts.filter(({ name }) => name.toLowerCase().includes(filterQuery.toLowerCase())))
  }, [filterQuery, contacts])


    return (
      <div className={classes.stats}>
        <ul>
          {filtredContacts.map(({ id, name, number }) => (
            <div key={id}>
              <li>{name}: {number}</li>
              <button onClick={onRemove(id)}>Delete</button>
            </div>
          ))}
        </ul>
      </div>
    )
}


ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired
  })),
  filterQuery: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
}


export default ContactList
