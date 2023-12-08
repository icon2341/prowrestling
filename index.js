"use strict";
/**
 * Represents an array of wrestlers.
 */
const wrestlerArray = [
    {
        name: 'Hulk Hogan',
        health: 200,
        moves: [
            { name: 'Big Boot', damage: 15, type: 'signature' },
            { name: 'Leg Drop', damage: 20, type: 'finisher' }
        ]
    },
    {
        name: "Wrestler A",
        health: 100,
        moves: [
            { name: "Move A", damage: 45, type: 'signature' },
            { name: "Move B", damage: 20, type: 'signature' },
            { name: "Finishing Move", damage: 100, type: "finisher" }
        ]
    },
    {
        name: "Wrestler B",
        health: 100,
        moves: [
            { name: "Move A", damage: 22, type: 'signature' },
            { name: "Move B", damage: 34, type: 'signature' },
            { name: "Finishing Move", damage: 100, type: "finisher" }
        ]
    },
    {
        name: "Wrestler C",
        health: 100,
        moves: [
            { name: "Move A", damage: 22, type: 'signature' },
            { name: "Move B", damage: 34, type: 'signature' },
            { name: "Finishing Move", damage: 100, type: "finisher" }
        ]
    }
];
/**
 * Represents a wrestling match between two wrestlers.
 */
class WrestlingMatch {
    constructor(wrestlers) {
        this.wrestlers = wrestlers;
    }
    /**
     * Performs a move by an attacker wrestler on a defender wrestler.
     *
     * @param {Wrestler} attacker - The wrestler who is performing the move.
     * @param {Wrestler} defender - The wrestler who is being attacked.
     * @private
     *
     * @return {string} - The result of the move. If the move is successful, it returns a string stating the name of the attacker,
     * the name of the move performed, the name of the defender, and the defender's updated health after the move. If the move fails,
     * it returns a string stating the name of the attacker and the name of the move that failed.
     */
    runRound(attacker, defender) {
        // Choose a random move from the attacker's moves array
        const move = attacker.moves[Math.floor(Math.random() * attacker.moves.length)];
        let success = true;
        // if the move is a finisher move, then it has a 50% chance of success, unless the defender's health is below 45
        if (move.type === 'finisher') {
            if (defender.health > 45) {
                success = Math.random() < 0.5;
            }
        }
        if (success) {
            defender.health -= move.damage;
            return `${attacker.name} performs ${move.name} on ${defender.name}. ${defender.name}'s health: ${Math.max(defender.health, 0)}.`;
        }
        else {
            return `${attacker.name}'s ${move.name} failed!`;
        }
    }
    /**
     * Runs a match between two wrestlers. Outputs the result
     */
    executeMatch() {
        let round = 1;
        console.log(`Match: ${this.wrestlers[0].name} vs. ${this.wrestlers[1].name}`);
        // while both wrestlers have health above 0, keep running rounds
        while (this.wrestlers[0].health > 0 && this.wrestlers[1].health > 0) {
            console.log(`Round ${round}:`);
            console.log(this.runRound(this.wrestlers[0], this.wrestlers[1]));
            // if the defender's health is below 0, then the attacker wins
            if (this.wrestlers[1].health <= 0) {
                console.log(`${this.wrestlers[1].name}'s health is below 0. ${this.wrestlers[0].name} wins!\n`);
                break;
            }
            console.log(this.runRound(this.wrestlers[1], this.wrestlers[0]));
            // if the defender's health is below 0, then the attacker wins
            if (this.wrestlers[0].health <= 0) {
                console.log(`${this.wrestlers[0].name}'s health is below 0. ${this.wrestlers[1].name} wins!\n`);
                break;
            }
            round++;
        }
    }
}
/**
 * Represents a wrestling tournament.
 */
class WrestlingTournament {
    constructor(wrestlers) {
        this.wrestlers = wrestlers;
    }
    /**
     * Start the tournament.
     */
    startTournament() {
        let matchNumber = 1;
        // while there are more than 1 wrestler in the array, keep running matches
        while (this.wrestlers.length > 1) {
            // splice the first two wrestlers from the array and create a new wrestling match
            const matchWrestlers = this.wrestlers.splice(0, 2);
            // create a new wrestling match with those two wrestlers
            const wrestlingMatch = new WrestlingMatch(matchWrestlers);
            console.log(`Match ${matchNumber}:`);
            //run the match and increase the number of matches
            wrestlingMatch.executeMatch();
            matchNumber++;
            // push the winner of the match back into the array, so that they can fight in the next round
            // do this using the find expression which looks for the wrestler with health above 0
            //health will persist between matches
            this.wrestlers.push(matchWrestlers.find(wrestler => wrestler.health > 0));
        }
        console.log(`${this.wrestlers[0].name} wins the tournament!`);
    }
}
//tournament starts here
const tournament = new WrestlingTournament(wrestlerArray);
tournament.startTournament();
