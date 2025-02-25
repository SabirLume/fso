import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonsForm from "./components/PersonForm";
import Notification from "./components/Notification";
import contactService from "./services/contact.jsx";
import "./App.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    contactService
      .getContacts()
      .then((response) => {
        setPersons(response);
      })
      .catch((e) => {
        console.error("error getting initial data", e);
      });
  }, []);

  const onSubmitCreate = () => {
    let person = "";
    person = persons.find((person) => person.name === name);
    if (person) {
      onSubmitUpdate(person);
      return;
    }
    const contact = { name: name, number: number };
    contactService
      .addContact(contact)
      .then((r) => {
        setPersons((n) => {
          return [...n, r];
        });
        setToastMessage("Successfully added contact!", false);
      })
      .catch((e) => console.error("error adding contact", e));
  };

  const onSubmitSearch = () => {
    setPersons((n) => {
      return n.filter((item) => {
        if (item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          return item;
        }
      });
    });
  };

  const onSubmitUpdate = (person) => {
    if (
      window.confirm("This contact already exists would you like to update?")
    ) {
      const updatePerson = { ...person, number: number };
      contactService
        .updateContact(person.id, updatePerson)
        .then(() => {
          setPersons((n) =>
            n.map((item) => {
              if (item.id === person.id) {
                return { ...item, number: number };
              }
              return item;
            }),
          );
          setToastMessage("Successfully Updated Contact", false);
        })
        .catch((e) => {
          if (e.status === 404) {
            setToastMessage("Can't update user doesn't exist", true);
          } else {
            setToastMessage("Error updating user", true);
          }
        });
    } else {
      return;
    }
  };

  const onSubmitDelete = (id) => {
    if (window.confirm("Do you want to delete this contact?")) {
      contactService
        .deleteContact(id)
        .then(() => {
          setPersons((n) => n.filter((item) => item.id !== id));
          setToastMessage("Successfully deleted contact", false);
        })
        .catch((e) => console.error("error deleting contact", e));
    }
  };

  const setToastMessage = (message, isError) => {
    setMessage(message);
    setIsError(isError);
    setTimeout(() => {
      setMessage("");
      setIsError(false);
    }, 5000);
  };

  return (
    <>
      <Notification message={message} isError={isError} />
      <h2>Phonebook</h2>
      <Filter
        setSearchTerm={setSearchTerm}
        onSubmitSearch={onSubmitSearch}
        searchTerm={searchTerm}
      />
      <PersonsForm
        setNumber={setNumber}
        setName={setName}
        newNumber={number}
        nameName={name}
        onSubmitCreate={onSubmitCreate}
      />
      <h2>Numbers</h2>
      ...
      <Persons persons={persons} onSubmitDelete={onSubmitDelete} />
    </>
  );
};

export default App;
