import ContactForm from './ContactForm/ContactForm'
import ContactList from './ContactList/ContactList'
import Loader from './Loader/Loader'
import Filter from './Filter/Filter'
import { useEffect } from 'react'
import { setFilter } from 'store/contactSlice/contactSlice'
import { fetchContacts, addContact, deleteContact } from 'store/contactSlice/actions'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const dispatch = useDispatch();
  const { contacts: { items, isLoading, error }, filter } = useSelector(state => state.contact)


  const handleCreate = (contact) => {
    const duplicate = items.find(({ name }) => name.toLowerCase() === contact.name.toLowerCase());
    if (duplicate) {
      alert(`${duplicate.name} is already in contacts.`)
      return
    }
    dispatch(addContact(contact))
  }

  const handleFilter = (text) => {
    dispatch(setFilter(text))
  }

  const handleDelete = (removeId) => () => {
    dispatch(deleteContact(removeId))
  }

  useEffect(() => {
    dispatch(fetchContacts())
  }, [])


    return (
      <div>
        {isLoading && <Loader />}
        {error && <h1>Sorry but, it happened error</h1>}
        <h1>Phonebook</h1>
        <ContactForm onCreate={handleCreate} />
        <h2>Contacts</h2>
        <Filter filter={filter} onFilter={handleFilter} />
        <ContactList onRemove={handleDelete} filterQuery={filter} contacts={items} />
      </div >
    )
}

export default App
