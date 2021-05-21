<template>
    <div class="fullscreen flex flex-wrap justify-center items-center">
        <div v-html="text" ref="part1" class="justify-center opacity-0 part1 parts" />
        <div class="flex flex-wrap p-6 justify-center relative">
            <div v-for="index in 64" class="people-holder" :style="`width:${peopleSize};height:${peopleSize}`">
                <img class="person" :ref="'person-'+index" />
            </div>
            <!-- <div class="people-holder" :style="`width:${peopleSize};height:${peopleSize}`">
                <img src="/img/Person-18.svg" class="person" / -->
        </div>
    </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { css } from 'gsap'
export default {
    name: 'HungryPeople',
    props: ['text'],
    computed: {
        ...mapState([
            'animationPlaying', 'animation', 'animationOut'
        ]),
        tl: {
            get() {
                return this.$store.getters.tl
            },
            set(v) {
                this.$store.commit('mutate', { property: 'tl', with: v })
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
        return {
            currStepId: 1,
            people: [],
            peopleSize: '100px'
        }
    },
    mounted() {
        this.tlOut.clear();
        this.animateIn();
        this.tlOut.to('.parts', this.animationOut, "outer");
        this.tlOut.to('.person', { stagger: { each: .05, from: 'random', repeat: 0 }, y: `${this.peopleSize}`, duration: .5, ease: "power4.out" },"outer");
        for(let n=1,c=64; n<=64; n++) {
            console.log('n', n);
            // this.$refs[`person-${n}`][0].src=`/img/Person-${x}.svg`;
            this.$refs[`person-${n}`][0].src=this.getSil();
        }
        let m = Math.floor(Math.random() * 64);
        this.$refs[`person-${m}`][0].src =this.getPerson();

    },
    // updated() {
    //     this.tlOut.clear();
    //     this.animateIn();
    //     this.tlOut.to('.parts', this.animationOut);
    //     console.log('update');
    // },
    methods: {
        getSil(i) {
            let index = Math.floor(Math.random() * 5) +1;
            return `/img/Silhouette ${index}.svg`
        },
        getPerson(){
            let index = Math.floor(Math.random() * 32) +1;
            return `/img/Person-${index}.svg`
        },
        stepEnterHandler({ element, direction, index }) {
            console.log({ element, direction, index });
            this.currStepId = element.dataset.stepId
        },
        animateIn() {
            var vm = this;
            vm.tl.clear();
            vm.tlOut.pause();
            //stagger a function to call random people into sils??

            
            vm.$forceUpdate();
            // vm.tl.set('.person', { opacity: 1, y: `${vm.peopleSize}` });
            // vm.tl.set('.people-holder', {css: { 'filter': 'blur(2px)','-webkit-filter': 'blur(2px)'}});
            // vm.tl.to('.part1', vm.animation);
            vm.tl.to('.person', { stagger: { each: .05, repeat: 0, from: 'random' }, y: 5, duration: .5, ease: "back.out(1.2)" });
            // vm.tl.to('.people-holder', {stagger: { each: .05, repeat: 0, from: 'random' }, duration: 1, css: { 'filter': 'blur(0)','-webkit-filter': 'blur(0)'}});
            // vm.tl.play(0);
        }
    }
}
</script>
<style>

.parts {
    @apply opacity-0
}

.people-holder {
    border-radius: 50%;
    background-color: #f6ece6;
    border: 1px solid rgba(0, 0, 0, .1);
    overflow: hidden;
    position: relative;
    width: 280px;
    height: 280px;
    margin: 4px;
}

.person {
    display: block;
    position: absolute;
    width: 100%;
    transform: translateY(-300);
    opacity: 1;
}
</style>