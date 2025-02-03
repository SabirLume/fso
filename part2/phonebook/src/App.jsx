import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonsForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([])
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(r => {
      setPersons(r.data)
    }).catch(e => { console.error("error getting initial data", e) })
  }, [])

  const onSubmitForm = () => {
    let person = '';
    person = persons.find(person => person.name === name);
    if (person) {
      alert(`${person.name} is a duplicate name`)
      return
    }

    setPersons(n => {
      return [
        ...n,
        { name: name, number: number }
      ]
    })
  }

  const onSubmitSearch = () => {
    setPersons(n => {
      return n.filter(item => {
        // joining "Mary Art" => "maryart" , easier to compare
        let originalWord = item.name.toLowerCase().split(' ').join('');
        let searchWord = searchTerm.toLowerCase().split(' ').join('');

        // searched can't be more then og 
        if (searchWord.length > originalWord.length) { return false }

        for (let b = 0; b < searchWord.length; b++) {
          if (searchWord[b] !== originalWord[b]) {
            return false;
          }
        }
        return true;
      }
      )
    })
  }

  return (
    <>
      <h2>Phonebook</h2>
      <Filter setSearchTerm={setSearchTerm} onSubmitSearch={onSubmitSearch} searchTerm={searchTerm} />
      <PersonsForm setNumber={setNumber} setName={setName} newNumber={number} nameName={name} onSubmitForm={onSubmitForm} />
      <h2>Numbers</h2>
      ...
      <Persons persons={persons} />
    </>
  )
}

export default App
