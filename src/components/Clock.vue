<template>
    <div class="clock-wrap">
        <svg id="clock" class="block inline-block" :width="size*2" :height="size*2">
            <g name="clock">
                <circle :cx="size" :cy="size" :r="size-(clockWidth * 2)" fill="none" :stroke="clockColor" :stroke-width="clockWidth" />
                <template v-for="index in 12">
                    <circle stroke-width="1" :stroke="clockColor" fill="none" r="2" :cx="addHours(size - 20, index, 12).x+size" :cy="addHours(size - 20, index, 12).y+size" />
                </template>
            </g>
            <line class="minutes" :x1="offset+10" :y1="size" :x2="size" :y2="size" :stroke="clockColor" fill="none" :stroke-width="handWidth" />
            <line class="hours" :x1="offset+25" :y1="size" :x2="size" :y2="size" :stroke="clockColor" fill="none" :stroke-width="handWidth+1" />
            <!--             <circle class="cls-2" cx="141.62" cy="11.62" r="0.5" />
            <circle class="cls-2" cx="142.62" cy="275.62" r="0.5" />
            <circle class="cls-2" cx="275.62" cy="142.62" r="0.5" />
            <circle class="cls-2" cx="9.62" cy="142.62" r="0.5" /> -->
        </svg>
        <!-- <div class="hand minutes"></div> -->
    </div>
</template>
<script>
import { gsap } from 'gsap/all'

export default {
    name: "Clock",
    data() {
        return {
            size: 70,
            clockWidth: 5,
            handWidth: 3,
            clockColor: 'black',
            offset: 20
        }
    },
    mounted() {
        console.log('clock');
        this.moveHands('.minutes', 1, "100% 50%");
        this.moveHands('.hours', 2, "100% 50%");
        // gsap.to('.minutes', {repeat: -1, rotation: "360deg", duration: 1, transformOrigin: "50% 50%"});
        // gsap.to('.hours', {repeat: -1, rotation: "360deg", duration: 2, transformOrigin: "100% 50%"});
        // Overwriting base render method with actual data.

    },
    methods: {
        moveHands(el, dur, orig) {
            var vm = this;
            gsap.to(el, { rotation: "+=150", transformOrigin: orig, duration: dur, ease: "linear", onComplete: function() { vm.moveHands(el, dur, orig) } });
        },
        addHours(r, currentPoint, totalPoints) {
            var theta = ((Math.PI * 2) / totalPoints);
            var angle = (theta * currentPoint);
            const point = {};
            point.x = (r * Math.cos(angle));
            point.y = (r * Math.sin(angle));

            return point;
        }
    }
}
</script>
<style>
svg#clock circle.cls-1 {
    width: 100px;
    height: 100px;
    fill: blue;
    cy: 100px;
    cx: 100px;
    stroke: #231f20;
    stroke-width: 5px;
}

#hours .cls-1 {
    fill: none;
    stroke: yellow;
    stroke-linecap: round;
    stroke-miterlimit: 10;
    stroke-width: 3px;
}