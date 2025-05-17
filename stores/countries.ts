import { defineStore } from "pinia";
import type { CountryProps } from "~/types/countryTypes";

interface CountryStoreProps {
  countries: CountryProps[] | null;
  listOfContinents: string[] | null;
  visibleCountries: CountryProps[] | null;
  selectedContinents: Set<string>;
}

export const useCountryStore = defineStore("countries", {
  state: (): CountryStoreProps => ({
    countries: null,
    listOfContinents: null,
    visibleCountries: null,
    selectedContinents: new Set(),
  }),
  actions: {
    async fetchData() {
      const { data } = await useAsyncData<CountryProps[]>(
        "countries",
        () =>
          $fetch(
            "https://restcountries.com/v3.1/all?fields=name,flags,continents"
          ),
        {
          server: true,
          lazy: false,
        }
      );

      this.countries = data.value;
      this.visibleCountries = this.countries;
      this.getContinents();
    },
    getContinents() {
      if (!this.countries) return;

      const continentSet = new Set(
        this.countries.flatMap((country) => country.continents)
      );

      this.listOfContinents = [...continentSet].sort();
    },
    toggleContinents(continent: string) {
      if (this.selectedContinents.has(continent))
        this.selectedContinents.delete(continent);
      else this.selectedContinents.add(continent);

      this.filterCountries();
    },
    filterCountries() {
      if (!this.countries) return;

      this.selectedContinents.size !== 0
        ? (this.visibleCountries = this.countries.filter((country) =>
            country.continents.some((continent) =>
              this.selectedContinents.has(continent)
            )
          ))
        : (this.visibleCountries = this.countries);
    },
    clearFilters() {
      this.selectedContinents.clear();
      this.visibleCountries = this.countries;
    },
  },
});
