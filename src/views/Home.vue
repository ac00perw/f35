<template>
  <div class="home">
    <Nav />
    <div class="flex flex-wrap">
        <div class="w-1/2">foo</div>
        <div class="w-1/2">bar</div>
    </div>
    Home Page
    <Bar :height="100" />
  </div>
</template>

<script>
// @ is an alias to /src
import Bar from '@/components/Bar.vue'

export default {
  name: 'Home',
components: {
    Bar
  }
}
</script>
