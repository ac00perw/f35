import Vue from 'vue'
import Vuex from 'vuex'
import DataService from '../DataService'
import { gsap, timeline } from "gsap/all"
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        mediumText: 'font-bold md:text-4xl text-lg',
        largeText: 'md:text-6xl text-3xl',
        screenHeight: screen.height,
        screenWidth: document.body.clientWidth,
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
        currentComponent: 4,
        animation: {opacity: 1, y: -20, scale: 1, ease: 'back.inOut(1.8)', duration: 1, delay: 1},
        animationOut: {stagger: {each: .05, repeat: 0}, delay: 0, opacity: 0, y: -80, ease: 'power3.inOut', duration: .4},
        tl: gsap.timeline(),
        tlOut: gsap.timeline(),
        animationProgress: null,
        animationPlaying: false
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
    // modules: {},
    getters: {
        screenHeight: state => state.screenHeight,
        screenWidth: state => state.screenWidth,
        scale: state => state.scale,
        selectedScale: state => state.selectedScale,
        usStates: state => state.usStates,
        selectedState: state => state.selectedState,
        aircraftHoursPerMonth: state => state.aircraftHoursPerMonth,
        aircraftHoursPerHour: state => state.aircraftHoursPerHour,
        f35CostPerHour: state => state.f35CostPerHour,
        partDelay: state => state.partDelay,
        animation: state => state.animation,
        animationOut: state => state.animationOut,
        tl: state => state.tl,
        tlOut: state => state.tlOut,
        animationPlaying: state => state.animationPlaying,
        currentComponent: state => state.currentComponent,
        people: state => state.people,
        mediumText: state => state.mediumText,
        largeText: state => state.largeText,
        animationProgress: state => state.animationProgress
    }
})