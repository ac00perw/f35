import Vue from 'vue'
import Vuex from 'vuex'
import DataService from '../DataService'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        usStates: null,
        selectedState: null,
        scale: {
            // 'realtime': {name: 'Realtime', value: -1},
            'hour': {name: 'Hour', value: 1},
            'day': {name: 'Day', value: 24},
            'month': {name: 'Month', value: 720},
            'year': {name: 'Year', value: 8640},
            '5-year': {name: '5 Years', value: 43200}
        },
        acHourScale: {
            // 'realtime': {name: 'Realtime', value: -1},
            'hour': {name: 'Hour', value: .57},
            'day': {name: 'Day', value: 13.7},
            'month': {name: 'Month', value: 413},
            'year': {name: 'Year', value: 4956},
            '5-year': {name: '5 Years', value: 24780}
        },
        selectedScale: null,
        //just vermont
        f35CostPerHour: 44000,
        //just vermont
        aircraftHoursPerMonth: 413,
        //hours per month / 30 / 24 
        aircraftHoursPerHour: .57,
        activeSlide: 1,
        partDelay: 1,
        partDuration: 2,
        animation: {opacity: 1, y: -20}
    },
    mutations: {
        mutate(state, payload) {
            state[payload.property] = payload.with;
        }
    },
    actions: {
        loadStates() {
            var vm = this;
            DataService.data('states')
            .then(function(d){
                vm.state.usStates = d;
            });
        },
        addCalcs() {
            this.state.scale.hour = {...this.state.scale.hour, ...{calc: this.state.aircraftHoursPerMonth / this.state.scale.hour.value }}
        }
    },
    modules: {},
    getters: {
        scale: state => state.scale,
        selectedScale: state => state.selectedScale,
        usStates: state => state.usStates,
        selectedState: state => state.selectedState,
        aircraftHoursPerMonth: state => state.aircraftHoursPerMonth,
        aircraftHoursPerHour: state => state.aircraftHoursPerHour,
        f35CostPerHour: state => state.f35CostPerHour,
        activeSlide: state => state.activeSlide,
        partDelay: state => state.partDelay,
        partDuration: state => state.partDuration,
        animation: state => state.animation
    }
})