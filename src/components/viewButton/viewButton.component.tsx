import React from 'react';
import { getView } from '../../utils/constants';
import './viewButton.style.scss';

interface ViewButtonProps {
  view: string;
  handleChangeView(): void;
}

const ViewButton = ({ view, handleChangeView }: ViewButtonProps) => {
  return (
    <button className='view-button' onClick={handleChangeView}>
      Change to {getView(view)}
    </button>
  );
};

export default ViewButton;
