const cardContainer = document.getElementById('card-container');
const updateButton = document.getElementById('update-button');

// Define arrays of Pokemon data
const pokemons1 = [
    {"name":"Charmander","url":"https://pokeapi.co/api/v2/pokemon/4/"},
    {"name":"Charmeleon","url":"https://pokeapi.co/api/v2/pokemon/5/"},
    {"name":"Charizard","url":"https://pokeapi.co/api/v2/pokemon/6/"}
];

const pokemons2 = [
    {"name":"Squirtle","url":"https://pokeapi.co/api/v2/pokemon/7/"},
    {"name":"Wartortle","url":"https://pokeapi.co/api/v2/pokemon/8/"},
    {"name":"Blastoise","url":"https://pokeapi.co/api/v2/pokemon/9/"}
];

const pokemons3 = [
    {"name":"Caterpie","url":"https://pokeapi.co/api/v2/pokemon/10/"},
    {"name":"Metapod","url":"https://pokeapi.co/api/v2/pokemon/11/"},
    {"name":"Butterfree","url":"https://pokeapi.co/api/v2/pokemon/12/"}
];

const pokemons4 = [
    {"name":"Bulbasaur","url":"https://pokeapi.co/api/v2/pokemon/1/"},
    {"name":"Ivysaur","url":"https://pokeapi.co/api/v2/pokemon/2/"},
    {"name":"Venusaur","url":"https://pokeapi.co/api/v2/pokemon/3/"}
];

let currentPokemonsIndex = 0; // Initial index for rotating through sets

function renderCards(pokemons) {
    cardContainer.innerHTML = ''; // Clear previous cards

    pokemons.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');
        if (pokemons === pokemons1) {
            card.classList.add('pokemons1');
        } else if (pokemons === pokemons2) {
            card.classList.add('pokemons2');
        } else if (pokemons === pokemons3) {
            card.classList.add('pokemons3');
        } else if (pokemons === pokemons4) {
            card.classList.add('pokemons4');
        }
        card.innerHTML = `
            <h2>${item.name}</h2>
            <p>URL: <a href="${item.url}" target="_blank">${item.url}</a></p>
            <button onclick="loadDetails('${item.url}')">See details</button>
        `;
        cardContainer.appendChild(card);
    });
}

async function loadDetails(url) {
    try {
      const response = await fetch(url);
      const json = await response.json();
      addAudio(json.cries.latest)
      return json;
      //Error handling
    } catch (error) {
      console.log(error);
    }
  }

function addAudio(ref) {
    console.log(ref);
}

// welp stephen i tried
updateButton.addEventListener('click', function() {
    if (currentPokemonsIndex === 0) {
        renderCards(pokemons2);
        currentPokemonsIndex = 1;
    } else if (currentPokemonsIndex === 1) {
        renderCards(pokemons3);
        currentPokemonsIndex = 2;
    } else if (currentPokemonsIndex === 2) {
        renderCards(pokemons4);
        currentPokemonsIndex = 3;
    } else {
        renderCards(pokemons1);
        currentPokemonsIndex = 0;
    }
    pokemons.forEach(pokemon => {
        const card = document.createElement("div");
        card.classList.add("card");

        const title = document.createElement("h3");
        title.classList.add("card-title");
        title.textContent = pokemon.name;
        card.appendChild(title);


        cardContainer.appendChild(card);
    });

    function showDetails(pokemonUrl, card) {
        fetch(pokemonUrl)
            .then(response => response.json())
            .then(data => {
                const audioUrl = cries_pokemon_latest_4.ogg; // Assuming the response contains the sound URL
                const audio = new Audio(audioUrl);

                const soundBtn = document.createElement("button");
                soundBtn.classList.add("sound-btn");
                soundBtn.textContent = "Play Sound";
                soundBtn.addEventListener("click", () => audio.play());
                
                card.appendChild(soundBtn);
            })
            .catch(error => console.error("Error fetching Pokémon details:", error));
    }

});

// Initial rendering of cards
renderCards(pokemons1);
