const formSearch = document.querySelector('.form-search'),
      inputCitiesFrom = document.querySelector('.input__cities-from'),
      dropdownCitiesFrom = document.querySelector('.dropdown__cities-from'),
      inputCitiesTo = document.querySelector('.input__cities-to'),
      dropdownCitiesTo = document.querySelector('.dropdown__cities-to'),
      inputDateDepart = document.querySelector('.input__date-depart');



      const cities = ['Moscow', 'St.-Petersburg','Minsk','Chelyabinsk',
                      'Volgograd', 'Samara', 'Ekaterinburg', 'Odessa',
                      'Uhan', 'Shimkenty','Down-Novgorod','Kaliningrad', 'Rostov-na-Dony'];



const ShowCities = (input,list) => {
    list.textContent = '';
    if(input.value !== '') {
        const citiesFilter = cities.filter((item) => {
            const fixedItem = item.toLowerCase();
            return fixedItem.includes(inputCitiesFrom.value.toLowerCase());
        });
    
        citiesFilter.forEach((item) => {
            const li = document.createElement('li');
            li.classList.add('dropdown__city');
            li.textContent = item;
            dropdownCitiesFrom.append(li);
        });
    }
};


inputCitiesFrom.addEventListener('input', () => {
    ShowCities(inputCitiesFrom, dropdownCitiesFrom);
});


dropdownCitiesFrom.addEventListener('click', (event) => {
    const target = event.target;
    if (target.tagName.toLowerCase() === 'li') {
        inputCitiesFrom.value = target.textContent;
        dropdownCitiesFrom.textContent = '';
        
    }
});


 const showCitiesTo = (input,list) => {
     list.textContent = '';
     if(input.value !== '') {
        const citiesFilter = cities.filter((item) => {
            const fixedItem = item.toLowerCase();
            return fixedItem.includes(inputCitiesTo.value.toLowerCase());
        });
        citiesFilter.forEach((item) => {
            const li = document.createElement('li');
            li.classList.add('dropdown__cities-to');
            li.textContent = item;
            dropdownCitiesTo.append(li);
        });
     }
 };

 inputCitiesTo.addEventListener('input', () => {
    showCitiesTo(inputCitiesTo, dropdownCitiesTo);
});

dropdownCitiesTo.addEventListener('click', (event) => {
    const target = event.target;
    if (target.tagName.toLowerCase() === 'li') {
        inputCitiesTo.value = target.textContent;
        dropdownCitiesTo.textContent = '';
        
    }
});