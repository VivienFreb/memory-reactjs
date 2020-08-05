import React, { Component } from 'react'
import shuffle from 'lodash.shuffle'

import './App.css'

import Card from './Card'
import GuessCount from './GuessCount'

import HallOfFame, {FAKE_HOF} from "./HallOfFame";

const SIDE = 3
const SYMBOLS = '🍕🍔🍟🌭🍿🧂🥓🥚🥯🥨🥐🍞🧈🥞🧇🍳🥖🧀🥗🥙🥪🌮🌯🥫🍱🥡🥠🍠🥟🥩🍗🍖🍘🍙🍚🍛🍜🦪🍣🍤🍥🥮🍢🧆🥘🍲🍝🥣🍰🎂🍪🍩🍨🍧🍦🥧🧁🍫🍬🍭🍡🍮🍯🍼🍷🍾🍶🧉🍵☕🧃🥛🍸🍹🍺🍻🥂🥃🧊🥤🍇🥥🥝🏺🥄🍴🍽🥢🍈🍉🍊🍋🍌🍍🥭🍎🌽🍆🍅🍓🍒🍑🍐🍏🌶🍄🥑🥒🥬🥦🥔🧄🌹🏵🌸💐🥜🌰🥕🧅🌺🌻🌼🌷🥀☘🌱🌲🍂🍁🍀🌿🌾🌵🌴🌳🍃'
const PAUSE_MS = 750

class App extends Component {
    state = {
        plateauCards: this.generateCards(),
        currentPair: [],
        guesses: 0,
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

    handleCardClick = index => {
        const { currentPair } = this.state

        if(currentPair.length === 2){
            return
        }

        if (currentPair.length === 0){
            this.setState({currentPair: [index] })
            return
        }

        this.handleNewPairClosedBy(index)
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



    render() {
        const { plateauCards, guesses, matchedCardIndices } = this.state
        const won = matchedCardIndices.length === plateauCards.length
        return (
            <div className="memory">
                <GuessCount guesses={0} />
                {plateauCards.map((card, index) => (
                    <Card
                        card={card}
                        feedback={this.getCardFeedbackFor(index)}
                        index={index}
                        key={index}
                        onClick={this.handleCardClick}
                    />
                ))}
                {won && <HallOfFame entries={FAKE_HOF}/>}
            </div>
        )
    }
}

export default App