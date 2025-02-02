const Persons = ({ persons }) => {
  return (
    <>
      {persons.map(item => (
        <>
          <li key={item.name}>{item.name} {item.number}</li>
        </>
      ))}
    </>
  )
}
export default Persons
