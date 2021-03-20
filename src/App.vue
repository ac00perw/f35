<template>
    <div id="app">
        
        <div class="flex flex-wrap">
            <div class="w-1/4 stats-wrap sticky top-0">
                <div class="stats">
                    <flight-log></flight-log>
                </div>
                <div class="stats">
                    <stats></stats>
                </div>
            </div>
            <div class="w-3/4">
                <navigation />
                <router-view name="default" />
                <Scroller></Scroller>
            </div>
        </div>
    </div>
</template>
<script>
import Navigation from '@/components/Navigation.vue'
import FlightLog from '@/components/FlightLog.vue'
import Stats from '@/components/Stats.vue'
import Scroller from '@/components/Scroller.vue'

export default {
    components: { Navigation, FlightLog, Stats, Scroller },
    createwd() {
        this.$store.dispatch('addCalcs');
    }
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