<template>
  <div class="hello">
    <slot />
  </div>
</template>

<script setup>
import { provide } from "vue";

provide('my-key','some-data');

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
