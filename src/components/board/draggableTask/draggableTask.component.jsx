import React from 'react'
import PropTypes from 'prop-types'

const DraggableCard = ({ task, idkey, draggable, setDraggable, component, color }) => {
  // this function sets a new task as the target with de propfunct setDraggable
  function drag() {
    if (typeof draggable === 'undefined' || draggable === null) {
      setDraggable(task)
    } else if (draggable.id !== task[idkey]) {
      setDraggable(task)
    }
  }

  return (
    <div onDragStart={drag} draggable data-testid={`draggableTask-${task.id_task}`}>
      {component ? (
        component({ ...task, color })
      ) : (
        <div className='card'>
          <div className='Card-body'>
            <span>yo shoud send a component to show a card</span>
          </div>
        </div>
      )}
    </div>
  )
}

DraggableCard.propTypes = {
  task: PropTypes.object.isRequired,
  idkey: PropTypes.string,
  draggable: PropTypes.object,
  setDraggable: PropTypes.func,
  component: PropTypes.func,
  color: PropTypes.string,
}

DraggableCard.defaultProps = {
  draggable: null,
  component: null,
  idkey: 'is_task',
  setDraggable: (f) => f,
  color: '#eaeaea',
}

export default DraggableCard
