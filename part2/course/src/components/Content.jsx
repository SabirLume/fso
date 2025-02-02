import Part from './Part'

const Content = () => {
  const data = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  const getTotal = (d) => {
    return d.parts.reduce((acc, curr) => {
      acc += curr.exercises
      return acc
    }, 0)
  }

  return (
    <>
      <ul>
        {
          data.map(content => (
            <>
              <h2 key={content.id}>{content.name}</h2>
              {
                content.parts.map((item) => {
                  return <Part text={item.name} amount={item.exercises} key={item.id} />
                })
              }
              <h2 key={content.id} >total of {getTotal(content)} exercises</h2>
            </>))
        }
      </ul >
    </>
  )
}
export default Content
