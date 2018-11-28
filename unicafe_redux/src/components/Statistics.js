import React from 'react'
import PropTypes from 'prop-types'

const Statistics = (props) => {
  const stats = []
  const all_values = {}
  for (let stat in props.values) {
    all_values[stat] = props.values[stat].value
    stats.push(<Statistic key={props.values[stat].text} name={props.values[stat].text} value={props.values[stat].value} />)
  }

  const total_votes = all_values.good + all_values.neutral + all_values.bad
  const average = (all_values.good + -1 * all_values.bad) / total_votes
  const pct_positive = ((all_values.good / total_votes) * 100).toFixed(1) + ' %'

  stats.push(<Statistic key="average" name="Average" value={average.toPrecision(2)}/>)
  stats.push(<Statistic key="pct_positive" name="% positive" value={pct_positive}/>)

  if (total_votes === 0) {
    return(
      <div>
        <h2>{props.title}</h2>
        <p>No feedback given yet.</p></div>
    )
  }
  return (
    <div>
      <h2>{props.title}</h2>
      <table><tbody>{stats}</tbody></table>
    </div>
  )
}

Statistics.propTypes = {
  values: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
}

const Statistic = (props) => {
  return (
    <tr><td>{props.name}</td><td>{props.value}</td></tr>
  )
}

Statistic.propTypes = {
  value: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
}

export default Statistics
