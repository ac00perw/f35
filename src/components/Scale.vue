<template>
    <div class="flex flex-wrap">
        <template v-for="s,index in scale">
            <input class="m-1 w-1/2 mx-auto" type="button" v-on:click="select(s)" :value="s.name" :checked="(selectedScale == s ? true : false)" :key="s.value" /> 
        </template>
        <p>{{ selectedScale }}</p>
    </div>
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