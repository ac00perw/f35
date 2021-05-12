<template>
    <div class="fullscreen flex">
        <div ref="part1" class="w-1/2 flex flex-col justify-center items-center opacity-0 part1 parts">
            <div class="graphic font-bold text-4xl mb-8">In Vermont there are twenty F35s</div>
            <div class="text-2xl">
            <div class="part2 parts w-full mb-4">
                <p>Six aircraft</p>
            </div>
            <div class="part3 parts block mb-4">
                <p>Fly ninety minutes</p>
            </div>
            <div class="part4 parts mb-4">
                <p>Two times per day</p>
            </div>
            <div class="part5 parts mb-4">
                <p>Eighteen days per month</p>
            </div>
            </div>
        </div>
        <div class="w-1/2 grid grid-cols-2 justify-center items-center pr-12">
            <div class="flex flex-wrap p-4 aircraft justify-between">
                    <img class="plane" src="/img/f35.svg" width="100"/>
                    <img class="plane" src="/img/f35.svg" width="100"/>
                    <img class="plane" src="/img/f35.svg" width="100"/>
                    <img class="plane" src="/img/f35.svg" width="100"/>
                    <img class="plane" src="/img/f35.svg" width="100"/>
                    <img class="plane" src="/img/f35.svg" width="100"/>
            </div>
            <clock class="clock"></clock>
            <calendar :totalDays="totalDays" class="cal"></calendar>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { gsap } from 'gsap/all'
import Clock from './Clock'
import Calendar from './Calendar'

export default {
    name: 'Stats',
    components: { Clock, Calendar },
    computed: {
        ...mapState([
            'animationPlaying',
            'animation',
            'animationOut'
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
            currStepId: 1,
            totalDays: 0
        }
    },
    mounted () {
        var vm = this;
        this.inAnimation();
        this.tlOut.clear();
        this.tlOut.to('.parts', this.animationOut);
    },
    methods: {
        inAnimation() {
            var vm = this;
            this.tl.clear();
            this.tlOut.pause();
            this.tl.set('.clock', {opacity: 0, y: 50, scaleY: .4});
            this.tl.set('.cal', {opacity: 0, y: 50});
            this.tl.set('.plane', {rotation: 90, x: -100, scale: 1.2});
            this.tl.to('.part1', vm.animation, "twenty");
            this.tl.to('.part2', vm.animation, "sixplanes");
            this.tl.to('.part3', vm.animation, "planes2");
            this.tl.to('.clock', {duration: .4, opacity: 1, y: 0, scaleY: 1, ease: "back.out(2.4)"}, "clock");
            
            this.tl.to('.part4', vm.animation, "twotimes");
            this.tl.to('.part5', vm.animation, "eighteen");
            this.tl.to('.cal', {duration: .4, opacity: 1, y: 0, scaleY: 1, ease: "back.out(2.4)"}, "cal");
            this.tl.call(() => { vm.totalDays = 31; console.log('function')}, null, "cal")
            // this.tl.to('.aircraft', {opacity: 1, duration: 1, delay: 2, onComplete: vm.planes}, "sixplanes");
            this.tl.to('.plane', {delay: 1, opacity: 1, scale: 1, x:0, duration: .5, ease: "back.out(1.7)", stagger: {each: .08, repeat: 0}}, 'sixplanes');
            // this.tl.set('.hand', {opacity: 1}, "clock");
            
            this.tl.to('.day', {opacity: 1, y: 0, scale: 1, duration: 1, ease: "back.out(1.7)", stagger: {each: .05, repeat: 0}}, "eighteen");
            this.tl.play(0);
        }
    }
}
</script>
<style>
body {
    background-color: yellow;
}
.plane {
    opacity: 0;
    transform: scale(.5);
}
.day {
    opacity: 0;
    transform: translateY(-100) scale(.9);
}
.clock, .cal {
    opacity: 0;
}
</style>