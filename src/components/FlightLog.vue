<template>
    <section class="flight-log bg-gray-200 p-2">
        Flight log
    </section>
</template>
<script>
export default {
    name: 'FlightLog',
    computed: {
        scale() {
            return this.$store.getters.scale;
        },
        selectedScale: {
            get() {
                return this.$store.getters.selectedScale;
            },
            set(v) {
                this.$store.commit('mutate', {property: 'selectedScale', with: v});
            }
        }
    },
    data() {
        return  {
             
        }
    },
    mounted () {
    },
    methods: {

    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.flight-log {
    min-height: 40vh;
    top: 100px;
    width: 25vw;
    position: fixed;
}
h3 {
    margin: 40px 0 0;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}
</style>