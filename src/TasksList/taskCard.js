import React from 'react';
import './task.scss';
const TaskCard = (card) => {


  return (
    <div className="task">
      <div className="task-header">
        <label>{card.title}</label>
      </div>
      <div></div>
    </div>
  );
};

export default TaskCard;
