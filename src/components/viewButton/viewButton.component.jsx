import React from 'react'
import PropTypes from 'prop-types'
import { getView } from '../../utils/constants'
import './viewButton.style.scss'

const ViewButton = ({ view, handleChangeView }) => {
  return (
    <button className='view-button' onClick={handleChangeView}>
      Change to {getView(view)}
    </button>
  )
}

ViewButton.propTypes = {
  view: PropTypes.string,
  handleChangeView: PropTypes.func,
}

export default ViewButton
