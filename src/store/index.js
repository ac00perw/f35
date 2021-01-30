import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        scale: {
            'hour': {name: 'Hour', value: 1},
            'day': {name: 'Day', value: 24},
            'month': {name: 'Month', value: 720},
            'year': {name: 'Year', value: 8640}
        },
        selectedScale: null,
        //just vermont
        f35: 44000,
        aircraftHours: {
            'hour': .04,
            'day': 14.1,
            'month': 423,
            'year': 5076
        }

    },
    mutations: {
        mutate(state, payload) {
            state[payload.property] = payload.with;
        }
    },
    actions: {},
    modules: {},
    getters: {
        scale: state => state.scale,
            selectedScale: state => state.selectedScale,
    }
})