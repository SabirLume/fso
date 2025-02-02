import { useState } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonsForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const onSubmitForm = () => {
    let person = '';
    person = persons.find(person => person.name === newName);
    if (person) {
      alert(`${person.name} is a duplicate name`)
      return
    }

    setPersons(n => {
      return [
        ...n,
        { name: newName, number: newNumber }
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
      <PersonsForm setNumber={setNumber} setName={setName} newNumber={newNumber} nameName={newName} onSubmitForm={onSubmitForm} />
      <h2>Numbers</h2>
      ...
      <Persons persons={persons} />
    </>
  )
}

export default App
