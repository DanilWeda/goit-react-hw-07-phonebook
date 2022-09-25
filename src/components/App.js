import  {  useEffect, useState } from 'react'
import ContactForm from './ContactForm/ContactForm'
import ContactList from './ContactList/ContactList'
import Filter from './Filter/Filter'

const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ])

  const [filter, setFilter] = useState('')


  const handleCreate = (contact) => {
    const duplicate = contacts.find(({ name }) => name.toLowerCase() === contact.name.toLowerCase());
    if (duplicate) {
      alert(`${duplicate.name} is already in contacts.`)
      return
    }
    setContacts([...contacts, contact])
  }

  const handleFilter = (text) => {
    setFilter(text)
  }

  useEffect(() => {
    const localContacts = localStorage.getItem('contacts')
    if (localContacts) {
      setContacts(JSON.parse(localContacts));
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts])

  const handleDelete = (removeId) => () => {
    const removedContacts = contacts.filter(contact => contact.id !== removeId);
    setContacts([...removedContacts])
  }

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onCreate={handleCreate} />

        <h2>Contacts</h2>
        <Filter filter={filter} onFilter={handleFilter} />
        <ContactList onRemove={handleDelete} filterQuery={filter} contacts={contacts} />
      </div >
    )
}

export default App
