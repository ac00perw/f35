<template>
    <div class="fullscreen flex flex-col justify-center items-center">
        <div v-html="text" ref="part1" class="justify-center items-center opacity-0 part1 parts" />
    </div>
</template>
<script>

export default {
    name: 'Oneliner',
    props: ['text'],
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
        let anim = {...this.$store.getters.animation, ...{Duration: this.partDuration, delay: this.partDelay}};
        this.tl.to('.part1', anim, "part1");
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