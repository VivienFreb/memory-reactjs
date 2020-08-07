import React from 'react'
import PropTypes from 'prop-types'

import './GuessCount.css'

const GuessCount = ({ guesses }) => (
    <div className="guesses">
        <p>
            Vous êtes à {guesses} essais.
        </p>
    </div>)


GuessCount.propTypes = {
    guesses: PropTypes.number.isRequired,
}

export default GuessCount