import getPokemonOptions, { getPokemons, getPokemonsName } from '@/helpers/getPokemonOptions'

describe('getPokemonOptions helpers', () => {

    test('debe retornar un arreglo de números', () => {
        
        const pokemons = getPokemons();
        expect( pokemons.length ).toBe(650)
        expect( pokemons[0] ).toBe( 1 )
        expect( pokemons[600] ).toBe( 601 )

    })

    test('debe retornar un arreglo de cuatro elementos con nombres de pokemons', async() => {
        
        const pokemonsArr = [
            { name: 'bulbasaur', id: 1 },
            { name: 'ivysaur', id: 2 },
            { name: 'venusaur', id: 3 },
            { name: 'charmander', id: 4 }
          ]

        const pokemons = await getPokemonsName([1,2,3,4])

        expect( pokemons ).toStrictEqual( pokemonsArr )

    })

    test('getPokemonOptions debe retornar un arreglo mezclado', async() => {
        
        const pokemons = await getPokemonOptions()

        expect( pokemons.length ).toBe( 4 )
        expect( pokemons ).toEqual([
            { 
                name: expect.any(String), 
                id: expect.any(Number) 
            },
            { 
                name: expect.any(String), 
                id: expect.any(Number) 
            },
            { 
                name: expect.any(String), 
                id: expect.any(Number) 
            },
            { 
                name: expect.any(String), 
                id: expect.any(Number)
            }
          ])
    })
      
})
