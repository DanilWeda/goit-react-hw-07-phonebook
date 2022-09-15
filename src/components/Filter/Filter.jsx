import React, { Component } from 'react'
import classes from './Filter.module.scss'
import { PropTypes } from 'prop-types'

class Filter extends Component {

  static propTypes = {
    filter: PropTypes.string.isRequired,
    onFilter: PropTypes.func.isRequired,
  }

  handleFilterChange = (e) => {
    this.props.onFilter(e.target.value)
  }

  render() {
    return (
      <div className={classes.stats}>
        <input
          onInput={this.handleFilterChange}
          type="text"
          name="filter"
          value={this.props.filter}
        />
      </div>
    )
  }
}


export default Filter
