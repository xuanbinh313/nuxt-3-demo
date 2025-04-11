<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError
})
const error = props.error;

</script>

<template>
  <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
        <h1>{{ error.statusCode }}</h1>
        <NuxtLink to="/">Go back home so crazy</NuxtLink>
      </p>
    </div>
</template>
