import { shallowMount, mount } from '@vue/test-utils'
import PokemonPage from '@/pages/PokemonPage'
import { pokemons } from '../mocks/pokemons.mock'

describe('PokemonPage Component', () => {
    
    let wrapper

    beforeEach( () => {
        wrapper = shallowMount( PokemonPage )
    })

    test('debe hacer match con el snapshot', () => {
        expect( wrapper.html() ).toMatchSnapshot()
    })

    test('debe de llamar mixPokemonArray al montar el componente', () => {
        
        const mixPokemonArraySpy = jest.spyOn( PokemonPage.methods, 'mixPokemonsArray' )
        const wrapper = shallowMount( PokemonPage )

        expect( mixPokemonArraySpy ).toHaveBeenCalled()

    })

    test('debe hacer match con el snapshot cuando carga el pokemon', () => {
        
        const wrapper = shallowMount( PokemonPage, {
            data() {
                return {
                    pokemonArray: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: '',
                    points: 0,
                    lives: 3
                }
            }
        })

        expect( wrapper.html() ).toMatchSnapshot()

    })

    test('debe mostrar los componentes de PokemonImage y PokemonOptions', () => {

        const wrapper = shallowMount( PokemonPage, {
            data() {
                return {
                    pokemonArray: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: '',
                    points: 0,
                    lives: 3
                }
            }
        })

        const pokemonImage = wrapper.find('pokemon-image-stub')
        const pokemonOptions = wrapper.find('pokemon-options-stub')
        const pokemonScore = wrapper.find('pokemon-score-stub')

        expect( pokemonImage.exists() ).toBeTruthy()
        expect( pokemonOptions.exists() ).toBeTruthy()
        expect( pokemonScore.exists() ).toBeTruthy()

        expect( pokemonImage.attributes('pokemonid') ).toBe('15')
        expect( pokemonOptions.attributes('pokemons') ).toBeDefined()
        
    })

    test('pruebas en checkAnswer', async() => {

        const wrapper = shallowMount( PokemonPage, {
            data() {
                return {
                    pokemonArray: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: '',
                    points: 0,
                    lives: 3
                }
            }
        })

        /**
         * con .vm tenemos acceso al virtual doom de Vue
         */
        await wrapper.vm.checkAnswer( 15 )

        expect( wrapper.find('h2').exists() ).toBeTruthy()
        expect( wrapper.vm.showPokemon ).toBe( true )
        expect( wrapper.find('h2').text() ).toBe( `Correcto, es ${ pokemons[0].name }!` )

        await wrapper.vm.checkAnswer( 20 )
        expect( wrapper.vm.message ).toBe(`Oops, era ${ pokemons[0].name } :'(`)


    })

})
