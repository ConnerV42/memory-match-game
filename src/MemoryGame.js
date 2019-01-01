import React, { Component } from 'react';
import Navbar from "./Navbar";
import Card from "./Card";
import logo from './logo.svg';
import './MemoryGame.css';
import shuffle from 'shuffle-array';

const cardState = {
  HIDING: 0,
  SHOWING: 1,
  MATCHING: 2
}

class MemoryGame extends Component {
  constructor(props) {
    super(props);

    let cards = [
      { id: 0, cardState: cardState.HIDING, backgroundColor: 'red' },
      { id: 1, cardState: cardState.HIDING, backgroundColor: 'red' },
      { id: 2, cardState: cardState.HIDING, backgroundColor: 'navy' },
      { id: 3, cardState: cardState.HIDING, backgroundColor: 'navy' },
      { id: 4, cardState: cardState.HIDING, backgroundColor: 'green' },
      { id: 5, cardState: cardState.HIDING, backgroundColor: 'green' },
      { id: 6, cardState: cardState.HIDING, backgroundColor: 'yellow' },
      { id: 7, cardState: cardState.HIDING, backgroundColor: 'yellow' },
      { id: 8, cardState: cardState.HIDING, backgroundColor: 'black' },
      { id: 9, cardState: cardState.HIDING, backgroundColor: 'black' },
      { id: 10, cardState: cardState.HIDING, backgroundColor: 'purple' },
      { id: 11, cardState: cardState.HIDING, backgroundColor: 'purple' },
      { id: 12, cardState: cardState.HIDING, backgroundColor: 'pink' },
      { id: 13, cardState: cardState.HIDING, backgroundColor: 'pink' },
      { id: 14, cardState: cardState.HIDING, backgroundColor: 'lightskyblue' },
      { id: 15, cardState: cardState.HIDING, backgroundColor: 'lightskyblue' },
    ];

    this.state = {
      cards: shuffle(cards)
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleNewGame = this.handleNewGame.bind(this);
  }

  handleClick(id) {
    const mapCardState = (cards, idsToChange, newCardState) => {
      // helper function that changes card state based on passed in array of ids and desired state change
      return cards.map(c => {
        if (idsToChange.includes(c.id)) {
          return {
            ...c,
            cardState: newCardState
          };
        }
        return c;
      });
    }

    // finding the card in state that matches the card just clicked
    const foundCard = this.state.cards.find(c => c.id === id);

    // if noClick is true or cardState of clicked card is already part
    // of a displayed matching pair, do nothing
    if (this.state.noClick || foundCard.cardState !== cardState.HIDING) {
      return;
    }

    let noClick = false;

    let cards = mapCardState(this.state.cards, [id], cardState.SHOWING);

    const showingCards = cards.filter((c) => c.cardState === cardState.SHOWING);

    // grabs an array that contains only the 'ids' of showingCards
    const ids = showingCards.map(c => c.id);

    if (showingCards.length === 2 &&
      showingCards[0].backgroundColor === showingCards[1].backgroundColor) {
      cards = mapCardState(cards, ids, cardState.MATCHING);
    } else if (showingCards.length === 2) {
      let hidingCards = mapCardState(cards, ids, cardState.HIDING);
      noClick = true;

      this.setState({ cards, noClick }, () => {
        setTimeout(() => {
          // set state of cards to HIDING after 1.3 seconds
          this.setState({ cards: hidingCards, noClick: false });
        }, 1300);
      });
      return;
    }

    this.setState({ cards, noClick });
  }

  handleNewGame() {
    this.setState(prevState => {
      let cards = prevState.cards.map(c => (
        c.cardState !== cardState.HIDING ? { ...c, cardState: cardState.HIDING } : c
      ));
      return {
        cards: shuffle(cards)
      };
    });
  }

  render() {
    const cards = this.state.cards.map((c) => (
      <Card
        key={c.id}
        showing={c.cardState !== cardState.HIDING}
        backgroundColor={c.backgroundColor}
        onClick={() => this.handleClick(c.id)} />
    ));
    return (
      <div className="MemoryGame">
        <Navbar onNewGame={() => this.handleNewGame()} />
        <div className="cards">
          {cards}
        </div>
      </div>
    );
  }
}

export default MemoryGame;
