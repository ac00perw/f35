<template>
    <div class="bg">
    </div>    
</template>

<script>
import { gsap } from 'gsap/all'

    export default {
        name: 'backgrounds',
        computed: {
            currentComponent: {
                get() {
                    return this.$store.getters.currentComponent;
                },
                set(v) {
                    this.$store.commit('mutate', { property: 'currentComponent', with: v })    
                }
            }
        },
        mounted() {

        }
    }
</script>
<style lang="scss">
.bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-image: linear-gradient(to bottom, rgb(225,225,225), rgba(180,185,185,1));
    z-index: -1;
}
</style>