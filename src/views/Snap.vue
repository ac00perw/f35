<template>
  <div class="people flex flex-wrap">
    <template class="" v-for="i in people">
         <span>&#149;</span>
    </template>
  </div>
</template>
<script>
export default {
    name: "Snap",
    data() {
        return  {
            people: 6800
        }
    }
}
</script>
<style lang="scss" scoped>
.people span{
    height: 10px;
}
</style>
