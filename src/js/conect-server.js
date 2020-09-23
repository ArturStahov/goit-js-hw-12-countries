import Template from '../template/countri-item-mokup.hbs'
import TemplateSearchList from '../template/templateSearchList.hbs'

import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const refs = {
    inputSearch: document.querySelector('[data-input-search="input-search"]'),
    outputList: document.querySelector('[data-output-block="output-list"]'),
    outputSearchList: document.querySelector('[data-out-serch-info]'),
}

const fethCounterAPI = {

    inputQueryUser: "",

    clearSearchList() {
        refs.outputSearchList.innerHTML = '';
    },
    clearOutput() {
        refs.outputList.innerHTML = '';
        this.clearSearchList();
    },

    search(inputUser) {
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
                    refs.inputSearch.value = ""
                    refs.outputList.insertAdjacentHTML('beforeend', mokup);
                }
                if (data.length < 6) {
                    this.clearSearchList();
                    const mokupSearchList = TemplateSearchList(data)
                    refs.outputSearchList.insertAdjacentHTML('beforeend', mokupSearchList);
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