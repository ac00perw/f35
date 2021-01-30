<template>
    <section class="hello">
        <template v-for="s,index in scale">
            <input type="radio" v-on:click="select(s)" :value="s" :checked="(selectedScale == s ? true : false)" :key="s.value">{{ s.name }}
        </template>
        <p>{{ selectedScale }}</p>
    </section>
</template>
<script>
export default {
    name: 'Nav',
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
        console.log(this.scale);
        this.selectedScale = this.scale[1];
    },
    methods: {
        select(s) {
            this.selectedScale = s;
            this.$vueUpdate = true;
            console.log(`sec ${s.name}`);
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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