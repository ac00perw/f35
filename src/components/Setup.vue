<template>
    <div class="fullscreen flex">
        Setup
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { gsap, timeline } from "gsap/all"

export default {
    name: 'Setup',
    props: ['text'],
    computed: {
        ...mapState([
            'animationPlaying',
            'animation',
            'animationOut'
        ]),
        partDelay(){
            return this.$store.getters.partDelay;
        },
        tl: {
            get(){
                return this.$store.getters.tl
            },
            set(v){ 
                this.$store.commit('mutate', {property: 'tl', with: v})
            }
        },
        tlOut: {
            get() {
                return this.$store.getters.tlOut
            },
            set(v) {
                this.$store.commit('mutate', { property: 'tlOut', with: v })
            }
        }
    },
    data() {
        return  {
            currStepId: 1
        }
    },
    mounted () {
        var vm = this;
        vm.animateIn();
        this.tlOut.clear();
        vm.tlOut.to('.parts', vm.animationOut);

    },
    methods: {
        ...mapMutations([
            'mutate'
        ]),
        animateIn() {
            var vm = this;
            vm.tl.clear();
            this.tlOut.pause();
            vm.tl.to('.part1', {...vm.animation, ...{duration: .2}});
            vm.tl.to('.part2', vm.animation, "part2");
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
        @apply opacity-0;
        
    }
</style>