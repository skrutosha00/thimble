import { randInt, setBalanceField, shuffle, changeBalance, animateOnce } from "./functions.js";

setBalanceField('coin')

let body = document.querySelector('.wrapper')
let balance = document.querySelector('.balance_coin')
let chest = document.querySelector('.chest')
let double = document.querySelector('.buy')
let warning = document.querySelector('.warning')

let bet = document.querySelector('.bet')
let plus = document.querySelector('.plus')
let minus = document.querySelector('.minus')
let max = document.querySelector('.max')
let betButton = document.querySelector('.bet_button')
let againButton = document.querySelector('.again')

let active = true
let playing = false
let bonus = 1
let amountData = {
    woman: 3,
    boy: 5,
    mafia: 7
}

let amount = amountData[localStorage.getItem('mode_thimble')] + Number(localStorage.getItem('extra_thimble'))

let pers = document.createElement('img')
pers.classList.add('pers')
pers.src = '../png/' + localStorage.getItem('mode_thimble') + '.png'
body.appendChild(pers)

generateCups(amount)
updateChest()
updateDouble()
let cups = document.querySelectorAll('.cup')

for (let cup of cups) {
    cup.onclick = () => {
        if (!playing) { return }
        if (Number(cup.style.bottom.replace('px', '')) > 140) { return }

        let img = document.createElement('img')
        let win = false
        if (Number(cup.dataset.index) < amount / 2 || cup.dataset.index == 7) {
            img.classList.add('coin')
            win = true

            if (cup.dataset.index == 7) {
                img.src = '../png/key.png'
                localStorage.setItem('key_thimble', Number(localStorage.getItem('key_thimble')) + 1)
                updateChest()
            } else {
                img.src = '../png/coin.png'
                animateOnce('.balance_coin')

                bonus = Number(localStorage.getItem('double_thimble')) + 1
                let prize = Number(bet.innerHTML) * 2 * bonus
                changeBalance('coin', prize)
            }

            img.style.bottom = cup.style.bottom
            img.style.left = Number(cup.style.left.replace('px', '')) + 5 + 'px'
            body.appendChild(img)

            setTimeout(() => {
                animateOnce('.coin')
            }, 500);
        }

        cup.style.bottom = Number(cup.style.bottom.replace('px', '')) + 40 + 'px'
        playing = false

        setTimeout(() => {
            cup.style.bottom = Number(cup.style.bottom.replace('px', '')) - 40 + 'px'
        }, win ? 2000 : 1000);

        setTimeout(() => {
            img.remove()

            warning.firstElementChild.innerHTML = win ? 'Congrats!<br/>You are the winner!' : 'No way!<br/>Try again right now'
            warning.style.left = '200px'
        }, win ? 2500 : 1500);
    }
}

double.onclick = () => {
    if (Number(localStorage.getItem('double_thimble')) || !active || playing || Number(localStorage.getItem('coin_thimble')) < 500) { return }

    changeBalance('coin', -500)
    localStorage.setItem('double_thimble', 1)
    updateDouble()

    if (Number(bet.innerHTML) > Number(balance.innerHTML)) {
        bet.innerHTML = balance.innerHTML
    }

    bonus = 2
}

betButton.onclick = () => {
    if (!Number(bet.innerHTML) || !active || playing) { return }
    active = false
    changeBalance('coin', -Number(bet.innerHTML))

    showCups()

    setTimeout(() => {
        let mixCount = 0
        let mixInterval = setInterval(() => {
            if (mixCount == 10) { clearInterval(mixInterval) }
            mixCups()
            mixCount += 1
        }, 300);

        setTimeout(() => {
            playing = true
        }, 3800);
    }, 1300);
}

plus.onclick = () => {
    if (Number(bet.innerHTML) + 50 > Number(balance.innerHTML) || !active || playing) { return }
    bet.innerHTML = Number(bet.innerHTML) + 50
}

minus.onclick = () => {
    if (Number(bet.innerHTML) < 50 || !active || playing) { return }
    bet.innerHTML = Number(bet.innerHTML) - 50
}

max.onclick = () => {
    if (!active || playing) { return }
    bet.innerHTML = balance.innerHTML
}

againButton.onclick = () => {
    warning.style.left = '-60%'
    active = true

    localStorage.setItem('double_thimble', 0)
    updateDouble()

    if (Number(bet.innerHTML) > Number(balance.innerHTML)) {
        bet.innerHTML = balance.innerHTML
    }
}

function generateCups(amount) {
    let closerCups = amount <= 4 ? 60 : 15

    for (let i = 0; i < amount; i++) {
        let cup = document.createElement('img')
        cup.classList.add('cup')

        cup.src = '../png/cup.png'
        cup.dataset.index = i

        if (i < 1 || i > amount - 2) {
            cup.style.bottom = '100px'
        } else {
            cup.style.bottom = randInt(105, 125) + 'px'
        }
        cup.style.left = (window.screen.width / 2 - 250) + closerCups + i * ((450 - closerCups * 2) / (amount - 1)) + 'px'

        if (amount > 5) {
            cup.style.height = '55px'
            cup.style.width = '42px'
        }

        body.appendChild(cup)
    }
}

function mixCups() {
    let randomCups = shuffle(cups);
    [randomCups[0].style.left, randomCups[1].style.left] = [randomCups[1].style.left, randomCups[0].style.left];
}

function showCups() {
    for (let cup of cups) {
        let img = document.createElement('img')

        if (Number(cup.dataset.index) < amount / 2 || cup.dataset.index == 7) {
            img.classList.add('coin')

            if (cup.dataset.index == 7) {
                img.src = '../png/key.png'
            } else {
                img.src = '../png/coin.png'
            }

            img.style.bottom = cup.style.bottom
            img.style.left = Number(cup.style.left.replace('px', '')) + 5 + 'px'
            body.appendChild(img)
        }

        cup.style.bottom = Number(cup.style.bottom.replace('px', '')) + 40 + 'px'

        setTimeout(() => {
            cup.style.bottom = Number(cup.style.bottom.replace('px', '')) - 40 + 'px'
        }, 1000);

        setTimeout(() => {
            img.remove()
        }, 1300);
    }
}

function updateChest() {
    chest.innerHTML = ''
    let chestPic = document.createElement('img')
    if (Number(localStorage.getItem('key_thimble'))) {
        chestPic.src = '../png/chest.png'
        chest.classList.remove('gray')
        chest.classList.add('red')
    } else {
        chestPic.src = '../png/gray_chest.png'
        chest.classList.remove('red')
        chest.classList.add('gray')
    }
    chest.appendChild(chestPic)
}

function updateDouble() {
    if (Number(localStorage.getItem('double_thimble'))) {
        double.classList.add('green')
        double.classList.remove('black')
    } else {
        double.classList.remove('green')
        double.classList.add('black')
    }
}
