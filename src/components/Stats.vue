<template>
    <section class="snap-log p-2">
        Stats Panel
        <router-view name="stats" />
    </section>
</template>
<script>
export default {
    name: 'Stats',
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
.snap-log {
    min-height: 40vh;
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