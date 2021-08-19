<template>
    <div class="fullscreen flex flex-wrap justify-center items-center font-bold">
        <div :class="[panelClass, 'part1']">
            <h1 :class="mediumText">In order to house all homeless people in Vermont it would cost <p :class="largeText">$590,238</p> per month</h1>
        </div>
        <div :class="[panelClass, 'part2']">
            <p :class="mediumText">Which equates to</p>
            <h1 :class="mediumText"><div :class="largeText">13.4</div>F35 flight hours per month</h1>
        </div>
        <div :class="[panelClass, 'part3']">
            <p :class="mediumText">or to provide housing and transitional services</p>
            <h1 :class="largeText">32</h1><h1 :class="mediumText">F35 flight hours per month </h1>
        </div>


    </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
    name: 'Homeless2',
    props: ['text'],
    computed: {
        ...mapState([
            'animationPlaying', 'animation', 'animationOut', "mediumText", "largeText"
        ]),
        tl: {
            get(){
                return this.$store.getters.tl
            },
            set(v){ 
                this.$store.commit('mutate', {property: 'tl', with: v})
            }
        },
        tlOut: {
            get(){
                return this.$store.getters.tlOut
            },
            set(v){ 
                this.$store.commit('mutate', {property: 'tlOut', with: v})
            }
        }
    },
    data() {
        return  {
            currStepId: 1,
            panelClass: "w-full md:w-1/3 parts flex flex-col justify-center p-4 mt-8"
        }
    },
    mounted () {
        this.tlOut.clear();
        this.animateIn();
        this.tlOut.to('.parts', this.animationOut);
    },
    // updated() {
    //     this.tlOut.clear();
    //     this.animateIn();
    //     this.tlOut.to('.parts', this.animationOut);
    //     console.log('update');
    // },
    methods: {
        stepEnterHandler({ element, direction, index }) {
            console.log({ element, direction, index });
            this.currStepId = element.dataset.stepId
        },
        animateIn() {
            var vm = this;
            vm.tl.clear();
            vm.tlOut.pause();
            vm.tl.to('.part1', vm.animation);
            vm.tl.to('.part2', vm.animation);
            vm.tl.to('.part3', vm.animation);
            vm.tl.play(0);
        }
    }
}
</script>
<style lang="scss" scoped>
    .step {
        width: 80%;
        max-width: 40rem;
        padding: 10rem 0;
        margin: 0 3rem 15rem;
        background-color: white;
        display: flex;
        justify-content: center;
    }

    .step.is-active {
        
    }
    .parts {
        border-right: 4px solid rgba(0,0,0,.1);
        &:last-child {
            border-right: none;
        }
    }
</style>