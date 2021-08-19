<template>
    <div class="fullscreen flex flex-col justify-center items-center">
        <div class="justify-center items-center opacity-0 part1 parts">
            <h1 class="text-4xl">How do you want your tax dollars to be spent?</h1>
        </div>
        <div v-for="index in totalDollars" :key="index">
            <dollar :class="`dollar d${index}`"/>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { gsap } from 'gsap'
import Dollar from './Dollar'

export default {
    name: 'Oneliner',
    components: { Dollar },
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
            currStepId: 1,
            totalDollars: 100
        }
    },
    mounted () {
        this.tlOut.clear();
        this.animateIn();
        this.tlOut.to('.parts', this.animationOut);
    },

    methods: {
        randomStyle() {
            let xy = {x: window.innerWidth, y: window.innerHeight};
            return `position:absolute;transform:rotate(${this.rand(0,360)}deg);top:${this.rand(0,xy.y)}px;left:${this.rand(0,xy.x)}px`
        },
        rand(min, max) {
            return Math.floor(Math.random()*(max-min+1)+min)
        },
        tween(object, delay = 1) {
            var vm= this;
            let xy = {x: window.innerWidth, y: window.innerHeight};
            console.log(object);
            gsap.to(object, {opacity: 1, rotate: vm.rand(0,360), x: vm.rand(0, xy.x), y: vm.rand(0,xy.y), duration: 1, delay: delay, ease: "power4.out"} );
        },
        animateIn() {
            var vm = this;
            vm.tl.clear();
            vm.tlOut.pause();
            // vm.tl.from('.dollar', {opacity: 0});
            vm.tl.to('.part1', vm.animation);
            vm.tl.call(function() {
                for(let i=0, c=vm.totalDollars; i < c; i++){
                    let obj = `.d${i}`;
                    vm.tween(obj, .2 * i);
                }
            }, null, '+=2');
            vm.tl.play(0);
        }
    }
}
</script>
<style>
.dollar {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
}
.parts {
    @apply opacity-0
}
</style>