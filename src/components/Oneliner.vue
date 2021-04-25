<template>
    <div class="fullscreen flex flex-col justify-center items-center">
        <div v-html="text" ref="part1" class="justify-center items-center opacity-0 part1 parts" />
    </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
    name: 'Oneliner',
    props: ['text'],
    computed: {
        ...mapState([
            'animationPlaying', 'animation', 'animationOut'
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
            currStepId: 1
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
            vm.tl.play(0);
        }
    }
}
</script>
<style>
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
        background-color: beige;
    }
    .parts {
        @apply opacity-0
    }
</style>