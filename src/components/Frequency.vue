<template>
    <div class="fullscreen flex">
        <div ref="part1" class="w-1/2 flex justify-center items-center opacity-0 part1 parts">
            <div class="graphic font-bold text-4xl">In Vermont there are twenty F35s</div>
        </div>
        <div class="w-1/2 flex flex-col justify-center items-center text-2xl">
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
</template>
<script>
import { mapState, mapMutations } from 'vuex'

export default {
    name: 'Stats',
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
            currStepId: 1
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
            this.tl.to('.part1', vm.animation, "part1");
            this.tl.to('.part2', vm.animation, "part2");
            this.tl.to('.part3', vm.animation, "part3");
            this.tl.to('.part4', vm.animation, "part4");
            this.tl.to('.part5', vm.animation, "part5");
            this.tl.play(0);
        }
    }
}
</script>
