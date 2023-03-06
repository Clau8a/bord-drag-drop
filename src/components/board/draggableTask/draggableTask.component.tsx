import React from 'react';

interface card {
  [key: string]: string;
}

interface cardComponentProps {
  card: card;
  color: string;
}

interface draggableCardProps {
  card: card;
  cardIdLabel: string;
  draggableCardRef: card | null;
  setDraggableCardRef(card: {}): void;
  cardComponent(props: cardComponentProps): React.ReactNode;
  columnColor: string;
}

const DraggableCard = ({
  card,
  cardIdLabel,
  draggableCardRef,
  setDraggableCardRef,
  cardComponent,
  columnColor = '',
}: draggableCardProps) => {
  // this function sets a new task as the target with de propfunct setDraggable
  function drag() {
    if (typeof draggableCardRef !== undefined || draggableCardRef !== null) {
      setDraggableCardRef(card);
    } else if (draggableCardRef[cardIdLabel] !== card[cardIdLabel]) {
      setDraggableCardRef(card);
    }
  }

  return (
    <div onDragStart={drag} draggable data-testid={`draggableTask-${card[cardIdLabel]}`}>
      {cardComponent({ card, color: columnColor })}
    </div>
  );
};

export default DraggableCard;
