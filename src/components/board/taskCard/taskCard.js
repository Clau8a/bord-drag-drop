import React from 'react'
import './task.scss'

const TaskCard = ({ card }) => {
  return (
    <div className='task' data-testid={`task-${card.id_task}`}>
      <div className='task-header'>
        <label>{card.title}</label>
      </div>
      <div className='description'>{card.description}</div>
    </div>
  )
}

export default TaskCard
