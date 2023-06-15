//when page loads show first 50 monsters, show each monsters name, age and description

document.addEventListener("DOMContentLoaded", fetchMonsters);

//declare variable for monster data in case i need to access it later 
let monsters;
let a = 1;
const monsterDiv = document.querySelector('#monster-container');
const createForm = document.querySelector('#monster-form');
createForm.addEventListener("submit", postMonster);
const forward = document.querySelector('#forward');
const back = document.querySelector('#back');
forward.addEventListener("click", forwardHandler);
back.addEventListener("click", backHandler);


function forwardHandler(){
    a++;
    monsterDiv.textContent = "";
    fetchMonsters();
};

function backHandler(){
    a > 1 ? a-- : a = 1;
    monsterDiv.textContent = "";
    fetchMonsters();
};


forward.addEventListener("click", forwardHandler);
//fetch request for monsters 
function fetchMonsters(){
    console.log(a)
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${a}`)
    .then(resp => resp.json())
    .then((data) => {
        monsters = data;
        console.log(monsters)
        appendMonsters(monsters);
    });

    
};

function appendMonsters(monsters){
    monsters.forEach((monster) => {
        let monsterInfo = document.createElement('p');
        monsterInfo.textContent = `Name: ${monster.name}, Age: ${Math.floor(monster.age)}, Description: ${monster.description}}`;
        monsterDiv.appendChild(monsterInfo);
    });
};

function postMonster(event){
    event.preventDefault();
    let monsterName = document.querySelector('#monster-name');
    let monsterAge = document.querySelector('#monster-age');
    let monsterDescription = document.querySelector('#monster-description');

    const monsterObj = {
        name: monsterName.value,
        age: monsterAge.value,
        description: monsterDescription.value
    };
    const configurationMonster = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
        body: JSON.stringify(monsterObj),
    };

    fetch('http://localhost:3000/monsters', configurationMonster);



}