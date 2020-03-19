// собираем все необходимые инпуты и списки
const formSearch = document.querySelector('.form-search'),
    inputCitiesFrom = document.querySelector('.input__cities-from'),
    dropdownCitiesFrom = document.querySelector('.dropdown__cities-from'),
    inputCitiesTo = document.querySelector('.input__cities-to'),
    dropdownCitiesTo = document.querySelector('.dropdown__cities-to'),
    inputDateDepart = document.querySelector('.input__date-depart');


// создаем массив городов
let cities = [];


citiesApi = 'dataBase/cities.json';
proxy = 'https://cors-anywhere.herokuapp.com/',
API_KEY = 'fc159f18193c7078daedbf2e6a5fa6c1',
CALENDAR = 'http://min-prices.aviasales.ru/calendar_preload';

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



//помещаем в переменную функцию для выбора города
const showCities = (input, list) => {
    list.textContent = '';

    if (input.value !== '') {
        const citiesFilter = cities.filter((item) => {
            const fixedItem = item.name.toLowerCase();
            return fixedItem.includes(input.value.toLowerCase());

        });

        citiesFilter.forEach((item) => {
            const li = document.createElement('li');
            li.classList.add('dropdown__city');
            li.textContent = item.name;
            list.append(li);
        });
    }
};

// при наборе чего либо в инпуте города вылета вызываем функцию, помогающую выбрать город вылета
inputCitiesFrom.addEventListener('input', () => {
    showCities(inputCitiesFrom, dropdownCitiesFrom);
});


// при наборе чего либо в инпуте города прилета вызываем функцию, помогающую выбрать город прилета
inputCitiesTo.addEventListener('input', () => {
    showCities(inputCitiesTo, dropdownCitiesTo);
});



// помещаем в переменную функцию выбора города в выпадающем списке
const cityPush = (input, list) => {
    const target = event.target;
    if (target.tagName.toLowerCase() === 'li') {
        input.value = target.textContent;
        list.textContent = '';
    }
};


// вешаем событие выбора нужного города вылета при клике на элемент выпадающего списка
dropdownCitiesFrom.addEventListener('click', (event) => {
    cityPush(inputCitiesFrom, dropdownCitiesFrom);
});


// вешаем событие выбора нужного города прилета при клике на элемент выпадающего списка
dropdownCitiesTo.addEventListener('click', (event) => {
    cityPush(inputCitiesTo, dropdownCitiesTo);
});


//fuction calls
getData(citiesApi, (data) => {
    city = JSON.parse(data).filter(item => item.name);
});

const currentRequest = CALENDAR + `?origin=SVX&destination=KGD&depart_date=2020-05-25`;
getData(currentRequest, data => console.log(JSON.parse(data)));