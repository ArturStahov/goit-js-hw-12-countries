import './scss/main.scss';
import fethCounterAPI from './js/conect-server.js'

const debounce = require('lodash.debounce');

const refs = {
    inputSerch: document.querySelector('[data-input-search="input-search"]'),
    buttonClearOutput: document.querySelector('[data-button="clear-serch-output"]'),
}

const hundlerUserInput = (event) => {
    fethCounterAPI.search(event.target.value)
}

const hundlerButtonClearOutput = () => {
    fethCounterAPI.clearOutput();
}

refs.buttonClearOutput.addEventListener('click', hundlerButtonClearOutput)
refs.inputSerch.addEventListener('input', debounce(hundlerUserInput, 500))
