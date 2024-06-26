let pokemonInput = document.querySelector('#pokemonInput');
let pokemonButton = document.querySelector("#getPokemonButton");
const contenedor = document.querySelector('.container');
//const cardContenedor = document.querySelector('.card-container');
var idCardContenedor = document.getElementById("idCard-container");

pokemonButton.addEventListener('click', async e => {

  if (pokemonInput.value >= 1 && pokemonInput.value <= 1025) {
    await renderCard();

  } else {

    idCardContenedor.className = "card-container";
    const cardHTML =`

      <div class="card-img">
        <img src="/assets/img/quien_es_ese_pokemon.jpg" alt="quien-es-ese-pokemon">
      </div> 
    
      <div class="card-info">
        <h2>¿¡Quien es ese pokemon!?</h2>
      </div> 
  `;

    idCardContenedor.innerHTML=cardHTML;

    throw `No existe el pokemon con el id = ${pokemonInput.value}`;
  }
  
});

const renderCard = async() => {

  try {
    
    let pokemon = await getPokemonApi();
    templateCard(pokemon);

  } catch (error) {
    console.error(error)
  }
}

const getPokemonApi = async() => {

  try {
    let idPokemon = document.getElementById("pokemonInput").value;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`)
    const data = await response.json();
    console.log(data);
    return data;

  } catch (error) {
    console.error(error)
  }
}

const templateCard = pokemon => {

  const{name, types, height, weight, sprites} = pokemon;

  const heightInMeters = height / 10;
  const weightInKilograms = weight / 10;

  idCardContenedor.className = "card-container";
  
  const cardHTML =`
    
      <div class="card-img">
        <img src="${sprites.front_default}" alt="${name}">
      </div> 
  
      <div class="card-info">
        <h2>${name}</h2>
        <p>${types[0].type.name}</p>
        <div class="card-info-small">
          <small>Width ${weightInKilograms}kg</small>
          <small>Height ${heightInMeters}cm</small>
        </div> 
      </div> 
  `;

  idCardContenedor.innerHTML=cardHTML;  
}