const pokedex = document.getElementById("pokedex")

const fetchPokemon = async () => {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=150`;
  const res = await fetch(url);
  const data = await res.json();
  const pokemon = data.results.map((result, index) => ({
    name:result.name,
    apiURL:result.url,
    id:index + 1,
    image:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
  }));
  console.log(data.results);
  displayPokemon(pokemon);
}

const displayPokemon = (pokemon) => {
  console.log(pokemon);
  const pokemonHTMLString = pokemon.map((pokeman) => `
    <li class="pokebox" onclick="selectPokemon(${pokeman.id})">
      <img class="pokeimg" src="${pokeman.image}">
      <h2>${pokeman.id}. ${pokeman.name}</h2>
      <p>${pokeman.type}</p>
    </li>
  `)
  .join("");
  pokedex.innerHTML = pokemonHTMLString;
}

const selectPokemon = async(id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const pokeman = await res.json();
  displayPopup(pokeman);
};

const displayPopup = (pokeman) => {
  const type = pokeman.types.map((type) => type.type.name).join(", ");
  const image = pokeman.sprites["front_default"];
  const htmlString = `
    <div class="popup">
      <button id="closeBtn" onclick="closePopup()">Close</button>
      <div class="card">
        <img class="card-image" src="${image}">
        <h2 class="card-title">${pokeman.id}.${pokeman.name}</h2>
        <p><small>Height: </small>${pokeman.height} | <small>Weight: </small>${pokeman.weight} | <small>Type: </small>${type}</p>
      </div>
    </div>
  `;
  pokedex.innerHTML = htmlString + pokedex.innerHTML;
  console.log(htmlString);
};

const closePopup = () => {
  const popup = document.querySelector(".popup");
  popup.parentElement.removeChild(popup);
};

fetchPokemon();

$(function(){
	$(window).scroll(function (){
		$('.fadein').each(function(){
			var elemPos = $(this).offset().top;
			var scroll = $(window).scrollTop();
			var windowHeight = $(window).height();
			if (scroll > elemPos - windowHeight + 150){
				$(this).addClass('scrollin');
			}
		});
	});
});
