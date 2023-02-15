import React from 'react'
import PropTypes from 'prop-types'

const DraggableCard = ({
  card,
  cardIdLabel,
  draggableCardRef,
  setDraggableCardRef,
  cardComponent,
  columnColor,
}) => {
  // this function sets a new task as the target with de propfunct setDraggable
  function drag() {
    if (typeof draggableCardRef !== undefined || draggableCardRef !== null) {
      setDraggableCardRef(card)
    } else if (draggableCardRef[cardIdLabel] !== card[cardIdLabel]) {
      setDraggableCardRef(card)
    }
  }

  return (
    <div onDragStart={drag} draggable data-testid={`draggableTask-${card[cardIdLabel]}`}>
      {cardComponent({ card, color: columnColor })}
    </div>
  )
}

DraggableCard.propTypes = {
  card: PropTypes.object.isRequired,
  cardIdLabel: PropTypes.string.isRequired,
  cardComponent: PropTypes.node.isRequired,
  draggableCardRef: PropTypes.object,
  setDraggableCardRef: PropTypes.func.isRequired,
  columnColor: PropTypes.string,
}

DraggableCard.defaultProps = {
  draggable: null,
  setDraggableCardRef: (f) => f,
  color: '',
}

export default DraggableCard
