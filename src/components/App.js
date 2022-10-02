import ContactForm from './ContactForm/ContactForm'
import ContactList from './ContactList/ContactList'
import Filter from './Filter/Filter'
import { addContacts, removeContacts, setFilter } from 'store/contactSlice/contactSlice'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const dispatch = useDispatch();
  const { contacts, filter } = useSelector(state => state.contact)


  const handleCreate = (contact) => {
    const duplicate = contacts.find(({ name }) => name.toLowerCase() === contact.name.toLowerCase());
    if (duplicate) {
      alert(`${duplicate.name} is already in contacts.`)
      return
    }
    dispatch(addContacts(contact))
  }

  const handleFilter = (text) => {
    dispatch(setFilter(text))
  }

  const handleDelete = (removeId) => () => {
    dispatch(removeContacts(removeId))
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
