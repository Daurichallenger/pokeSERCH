let form = document.getElementById('form');
let apiURL = 'https://pokeapi.co/api/v2/pokemon/';
let pokeContainer = document.getElementById("pokemon-container");


window.onload = function(){
    const storedPokemon =  JSON.parse(localStorage.getItem("pokedone")) || [];
    if(storedPokemon){
        storedPokemon.forEach(pokecard)
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    let selectedPokemon = document.getElementById('city').value.toLowerCase(); // Convertir a minúsculas

    fetch(`${apiURL}${selectedPokemon}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon no encontrado'); // Mensaje más claro para el error
            }
            return response.json();
        })
        .then(data => {
            // console.log(data); // Aquí puedes procesar los datos recibidos
            // // Ejemplo: mostrar el nombre y la imagen del Pokémon
            // alert(`Nombre: ${data.name}\nID: ${data.id}\nImagen: ${data.sprites.front_default}`);
            console.log(data)
            const storedPokemon = JSON.parse(localStorage.getItem("pokedone")) || [];
            
            let info = [];
            
            // Almacenar los Pokémon en el arreglo 'info'
            storedPokemon.forEach(storedpk => {
                info.push(storedpk);
            });
            
            // Comprobar si el id de 'data' está en 'info'
            const exists = info.some(storedpk => storedpk.id === data.id);
            
            if (!exists) {
                pokecard(data);
                localStoragepokemon(data);
            }

            // pokecard(data)
            // localStoragepokemon(data)
        })
        .catch(error => {
            console.error('Error:', error);
            alert(error.message); // Mostrar mensaje de error al usuario
        });
});



function pokecard(data){
    let card = document.createElement('div')
    card.className = 'pokemon-card'
    if(data.id){
        card.innerHTML= `
    <h1>${data.name}</h1>
    <img src="${data.sprites.front_default}" alt="${data.name}">
    <p>ID: ${data.id}</p>

    `
    }
    
    
pokeContainer.appendChild(card)
}


function localStoragepokemon(pokemon){
    let savepokemon = JSON.parse(localStorage.getItem("pokedone")) || [];

    if(!savepokemon.some(p => p.id === pokemon.id)){
        savepokemon.push(pokemon)
        localStorage.setItem("pokedone", JSON.stringify(savepokemon))

    }
}
// fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${city}&exclude=${city}&appid={608b45b74cbc6eca3157af1e124c2cbd}`).then((response) => response.json()).then((data) => console.log(data))