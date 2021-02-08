<template>
    <section class="hello">
        <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/snap">Food</router-link> |
            <a href="#housing">Housing</a> |
            <a href="#student-loans">Student Loans</a> |
            <a href="#hi">Maybe Health Insurance</a> |
            <router-link to="/about">About</router-link>
            <us-states />
            <scale />
        </div>
        
        
    </section>
</template>
<script>
import Scale from '@/components/Scale.vue'
import usStates from '@/components/usStates.vue'

export default {
    name: 'Nav',
    components: { Scale, usStates },
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

#nav {

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>