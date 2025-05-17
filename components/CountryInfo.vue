<template>
  <dl class="country-info--container">
    <div v-for="info in filteredInfo" class="country-info--list-item">
      <dt>{{ info.title }}:</dt>

      <template
        v-if="typeof info.value === 'object' && !Array.isArray(info.value)"
        ><ul>
          <li v-for="(val, key) in info.value" :key="key">
            {{ key }}: {{ val }}
          </li>
        </ul></template
      >

      <template v-else-if="Array.isArray(info.value)"
        ><ul>
          <li v-for="i in info.value" :key="i">
            {{ i }}
          </li>
        </ul></template
      >

      <dd v-else>
        <a v-if="info.link" :href="info.link" target="_blank">{{
          info.value
        }}</a>
        <template v-else>{{ info.value }}</template>
      </dd>
    </div>
  </dl>
</template>

<script setup lang="ts">
import type { CountryPageProps } from "~/types/countryTypes";

defineOptions({ inheritAttrs: false });
const props = defineProps<CountryPageProps>();

// This got pretty messy & if I were to do it again I would restructure
// Maybe even hard-code some of these entries tbh
// However it works & it was kinda fun to figure this type of scalable option out
const listOfInfo = [
  {
    title: "Official Name",
    value: props.name.official,
  },
  {
    title: "Currency",
    value:
      props.currencies && Object.entries(props.currencies).length > 0
        ? {
            CurrencyCode: Object.entries(props.currencies)[0][0],
            Symbol: Object.entries(props.currencies)[0][1].symbol,
            Name: Object.entries(props.currencies)[0][1].name,
          }
        : null,
  },
  {
    title: "Capital",
    value: props.capital && props.capital.length > 0 ? props.capital[0] : null,
  },
  {
    title: "Languages",
    value: props.languages && Object.entries(props.languages).map((l) => l[1]),
  },
  {
    title: "To maps",
    value: "Open google maps",
    link: props.maps?.googleMaps ?? null,
  },
  {
    title: "Population",
    value: props.population,
  },
  {
    title: "Continent",
    value: props.continents,
  },
];

const filteredInfo = computed(() =>
  listOfInfo.filter((info) => info.value !== null)
);
</script>

<style lang="scss">
.country-info--container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.country-info--list-item {
  dt {
    font-weight: bold;
    text-decoration: underline;
    font-size: 1.2rem;
  }
  ul {
    all: unset;
    list-style-type: none;
  }
  a {
    text-decoration: underline;
  }
}

@include respond-to(sm) {
  .country-info--container {
    width: 100%;
  }
}
</style>
