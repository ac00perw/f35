<template>
    <div class="fullscreen flex">
        <div ref="part1" class="w-1/2 flex justify-center items-center opacity-0 part1 parts">
            <div class="graphic font-bold text-4xl">The F35 is the most expensive fighter jet in history</div>
        </div>
        <div class="w-1/2 flex flex-col justify-center items-center text-2xl">
            <div class="part2 parts block mb-4">
                <p>Each F35 costs between 110 and 135 million dollars (depending on the model)</p>
            </div>
            <div class="part3 parts w-full mb-4">
                <p>It costs <strong>$44,000 per hour</strong> to fly an F35</p>
            </div>
            <div class="part4 parts mb-4">
                <p>There are 2,456 F35s in the United States</p>
            </div>
            <div class="part5 parts mb-4">
                <p>Lifetime cost of the program is 1.727 trillion dollars</p>
            </div>
            <div class="part6parts mb-4 numParts">
                    <span v-for="(p, index) in numberParts" :class="`pn-${index}`" :key="`${index}-${p}`" v-bind:data-index="index">
                        {{ p }}
                    </span>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { gsap, timeline } from "gsap/all"

export default {
    name: 'Stats',
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
            currStepId: 1,
            fullNumber: '',
            numberParts: "1,727,000,000,000"
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
            // vm.tl.from('.part4', {...vm.animation, ...{opacity: 0, x: 0, scale: 1}}, "part4");
            vm.tl.to('.part4', {...vm.animation, ...{x: 0, scale: 1}}, "part4");
            vm.tl.to('.part5', vm.animation, "part5");
            vm.tl.to('.part6', {...vm.animation, ...{delay: 0}}, "part6");
            for(let i = 0, c = vm.numberParts.length; i < c; i++) {
                let delay = (vm.numberParts[i] == ',' ? 0 : .2);
                vm.tl.fromTo(`.pn-${i}`, {y: -10, fontSize: 5}, {fontSize: 40, duration: .2, opacity: 1, y: 0, delay: delay })
            };
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
    .parts, .numParts span {
        @apply opacity-0;
        
    }

</style>