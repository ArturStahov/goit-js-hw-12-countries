import Template from '../template/countri-item-mokup.hbs'
import TemplateSerchList from '../template/templateSerchList.hbs'

import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const refs = {
    inputSerch: document.querySelector('[data-input-search="input-search"]'),
    outputList: document.querySelector('[data-output-block="output-list"]'),
    outputSerchList: document.querySelector('[data-out-serch-info]'),
}

const fethCounterAPI = {

    inputQueryUser: "",

    clearSerchList() {
        refs.outputSerchList.innerHTML = '';
    },
    clearOutput() {
        refs.outputList.innerHTML = '';
        this.clearSerchList();
    },

    serch(inputUser) {
        this.inputQueryUser = inputUser;
        this.conectServer();
    },

    conectServer() {
        const url = `https://restcountries.eu/rest/v2/name/${this.inputQueryUser}`;

        fetch(url).then(resolve => { return resolve.json() })
            .then(data => {
                console.log(data)
                if (data.length === 1) {
                    const mokup = Template(data)
                    refs.inputSerch.value = ""
                    refs.outputList.insertAdjacentHTML('beforeend', mokup);
                }
                if (data.length < 6) {
                    this.clearSerchList();
                    const mokupSerchList = TemplateSerchList(data)
                    refs.outputSerchList.insertAdjacentHTML('beforeend', mokupSerchList);
                }
                if (data.length > 10) {
                    this.erorMessage();
                }
            })
            .catch(eror => {
                console.log(eror)
            })
    },
    erorMessage() {
        return error({
            text: "Too many matches found. Please enter a more specific query!",
            type: 'info',
            delay: 4000,
            width: '300px'
        });
    },
}

export default fethCounterAPI;