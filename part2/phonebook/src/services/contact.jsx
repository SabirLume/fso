import axios from 'axios'

const host = 'http://localhost:3001/persons/'

const getContacts = () => {
  return axios.get(`${host}`).then(r => r.data);
}

const addContact = contact => {
  return axios.post(`${host}`, contact).then(r => r.data);
}

const deleteContact = id => {
  return axios.delete(`${host}${id}`).then(r => r.data);
}

const updateContact = (id, person) => {
  return axios.put(`${host}${id}`, person).then(r => r.data);
}

export default { getContacts, addContact, deleteContact, updateContact }
