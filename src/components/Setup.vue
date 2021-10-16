<template>
    <div class="fullscreen container mx-auto flex flex-col mt-32 p-4">
        <div class="parts part1 text-8xl font-bold">F35s</div>
        <div class="parts part2 text-4xl font-bold">Are they worth it?</div>
        <div class="parts part3"><img class="plane inline-block text-center" src="/img/f35.svg" width="300" /></div>
        <div class="parts part4 flex-none mb-6 flex flex-wrap justify-center">
                <div class="pr-4"><a href="https://invis.courtneyreckord.com" target="_blank">Courtney Reckord</a> and
                <a href="https://acdubs.com" target="_blank">Adam Wood</a></div>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { gsap, timeline } from "gsap/all"

export default {
    name: 'Setup',
    props: ['text'],
    computed: {
        ...mapState([
            'animationPlaying',
            'animation',
            'animationOut'
        ]),
        partDelay() {
            return this.$store.getters.partDelay;
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
        }
    },
    data() {
        return {
            currStepId: 1
        }
    },
    mounted() {
        var vm = this;
        vm.animateIn();
        this.tlOut.clear();
        vm.tlOut.to('.parts', vm.animationOut);

    },
    methods: {
        ...mapMutations([
            'mutate'
        ]),
        animateIn() {
            var vm = this;
            vm.tl.clear();
            this.tlOut.pause();
            vm.tl.to('.part1', { ...vm.animation, ...{ delay: 1, duration: 1 } });
            vm.tl.to('.part2', vm.animation, "part2");
            vm.tl.to('.part3', vm.animation);
            vm.tl.to('.plane', { rotate: 180, duration: 2 });
            vm.tl.to('.plane', { y: '120vh', duration: 2, ease: "power2.inOut" })
            vm.tl.to('.part4', vm.animation, '-=3');
            vm.tl.play(0);
        }
    }
}
</script>
<style scoped>
.parts {
    @apply opacity-0;

}

.plane {
    opacity: 1;
}
</style>