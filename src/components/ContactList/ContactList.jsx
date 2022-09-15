import React, { Component } from 'react'
import classes from './ContactList.module.scss'
import { PropTypes } from 'prop-types'

class ContactList extends Component {

  constructor() {
    super();

    this.state = {
      filtredContacts: [],
    };
  }

  static propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired
    })),
    filterQuery: PropTypes.string.isRequired,
    onRemove: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.setState({ filtredContacts: this.props.contacts })
  }

  componentDidUpdate(prevProps) {
    const diffFilter = prevProps.filterQuery !== this.props.filterQuery;
    const diffContacts = prevProps.contacts !== this.props.contacts;
    if (diffFilter || diffContacts) {
      this.setState(
        { filtredContacts: this.props.contacts.filter(({ name }) => name.toLowerCase().includes(this.props.filterQuery.toLowerCase())) }
      )
    }
  }

  render() {
    return (
      <div className={classes.stats}>
        <ul>
          {this.state.filtredContacts.map(({ id, name, number }) => (
            <div key={id}>
              <li>{name}: {number}</li>
              <button onClick={this.props.onRemove(id)}>Delete</button>
            </div>
          ))}
        </ul>
      </div>
    )
  }
}


export default ContactList
