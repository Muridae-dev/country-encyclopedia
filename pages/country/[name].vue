<template>
  <div v-if="data" class="country-page">
    <h1 class="country-page--heading">{{ data[0].name.common }}</h1>
    <div class="country-page--container">
      <CountryFlagAndAnthem v-bind="data[0]" />
      <CountryInfo v-bind="data[0]" />
    </div>
    <NuxtLink to="/" class="country-page--homepage-button"
      >Return to homepage</NuxtLink
    >
  </div>
</template>

<script setup lang="ts">
import type { CountryPageProps } from "~/types/countryTypes";

const route = useRoute();

const { data } = await useAsyncData<CountryPageProps[]>("country", async () => {
  try {
    const response = await $fetch<CountryPageProps[]>(
      `https://restcountries.com/v3.1/name/${route.params.name
        .toString()
        .toLowerCase()}?fullText=true&fields=name,flags,currencies,capital,languages,maps,population,continents,coatOfArms`
    );

    if (!response || response.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: "Country not found",
      });
    }

    return response;
  } catch (error) {
    throw createError({
      statusCode: (error as any)?.statusCode || 500,
      statusMessage: (error as any)?.statusMessage || "Failed to fetch country",
    });
  }
});
</script>

<style lang="scss">
.country-page {
  display: flex;
  flex-direction: column;
}

.country-page--container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  max-width: 1200px;
  align-self: center;
  gap: 40px;
}

.country-page--heading {
  font-weight: bold;
  text-decoration: underline;
  padding-bottom: 20px;
  text-align: center;
}

.country-page--homepage-button {
  order: -1;
  padding: 0 10px;

  text-decoration: underline;
}

@include respond-to(sm) {
  .country-page--container {
    width: 100%;
    flex-direction: column;
    padding: 0 10px;
    gap: 20px;
    margin: auto;
  }
}
</style>
