<template>
  <div class="hello">
    <SomeChild />
  </div>
</template>

<script setup>
import SomeChild from './SomeChild.vue'
import { provide } from "vue";

provide('my-key','some-data');

</script>

