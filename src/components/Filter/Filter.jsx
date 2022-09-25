import classes from './Filter.module.scss'
import { PropTypes } from 'prop-types'

const Filter = ({ filter, onFilter }) => {



  const handleFilterChange = (e) => {
    onFilter(e.target.value)
  }

    return (
      <div className={classes.stats}>
        <input
          onInput={handleFilterChange}
          type="text"
          name="filter"
          value={filter}
        />
      </div>
    )
}

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onFilter: PropTypes.func.isRequired,
}


export default Filter
