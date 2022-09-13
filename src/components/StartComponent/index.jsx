import React from 'react'
import classes from './StartComponent.module.scss'
import { PropTypes } from 'prop-types'

const StartComponent = ({ startProp }) => {

	return (
		<div className={classes.startComponent}>
		</div>
	)
}

StartComponent.propTypes = {
	startProps: PropTypes.string,
}

export default StartComponent