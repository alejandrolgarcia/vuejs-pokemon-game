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

        <PokemonScore :points="points" :lives="lives" />

        <div v-if="showAnswer">
            <h2>{{ message }}</h2>
            <button @click="newGame" class="primary small">
                Reset
            </button>
            <button @click="nextPokemon" :class="( lives > 0 ? 'primary small' : 'primary small disabled' )">
                Siguiente
            </button>
        </div>
    </id>
</template>

<script>
import PokemonImage from '@/components/PokemonImage.vue'
import PokemonOptions from '@/components/PokemonOptions.vue'
import PokemonScore from '../components/PokemonScore.vue'

import getPokemonOptions from '@/helpers/getPokemonOptions'

export default {
    components: {
        PokemonImage,
        PokemonOptions,
        PokemonScore
    },

    data() {
        return {
            pokemonArray: [],
            pokemon: null,
            showPokemon: false,
            showAnswer: false,
            message: '',
            points: 0,
            lives: 3
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
                this.points = this.points + 1
            } else {
                this.message = `Oops, era ${ this.pokemon.name } :'(`
                this.lives = this.lives - 1
            }
        },
        nextPokemon() {
            this.showPokemon  = false,
            this.showAnswer   = false,
            this.pokemonArray = [],
            this.pokemon      = null,
            this.mixPokemonsArray()
        },
        newGame() {
            this.showPokemon  = false,
            this.showAnswer   = false,
            this.pokemonArray = [],
            this.pokemon      = null,
            this.points       = 0,
            this.lives        = 3
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

    button.disabled {
        pointer-events: none;
        opacity: 0.25; 
    }
</style>
