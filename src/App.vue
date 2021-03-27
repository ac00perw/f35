<template>
    <div id="app">
        <div class="flex flex-wrap">
            <div class="w-full">
                <!-- <navigation /> -->
                <home-scroller />
            </div>
        </div>
    </div>
</template>
<script>
// import Navigation from '@/components/Navigation.vue'
// import FlightLog from '@/components/FlightLog.vue'
import HomeScroller from '@/views/Home.vue'

export default {
    components: {HomeScroller},
    createwd() {
        this.$store.dispatch('addCalcs');
    }
}
</script>
<style lang="scss">
#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
}

.stats-wrap {
    height: 100vh;
    .stats {
        height: 50vh;
        width: 100%;
        background-color: #fff;
        border: 1px solid rgba(0,0,0,.2);
        margin: 4px;
        z-index: 200;
    }
}

</style>