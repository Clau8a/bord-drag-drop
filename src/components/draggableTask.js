import React from 'react'
import PropTypes from 'prop-types'

const DraggableCard = ({ task, idkey, draggable, setDraggable, component }) => {
  // function fires when drag, it puts a new
  // task as the target with de propfunct setDraggable
  function drag() {
    if (typeof draggable === 'undefined' || draggable === null) {
      setDraggable(task)
    } else if (draggable.id !== task[idkey]) {
      setDraggable(task)
    }
  }

  return (
    <div onDrag={drag} draggable id={task[idkey]}>
      {component ? (
        component(task)
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
}

DraggableCard.defaultProps = {
  draggable: null,
  component: null,
  idkey: 'id',
  setDraggable: (f) => f,
}

export default DraggableCard
