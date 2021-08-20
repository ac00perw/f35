 <template>
    <div>
        <div class="completion-bar">
            <div class="progress"></div>
        </div>
        <div class="arrows absolute top-0 left-0 w-full">
        <div class="flex flex-wrap justify-between" v-if="!animationPlaying">
            <div class="self-start text-8xl pl-2 cursor-pointer" @click="rewindComponent"><</div>
            <!-- p:{{ animationProgress }} isplay:{{ animationPlaying }}
            cc: {{ currentComponent }} cw: {{ screenWidth/componentsList.length }}
            tp:{{ totalProgress }} -->
            <div class="self-end text-8xl pr-2 cursor-pointer" @click="advanceComponent">></div>

        </div>
        
        </div>
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
import Setup from '../components/Setup.vue'
import Intro from '../components/Intro.vue'
import Frequency from '../components/Frequency.vue'
import Flighthours from '../components/Flighthours.vue'
import Oneliner from '../components/Oneliner.vue'
import Hungrypeople from '../components/Hungrypeople.vue'
import Homeless from '../components/Homeless.vue'
import Homeless2 from '../components/Homeless2.vue'
import Wrapup from '../components/Wrapup.vue'
import Sources from '../components/Sources.vue'
import Backgrounds from '../components/Backgrounds.vue'
import { mapState, mapMutations } from 'vuex'

export default {
    computed: {
        ...mapState([
            'animation', 'animationOut', "mediumText", "largeText", "screenWidth"
        ]),
        animationProgress: {
            get() {
                return this.$store.getters.animationProgress
            },
            set(n) {
                this.$store.commit('mutate', {property: 'animationProgress', with: n})
            }
        },
        animationPlaying: {
            get() {
                return this.$store.getters.animationPlaying
            },
            set(n) {
                this.$store.commit('mutate', {property: 'animationPlaying', with: n})
            }
        },
        partDelay() {
            return this.$store.getters.partDelay;
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
    components: {
        Setup,
        Intro,
        Frequency,
        Flighthours,
        Homeless,
        Homeless2,
        Oneliner,
        Hungrypeople,
        Backgrounds,
        Wrapup,
        Sources
    },
    data() {
        return {
            totalProgress: null,
            componentsList: [
                { name: 'Setup' },
                { name: 'Intro', props: null },
                { name: 'Frequency', props: null },
                { name: 'Oneliner', props: { text: '<p class="font-bold text-2xl">This averages to</p><p class="font-bold text-8xl w-full">14.1</p><p class="font-bold text-2xl">aircraft hours per day</p>' } },
                { name: 'Hungrypeople' },
                { name: 'Homeless' },
                { name: 'Homeless2' },
                { name: 'Wrapup' },
                { name: 'Sources' },
            ]
        }
    },
    mounted() {
        var vm = this;
        document.addEventListener('keydown', vm.key);

        this.tl.eventCallback("onStart", function() {
            console.log('done tl')
            vm.animationPlaying = true;
        });

        this.tl.eventCallback("onComplete", function() {
            console.log('done tl')
            vm.animationPlaying = false;
        });

        this.tl.eventCallback("onUpdate", function() {
            
            vm.animationProgress= 0+(this.progress() * 100/100) * (vm.screenWidth/vm.componentsList.length);
            vm.totalProgress = 0 + (vm.screenWidth/vm.componentsList.length * vm.currentComponent) + vm.animationProgress;
            vm.animationPlaying = this.progress() < .9 ? true : false;
            gsap.to('.progress', { ease: "expo.out", duration: .2, width: `${vm.totalProgress}px` });
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
            this.animationProgress = 0;
        },
        advanceComponent() {
            var vm = this;
            vm.currentComponent = (vm.currentComponent >= vm.componentsList.length ? vm.componentsList.length : vm.currentComponent += 1);
        },
        rewindComponent() {
            var vm = this;
            vm.currentComponent = (vm.currentComponent <= 0 ? vm.currentComponent = 0 : vm.currentComponent -= 1);
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
                    vm.advanceComponent();
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
                    vm.rewindComponent();
                    break;
            }
        }
    }
}
</script>
<style lang="scss">
.completion-bar {
    width: 100%;
    height: 12px;
    position: absolute;
    top: 0;
    left: 0;
    border-bottom: 1px solid rgba(0, 0, 0, .2);
}

.completion-bar .progress {
    position: absolute;
    top: 0;
    left: 0;
    height: 10px;
    width: 10px;
    background-color: #ff6409;
}

.fullscreen {
    width: 100vw;
    height: 90vh;
    margin-bottom: 100px;
}
.arrows {
    z-index: 1200;
}
</style>
<style scoped>
.fade-transition {
  opacity: 1;
  transition: all 1s ease;
}
  
.fade-enter, .fade-leave{
  opacity: 0;
}

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