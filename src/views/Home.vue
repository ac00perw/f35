<template>
    <div>
        <div class="fullscreen" v-show="activeSlide == 1">
            <intro />
        </div>
        <div class="fullscreen flex justify-center items-center" v-show="activeSlide == 2">
            <frequency />
        </div>
        <div class="fullscreen flex flex-col justify-center items-center" v-show="activeSlide == 3">
            <h1 class="font-bold text-9xl w-full fade-in opacity-0">$18,295,200</h1>
            <h3 class="text-6xl fade-in opacity-0">per month</h3>
        </div>
        <div class="fullscreen flex justify-center items-center" v-show="activeSlide == 4">
            <h1 class="font-bold text-4xl">In Vermont, the F35s fly x number of hours per day</h1>
        </div>
        <div class="fullscreen flex justify-center items-center" v-show="activeSlide == 5">
            <h1 class="font-bold text-4xl">There are x# of hungry people in Vermont</h1>
        </div> 
        <div class="fullscreen flex justify-center items-center" v-show="activeSlide == 6">
                <h1 class="font-bold text-4xl">That means that it would take x number of flight hours to feed all the hungry people in Vermont</h1>
        </div>

        <div class="fullscreen flex justify-center items-center" v-show="activeSlide == 7">
            <h1 class="font-bold text-4xl">And x # of hours to feed all the hungry people in the US</h1>
        </div>
        <div class="fullscreen flex justify-center items-center" v-show="activeSlide == 8">
            <h1 class="font-bold text-4xl">What about homelessness in Vermont</h1>
        </div>
        <div class="fullscreen flex justify-center items-center" v-show="activeSlide == 9">
            <h1 class="font-bold text-4xl">There are 1089 homeless people in Vermont</h1>
        </div>
        <div class="fullscreen flex justify-center items-center" v-show="activeSlide == 10">
            <h1 class="font-bold text-4xl">It costs $x to provide transitional housing for a homeless individual</h1>
        </div>
        <div class="fullscreen flex justify-center items-center" v-show="activeSlide == 11">
            <h1 class="font-bold text-4xl">Which is not only the right thing to do, but also saves taypayer money</h1>
        </div>
        <div class="fullscreen flex justify-center items-center" v-show="activeSlide == 12">
            <h1 class="font-bold text-4xl">In order to provide all the homess in Vermont it would cost $x</h1>
        </div>
        <div class="fullscreen flex justify-center items-center" v-show="activeSlide == 13">
            <h1 class="font-bold text-4xl">x# of F35 flight hours</h1>
        </div>
        <div class="fullscreen flex justify-center items-center" v-show="activeSlide == 14">
            <h1 class="font-bold text-4xl">Also saving $x of taxpayer dollars.</h1>
        </div>
        <div class="fullscreen flex justify-center items-center" v-show="activeSlide == 15">
            <h1 class="font-bold text-4xl">Moving on to student loans</h1>
        </div>
        <div class="fullscreen flex justify-center items-center" v-show="activeSlide == 16">
            <h1 class="font-bold text-4xl">There were 95,000 student loan borrowers in Vermont in 2019</h1>
        </div>
        <div class="fullscreen flex justify-center items-center" v-show="activeSlide == 17">
            <h1 class="font-bold text-4xl">With an average balance of $32,600</h1>
        </div>
        <div class="fullscreen flex justify-center items-center" v-show="activeSlide == 18">
            <h1 class="font-bold text-4xl">Total student loan debt in Vermont is $3,097,000,000 in 2019</h1>
        </div>
        <div class="fullscreen flex justify-center items-center" v-show="activeSlide == 19">
            <h1 class="font-bold text-4xl">Which could be wiped out with x# F35 flight hours</h1>
        </div>
        <div class="fullscreen flex justify-center items-center" v-show="activeSlide == 20">
            <h1 class="font-bold text-4xl">What about homelessness in Vermont</h1>
        </div>
        <div class="fullscreen flex justify-center items-center" v-show="activeSlide == 21">
            <h1 class="font-bold text-4xl">That would mean that in the time that it takes x# F35s to fly x hours</h1>
        </div>
        <div class="fullscreen flex justify-center items-center" v-show="activeSlide == 22">
            <h1 class="font-bold text-4xl">We could wipe out student loan debt, homelessness and hunger in Vermont</h1>
        </div>
<!--         <Scrollama offset="72" @step-enter="stepEnterHandler" id="flexed1" v-show="activeSlide == 23">>
            <div slot="graphic" class="graphic2">
                <p>Hello</p>
            </div>
            <div data-step-id="4" class="step">
                <img width="100%" src="https://acdubs.com/api/showimage/poster/278518/53" />
            </div>
            <div data-step-id="5" class="step">
                <p>STEP 2</p>
            </div>
            <div data-step-id="6" class="step">
                <p>STEP 3</p>
            </div>
        </Scrollama> -->
    </div>
</template>
<script>
// polyfill for IntersectionObserver
import 'intersection-observer'
import { gsap } from 'gsap/all'
import Intro from '../components/Intro.vue'
import Frequency from '../components/Frequency.vue'

export default {
    computed: {
        activeSlide: {
            get() {
                return this.$store.getters.activeSlide;
            },
            set(v) {
                this.$store.commit('mutate', { property: 'activeSlide', with: v });
            }
        },
        partDelay() {
            return this.$store.getters.partDelay;
        },
        partDuration() {
            return this.$store.getters.partDuration;
        }
    },
    components: {
        Intro,
        Frequency
    },
    data() {
        return {
            currStepId: null
        }
    },
    mounted() {
        var vm = this;
        vm.activeSlide=1;
        document.addEventListener('keydown', vm.key);
        gsap.to('.fade-in', {opacity: 1, delay: this.partDelay, duration: vm.partDuration})
    },
    methods: {
        stepEnterHandler({ element, direction, index }) {
            console.log({ element, direction, index });
            this.currStepId = element.dataset.stepId
        },
        key(e) {
            console.log(e.key);
            switch (e.key) {
                case 'ArrowRight': 
                    this.activeSlide += 1;
                break;
                case 'ArrowLeft': 
                    this.activeSlide = (this.activeSlide <= 1 ? this.activeSlide = 1 : this.activeSlide -= 1);
                break;
            }
        }
    }
}
</script>
<style src="vue-scrollama/dist/vue-scrollama.css"></style>
<style lang="scss">
.fullscreen {
    width: 100vw;
    height: 90vh;
    margin-bottom: 100px;
}
// overrides here
#scrollama-container-flexed {
    // id="flexed" passed as prop to Scrollama in template
    display: flex;
    flex-direction: row-forward;

    .scrollama-graphic {
        flex: 1;
        height: 80vh;
        top: 10vh;
        ;
    }

    .scrollama-steps {
        flex: 1;
    }
}

#scrollama-container-flexed1 {
    // id="flexed" passed as prop to Scrollama in template
    display: flex;
    flex-direction: row-reverse;

    .scrollama-graphic {
        flex: 1;
        height: 80vh;
        top: 10vh;
        ;
    }

    .scrollama-steps {
        flex: 1;
    }
}
</style>
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

.graphic {
    height: 80vh;
    margin: 0 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 5rem;
}

.graphic2 {
    height: 30vh;
    background-color: #000;
    border: 1px solid #333;
    margin: 0 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 5rem;
    color: white;
}

.breakup {
    margin: 100px 2px;
    padding: 10px;
}

</style>