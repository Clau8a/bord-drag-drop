import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ColumnsContainer from './columns/columnContainer'
import ColumnDrag from './columns/columnDrag'
import TaskCard from './taskCard/taskCard'
import ColumnHeader from './columns/columnHeader.component'
import './draggable.scss'

const Board = ({ view, data, columns, statusLabel, taskComponent, columnHeaderComponent }) => {
  const [tasks, setTask] = useState(data)

  const ChangeTaskStatus = (taskChanged, newStatus) => {
    setTask(
      tasks.map((task) =>
        task.id_task === taskChanged.id_task ? { ...task, statusId: newStatus } : { ...task },
      ),
    )
  }

  return (
    <ColumnsContainer
      view={view}
      dropDrag={ChangeTaskStatus}
      taskIdLabel='id_task'
      statusLabel={statusLabel}
    >
      {columns.map((column) => (
        <ColumnDrag
          key={column.id}
          id={column.id}
          title={column.title.toLocaleLowerCase()}
          color={column.color}
          tasks={tasks.filter((task) => task[statusLabel] === column.id)}
          taskComponent={taskComponent}
          columnHeaderComponent={columnHeaderComponent}
        />
      ))}
    </ColumnsContainer>
  )
}

Board.propTypes = {
  view: PropTypes.string,
  data: PropTypes.array,
  columns: PropTypes.array,
  taskComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  columnHeaderComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  statusLabel: PropTypes.string.isRequired,
}

Board.defaultProps = {
  view: 'kanban',
  data: [],
  columns: [],
  taskComponent: TaskCard,
  columnHeaderComponent: (title, taskLength, color) => (
    <ColumnHeader title={title} taskLength={taskLength} color={color} />
  ),
}

export default Board
