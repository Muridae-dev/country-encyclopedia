<template>
  <div class="country-page--flags-and-anthem">
    <figure v-if="flags.svg">
      <img :src="flags.svg" :alt="`Official flag for ${name.common}`" />
      <figcaption>Official Flag</figcaption>
    </figure>
    <figure v-if="coatOfArms && coatOfArms.svg !== ''">
      <img :src="coatOfArms.svg" :alt="`Coat of arms for ${name.common}`" />
      <figcaption>Coat of Arms</figcaption>
    </figure>

    <div class="country-page--anthem-container" v-if="anthemUrl !== null">
      <midi-player
        id="midi-player"
        :src="anthemUrl"
        sound-font
        visualizer="#myPianoRollVisualizer"
        loop
      >
      </midi-player>
      National Anthem
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CountryPageProps } from "~/types/countryTypes";

const props = defineProps<CountryPageProps>();

const anthemUrl = ref<string | null>(null);

// I would've either made a set of the anthems that exist
// Or query all the files in public/anthems
// Since this does throw an error if the anthem doesn't exist/match
// However since it's an easter egg I didn't want to spend too much time on this since it works just fine
const checkAnthemExists = async (url: string) => {
  try {
    const res = await fetch(url, { method: "HEAD" });

    if (res.ok) {
      anthemUrl.value = url;
      return;
    }

    anthemUrl.value = null;
  } catch (err) {
    anthemUrl.value = null;
  }
};

watchEffect(async () => {
  const name = props.name.common.toString().toLowerCase();
  const url = `/anthems/${name}.mid`;
  await checkAnthemExists(url);
});
</script>

<style lang="scss">
.country-page--flags-and-anthem {
  display: flex;
  flex-direction: column;
  gap: 20px;

  figure {
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      height: auto;
      width: 100%;
      max-height: 200px;
      object-fit: contain;
    }

    figcaption {
      margin-top: 8px;
      text-align: center;
    }
  }
}

.country-page--anthem-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
