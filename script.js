const formSearch = document.querySelector('.form-search'),
    inputCitiesFrom = document.querySelector('.input__cities-from'),
    dropdownCitiesFrom = document.querySelector('.dropdown__cities-from'),
    inputCitiesTo = document.querySelector('.input__cities-to'),
    dropdownCitiesTo = document.querySelector('.dropdown__cities-to'),
    inputDateDepart = document.querySelector('.input__date-depart');



const cities = ['Москва', 'Санкт-Петербург', 'Минск', 'Караганда', 'Челябинск', 'Керчь', 'Симферополь', 'Волгоград', 'Самара', 'Днепропетровск', 'Екатеринбург', 'Одесса', 'Ухань', 'Нижний Новгород', 'Калининград', 'Вроцлав', 'Ростов-на-Дону', 'Киев', 'Владивосток', 'Нью-Йорк', 'Лондон', 'Тегеран', 'Канны', 'Оттава'];



const showCities = (input, list) => {
    list.textContent = '';

    if (input.value !== '') {
        const citiesFilter = cities.filter((item) => {
            const fixedItem = item.toLowerCase();
            return fixedItem.includes(input.value.toLowerCase());
        });

        citiesFilter.forEach((item) => {
            const li = document.createElement('li');
            li.classList.add('dropdown__city');
            li.textContent = item;
            list.append(li);
        });
    }
};

//listeners
inputCitiesFrom.addEventListener('input', () => {
    showCities(inputCitiesFrom, dropdownCitiesFrom);
});

inputCitiesTo.addEventListener('input', () => {
    showCities(inputCitiesTo, dropdownCitiesTo);
});

const citiesPush =(input,list) => {
    const target = event.target;
    if (target.tagName.toLowerCase() === 'li') {
        input.value = target.textContent;
        list.textContent = '';

    }

};




dropdownCitiesFrom.addEventListener('click', (event) => {
    citiesPush(inputCitiesFrom,dropdownCitiesFrom);

});

dropdownCitiesTo.addEventListener('click', (event) => {
    citiesPush(inputCitiesTo,dropdownCitiesTo);
});
