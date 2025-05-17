<template>
  <NuxtLink class="country--container" :to="`/country/${name.common}`">
    <figure class="country--flag-container">
      <img :src="flags.svg" />
    </figure>

    <div>{{ name.common }}</div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { CountryProps } from "~/types/countryTypes";

defineOptions({ inheritAttrs: false });
defineProps<CountryProps>();
</script>

<style lang="scss">
.country--container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    background: radial-gradient(
      circle,
      rgba(251, 176, 63, 1) 0%,
      rgba(252, 70, 70, 0) 100%
    );
  }
}

.country--flag-container {
  height: 100px;

  @include respond-to(sm) {
    height: 90px;
  }

  img {
    height: 100%;
  }
}
</style>
