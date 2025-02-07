import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'
import noteService from './services/note.jsx'
const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')

  useEffect(() => {
    noteService.getAll().then(
      response => {
        setNotes(response);
      }
    ).catch(e => {
      console.error("error fetching notes", e)
    });
  }, [])

  const handleAddNote = async () => {
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }
    noteService.create(noteObject).then(response => {
      setNotes(n => {
        return [...n, response]
      })
    }).catch(e => console.error("error adding note", e));
  }

  const handleToggleImportant = (id) => {
    const note = notes.find(x => {
      return x.id === id
    })

    const body = {
      ...note,
      important: !note.important
    };
    noteService.update(id, body).then(response => {
      setNotes(n => {
        const data = n.map(item => {
          if (item.id === response.id) {
            item.important = response.important
          }
          return item;
        }).catch(e => console.error("error updating not", e));
        return [...data]
      })
    }
    );
  }

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note =>
          <Note key={note.id} note={note} toggleImportance={() => { handleToggleImportant(note.id) }} />
        )}
      </ul>
      <input onChange={e => { setNewNote(e.target.value) }} value={newNote}></input>
      <button onClick={handleAddNote}>add note</button>
    </div >
  )
}

export default App 
