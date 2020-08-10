import PropTypes from 'prop-types'
import React from 'react'

import './HallOfFame.css'

const HallOfFame = ({ entries }) => (
    <div className="tableHOF">
        <table>
            <thead>
            <tr className="header head">
                <th className="col rank">Rang</th>
                <th className="col">Pseudnoyme</th>
                <th className="col date">Date</th>
                <th className="col guesses">Tentatives</th>
            </tr>
            </thead>
            <tbody>
            {entries.map(({ date, guesses, id, player }, index) => (
                <tr className="row" key={id}>
                    <td className="col rank">{index + 1}</td>
                    <td className="col player">{player}</td>
                    <td className="col date">{date}</td>
                    <td className="col guesses">{guesses}</td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
);

HallOfFame.propTypes = {
    entries: PropTypes.arrayOf(
        PropTypes.shape({
            date: PropTypes.string.isRequired,
            guesses: PropTypes.number.isRequired,
            id: PropTypes.number.isRequired,
            player: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default HallOfFame

// == Internal helpers ==============================================

export const FAKE_HOF = [
    { id: 3, guesses: 18, date: '10/10/2017', player: 'Jane' },
    { id: 2, guesses: 23, date: '11/10/2017', player: 'Kevin' },
    { id: 1, guesses: 31, date: '06/10/2017', player: 'Louisa' },
];

const HOF_KEY = '::Memory::HallofFame';
const HOF_MAX_SIZE = 10;

export function saveHOFEntry(entry, onStored) {
    entry.date = new Date().toLocaleDateString();
    entry.id = Date.now();

    const entries = JSON.parse(localStorage.getItem(HOF_KEY) || '[]');
    const insertionPoint = entries.findIndex(
        ({ guesses }) => guesses >= entry.guesses
    );

    if (insertionPoint === -1) {
        entries.push(entry)
    } else {
        entries.splice(insertionPoint, 0, entry)
    }
    if (entries.length > HOF_MAX_SIZE) {
        entries.splice(HOF_MAX_SIZE, entries.length)
    }

    localStorage.setItem(HOF_KEY, JSON.stringify(entries));
    onStored(entries)
}