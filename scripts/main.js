import { changeBalance, setBalanceField } from "./functions.js"

setBalanceField('coin')
let balance = document.querySelector('.balance_coin')

localStorage.setItem('extra_thimble', 0)

for (let goButton of document.querySelectorAll('.green')) {
    goButton.onclick = () => {
        localStorage.setItem('mode_thimble', goButton.parentElement.parentElement.dataset.pers)
    }
}

let plusButtons = document.querySelectorAll('.plus')
for (let plus of plusButtons) {
    plus.onclick = () => {
        for (let p of plusButtons) {
            p.classList.remove('green')
        }
        plus.classList.add('green')
        localStorage.setItem('extra_thimble', plus.dataset.extra)
    }
}

let double = document.querySelector('.double')
if (Number(localStorage.getItem('double_thimble'))) { double.classList.add('green') }
double.onclick = () => {
    if (Number(localStorage.getItem('double_thimble')) || Number(balance.innerHTML) < 500) { return }
    changeBalance('coin', -500)
    localStorage.setItem('double_thimble', 1)
    double.classList.add('green')
}