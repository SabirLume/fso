const Persons = ({ persons, onSubmitDelete }) => {
  return (
    <ul>
      {persons.map(item => (
        <li key={item.id}>{item.name} {item.number} <button onClick={() => onSubmitDelete(item.id)}>delete</button></li>
      ))}
    </ul>
  )
}
export default Persons
