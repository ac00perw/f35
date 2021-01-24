<template>
    <div id="app" class="bg-gray-100">
        <div id="nav">
            <router-link to="/">Home</router-link> |
            <a href="#food">Food</a> |
            <a href="#housing">Housing</a> |
            <a href="#student-loans">Student Loans</a> |
            <a href="#hi">Maybe Health Insurance</a> |
            <router-link to="/about">About</router-link>
            </ul>
        </div>
        <Scale />
        <router-view />
    </div>
</template>
<script>
import Scale from '@/components/Scale.vue'
export default {
    components: { Scale }
}
</script>
<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>