import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ColumnsContainer from '../components/ColumnsContainer'
import ColumnDrag from '../components/column'
import TaskCard from '../components/taskCard/taskCard'

function TasksList({ view, data, columns }) {
  const [tasks, setTask] = useState(data)

  const ChangeTaskStatus = (taskChanged, newStatus) => {
    setTask(
      tasks.map((task) =>
        task.id_task === taskChanged.id_task ? { ...task, statusId: newStatus } : { ...task },
      ),
    )
  }

  return (
    <ColumnsContainer view={view} dropDrag={ChangeTaskStatus} taskIdLabel='id_task'>
      {columns.map((column) => (
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
  data: PropTypes.array,
  columns: PropTypes.array,
}

TasksList.defaultProps = {
  view: 'kanban',
  data: [],
  columns: [],
}

export default TasksList
