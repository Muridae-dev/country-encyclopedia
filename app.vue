<template>
  <NuxtLayout>
    <NuxtPage />
    <MiscGrain />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useHead } from "#imports";

const description = ref("Country Selector");

useSeoMeta({
  title: description,
  ogTitle: "All the countries in the world | by Noah Lundberg",
  description:
    "An encyclopedia of all the soverign states of the world, complete with statistics and national anthems.",
  ogDescription:
    "An encyclopedia of all the soverign states of the world, complete with statistics and national anthems.",
  ogImage: "https://example.com/image.png",
  twitterCard: "summary_large_image",
});

useHead({
  script: [
    {
      // Could have imported this but since it's an easter egg I didn't want to spend to much time on it.
      src: "https://cdn.jsdelivr.net/combine/npm/tone@14.7.58,npm/@magenta/music@1.23.1/es6/core.js,npm/focus-visible@5,npm/html-midi-player@1.4.0",
      defer: true,
    },
  ],
});

const countryStore = useCountryStore();

countryStore.fetchData();
</script>

<style lang="scss">
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
