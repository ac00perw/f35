<template>
    <div>
        <div class="completion-bar">
            <div class="progress"></div>
        </div>
        {{ progress }}
        <p>{{ animationPlaying }} {{ componentsList[currentComponent].name }}</p>
        <div :class="`fullscreen framewrap-${currentComponent}`">
            <transition
                  @before-enter="beforeEnter"
                  @enter="enter"
                  @enter-cancelled="enterCancelled"
                  
                  @leave="leave"
                  :css="false"
                  appear
                  mode="out-in"
                >
                <component :is="componentsList[currentComponent].name" v-bind="componentsList[currentComponent].props" :key="currentComponent" />
            </transition>
                <backgrounds />
        </div>
    </div>
</template>
<script>
// polyfill for IntersectionObserver
import 'intersection-observer'
import { gsap, GSDevTools } from 'gsap/all'
import Intro from '../components/Intro.vue'
import Frequency from '../components/Frequency.vue'
import Flighthours from '../components/Flighthours.vue'
import Oneliner from '../components/Oneliner.vue'
import Backgrounds from '../components/Backgrounds.vue'
import { mapState, mapMutations } from 'vuex'

export default {
    computed: {
        animationPlaying() {
            return this.$store.getters.animationPlaying
        },
        partDelay() {
            return this.$store.getters.partDelay;
        },
        animation() {
            return this.$store.getters.animation;
        },
        partDuration() {
            return this.$store.getters.partDuration;
        },
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
        },
        currentComponent: {
            get() {
                return this.$store.getters.currentComponent;
            },
            set(v) {
                this.$store.commit('mutate', { property: 'currentComponent', with: v }); 
            }
        }
    },
    watch: {
        currentComponent(n, o) {
            gsap.to('.progress', { ease: "expo.out", duration: 2, width: `${100 * (this.currentComponent / this.componentsList.length)}%` });
        }
    },
    components: {
        Intro,
        Frequency,
        Flighthours,
        Oneliner,
        Backgrounds
    },
    data() {
        return {
            componentsList: [
                { name: 'Intro', props: null },
                { name: 'Frequency', props: null },
                // { name: 'Oneliner', props: { text: '<div class="p1"><h1 class="font-bold text-9xl w-full">$18,295,200</h1></div><h3 class="p2 text-6xl">per month</h3>' } },
                { name: 'Flighthours', props: null },
                // { name: 'Oneliner', props: { text: '<h1 class="font-bold text-4xl">There are 68,416 hungry people in Vermont</h1>' } },
                { name: 'Oneliner', props: { text: '<p class="font-bold text-2xl">This averages to</p><p class="font-bold text-8xl w-full">14.1</p><p class="font-bold text-2xl">aircraft hours per day</p>' } },
                { name: 'Oneliner', props: { text: '<h1 class="font-bold text-4xl">There are 68,416 hungry people in Vermont</h1>' } },
                { name: 'Oneliner', props: { text: '<8,346,752 dollars><p class="text-4xl">Of the total 423 monthly flight hours, it would take</p><p class="font-bold text-8xl">190 hours </p><p class="text-4xl"> to feed all the hungry people in Vermont</p>' } },
                { name: 'Oneliner', props: { text: '<h1 class="font-bold text-4xl">And 119,973 hours to feed all the hungry people in the United States</h1>' } },
                { name: 'Oneliner', props: { text: '<h1 class="font-bold text-6xl">What about homelessness in Vermont?</h1>' } },
                { name: 'Oneliner', props: { text: '<h1 class="font-bold text-4xl">There are 1,089 homeless people in Vermont</h1>' } },
                { name: 'Oneliner', props: { text: '<h1 class="font-bold text-4xl">It costs $542 per month to provide affordable housing for a homeless person</h1>' } },
                { name: 'Oneliner', props: { text: '<h1 class="font-bold text-4xl">In order to house all homeless people in Vermont it would cost $590,238</h1>' } },
                { name: 'Oneliner', props: { text: '<h1 class="font-bold text-4xl">or<br><div class="text-8xl w-full">13.4</div> F35 flight hours per month</h1>' } },
                { name: 'Oneliner', props: { text: '<h1 class="font-bold text-6xl">or 32 flight hours</h1><h1 class="font-bold text-4xl">to provide housing and transitional services to all of them</h1>' } },
                { name: 'Oneliner', props: { text: '<h1 class="font-bold text-6xl">Moving on to student loans</h1>' } },
                { name: 'Oneliner', props: { text: '<h1 class="font-bold text-4xl">There were 95,000 student loan borrowers in Vermont in 2019</h1>' } },
                { name: 'Oneliner', props: { text: '<h1 class="font-bold text-4xl">With an average balance of $32,600</h1>' } },
                { name: 'Oneliner', props: { text: '<h1 class="font-bold text-4xl">Total student loan debt in Vermont is $3,097,000,000 in 2019</h1>' } },
                { name: 'Oneliner', props: { text: '<h1 class="font-bold text-4xl">Which could be wiped out with x# F35 flight hours</h1>' } },
                { name: 'Oneliner', props: { text: '<h1 class="font-bold text-4xl">That would mean that in the time that it takes x# F35s to fly x hours</h1>' } },
                { name: 'Oneliner', props: { text: '<h1 class="font-bold text-4xl">We could wipe out student loan debt, homelessness and hunger in Vermont</h1>' } }
            ],
            progress: 0
        }
    },
    mounted() {
        var vm = this;
        // vm.tl.play(0);
        // GSDevTools.create({minimal: true, globalSync: true});
        
        document.addEventListener('keydown', vm.key);

        this.tl.eventCallback("onComplete", function() {
            console.log('done tl')
            vm.mutate({ property: 'animationPlaying', with: false });
        });

        this.tl.eventCallback("onUpdate", function() {
            vm.progress = vm.tl.progress();
        });
        
    },
    methods: {
        beforeEnter(el) {
            this.tlOut.pause().seek(0);
            this.tl.pause(0);
        },
        enter(el, done) {
            console.log('enter');
            var vm = this;
            vm.tlOut.seek(0).pause();
            vm.tl.play(0);
            vm.tl.eventCallback("onComplete", function() {
                console.log('start tl complete')
                done();
            });
        },
        enterCancelled(el) {
            console.log('start cancelled.')

        },
        // leaveCancelled(el) {
        //     console.log('leave cancelled.')
        //     this.tlOut.seek(0).pause();
        // },
        leave(el, done) {
            console.log('leaving... ');
            this.tl.pause().clear();
            this.tlOut.play(0);
            console.log(this.tlOut);
            this.tlOut.eventCallback('onComplete', function() { 
                console.log('done tlout back. left')
                
               done(); 
            });
        },
        ...mapMutations([
            'mutate'
        ]),
        resetTimeline() {
            console.log('reset');
            this.tl.play(0, true);
            this.tlOut.pause(0);
        },
        key(e) {
            // console.log(e.key);
            var vm = this;

            switch (e.key) {
                case 'ArrowRight':
                    
                    // vm.tl.reverse(null, false);
                    // let duration = vm.tl.totalDuration();
                    // vm.tl.totalDuration(.4);
                    // vm.tl.reverse(null, false);
                    vm.currentComponent = (vm.currentComponent >= vm.componentsList.length ? 0 : vm.currentComponent += 1);
                    // vm.tlOut.play();
                    // vm.tl.clear();
                    // vm.tlOut.eventCallback('onComplete', function() { 
                    //     console.log('done tlOut forward')
                        
                    //     vm.resetTimeline();
                    //     //vm.tl.totalDuration(duration);
                    // });
                    break;
                case 'ArrowLeft':
                //animation runs in reverse.
                // vm.tl.reverse(null, false);
                vm.currentComponent = (vm.currentComponent <= 0 ? vm.currentComponent = 0 : vm.currentComponent -= 1);
                    break;
            }
        }
    }
}
</script>
<style src="vue-scrollama/dist/vue-scrollama.css"></style>
<style lang="scss">
.completion-bar {
    width: 100%;
    height: 5px;
    position: absolute;
    top: 0;
    left: 0;
    outline: 1px solid rgba(0, 0, 0, .2);
}

.completion-bar .progress {
    position: absolute;
    top: 0;
    left: 0;
    height: 5px;
    width: 10px;
    background-color: gold;
}

.fullscreen {
    width: 100vw;
    height: 90vh;
    margin-bottom: 100px;
}

</style>
<style scoped>


.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 1s 0.2s;
    transform: translateY(0);
}

.slide-fade-enter,
.slide-fade-leave-active    
    {
    opacity: 0;
}

.slide-fade-enter {
    transform: translateY(-100px);
}

.slide-fade-leave-active {
    transform: translateY(-100px);
}
</style>