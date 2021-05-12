<template>
    <div class="fullscreen flex">
        
        <div ref="part1" class="w-1/2 flex justify-center items-center opacity-0 part1 parts">
            <div class="graphic font-bold text-4xl"><h1 class="font-bold text-4xl">In Vermont, the F35s fly an average of 14.1 hours per day</h1></div>
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
    name: 'Flighthours',
    computed: {
        ...mapState([
            'animationPlaying',
            'animation',
            'animationOut'
        ]),
        partDelay(){
            return this.$store.getters.partDelay;
        },
        partDuration(){
            return this.$store.getters.partDuration;
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
        let fadeColor="#aaaaaa";
        this.animateIn();
        this.tlOut.clear();
        this.tlOut.to('.parts', this.animationOut);

    },
    methods: {
        animateIn() {
            this.tl.clear();
            this.tl.to('.part1', this.animation, "part1");
            this.tl.to('.part2', this.animation, "part2");
            this.tl.to('.part3', this.animation, "part3");
            this.tl.to('.part4', this.animation, "part4");
            this.tl.to('.part5', this.animation, "part5");
            this.tl.play(0);
        }
    }
}
</script>
<style scoped>
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
        transform: scale(.5);
    }
</style>