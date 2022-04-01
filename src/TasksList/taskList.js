import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ColumnsContainer from '../components/ColumnsContainer'
import ColumnDrag from '../components/column'
import TaskCard from './taskCard'
import { dummyData } from '../utils/constants'

function TasksList({ view }) {
  const [tasks, setTask] = useState(dummyData)

  const ChangeTaskStatus = (taskChanged, newStatus) => {
    setTask(
      tasks.map((task) =>
        task.id_task === taskChanged.id_task ? { ...task, statusId: newStatus } : { ...task },
      ),
    )
  }

  return (
    <ColumnsContainer view={view} dropDrag={ChangeTaskStatus} taskIdLabel='id_task'>
      <ColumnDrag
        id='1'
        title='column 1'
        color='#222'
        tasks={tasks.filter((task) => task.statusId === '1')}
        taskComponent={TaskCard}
      />
      <ColumnDrag
        id='2'
        title='column 2'
        color='blue'
        tasks={tasks.filter((task) => task.statusId === '2')}
        taskComponent={TaskCard}
      />
      <ColumnDrag
        id='pending'
        title='pending'
        color='#f3f'
        tasks={tasks.filter((task) => task.statusId === 'pending')}
        taskComponent={TaskCard}
      />
      <ColumnDrag
        id='done'
        title='Done'
        color='#8c00ff'
        tasks={tasks.filter((task) => task.statusId === 'done')}
        taskComponent={TaskCard}
      />
      <ColumnDrag
        id='cancel'
        title='Cancel'
        color='#ff8300'
        tasks={tasks.filter((task) => task.statusId === 'cancel')}
        taskComponent={TaskCard}
      />
    </ColumnsContainer>
  )
}

TasksList.propTypes = {
  view: PropTypes.string,
}

TasksList.defaultProps = {
  view: 'kanban',
}

export default TasksList
