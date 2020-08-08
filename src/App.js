import React, { Component } from 'react'
import shuffle from 'lodash.shuffle'

import './App.css'

import Card from './Card'
import GuessCount from './GuessCount'
import HallOfFame, {FAKE_HOF} from "./HallOfFame";
import HighScoreInput from "./HighScoreInput";

const SIDE = 2
const SYMBOLS = '🍕🍔🍟🌭🍿🧂🥓🥚🥯🥨🥐🍞🧈🥞🧇🍳🥖🧀🥗🥙🥪🌮🌯🥫🍱🥡🥠🍠🥟🥩🍗🍖🍘🍙🍚🍛🍜🦪🍣🍤🍥🥮🍢🧆🥘🍲🍝🥣🍰🎂🍪🍩🍨🍧🍦🥧🧁🍫🍬🍭🍡🍮🍯🍼🍷🍾🍶🧉🍵☕🧃🥛🍸🍹🍺🍻🥂🥃🧊🥤🍇🥥🥝🏺🥄🍴🍽🥢🍈🍉🍊🍋🍌🍍🥭🍎🌽🍆🍅🍓🍒🍑🍐🍏🌶🍄🥑🥒🥬🥦🥔🧄🌹🏵🌸💐🥜🌰🥕🧅🌺🌻🌼🌷🥀☘🌱🌲🍂🍁🍀🌿🌾🌵🌴🌳🍃'
const PAUSE_MS = 750

class App extends Component {
    state = {
        plateauCards: this.generateCards(),
        currentPair: [],
        guesses: 0,
        hallOfFame: null,
        matchedCardIndices: [],
    }

    generateCards() {
        const result = []
        const size = SIDE * SIDE
        const candidates = shuffle(SYMBOLS)
        while (result.length < size) {
            const card = candidates.pop()
            result.push(card, card)
        }
        return shuffle(result)
    }

    getCardFeedbackFor(index){
        const { currentPair, matchedCardIndices } = this.state
        const indexMatched = matchedCardIndices.includes(index)

        if(currentPair.length < 2){
            return indexMatched || index === currentPair[0] ? 'visible' : 'hidden'
        }

        if(currentPair.includes(index)){
            return indexMatched ? 'justMatched' : 'justMismatched'
        }

        return indexMatched ? 'visible' : 'hidden'
    }

    handleCardClick = (index, feedback) => {
        const { currentPair } = this.state

        if(feedback === 'visible' || currentPair.length === 2)
            return

        if (currentPair.length === 1 && index !== currentPair[0]){
            this.handleNewPairClosedBy(index)
        }

        if (currentPair.length === 0){
            this.setState({currentPair: [index] })
        }
    }

    handleNewPairClosedBy(index){
        const { plateauCards, currentPair, guesses, matchedCardIndices } = this.state
        const newPair = [currentPair[0], index]
        const newGuesses = guesses + 1
        const matched = plateauCards[newPair[0]] === plateauCards[newPair[1]]
        this.setState({currentPair: newPair, guesses: newGuesses})
        if(matched){
            this.setState({matchedCardIndices: [...matchedCardIndices, ...newPair] })
        }
        setTimeout(() => this.setState({currentPair: [] }), PAUSE_MS)
    }

    displayHallOfFame = (hallOfFame) => {
        this.setState({hallOfFame})
    }

    render() {
        const { plateauCards, guesses, hallOfFame, matchedCardIndices } = this.state
        const won = matchedCardIndices.length === plateauCards.length
        return (
            <div className="memory">
                <GuessCount guesses={guesses} />
                {plateauCards.map((card, index) => (
                    <Card
                        card={card}
                        feedback={this.getCardFeedbackFor(index)}
                        index={index}
                        key={index}
                        onClick={this.handleCardClick}
                    />
                ))}
                {won &&
                    (hallOfFame ? (
                        <HallOfFame entries={hallOfFame}/>
                    ) : (
                        <HighScoreInput guesses={guesses} onStored={this.displayHallOfFame} />
                    ))
                }
            </div>
        )
    }
}

export default App