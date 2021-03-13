<script>
import { Bar } from 'vue-chartjs'
import DataService from '../DataService';

export default {
    extends: Bar,
    data() {
        return {
            data: null,
            states: [],
            statesObj: {}
        }
    },
    mounted() {
        this.getData();
        // Overwriting base render method with actual data.

    },
    methods: {
        buildStates() {
          var vm = this;
          DataService.data('states')
          .then(function(response) {
              vm.statesObj = response;
              for(let s in response){
                console.log(response[s].name);
                vm.states.push(response[s].name);
              }
          })
          
        },
        getData() {
            var vm = this;
            
        }
    }
}
</script>