import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import DraggableCard from '../draggableTask/draggableTask.component'

const ColumnDrag = ({
  view,
  column,
  cardList,
  dropDrag,
  draggable: draggableCardRef,
  cardComponent,
  setDraggable,
  cardIdLabel,
  columnHeaderComponent,
}) => {
  const { id, title, isRestricted, color } = column
  const [isOpenCollapse, setIsOpenCollapse] = useState(true)
  const [over, setOver] = useState('')

  useEffect(() => {
    if (view === 'kanban') {
      setIsOpenCollapse(true)
    }
  }, [view])

  function drop(e, iDropedElement) {
    // sending to pa
    dropDrag(draggableCardRef, iDropedElement)
    // clean target card
    setDraggable(null)
    setOver('')
  }

  function setDraggableCardRef(card) {
    if (isRestricted) {
      return
    }
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
    <div className='column-task-container' data-testid='column'>
      <div onClick={setCollapse} />
      {columnHeaderComponent(title, cardList.length, color)}
      <div
        className={`column-body ${over} ${isOpenCollapse ? 'open' : 'collapse'}`}
        onDrop={(e) => drop(e, id)}
        onDragOver={handleDragOver}
        onDragLeave={(e) => {
          e.preventDefault()
          setOver('')
        }}
        style={{ cursor: `${isRestricted ? 'no-drop' : 'auto'}` }}
        data-testid={`${title}-drag`}
      >
        <div data-testid={title}>
          {cardList.map((card) => (
            <DraggableCard
              key={card[cardIdLabel]}
              card={card}
              cardIdLabel={cardIdLabel}
              columnColor={color}
              draggableCardRef={draggableCardRef}
              setDraggableCardRef={setDraggableCardRef}
              cardComponent={cardComponent}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

ColumnDrag.propTypes = {
  column: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    color: PropTypes.string,
    isRestricted: PropTypes.bool,
  }),
  view: PropTypes.string,
  tasks: PropTypes.array,
  taskIdLabel: PropTypes.string,
  dropDrag: PropTypes.func,
  setDraggable: PropTypes.func,
  draggable: PropTypes.object,
  taskComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  columnHeaderComponent: PropTypes.func,
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
  columnHeaderComponent: (f) => f,
}

export default ColumnDrag
