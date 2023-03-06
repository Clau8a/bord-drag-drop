import React from 'react';

interface ColumnHeaderProps {
  title: string;
  taskLength: number;
  color: string;
}

function ColumnHeader({ title = '', taskLength = 0, color = '#000' }: ColumnHeaderProps) {
  function formatCounter(counter: number) {
    return counter > 9 ? '+9' : `0${counter}`;
  }

  return (
    <div className='column-header'>
      <label
        title={`${taskLength} tasks`}
        className='counter'
        style={{ backgroundColor: `${color}` }}
      >
        {formatCounter(taskLength)}
      </label>
      <label className='title'>{title}</label>
    </div>
  );
}

export default ColumnHeader;
