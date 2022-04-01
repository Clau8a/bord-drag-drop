import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Task from './draggableTask'

const ColumnDrag = ({
  title,
  color,
  view,
  dropDrag,
  id,
  draggable,
  tasks,
  taskComponent,
  setDraggable,
  taskIdLabel,
  isRestricted,
}) => {
  const [isOpenCollapse, setIsOpenCollapse] = useState(true)
  const [over, setOver] = useState('')

  useEffect(() => {
    if (view === 'kanban') {
      setIsOpenCollapse(true)
    }
  }, [view])

  function formatCounter(counter) {
    return counter > 9 ? '+9' : `0${counter}`
  }

  function drop(e, iDropedElement) {
    // sending to pa
    dropDrag(draggable, iDropedElement)
    // clean target card
    setDraggable(null)
    setOver('')
  }

  function setCardTarget(card) {
    setDraggable(card)
  }

  function setCollapse() {
    console.log('setcollapse')
    if (view === 'list') {
      setIsOpenCollapse(!isOpenCollapse)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    if (isRestricted) {
      setOver('over block')
    } else {
      setOver('over')
    }
  }

  return (
    <div className='column-task-container'>
      <div className='column-header' onClick={setCollapse}>
        <label
          title={`${tasks.length} tasks`}
          className='counter'
          style={{ backgroundColor: `${color}` }}
        >
          {formatCounter(tasks.length)}
        </label>
        <label className='title'>{title}</label>
      </div>

      <div
        className={`column-body ${over} ${isOpenCollapse ? 'open' : 'collapse'}`}
        onDrop={(e) => drop(e, id)}
        onDragOver={handleDragOver}
        onDragLeave={(e) => {
          e.preventDefault()
          setOver('')
        }}
        style={{ cursor: `${isRestricted ? 'no-drop' : 'auto'}` }}
      >
        {/* <MDBCollapse isOpen={isOpenCollapse}> */}
        <div>
          {tasks.map((task) => (
            <Task
              key={task[taskIdLabel]}
              task={task}
              view={view}
              color={color}
              draggable={draggable}
              setDraggable={!isRestricted ? setCardTarget : (f) => f}
              idKey={taskIdLabel}
              component={taskComponent}
            />
          ))}
        </div>
        {/* </MDBCollapse> */}
      </div>
    </div>
  )
}

ColumnDrag.propTypes = {
  title: PropTypes.string,
  color: PropTypes.string,
  view: PropTypes.string,
  tasks: PropTypes.array,
  taskIdLabel: PropTypes.string,
  taskComponent: PropTypes.func,
  isRestricted: PropTypes.bool,
  dropDrag: PropTypes.func,
  setDraggable: PropTypes.func,
  id: PropTypes.string,
  draggable: PropTypes.bool,
}

ColumnDrag.defaultProps = {
  title: 'Column Title',
  view: 'kanban',
  color: '000',
  tasks: [],
  taskIdLabel: 'id',
  taskComponent: null,
  isRestricted: false,
  dropDrag: (f) => f,
  setDraggable: (f) => f,
}

export default ColumnDrag
