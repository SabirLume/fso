const Persons = ({ persons, onSubmitDelete }) => {
  return (
    <>
      {persons.map(item => (
        <>
          <li key={item.id}>{item.name} {item.number} <button onClick={() => onSubmitDelete(item.id)}>delete</button></li>
        </>
      ))}
    </>
  )
}
export default Persons
