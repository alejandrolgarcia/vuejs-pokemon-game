<template>
    <h1>¿Quién es este pokemón?</h1>
    <!-- Img pokemon -->
    <PokemonImage />
    <PokemonOptions />
    <!-- Opciones -->
</template>

<script>
import PokemonImage from '@/components/PokemonImage.vue'
import PokemonOptions from '@/components/PokemonOptions.vue'

export default {
    name: 'PokemonPage',
    components: {
        PokemonImage,
        PokemonOptions,
    }

}
</script>
