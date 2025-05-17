<template>
  <div>
    <div class="homepage--container">
      <Country
        v-for="country in countryStore.visibleCountries"
        v-if="countryStore.visibleCountries"
        v-bind="{ ...country }"
      />
    </div>
    <Filters />
  </div>
</template>

<script setup lang="ts">
const countryStore = useCountryStore();
</script>

<style lang="scss">
$cell-size: 25%;
$cell-size-mobile: 50%;

$row-gap: 40px;
$col-gap-mobile: 20px;

.homepage--container {
  display: grid;
  max-width: 1440px;
  margin: auto;
  grid-template-columns: repeat(4, $cell-size);

  row-gap: $row-gap;
}

@include respond-to(sm) {
  .homepage--container {
    padding: 0 10px;
    grid-template-columns: repeat(2, $cell-size-mobile);
  }
}
</style>
