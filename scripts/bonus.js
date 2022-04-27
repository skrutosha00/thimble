import { animate, animateOnce, changeBalance, randInt, setBalanceField } from "./functions.js";

setBalanceField('key')
setBalanceField('coin')

let balance = document.querySelector('.balance_key')
let active = true

let typeData = {
    'coins_group': 10000,
    'key': 2
}

setInterval(() => {
    if (active) {
        animateOnce('.card .chest')
    }
}, 2500);

for (let open of document.querySelectorAll('.card .block')) {
    open.onclick = () => {
        let chestPic = open.previousElementSibling

        if (!Number(balance.innerHTML) || open.dataset.opened) { return }
        active = false

        changeBalance('key', -1)

        animateOpen(chestPic)

        let r = randInt(1, 3) - 1

        if (r != 2) {
            let prize = document.createElement('img')
            let type = Object.keys(typeData)[r]
            prize.src = '../png/' + type + '.png'
            prize.classList.add(type)

            prize.style.top = chestPic.style.top
            prize.style.left = chestPic.style.left

            let prizeAmount = document.createElement('div')
            prizeAmount.style.top = prize.style.top
            prizeAmount.style.left = prize.style.left
            prizeAmount.innerHTML = typeData[type]
            prizeAmount.classList.add('amount')

            open.parentElement.appendChild(prizeAmount)
            open.parentElement.appendChild(prize)

            open.dataset.opened = 'true'

            setTimeout(() => {
                prize.style.opacity = 1
                prizeAmount.style.opacity = 1

                let balanceType = type == 'coins_group' ? 'coin' : 'key'
                changeBalance(balanceType, typeData[type])
                active = true
            }, 1200);
        }
    }
}

function animateOpen(el) {
    let i = 0
    let openInterval = setInterval(() => {
        let m = i % 2 == 0 ? 1 : -1
        el.style.transform = 'rotate(' + m * 5 + 'deg)'
        i++
        if (i == 10) { clearInterval(openInterval) }
    }, 100);

    setTimeout(() => {
        el.style.opacity = 0
    }, 1200);
}