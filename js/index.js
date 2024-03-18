// Obtaining the list-pokemon element
const listPokemon = document.querySelector("#list-pokemon");
const headerButtons = document.querySelectorAll(".btn-header")

// General URL of the PokéAPI
let URL = "https://pokeapi.co/api/v2/pokemon/";

// Fetching the pokemon data from the API
for(let i = 1; i <= 151; i++) {
    fetch(URL + i)
        .then((response) => response.json())
        .then(data => showPokemon(data))
}

// Showing the list of pokemon with the data fetched
function showPokemon(poke) {

    // Obtaining the types of the pokemon in p elements to string using the object properties
    let tipo = poke.types.map((type) => `<p class="${type.type.name} type">${type.type.name}</p>`);
    tipo = tipo.join('');

    // Specifying the pokemon ID format (#001 - #???)
    let pokeId = poke.id.toString();

    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2){
        pokeId = "0" + pokeId;
    }
    
    // Creating a div element with the pokemon class
    const div = document.createElement("div");
    div.classList.add("pokemon")
    div.innerHTML = `
    <p class="pokemon-background-id">#${pokeId}</p>
    <div class="pokemon-image">
        <img src="${poke.sprites.other["official-artwork"].front_default}" alt="Pokemon Artwork">
    </div>
    <div class="pokemon-info">
        <div class="name-container">
            <p class="pokemon-id">#${pokeId}</p>
            <h2 class="pokemon-name">${poke.name}</h2>
        </div>
        <div class="type-container">
            ${tipo}
        </div>
        <div class="data-container">
            <p class="data">Height: ${(poke.height / 10).toFixed(1)} m</p>
            <p class="data">Weight: ${(poke.weight / 10).toFixed(1)} kg</p>
        </div>
    </div>
    `
    // Adding the created elements to the list-pokemon element, showing the list of pokemon in the page
    listPokemon.append(div);
}

// Adding events to each of the buttons in the header, filtering the pokemon list by type
headerButtons.forEach(button => button.addEventListener("click", (event) => {
    
    // Obtaining the button id, thus knowing which button was clicked
    const buttonId = event.currentTarget.id;

    // Emptying the list-pokemon element
    listPokemon.innerHTML = "";

    // Fetching the data requested
    for(let i = 1; i <= 151; i++) {
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => {

                // If the All types button was clicked, it shows the general list of pokemon
                if(buttonId === "ver-todos") {
                    showPokemon(data);
                } 
                
                // If any of the other type buttons was clicked, it shows a filtered list of pokemon
                else {
                    const tipos = data.types.map((type) => type.type.name);
                    if (tipos.some(tipo => tipo.includes(buttonId))) {
                        showPokemon(data);
                    }
                }
            })
    }
}))