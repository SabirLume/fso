import axios from 'axios'

const host = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAllCountries = () => {
  return axios.get(`${host}/all`).then(r => {
    return r.data.map(country => {
      return { name: country.name, flags: country.flags }
    })
  })
}

const getCountry = (country) => {
  return axios.get(`${host}/name/${country}`).then(r => {
    return { name: r.data.name, flags: r.data.flags }
  })
}

export default { getCountry, getAllCountries }
