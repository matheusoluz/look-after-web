<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    this.$q.addressbarColor.set('#a7ffeb')
  }
}
</script>

<style>
</style>
