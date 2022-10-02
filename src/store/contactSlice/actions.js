import { createAsyncThunk } from "@reduxjs/toolkit";


export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const resp = await fetch('https://63395b0e383946bc7ff1da50.mockapi.io/contacts');
      const data = await resp.json()
      return data

    } catch (err) {
      return thunkAPI.rejectWithValue('Fetch Error')
    }
  }
)

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contact, thunkAPI) => {
    try {
      const resp = await fetch('https://63395b0e383946bc7ff1da50.mockapi.io/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contact)
      });
      return await resp.json()
    } catch (err) {
      return thunkAPI.rejectWithValue('Fetch Error')
    }
  }
)

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkAPI) => {
    try {
      const resp = await fetch(`https://63395b0e383946bc7ff1da50.mockapi.io/contacts/${id}`, {
        method: 'DELETE',
      });
      const data = await resp.json()
      return data

    } catch (err) {
      return thunkAPI.rejectWithValue('Fetch Error')
    }
  }
)
