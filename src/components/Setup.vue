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
            vm.tl.to('.part1', vm.animation);
            vm.tl.to('.part2', {...vm.animation, ...{delay: 1}}, "part2");
            vm.tl.to('.part3', vm.animation, "part3");
            vm.tl.from('.part4', {...vm.animation, ...{opacity: 0, x: 220, scale: .4}}, "part4");
            vm.tl.to('.part4', {...vm.animation, ...{x: 0, scale: 1}}, "part4");
            vm.tl.to('.part5', vm.animation, "part5");
            vm.tl.to('.part6', vm.animation, "part6");
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