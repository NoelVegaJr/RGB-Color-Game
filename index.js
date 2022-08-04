const header = document.querySelector('.header');
const rgb = document.querySelector('.rgb');
const modes = document.querySelectorAll('.modes div');
const response = document.querySelector('.response');
const newGame = document.querySelector('.new-game');
const board = document.querySelector('.board');

function RandomNumber(max) {
    return Math.floor(Math.random()*max)
}

const reset = () => {
    newGame.textContent = 'New Colors'
    response.textContent = '';
    board.innerHTML = '';
    header.style.backgroundColor ='#2c8e99';
}

const clearActive = element => {
    element.classList.remove('active');
}

const randomWinningCard = cards => {
    const winningColor = cards[RandomNumber(cards.length)]
    winningColor.classList.add('winner');
    return winningColor.style.backgroundColor
}

const renderCards = max => {
    const cards = []
    for(let i = 0; i < max; i++) {
        const color = `rgb(${RandomNumber(266)},${RandomNumber(266)},${RandomNumber(266)})`;
        const card = document.createElement('div');
        card.classList.add('card');
        card.style.backgroundColor = color
        board.appendChild(card);
        cards.push(card);
    }
    console.log(cards);
    return cards
}

const isWinningCard = event => {
    if(event.currentTarget.classList.contains('winner')) {
        document.querySelectorAll('.card')
        .forEach(card => {
            card.style.pointerEvents = 'none';
            card.classList.remove('hide');
            card.style.backgroundColor = event.currentTarget.style.backgroundColor;
        });
    } else {
        event.currentTarget.classList.add('hide');
    }
}

const clickCard = (card, winningColor) => {
    card.addEventListener('click', () => {
        if(card.style.backgroundColor === winningColor) {
            document.querySelectorAll('.card')
            .forEach(card => {
                card.style.pointerEvents = 'none';
                card.classList.remove('hide');
                card.style.backgroundColor = event.currentTarget.style.backgroundColor;
                response.textContent = 'Correct'
                newGame.textContent = 'Play Again'
                header.style.backgroundColor = winningColor;
            });
        } else {
            card.classList.add('hide');
            response.textContent = 'Try Again'     
        }
    })
}

const renderBoard = () => {
    reset();
    const cards = [];
    const mode = document.querySelector('.mode.active');

    if(mode.textContent.toLowerCase() === 'easy') {
        cards.push(...renderCards(3));
    } else {
        cards.push(...renderCards(6));
    }
    const winningColor = randomWinningCard(cards);
    rgb.textContent = winningColor;
    cards.forEach(card => clickCard(card, winningColor));
}


function init() {
    renderBoard();

    modes.forEach(mode => {
        mode.addEventListener('click', (event) => {
            modes.forEach(clearActive)
            mode.classList.add('active');
            renderBoard();
        })
    })
    
    newGame.addEventListener('click', () => {
        renderBoard();
    })  
}

init();










