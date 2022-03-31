import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ColumnsContainer from '../components/ColumnsContainer'
import ColumnDrag from '../components/column'
import TaskCard from './taskCard'
import { dummyData, columnsArray } from '../utils/constants'

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
      {columnsArray.map((column) => (
        <ColumnDrag
          key={column.id}
          id={column.id}
          title={column.title.toLocaleLowerCase()}
          color={column.color}
          tasks={tasks.filter((task) => task.statusId === column.id)}
          taskComponent={TaskCard}
        />
      ))}
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
