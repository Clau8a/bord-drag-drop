import React from 'react';

const TaskCard = ({ card, color }) => {
  return (
    <div className='custom-task' data-testid='task' style={{ border: `1px solid ${color}` }}>
      <div className='task-header'>
        <label>{card.title}</label>
      </div>
      {card.description && <div className='description'>{card.description}</div>}
    </div>
  );
};

export default TaskCard;
