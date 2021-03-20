<template>
    <div class="home m-2">
        <Nav />
        Home Page
        <bar-chart :styles="stylez" :chart-data="data" :options=" { maintainAspectRatio: false,
        scales: {
            xAxes: [{
                stacked: true,
                gridLines: {
                offsetGridLines: true
                }
            }],
            yAxes: [{
                stacked: true
            }]
        }}"></bar-chart>
        <!-- {{ data }} -->
    </div>
</template>
<script>
// @ is an alias to /src
// import { Bar } from 'vue-chartjs'
import BarChart from '../BarChart';
import DataService from '../DataService';

export default {
    name: 'Home',
    components: {
        BarChart
    },
    computed: {
        stylez() {
            return { height: '500px', position:'relative' }
        }
    },
    mounted() {
        this.getData();
    },
    data() {
        return {
            data: {},
            states: []
        }
    },
    methods: {

        getData() {
            var vm = this;
            //vm.data = {datasets: [{data: null, label: 'foobar'}]};
            DataService.data('student-loan-debt')
                .then(function(response) {
                    // handle success
                    // vm.games = response;
                    // let data = response;
                    //vm.data = {labels: vm.states, datasets: [{data: []}]};
                    let data1 = [];
                    let data2 = [];
                    let labels = [];
                    for (let d in response) {
                        data1.push(response[d].debt);
                        data2.push(response[d].borrowers/100);
                        labels.push(response[d].states.name)
                    }

                    vm.data = { datasets: [{ backgroundColor: '#333699', data: data1, label: 'avg debt' }, { backgroundColor: '#006666', data: data2, label: 'borrowers' }], labels: labels };

                })
                .catch(function(error) {
                    // vm.$store.commit('mutate', { property: 'loading', with: false })
                    console.log(`error getting data: ${error}`);
                })
                .finally(function() {
                    console.log(vm.data);
                    // vm.renderChart({
                    //     labels: vm.states, //['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    //     datasets: [{
                    //         label: 'Student Load Debt',
                    //         backgroundColor: '#f87979',
                    //         data: vm.data
                    //     }]
                    // })
                    vm.loading = false;
                });
        }
    }
}
</script>