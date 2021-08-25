<template>
    <div class="score-container">
        <h3>Puntos: <span>{{ points }}</span></h3>
        <h3> :: </h3>
        <h3>Vidas: <span>{{ lives }}</span></h3>
    </div>
</template>

<script>
export default {

    props: {
        points: {
            type: Number,
            required: true
        },
        lives: {
            type: Number,
            required: true
        }
    }

}
</script>

<style scoped>
    .score-container {
        display: inline-flex;
        width: 200px;
        justify-content: space-evenly;
        /* align-items: center; */
    }
</style>