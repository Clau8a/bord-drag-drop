import React from 'react'
import PropTypes from 'prop-types'

const CustomColumnHeader = ({ title, color }) => {
  return (
    <div className='custom-column-header' style={{ border: `1px solid ${color}` }}>
      <label className='title'>{title}</label>
    </div>
  )
}

CustomColumnHeader.propTypes = {
  title: PropTypes.string,
  color: PropTypes.string,
}

CustomColumnHeader.defaultProps = {
  title: '',
  color: '#eaeaea',
}

export default CustomColumnHeader
