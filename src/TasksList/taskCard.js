import React from 'react';
import './task.scss';
const TaskCard = (card) => {


  return (
    <div className="card custom-card">
      <div className="card-header">
        <label>{card.title}</label>
      </div>
    </div>
  );
};

export default TaskCard;
