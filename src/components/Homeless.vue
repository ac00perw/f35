<template>
    <div class="fullscreen flex flex-wrap justify-center items-stretch">
        <div :class="[panelClass, 'part1']">
            <h1 :class="[mediumText, 'self-start text-center']">There are 1,089 homeless people in Vermont</h1>
            <img class="inline-block self-center" src="/img/homeless-bench.svg" width="70%"/>
        </div>
        <div :class="[panelClass, 'part2']">
            <div :class="[mediumText, 'self-start']">It costs $542 per month to provide affordable housing for a homeless person</div>
            <img class="inline-block self-center" src="/img/homeless-house.svg" width="70%" />
        </div>
        <div :class="[panelClass, 'part3']">
            <h1 :class="mediumText">It costs $1,250 per month to provide affordable housing with transitional support</h1>
            <img class="inline-block self-center" src="/img/homeless-trans.svg" width="70%" />
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
    name: 'Homeless',
    props: ['text'],
    computed: {
        ...mapState([
            'animationPlaying', 'animation', 'animationOut', 'mediumText', 'largeText'
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
            panelClass: "w-full md:w-1/3 parts flex flex-col justify-center items-center p-4"
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
        img {
            max-width: 250px;
        }
    }
</style>