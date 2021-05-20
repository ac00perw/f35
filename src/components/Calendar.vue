//Calendar
<template>
   <div class="flex flex-wrap calendar">
       <template v-for="index in totalDays">
             <div class="box flex justify-center items-center "><div class="p-1 text-xs absolute top-0 right-0" >{{ index }}</div>
            <checkbox v-if="index < 19" :class="`text-center check ${index}`"></checkbox>
         </div>
       </template>
   </div>
</template>
<script>
import Checkbox from './Checkbox'

export default {
    name: "Calendar",
    components: { Checkbox },
    props: ['totalDays']
}
</script>
<style scoped>
.calendar{
    max-width: 600px;
    width: 100%;
    max-height: 250px;
}
.box {
    width: 14.2%;
    min-width: 14.2%;
    height: 80px;
    position: relative;
    border: 1px solid rgba(0,0,0,.2);
}
.check {
    display: block;
    width: 50px;
    height: 30px;
    transform: scale(.7);
}

</style>