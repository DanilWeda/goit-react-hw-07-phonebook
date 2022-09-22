import React, { Component } from 'react'
import ContactForm from './ContactForm/ContactForm'
import ContactList from './ContactList/ContactList'
import Filter from './Filter/Filter'

class App extends Component {

  constructor() {
    super();

    this.state = {
      contacts: [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ],
      filter: '',
    };
  }

  handleCreate = (contact) => {
    const duplicate = this.state.contacts.find(({ name }) => name.toLowerCase() === contact.name.toLowerCase());
    if (duplicate) {
      alert(`${duplicate.name} is already in contacts.`)
      return
    }
    this.setState({ contacts: [...this.state.contacts, contact] })
  }

  handleFilter = (text) => {
    this.setState({ filter: text })
  }

  componentDidMount() {
    const localContacts = localStorage.getItem('contacts')
    if (localContacts) {
      this.setState({ contacts: JSON.parse(localContacts) })
    }
  }

  componentDidUpdate(prevState) {
    if(prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
  }

  handleDelete = (removeId) => () => {
    const removedContacts = this.state.contacts.filter(contact => contact.id !== removeId);
    this.setState({
      contacts: [...removedContacts]
    })
  }

  render() {
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onCreate={this.handleCreate} />

        <h2>Contacts</h2>
        <Filter filter={this.state.filter} onFilter={this.handleFilter} />
        <ContactList onRemove={this.handleDelete} filterQuery={this.state.filter} contacts={this.state.contacts} />
      </div >
    )
  }
}

export default App
