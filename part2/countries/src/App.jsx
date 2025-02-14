import { useState, useEffect } from 'react'
import countryServer from './services/country.jsx'
import Country from './components/Country.jsx'
import './App.css'

function App() {
  const [country, setCountry] = useState('');
  const [countryData, setCountryData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (countryData.length < 1) {
      countryServer.getAllCountries(country)
        .then(data => {
          setCountryData(data);
        })
        .catch(e => { console.error("error", e.message) })
    }
    setFilteredData(
      countryData.filter(item => {
        if (item.name.official.toLowerCase().includes(country)) {
          return item
        }
      }))
  }, [country])

  return (
    <>
      <div className={"flex-country-search"}>
        <p>Find Countries</p>
        <input onChange={e => setCountry(e.target.value)} value={country} />
      </div >
      <div>
        {
          filteredData.length > 10 ?
            <p>Too many matched, specify another filter </p> :
            filteredData.map((item) =>
              <Country key={item.name.common} name={item.name.common} />
            )
        }
        {
          filteredData.length === 1 &&
          filteredData.map((item) =>
            <img src={item.flags.png}></img>
          )
        }
      </div>
    </>
  )
}

export default App
