import React from 'react'
import PropTypes from 'prop-types'

function ColumnHeader({ title, taskLength, color }) {
  function formatCounter(counter) {
    return counter > 9 ? '+9' : `0${counter}`
  }

  return (
    <div className='column-header'>
      <label
        title={`${taskLength} tasks`}
        className='counter'
        style={{ backgroundColor: `${color}` }}
      >
        {formatCounter(taskLength)}
      </label>
      <label className='title'>{title}</label>
    </div>
  )
}

ColumnHeader.propTypes = {
  title: PropTypes.string,
  taskLength: PropTypes.number,
  color: PropTypes.string,
}

ColumnHeader.defaultProps = {
  title: '',
  taskLength: 0,
  color: '#000',
}

export default ColumnHeader
