<template>
    <span>
        <select v-model="selectedState" class="p-2 my-3">
        <template v-for="s,index in usStates">
            <option v-on:click="select(s)" :value="s.id" :key="s.value">{{ s.name }}</option>
        </template>
        </select>
    </span>
</template>
<script>
export default {
    name: 'Nav',
    computed: {
        usStates() {
            return this.$store.getters.usStates;
        },
        selectedState: {
            get() {
                return this.$store.getters.selectedState;
            },
            set(v) {
                this.$store.commit('mutate', {property: 'selectedState', with: v});
            }
        }
    },
    data() {
        return  {
        }
    },
    mounted () {
        console.log(this.scale);
        this.selectedState = (this.usStates ? this.usStates.findIndex(s => s.id == 49) : null);
    },
    methods: {
        select(s) {
            this.selectedState = s;
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