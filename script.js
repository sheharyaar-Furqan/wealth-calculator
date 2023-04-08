const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillonairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];
getRandomUser();
getRandomUser();
getRandomUser();

//fetch random user and add money
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();
    const user = data.results[0];
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }
    addData(newUser);
}

//double everyone's money
function doubleMoney(){
    data = data.map(user => {
        return { ...user, money: user.money * 2  }
    });
    updateDOM(data);

}

//sort user by richest 
function sortByRichest(){
    data.sort((a,b) => b.money - a.money);
    updateDOM();
}

//Filter only millionaires users
function showMillionaires(){
    data = data.filter(user => user.money > 1000000); 
    updateDOM(data);
}

//caculate wealth
function calculateWealth(){
    const wealth = data.reduce((acc,user) => (acc +=user.money ),0);
    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthEl);
    
}


//Add new obj to data arr
function addData(obj) {
    data.push(obj);
    updateDOM();
}

//Update DOM
function updateDOM(providedData = data) {
    //clear Main div
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';
    providedData.forEach((user) => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${user.name}</strong> ${formatMoney(user.money)}`;
        main.appendChild(element);
    });

}


//Fomat no as money
function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}


//Event listeners

addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillonairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);
