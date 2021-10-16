<template>
    <div class="container mx-auto flex flex-col h-full p-4">
        <div class="flex-grow h-128">
            <h1 class="text-4xl mt-16 mb-8 sources">Sources</h1>
            <ul class="text-left">
                <li>SNAP benefits
                    <ul class="pl-6">
                        <li><a href="https://www.fns.usda.gov/pd/supplemental-nutrition-assistance-program-snap">USDA stats</a></li>
                        <li><a href="https://fns-prod.azureedge.net/sites/default/files/resource-files/29SNAPcurrPP-8.pdf">Snap Benefit stats</a></li>
                    </ul>
                </li>
                <li>Homelessness
                    <ul class="pl-6">
                        <li><a href="http://endhomelessness.org/wp-content/uploads/2017/06/Cost-Savings-from-PSH.pdf">End Homelessness</a></li>
                    </ul>
                </li>
            </ul>
            <div class="flex-none">
                
            </div>
        </div>
        <div class="flex-none mb-6">
            <ul class="no-bullet text-left flex flex-wrap justify-start">
                    <li class="pr-4"><a href="https://invis.courtneyreckord.com">Courtney Reckord</a></li>
                    <li><a href="https://acdubs.com">Adam Wood</a></li>
                </ul>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'

export default {
    computed: {
        ...mapState([
            'animationPlaying',
            'animation',
            'animationOut'
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
    mounted() {
        this.tlOut.clear();
        this.tl.to('.sources', this.animation)
        this.tlOut.to('.parts', this.animationOut);
    }
}
</script>