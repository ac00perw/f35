<template>
    <div class="fullscreen flex flex-col justify-end items-center">
        <div class="justify-center part1 parts">
            <h1 class="font-bold md:text-4xl text-base">There are 68,416 hungry people in Vermont</h1>
        </div>
        <div class="justify-center part2 parts">
            <h1 class="font-bold md:text-2xl text-sm">The cost of 3 flight hours would feed 1,000 people for a month</h1>
        </div>
        <div class="justify-center part3 parts">
            <h1 class="font-bold md:text-2xl text-sm">In 13 days worth of flights all 68,416 hungry people could be fed for a month</h1>
        </div>
        <div class="flex flex-wrap p-6 justify-center relative md:px-20">
            <div v-for="index in 64" class="people-holder" :style="`width:${peopleSize};height:${peopleSize}`">
                <img class="person" :ref="'person-'+index" />
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
            peopleSize: '90px'
        }
    },
    mounted() {
        if(this.$store.getters.screenHeight < 750){
            this.peopleSize = '45px';
        }
        if(this.$store.getters.screenHeight < 500){
            this.peopleSize = '25px';
        }

        this.tlOut.clear();
        this.animateIn();
        this.tlOut.to('.parts', this.animationOut, "outer");
        this.tlOut.to('.person', { stagger: { each: .02, from: 'random', repeat: 0 }, y: `${this.peopleSize}`, duration: .2, ease: "power4.out" },"outer");

        
        // let m = Math.floor(Math.random() * 64);
        

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
        colorPeople() {
            var vm = this;
            console.log('cp')
            for(let i=1, c=64; i<= 64; i++){
                vm.tl.to(vm.$refs[`person-${i}`][0], { duration: 0, attr: { src: vm.getPerson() } });
                // vm.$refs[`person-${i}`][0].src =vm.getPerson();
            }
        },
        allSils() {
            for(let n=1,c=64; n<=64; n++) {
                console.log('n', n);
                // this.$refs[`person-${n}`][0].src=`/img/Person-${x}.svg`;
                this.$refs[`person-${n}`][0].src=this.getSil();
            }
        },
        animateIn() {
            var vm = this;
            vm.tl.clear();
            vm.tlOut.pause();
                //stagger a function to call random people into sils??

            
            vm.$forceUpdate();
            // vm.tl.set('.person', { opacity: 1, y: `${vm.peopleSize}` });
            // vm.tl.set('.people-holder', {css: { 'filter': 'blur(2px)','-webkit-filter': 'blur(2px)'}});
            vm.tl.to('.part1', vm.animation);
            vm.tl.call(vm.allSils());
            vm.tl.to('.part2', vm.animation);
            vm.tl.call(function() { vm.$refs['person-1'][0].src =vm.getPerson() } );
            vm.tl.to('.part3', {...vm.animation, ...{delay: 3}}, "three");
            vm.tl.call(vm.colorPeople(), null, "three");
            // vm.tl.to('.person', { stagger: { each: .05, repeat: 0, from: 'random' }, y: 5, duration: .5, ease: "back.out(1.2)" });
            // vm.tl.to('.people-holder', {stagger: { each: .05, repeat: 0, from: 'random' }, duration: 1, css: { 'filter': 'blur(0)','-webkit-filter': 'blur(0)'}});
            // vm.tl.play(0);
        }
    }
}
</script>
<style>
.people-holder {
    border-radius: 50%;
    background-color: #f6ece6;
    border: 1px solid rgba(0, 0, 0, .3);
    overflow: hidden;
    position: relative;
    margin: 2px;
}

.person {
    display: block;
    position: absolute;
    width: 100%;
    transform: translateY(-300);
    opacity: 1;
}
</style>