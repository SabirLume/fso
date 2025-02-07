import axios from 'axios'
const host = 'http://localhost:3001/'

const getAll = () => {
  return axios.get(`${host}notes`).then(r => r.data)
}

const create = note => {
  return axios.post(`${host}notes`, note).then(r => r.data)
}

const update = (id, newNote) => {
  return axios.put(`${host}notes/${id}`, newNote).then(r => r.data)
}

export default { getAll, create, update }

