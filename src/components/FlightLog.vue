<template>
    <section class="flight-log p-2">
        <h1 class="text-2xl mb-4">Flight log</h1>
        <ul class="w-full flex flex-col">
            <li><scale /></li>
            <!-- <li>ss:{{ selectedScale }}</li> -->
            <li>Airport BTV</li>
            <li>Time in flight</li>
            <li>Cost of flight</li>
            <li v-if="selectedScale">${{ formatNumber(f35CostPerHour) }} || ${{ formatNumber(cost) }}</li>
            <li>Note: simulated</li>
        </ul>
        <ul v-for="s in scale" class="text-left">
            <li>{{ s.name }}: {{ fixed(aircraftHours * s.value, 2) }} {{  }} </li>
        </ul>
    </section>
</template>
<script>
import Scale from '@/components/Scale.vue'

export default {
    name: 'FlightLog',
    components: { Scale },
    computed: {
        hoursPerScale() {
            return this.selectedScale.value * this.aircraftHours;
        },
        cost() {
            return (this.selectedScale.value * this.aircraftHours) * this.f35CostPerHour.toFixed(2);
        },
        scale() {
            return this.$store.getters.scale;
        },
        f35CostPerHour() {
            return this.$store.getters.f35CostPerHour;
        },
        aircraftHours() {
            return this.$store.getters.aircraftHoursPerHour;
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
        this.selectedScale = this.scale['hour'];
    },
    methods: {
        formatNumber(n){ 
            return new Intl.NumberFormat().format(n)
        },
        fixed(n, dec){
            return n.toFixed(dec);
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.flight-log {
    width: 100%;
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