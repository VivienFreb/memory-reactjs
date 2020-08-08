import PropTypes from 'prop-types'
import React, { Component } from 'react'

import './HighScoreInput.css'

import { saveHOFEntry } from './HallOfFame'

class HighScoreInput extends Component {
    state = { winner: ''};

    handleWinnerUpdate = (event) => {
        this.setState({ winner: event.target.value.toUpperCase() })
    };

    persistWinner = (event) => {
        event.preventDefault();
        const newEntry = {guesses: this.props.guesses, player: this.state.winner};
        saveHOFEntry(newEntry, this.props.onStored)
    };

    render() {
        return (
            <div className="wrap-login">
                <form className="login-form" onSubmit={this.persistWinner}>
					<span className="login-form-title">
						Well Done!
					</span>

                    <div className="wrap-input">
                        <span className="label-input">Pseudonyme</span>
                        <input
                            className="input"
                            type="text"
                            autoComplete="given-name"
                            value={this.state.winner}
                            onChange={this.handleWinnerUpdate}
                            name="username"
                            placeholder="Entrez votre pseudonyme"
                        />
                        <span className="focus-input" data-symbol="🙍‍♂️"/>
                    </div>

                    <div className="container-login-form-btn">
                        <div className="wrap-login-form-btn">
                            <div className="login-form-bgbtn"/>
                            <button className="login-form-btn" type="submit">
                                Envoyer mon score
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

HighScoreInput.propTypes = {
    guesses: PropTypes.number.isRequired,
    onStored: PropTypes.func.isRequired
};

export default HighScoreInput