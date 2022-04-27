function animate(selector) {
    for (let node of document.querySelectorAll(selector)) {
        setInterval(() => {
            node.classList.add('anim')
            setTimeout(() => {
                node.classList.remove('anim')
            }, 500);
        }, 2500);
    }
}

function animateOnce(selector) {
    for (let node of document.querySelectorAll(selector)) {
        node.classList.add('anim')
        setTimeout(() => {
            node.classList.remove('anim')
        }, 500);
    }
}

function setBalanceField(currencyType) {
    let balanceField = document.querySelector('.balance_field_' + currencyType)

    let currency = document.createElement('img')
    currency.src = '../png/' + currencyType + '.png'
    balanceField.appendChild(currency)

    let balance = document.createElement('div')
    balance.classList.add('balance_' + currencyType)
    balanceField.appendChild(balance)
    balance.innerHTML = localStorage.getItem(currencyType + '_thimble')
}

function changeBalance(currencyType, amount, node = true) {
    let balance = document.querySelector('.balance_' + currencyType)
    localStorage.setItem(currencyType + '_thimble', Number(localStorage.getItem(currencyType + '_thimble')) + amount)
    balance.innerHTML = localStorage.getItem(currencyType + '_thimble')
}

function shuffle(arr) {
    let array = [...arr]
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export { animate, animateOnce, shuffle, changeBalance, randInt, setBalanceField }