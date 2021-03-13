<template>
    <div class="people flex flex-wrap">
        <div class="w-1/2">
            <h1 class="w-full text-2xl ">Airplanes</h1>
            {{ selectedState }}
            {{ data }}
        </div>
        <div class="w-1/2">
            <h1 class="w-full text-2xl ">Hungry people (one dot = 100)</h1>
            <div class="peoplewrap m-2 p-2 flex flex-wrap">
                <template class="" v-for="i in people">
                    <span :class="[`p-2`, pC()]">&#149;</span>
                </template>
            </div>
        </div>
    </div>
</template>
<script>
import DataService from '../DataService';

export default {
    name: "Snap",
    computed: {
        selectedState() {
            return this.$store.getters.selectedState;
        }
    },
    data() {
        return {
            data: {},
            people: 6800
        }
    },
    mounted() {
        this.getData();
    },
    methods: {
        getData() {
            var vm = this;
            let url = `snap/${(vm.selectedState ? vm.selectedState.id : null)} )`;
            DataService.data(url)
            .then(function(d){
                vm.data = d;
            });
        },
        pC() {
            return `text-gray-${(Math.random() * 9) + 100}`;
        }
    }
}
</script>
<style lang="scss" scoped>
.people div {
    min-height: 90vh;
}
</style>