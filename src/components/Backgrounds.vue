<template>
    <div :class="`bg cur-${currentComponent}`">
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
    background-color: rgba(255,255,235,.6);
    transition: all 2s ease-in-out;
    z-index: -1;
}
 .bg.cur-1 {
    //background-image: url('https://acdubs.com/images/headers/20.jpg');
    background-size: cover;

}
.bg.cur-2 {
    background-color: #efefef;
}
.bg.cur-3 {
    background-color: #eeffee;
}
.framewrap-3 {
    // color: white;
}
</style>