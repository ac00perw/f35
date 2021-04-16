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

export default {
    name: 'Stats',
    computed: {
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
        }
    },
    data() {
        return  {
            currStepId: 1
        }
    },
    mounted () {
        let fadeColor="#aaaaaa";
        this.tl.to('.part1', {opacity: 1, duration: this.partDuration });
        this.tl.to('.part2', {opacity: 1, duration: this.partDuration, delay: this.partDelay}, "part2");
        this.tl.to('.part3', {opacity: 1, duration: this.partDuration, delay: this.partDelay}, "part3");
        this.tl.to('.part4', {opacity: 1, duration: this.partDuration, delay: this.partDelay}, "part4");
        this.tl.to('.part5', {opacity: 1, duration: this.partDuration, delay: this.partDelay}, "part5");
        this.tl.to('.part2', {color: fadeColor, duration: .5 }, "part3+=1");
        this.tl.to('.part3', {color: fadeColor, duration: .5 }, "part4+=1");
        this.tl.to('.part4', {color: fadeColor, duration: .5 }, "part5+=1");
        // this.tl.to('.part5', {color: fadeColor, duration: .5 }, "part6+=1");
        this.tl.to('.parts', {color: 'black', duration: this.partDuration }, "part6");
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