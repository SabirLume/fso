import axios from 'axios'
const host = 'http://localhost:3005/api/notes'

const getAll = () => {
  return axios.get(`${host}`).then(r => r.data)
}

const create = note => {
  return axios.post(`${host}`, note).then(r => r.data)
}

const update = (id, newNote) => {
  return axios.put(`${host}/${id}`, newNote).then(r => r.data)
}

export default { getAll, create, update }

