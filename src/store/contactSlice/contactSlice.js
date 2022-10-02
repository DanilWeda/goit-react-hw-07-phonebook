import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contacts: [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ],
  filter: ""
}

const contactSlice = createSlice({
  name: 'contactSlice',
  initialState,
  reducers: {
    addContacts(state, action) {
      state.contacts = [...state.contacts, action.payload]
    },
    removeContacts(state, action) {
      state.contacts = state.contacts.filter(contact => contact.id !== action.payload)
    },
    setFilter(state, action) {
      state.filter = action.payload
    },
  },
})

export const { addContacts, removeContacts, setFilter } = contactSlice.actions;
export default contactSlice.reducer;
