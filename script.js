// собираем все необходимые инпуты и списки
const formSearch = document.querySelector('.form-search'),
    inputCitiesFrom = document.querySelector('.input__cities-from'),
    dropdownCitiesFrom = document.querySelector('.dropdown__cities-from'),
    inputCitiesTo = document.querySelector('.input__cities-to'),
    dropdownCitiesTo = document.querySelector('.dropdown__cities-to'),
    inputDateDepart = document.querySelector('.input__date-depart');


// создаем массив городов
let cities = [];


const citiesApi = 'dataBase/cities.json',
    proxy = 'https://cors-anywhere.herokuapp.com/',
    API_KEY = 'fc159f18193c7078daedbf2e6a5fa6c1',
    CALENDAR = 'http://min-prices.aviasales.ru/calendar_preload';

//functions
    // creates request to the server
const getData = (url, callback) => {
    const request = new XMLHttpRequest();

    request.open('GET', url);

    request.addEventListener('readystatechange', () => {
        if (request.readyState !== 4) return;

        if (request.status === 200) {
            callback(request.response);
        } else {
            console.error(request.status);
        }
    });

    request.send();
};

    //поиск и вывод в список городов с введенной буквой
const showCities = (input, list) => {
    list.textContent = '';

    if (input.value !== '') {
        const citiesFilter = cities.filter((item) => {
            const fixItem = item.name.toLowerCase();
            return fixItem.indexOf(input.value.toLowerCase()) === 0;
        });
        // const citiesFilter = cities.filter((item) => {
        //     const fixedItem = item.name.toLowerCase();
        //     return fixedItem.includes(input.value.toLowerCase());

        // });

        citiesFilter.forEach((item) => {
            const li = document.createElement('li');
            li.classList.add('dropdown__city');
            li.textContent = item.name;
            list.append(li);
        });
    };
};

const cityPush = (input, list) => {
    const target = event.target;

    if (target.tagName.toLowerCase() === 'li') {
        input.value = target.textContent;
        list.textContent = '';
    };
};

const renderCheapDay = (cheapTicket) => {

};

const renderCheapYear = (cheapTickets) => {
    cheapTickets.sort((a, b) => {
        if (a.value < b.value) {
            return -1
        } else if (a.value > b.value) {
            return 1
        };
    });
};

const renderCheap = (data, date) => {
    const cheapTicketYear = JSON.parse(data).best_prices;
    const cheapTicketDay = cheapTicketYear.filter((item) => {
        return item.depart_date === date;
    });
    renderCheapDay(cheapTicketDay);
    renderCheapYear(cheapTicketYear);
};

// * Обработчики событий *
// при наборе чего либо в инпуте города вылета вызываем функцию, помогающую выбрать город вылета
inputCitiesFrom.addEventListener('input', () => {
    showCities(inputCitiesFrom, dropdownCitiesFrom);
});

// при наборе чего либо в инпуте города прилета вызываем функцию, помогающую выбрать город прилета
inputCitiesTo.addEventListener('input', () => {
    showCities(inputCitiesTo, dropdownCitiesTo);
});

// вешаем событие выбора нужного города вылета при клике на элемент выпадающего списка
dropdownCitiesFrom.addEventListener('click', (event) => {
    cityPush(inputCitiesFrom, dropdownCitiesFrom);
});

// вешаем событие выбора нужного города прилета при клике на элемент выпадающего списка
dropdownCitiesTo.addEventListener('click', (event) => {
    cityPush(inputCitiesTo, dropdownCitiesTo);
});

formSearch.addEventListener('submit', (event) => {

    event.preventDefault();

    const cityFrom = cities.find((item) => {
        return inputCitiesFrom.value === item.name;
    });

    const cityTo = cities.find((item) => {
        return inputCitiesTo.value === item.name
    });

    const formData = {
        from: cityFrom.code,
        to: cityTo.code,
        when: inputDateDepart.value,
    };

    const requestData = `?depart_date=${formData.when}&origin=${formData.from}&destination=${formData.to}&one_way=true`;

    getData(CALENDAR + requestData, (data) => {
        renderCheap(data, formData.when);
    });

});


//call functions
getData(citiesApi, (data) => {
    cities = JSON.parse(data).filter(item => item.name);
});