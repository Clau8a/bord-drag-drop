import React from 'react'
import PropTypes from 'prop-types'
import './draggable.scss'

// region contenedor de las columnas o listas de tarjetas
const ColumnsContainer = ({ view, statusLabel, dropDrag, taskIdLabel, children }) => {
  const [currentDragging, setCurrentDragging] = React.useState(null)

  const handleOnDropTask = (card, newStatus) => {
    if (card !== null) {
      if (card[statusLabel] !== newStatus) {
        dropDrag(card, newStatus)
      }
    }
  }

  let childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        view,
        taskIdLabel,
        draggable: currentDragging,
        dropDrag: handleOnDropTask,
        setDraggable: setCurrentDragging,
      })
    }
    return child
  })

  return <div className={`task-board-container ${view}`}>{childrenWithProps}</div>
}

ColumnsContainer.propTypes = {
  view: PropTypes.string,
  dropDrag: PropTypes.func,
  taskIdLabel: PropTypes.string,
  statusLabel: PropTypes.string,
  children: PropTypes.node,
}

ColumnsContainer.defaultProps = {
  view: 'kanban',
  dropDrag: (f) => f,
  taskIdLabel: 'id',
}
// endregion

export default ColumnsContainer
