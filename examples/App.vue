<template>
  <h1>Hi {{ $store.state.count }}</h1>
</template>

<script>
import { log } from 'vuey'

export default {
  setup() {
    log()
  },
}
</script>
