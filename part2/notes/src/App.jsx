import { useState, useEffect } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import noteService from './services/note.jsx'
import './App.css'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    noteService.getAll()
      .then(
        response => {
          setNotes(response);
        }
      )
      .catch(() => {
        setErrorMessage(
          'Error loading notes'
        )
        setTimeout(() => { setErrorMessage(null) }, 5000)
      })
  }, [])

  const handleAddNote = async () => {
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }

    noteService.create(noteObject)
      .then(response => {
        setNotes(n => {
          return [...n, response]
        })
      })
      .catch(() => {
        setErrorMessage(
          `Error adding note`
        )
        setTimeout(() => { setErrorMessage(null) }, 5000)
      })
  }

  const handleToggleImportant = (id) => {
    const note = notes.find(x => {
      return x.id === id
    })

    const body = {
      ...note,
      important: !note.important
    };

    noteService
      .update(id, body)
      .then(response => {
        setNotes(n => {
          return n.map(item => {
            if (item.id === response.id) {
              return { ...item, important: response.important }
            }
            return item;
          })
        })
      })
      .catch(() => {
        setErrorMessage(
          `Note ${note.content} was already removed from server`
        )
        setTimeout(() => { setErrorMessage(null) }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <ul>
        {notes.map(note =>
          <Note key={note.id} note={note} toggleImportance={() => { handleToggleImportant(note.id) }} />
        )}
      </ul>
      <input onChange={e => { setNewNote(e.target.value) }} value={newNote}></input>
      <button onClick={handleAddNote}>add note</button>
      <Footer />
    </div >
  )
}

export default App 
