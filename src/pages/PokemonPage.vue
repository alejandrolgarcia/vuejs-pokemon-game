<template>
    <h1 v-if="!pokemon">Cargando pokemón...</h1>
    <id v-else>
        <h1>¿Quién es este pokemón?</h1>
        <!-- Img pokemon -->
        <PokemonImage 
            :pokemon-id="pokemon.id" 
            :show-pokemon="showPokemon" />

        <PokemonOptions 
            :pokemons="pokemonArray" 
            @selection="checkAnswer($event)" />

        <div v-if="showAnswer">
            <h2>{{ message }}</h2>
            <button @click="newGame" class="primary small">
                Nuevo Juego
            </button>
        </div>
    </id>
</template>

<script>
import PokemonImage from '@/components/PokemonImage.vue'
import PokemonOptions from '@/components/PokemonOptions.vue'

import getPokemonOptions from '@/helpers/getPokemonOptions'

export default {
    components: {
        PokemonImage,
        PokemonOptions,
    },

    data() {
        return {
            pokemonArray: [],
            pokemon: null,
            showPokemon: false,
            showAnswer: false,
            message: ''
        }
    },

    methods: {
        async mixPokemonsArray() {
            this.pokemonArray = await getPokemonOptions()

            const rndInt = Math.floor( Math.random() * 4 )
            this.pokemon = this.pokemonArray[ rndInt ]
        },
        checkAnswer( selectedId ) {

            this.showPokemon = true
            this.showAnswer  = true

            if ( selectedId === this.pokemon.id ) {
                this.message = `Correcto, es ${ this.pokemon.name }!`
            } else {
                this.message = `Oops, era ${ this.pokemon.name } :'(`
            }
        },
        newGame() {
            this.showPokemon  = false,
            this.showAnswer   = false,
            this.pokemonArray = [],
            this.pokemon      = null,
            this.mixPokemonsArray()
        }
    },
    // Lifecycle hooks
    mounted() {
        this.mixPokemonsArray()
    },

}
</script>

<style scoped>
    button {
        -moz-appearance: none;
        -moz-transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
        -ms-appearance: none;
        -ms-transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
        -webkit-appearance: none;
        -webkit-transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
        appearance: none;
        background-color: transparent;
        border-radius: 0.375em;
        border: 0;
        box-shadow: inset 0 0 0 2px #f56a6a;
        color: #f56a6a !important;
        cursor: pointer;
        display: inline-block;
        font-size: 0.8em;
        font-weight: 700;
        height: 3.5em;
        letter-spacing: 0.075em;
        line-height: 3.5em;
        margin: 0 5px;
        padding: 0 2.25em;
        text-align: center;
        text-decoration: none;
        text-transform: uppercase;
        transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
        white-space: nowrap;
    }
    button.primary {
        background-color: #f56a6a;
        box-shadow: none;
        color: #ffffff !important;
    }
    button:hover {
        background-color: rgba(245, 106, 106, 0.05);
    }
    button.primary:hover {
        background-color: #f67878; 
    }

    button.small {
        font-size: 0.6em;
    }
</style>
