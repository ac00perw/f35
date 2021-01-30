<template>
  <div class="home">
    <Nav />
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
