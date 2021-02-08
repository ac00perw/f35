<template>
    <div id="app" class="bg-gray-100">
        
        <div class="flex flex-wrap">
            <div class="w-1/4 stats-wrap">
                <div class="stats">
                    <flight-log></flight-log>
                </div>
                <div class="stats">
                    <snap-log></snap-log>
                </div>
            </div>
            <div class="w-3/4">
                <navigation />
                <router-view />
            </div>
        </div>
    </div>
</template>
<script>
import Navigation from '@/components/Navigation.vue'
import FlightLog from '@/components/FlightLog.vue'
import SnapLog from '@/components/SnapLog.vue'

export default {
    components: { Navigation, FlightLog, SnapLog }
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
        background-color: #efefef;
        margin: 4px;
    }
}

</style>