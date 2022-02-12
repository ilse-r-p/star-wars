<template>
  <div class="flex items-center justify-center my-6">
    <input
      v-model="filter"
      type="search"
      placeholder="Am I your father?"
      class="border rounded w-3/4 md:w-1/4 focus:outline-none focus:ring focus:ring-yellow-400 px-2 py-1"
    />
  </div>
  <table class="m-auto border border-gray-900">
    <thead>
      <tr class="bg-gray-800 text-white text-left">
        <th
          class="px-6 py-2 cursor-pointer"
          @click="sortBy('name')"
          scope="col"
        >
          Name
        </th>
        <th
          class="px-6 py-2 cursor-pointer"
          @click="sortBy('height')"
          scope="col"
        >
          Height
        </th>
        <th
          class="px-6 py-2 cursor-pointer"
          @click="sortBy('mass')"
          scope="col"
        >
          Mass
        </th>
        <th
          class="px-6 py-2 cursor-pointer"
          @click="sortBy('created')"
          scope="col"
        >
          Created
        </th>
        <th
          class="px-6 py-2 cursor-pointer"
          @click="sortBy('edited')"
          scope="col"
        >
          Edited
        </th>
        <th
          class="px-6 py-2 cursor-pointer"
          @click="sortBy('homeworld')"
          scope="col"
        >
          Planet Name
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(character, index) in sortedCharacters" v-bind:key="character.name">
        <td v-html="highlightMatches(character.name)" class="px-6 py-2"></td>
        <td class="px-6 py-2">{{ character.height }} cms</td>
        <td class="px-6 py-2">{{ character.mass }}</td>
        <td class="px-6 py-2">{{ dateTime(character.created) }}</td>
        <td class="px-6 py-2">{{ dateTime(character.edited) }}</td>
        <td class="px-6 py-2">{{ characterPlanet[index].name }}</td>
      </tr>
    </tbody>
  </table>
</template>
<script lang="ts">
import moment from "moment";
export default {
  data() {
    return {
      characters: [],
      characterPlanet: [],
      filter: "",
      sort: {
        key: "",
        isAsc: false,
      },
    };
  },
  created() {
    fetch("https://swapi.dev/api/people/")
      .then((res) => res.json())
      .then((res) => {
        const results = res.results.map((character) => {
          this.getPlanetName(character.homeworld);
          return {
            ...character,
          };
        });
        this.characters = results;
      });
  },
  methods: {
    dateTime(value) {
      return moment(value).format("DD-MM-YYYY");
    },
    getPlanetName(homeworldUrl) {
      return fetch(homeworldUrl)
        .then((res) => res.json())
        .then((res) => this.characterPlanet.push(res));
    },
    highlightMatches(text) {
      const matchExists = text
        .toLowerCase()
        .includes(this.filter.toLowerCase());
      if (!matchExists) return text;

      const re = new RegExp(this.filter, "ig");
      return text.replace(
        re,
        (matchedText) =>
          `<strong class="text-yellow-500">${matchedText}</strong>`
      );
    },
    sortBy(key) {
      this.sort.isAsc = this.sort.key === key ? !this.sort.isAsc : false;
      this.sort.key = key;
    },
  },
  computed: {
    filteredCharacters() {
      return this.characters.filter(character => {
        const person = character.name.toString().toLowerCase();
        const searchTerm = this.filter.toLowerCase();
        return person.includes(searchTerm);
      });
    },
    sortedCharacters () {
      const list = this.filteredCharacters.slice();
      if (!!this.sort.key) {
        list.sort((a, b) => {
          a = a[this.sort.key];
          b = b[this.sort.key];
          return (a === b ? 0 : a > b ? 1 : -1) * (this.sort.isAsc ? 1 : -1);
        });
      }
      return list;
    }
  },
};
</script>
