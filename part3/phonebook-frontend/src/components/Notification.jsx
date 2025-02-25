const Notification = ({ message, isError }) => {
  if (message === '') {
    return null
  }

  return (
    <>
      {
        isError ?
          <div className={"errorMessage"}>
            {message}
          </div>
          :
          <div className={"message"}>
            {message}
          </div>

      }
    </>
  )
}
export default Notification
