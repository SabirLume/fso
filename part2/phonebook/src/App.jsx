import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonsForm from './components/PersonForm'
import contactService from './services/contact.jsx'

const App = () => {
  const [persons, setPersons] = useState([])
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    contactService.getContacts().then(response => {
      setPersons(response)
    }).catch(e => { console.error("error getting initial data", e) })
  }, [])


  const onSubmitForm = () => {
    let person = '';
    person = persons.find(person => person.name === name);
    if (person) {
      alert(`${person.name} is a duplicate name`)
      return
    }
    const contact = { name: name, number: number }
    contactService.addContact(contact)
      .then(() => {
        setPersons(n => {
          return [
            ...n,
            contact
          ]
        })
      })
      .catch(e => console.error("error adding contact", e))
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

  const onSubmitDelete = id => {
    if (window.confirm("Do you want to delete this contact?")) {

      contactService.deleteContact(id).then(() => {
        setPersons(n =>
          n.filter(item => item.id !== id)
        )
      }).catch(e => console.error("error deleting contact", e))
    }
  }

  return (
    <>
      <h2>Phonebook</h2>
      <Filter setSearchTerm={setSearchTerm} onSubmitSearch={onSubmitSearch} searchTerm={searchTerm} />
      <PersonsForm setNumber={setNumber} setName={setName} newNumber={number} nameName={name} onSubmitForm={onSubmitForm} />
      <h2>Numbers</h2>
      ...
      <Persons persons={persons} onSubmitDelete={onSubmitDelete} />
    </>
  )
}

export default App
