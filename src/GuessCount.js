import React from 'react'
import PropTypes from 'prop-types'

import './GuessCount.css'

const GuessCount = ({ guesses }) => (
    <div className="guesses">
        <p>
            Vous êtes à {guesses}
            {guesses <= 1 ? ' tentative' : ' tentatives'}
            .
        </p>
    </div>);


GuessCount.propTypes = {
    guesses: PropTypes.number.isRequired,
};

export default GuessCount