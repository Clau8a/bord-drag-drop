/* eslint-disable arrow-parens */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import PropTypes from 'prop-types';

// region C A R D   d r a g g a b l e
const DraggableCard = (props) => {
  const {
    card, idkey, draggable, setDraggable, clickOnCard, component,
  } = props;

  // function fires when drag, it puts a new card as the target with de propfunct setDraggable
  function drag() {
    if (typeof draggable === 'undefined' || draggable === null) {
      setDraggable(card);
    } else if (draggable.id !== card[idkey]) {
      setDraggable(card);
    }
  }

  function clickCard() {
    clickOnCard(card);
  }

  return (
    <div className="draggble-card" onClick={clickCard}>
      <div
        onDrag={drag}
        draggable
        id={card[idkey]}
      >
        {
          component
            ? component(card)
            : (
              <div className="card">
                <div className="Card-body">
                  <span>yo shoud send a component to show a card</span>
                </div>
              </div>
            )
        }
      </div>
    </div>
  );
};

// prop clickOnCard comes from what the user needs to do when card is clicked but not dragged
DraggableCard.propTypes = {
  card: PropTypes.object.isRequired,
  draggable: PropTypes.object,
  setDraggable: PropTypes.func,
  clickOnCard: PropTypes.func,
  component: PropTypes.func,
  idkey: PropTypes.string,
};

DraggableCard.defaultProps = {
  draggable: null,
  clickOnCard: () => { },
  component: null,
  idkey: 'id',
  setDraggable: f => f,
};
// endregion

export default DraggableCard;
