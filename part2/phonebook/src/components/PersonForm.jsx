const PersonForm = ({ newNumber, setNumber, newName, setName, onSubmitCreate }) => {
  return (
    <form>
      <div>
        number: <input id="number-input" value={newNumber} onChange={(e) => { setNumber(e.target.value) }} />
      </div>
      <div>
        name: <input id="name-input" value={newName} onChange={(e) => { setName(e.target.value) }} />
      </div>
      <div>
        <button id="input-button" type="button" onClick={onSubmitCreate}>add</button>
      </div>
    </form>
  )
}
export default PersonForm

