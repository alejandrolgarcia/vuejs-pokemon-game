import { shallowMount } from '@vue/test-utils'

import PokemonOptions  from '@/components/PokemonOptions';
import { pokemons } from '../mocks/pokemons.mock'

describe('PokemonOptions component', () => {

    let wrapper

    wrapper = shallowMount( PokemonOptions, {
        props: {
            pokemons
        }
    })
    
    test('debe hacer match con el snapshot', () => {

        expect( wrapper.html() ).toMatchSnapshot()

    })

    test('debe mostrar las cuatro opciones correctamente', () => {

        expect( wrapper.findAll('li')[0].text() ).toBe(pokemons[0].name)
        expect( wrapper.findAll('li')[1].text() ).toBe(pokemons[1].name)
        expect( wrapper.findAll('li')[2].text() ).toBe(pokemons[2].name)
        expect( wrapper.findAll('li')[3].text() ).toBe(pokemons[3].name)
        
    })

    test('debe emitir "selection" con sus parámetros al hacer click', () => {
        
        const liTags = wrapper.findAll( 'li' )

        const tags = liTags.map( ( tag, index ) => {
            
            tag.trigger('click')
            expect( wrapper.emitted( 'selection' )[ index ] )
                .toEqual( [pokemons[ index ].id] )

        })

    })
    

})
