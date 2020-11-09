//Refatorando o código para melhor funcionamento

//referencia as APIs utilizadas
const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

//gera o array para capturar os pokemons
const generatePokemonsPromises = () => Array(150).fill().map((_, index) => 
    //função fetch para gerar um json com as informações e atributos de cada pokemon
    fetch(getPokemonUrl(index + 1)).then(response => response.json()))

//gerador do HTML com as informações de name, id e type para cada pokemon dentro do array
const generateHTML = pokemons => pokemons.reduce((accumulator, { name, id, types }) => {

    const elementTypes = types.map(typeInfo => typeInfo.type.name)

    //gerador de li para leitura do HTML
    //função src = utiliza uma API para buscar a imagem do pokemon
    accumulator += `
        <li class="card ${elementTypes[0]}">
        <img class="card-image" alt="${name}" src="https://pokeres.bastionbot.org/images/pokemon/${id}.png" "/> 
            <h2 class="card-title">${id}. ${name}</h2>
            <p class="card-subtitle">${elementTypes.join(' | ')}</p>
        </li>
        `
    return accumulator
    }, '')

//gerador do ul dentro do HTML para ter o seletor dos pokemons
const insertPokemonsIntoPage = pokemons => {
    const ul = document.querySelector('[data-js="pokedex"]')
    ul.innerHTML = pokemons
}

const pokemonPromises = generatePokemonsPromises()

Promise.all(pokemonPromises)
    .then(generateHTML)
    .then(insertPokemonsIntoPage)
