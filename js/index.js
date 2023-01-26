const container = document.querySelector('#monster-container')

function renderOneMonster(monster) {
    let card = document.createElement('div')
    card.className = "card"
    card.innerHTML = `
    <h2>${monster.name}</h2>
    <p>Age: ${monster.age}</p>
    <p>${monster.description}</p>
    `
    //add monster to DOM
    container.appendChild(card)
}

let startMonster = 0

function getAllMonsters() {
    fetch("http://localhost:3000/monsters")
    .then((resp) => resp.json())
    .then(monsterData => {
        for (let i = startMonster; i < startMonster + 50; i++) {
            renderOneMonster(monsterData[i])
        }
    })
}

getAllMonsters()

const nextButton = document.querySelector("#forward")
nextButton.addEventListener("click", () => {
    container.innerHTML = ''
    startMonster += 50
    getAllMonsters()
})

const backButton = document.querySelector("#back")
backButton.addEventListener("click", () => {
    container.innerHTML = ''
    startMonster -= 50
    getAllMonsters()
})

document.querySelector('.add-monster-form').addEventListener("submit", handleSubmit)

function handleSubmit(e) {
    e.preventDefault()
    console.log(e.target.textarea)
    let monsterObj = {
        name: e.target.name.value,
        age: e.target.age.value,
        description: e.target.description.value
    }
    postMonster(monsterObj)
}

function postMonster(monsterObj) {
    fetch(`http://localhost:3000/monsters`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(monsterObj)
    })
    .then(resp => resp.json())
    .then(monster => console.log(monster))
}
