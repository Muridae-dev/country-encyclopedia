<template>
  <div>
    <aside
      class="filters--container"
      :class="{ active: filtersActive }"
      aria-label="Filters"
      :aria-hidden="`${!filtersActive}`"
    >
      <ul>
        <li v-for="filter in listOfFilters" :key="filter.title">
          <button @click="filter.fn">{{ filter.title }}</button>
        </li>

        <li
          v-if="countryStore.listOfContinents?.length"
          class="filter--continents"
        >
          <span>Continents:</span>
          <label
            v-for="continent in countryStore.listOfContinents"
            :key="continent"
            :for="`continent-${continent}`"
          >
            <input
              type="checkbox"
              :value="continent"
              :id="`continent-${continent}`"
              :checked="countryStore.selectedContinents.has(continent)"
              @change="countryStore.toggleContinents(continent)"
            />
            {{ continent }}
          </label>
        </li>
      </ul>
    </aside>

    <button
      class="filters--open-button"
      @click="filtersActive = !filtersActive"
      :aria-expanded="`${filtersActive}`"
      aria-controls="filters-panel"
    >
      {{ filtersActive ? "Close" : "Filters" }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { CountryProps } from "~/types/countryTypes";

const filtersActive = ref(false);
const countryStore = useCountryStore();

const sortAlphabetical = (ascending: boolean) => {
  if (!countryStore.countries) return;

  countryStore.countries.sort((a: CountryProps, b: CountryProps) =>
    ascending
      ? a.name.common.localeCompare(b.name.common)
      : b.name.common.localeCompare(a.name.common)
  );
};

const listOfFilters = [
  {
    title: "Sort A-Z",
    fn: () => sortAlphabetical(true),
  },
  {
    title: "Sort Z-A",
    fn: () => sortAlphabetical(false),
  },
];
</script>

<style scoped lang="scss">
.filters--container {
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  max-width: 100%;
  height: 100dvh;
  padding: 1.5rem;
  background: #fff;
  border-left: 1px solid #000;
  transform: translateX(100%);
  transition: transform 0.4s ease;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &.active {
    transform: translateX(0);
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 1rem;
  }
}

.filter--continents {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  span {
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
  }
}

.filters--open-button {
  position: fixed;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.75rem 1.25rem;
  border: 1px solid #000;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  font-weight: 600;
}
</style>
