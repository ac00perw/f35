<template>
    <div class="fullscreen flex">
        <div ref="part1" class="w-1/2 flex justify-center items-center opacity-0 part1 parts">
            <div class="graphic font-bold text-4xl">The F35 is the most expensive fighter jet in history</div>
        </div>
        <div class="w-1/2 flex flex-col justify-center items-center text-2xl">
            <div class="part2 parts w-full mb-4">
                <p>It costs $44k per hour to fly an F35</p>
            </div>
            <div class="part3 parts block mb-4">
                <p>Each F35 costs between 110 and 135 million dollars depending on the model</p>
            </div>
            <div class="part4 parts mb-4">
                <p>The total fleet of F35s in the United States is 2,456</p>
            </div>
            <div class="part5 parts mb-4">
                <p>Lifetime cost of the program is 1.727 trillion dollars</p>
            </div>
            <div class="part6 parts mb-4">
                <p>1,727,000,000,000 dollars</p>
            </div>
        </div>
    </div>
</template>
<script>
import { gsap, timeline } from "gsap/all";

export default {
    name: 'Stats',
    computed: {
        partDelay(){
            return this.$store.getters.partDelay;
        },
        partDuration(){
            return this.$store.getters.partDuration;
        }
    },
    data() {
        return  {
            currStepId: 1,
            tl: {}
        }
    },
    mounted () {
        this.tl = gsap.timeline();
        let fadeColor="#aaaaaa";
        let anim = {...this.$store.getters.animation, ...{Duration: this.partDuration, delay: this.partDelay}};
        this.tl.to('.part1', anim);
        this.tl.to('.part2', anim, "part2");
        this.tl.to('.part3', anim, "part3");
        this.tl.to('.part4', anim, "part4");
        this.tl.to('.part5', anim, "part5");
        this.tl.to('.part6', anim, "part6");
        this.tl.to('.part2', {color: fadeColor, duration: .5 }, "part3+=1");
        this.tl.to('.part3', {color: fadeColor, duration: .5 }, "part4+=1");
        this.tl.to('.part4', {color: fadeColor, duration: .5 }, "part5+=1");
        this.tl.to('.part5', {color: fadeColor, duration: .5 }, "part6+=1");
        this.tl.to('.parts', {color: 'black', duration: this.partDuration }, "partlast");
        this.tl.restart();
    },
    methods: {
        stepEnterHandler({ element, direction, index }) {
            console.log({ element, direction, index });
            this.currStepId = element.dataset.stepId
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