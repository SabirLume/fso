import { useState, useEffect } from 'react'

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Statistics = ({ good, neutral, bad, total, average, percent }) => {
  if (total === 0) {
    return (<p>No feedback given </p>)
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th scope="col">Names</th>
            <th scope="col">Stats</th>
          </tr>
        </thead>
        <tr>
          <th scope="row">Good</th>
          <td><StatisticLine stats={good} /></td>
        </tr>
        <tr>
          <th scope="row">neutral</th>
          <td><StatisticLine stats={neutral} /></td>
        </tr>
        <tr>
          <th scope="row">bad</th>
          <td><StatisticLine stats={bad} /></td>
        </tr>
        <tr>
          <th scope="row">total</th>
          <td><StatisticLine stats={total} /></td>
        </tr>
        <tr>
          <th scope="row">average</th>
          <td><StatisticLine stats={average} /></td>
        </tr>
        <tr>
          <th scope="row">percent</th>
          <td><StatisticLine stats={percent} /></td>
        </tr>
      </table>
    </>
  )
}

const StatisticLine = ({ stats, text }) => {
  return (
    <>
      <p>{text} {stats}</p>
    </>
  )
}

const Anecdotes = ({ anecdote, votes, max, maxAnecdote }) => {
  if (!anecdote) {
    return (<></>)
  }
  return (
    <>
      <h1> Anecdote of the Day </h1>
      <p>{anecdote}</p>
      <p>has {votes} votes </p>
      <h1> Anecdote with the most votes </h1>
      <p>{max} </p>
      <p>{maxAnecdote}</p>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [percent, setPercent] = useState(0)
  const [anecdote, setAnecdote] = useState(0)
  const [votes, setVote] = useState(new Array(8).fill(0))
  const [highestVote, setHighestVote] = useState(0)
  const anecdotes = {
    0: 'If it hurts, do it more often.',
    1: 'Adding manpower to a late software project makes it later!',
    2: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    3: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    4: 'Premature optimization is the root of all evil.',
    5: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    6: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    7: 'The only way to go fast, is to go well.'
  }


  useEffect(() => {
    setAverage(calcAverage())
    setPercent(percentPositive())
  }, [good, neutral, bad])

  const calcAverage = () => {
    return (good + (bad * -1)) / (total)
  }

  const percentPositive = () => {
    return good / total * 100
  }

  const handleGoodStat = () => {
    setGood(n => (n + 1))
    setTotal(n => (n + 1))
    setAverage(calcAverage())
  }

  const handleNeutralStat = () => {
    setNeutral(n => (n + 1))
    setTotal(n => (n + 1))
    setAverage(calcAverage())
  }

  const handleBadStat = () => {
    setBad(n => (n + 1))
    setTotal(n => (n + 1))
    setAverage(calcAverage())
  }

  const handleAnecdote = () => {
    const indx = Math.floor(Math.random() * Object.keys(anecdotes).length)
    return setAnecdote(indx)
  }

  const handleVote = () => {
    const votesCopy = [...votes];
    votesCopy[anecdote] += 1;
    setVote(votesCopy)
  }

  const getHighestVotes = () => {
    let max = 0;
    let loc;
    votes.map((x, indx) => {
      if (x > max) {
        max = x;
        loc = indx;
      }
    })

    return loc
  }

  return (
    <>
      <h1>give feedback</h1>
      <Button onClick={handleGoodStat} text={"good"} />
      <Button onClick={handleNeutralStat} text={"neutral"} />
      <Button onClick={handleBadStat} text={"bad"} />
      <h1>statistics</h1>
      <Statistics neutral={neutral} good={good} bad={bad} total={total} percent={percent} average={average} />
      <Button onClick={handleAnecdote} text={"Random Anecdote"} />
      <Button onClick={handleVote} text={"Vote for Anecdote"} />
      <Anecdotes anecdote={anecdotes[anecdote]} votes={votes[anecdote]} max={anecdotes[getHighestVotes()]} />

    </>
  )
}

export default App
