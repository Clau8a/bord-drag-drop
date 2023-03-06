import React from 'react';
import './task.scss';

interface CardType {
  title: string;
  description: string;
}

interface TaskCardProps {
  card: CardType;
}

const TaskCard = ({ card }: TaskCardProps) => {
  return (
    <div className='task' data-testid={`task-${card.title}`}>
      <div className='task-header'>
        <label>{card.title}</label>
      </div>
      <div className='description'>{card.description}</div>
    </div>
  );
};

export default TaskCard;
