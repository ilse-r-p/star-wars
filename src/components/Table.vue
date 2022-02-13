<template>
  <div class="flex items-center justify-center my-6">
    <input
      v-model="filter"
      type="search"
      placeholder="Who rules the galaxy?"
      class="border-2 border-yellow-300 rounded w-3/4 md:w-1/4 focus:outline-none focus:border-transparent focus:ring focus:ring-yellow-400 px-2 py-1"
    />
  </div>
  <div
    v-if="sortedCharacters.length"
    class="mx-3 lg:border-4 lg:border-yellow-300 rounded-xl mb-16 xl:w-2/3 lg:mx-auto lg:bg-white/80"
  >
    <table class="w-full">
      <thead class="lg:border-b-4 lg:border-yellow-300">
        <tr class="text-left">
          <div
            class="rounded-tl-xl hover:bg-yellow-100 cursor-pointer"
            @click="sortBy('name')"
          >
            <th class="px-6 py-2 w-ful font-normal">Name</th>
          </div>
          <th
            class="px-6 py-2 cursor-pointer hover:bg-yellow-100 font-normal"
            @click="sortBy('height')"
          >
            Height
          </th>
          <th
            class="px-6 py-2 cursor-pointer hover:bg-yellow-100 font-normal"
            @click="sortBy('mass')"
          >
            Mass
          </th>
          <th
            class="px-6 py-2 cursor-pointer hover:bg-yellow-100 font-normal"
            @click="sortBy('created')"
          >
            Created
          </th>
          <th
            class="px-6 py-2 cursor-pointer hover:bg-yellow-100 font-normal"
            @click="sortBy('edited')"
          >
            Edited
          </th>
          <th
            class="px-6 py-2 cursor-pointer hover:bg-yellow-100 font-normal"
            @click="sortBy('homeworld')"
          >
            Planet Name
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(character, index) in sortedCharacters"
          v-bind:key="character.name"
          class="border border-yellow-200 rounded-xl lg:border-none bg-white/90 lg:bg-transparent"
        >
          <td
            v-html="highlightMatches(character.name)"
            class="px-6 lg:px-6 py-2 text-right lg:text-left text-sm text-gray-900"
          ></td>
          <td
            class="px-6 lg:px-6 py-2 text-right lg:text-left text-sm text-gray-900"
          >
            {{ character.height }} cms
          </td>
          <td
            class="px-6 lg:px-6 py-2 text-right lg:text-left text-sm text-gray-900"
          >
            {{ character.mass }}
          </td>
          <td
            class="px-6 lg:px-6 py-2 text-right lg:text-left text-sm text-gray-900"
          >
            {{ dateTime(character.created) }}
          </td>
          <td
            class="px-6 lg:px-6 py-2 text-right lg:text-left text-sm text-gray-900"
          >
            {{ dateTime(character.edited) }}
          </td>
          <td
            class="px-6 lg:px-6 py-2 text-right lg:text-left text-sm text-gray-900"
          >
            {{ characterPlanet[index].name }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else class="border-4 border-yellow-400 bg-white/80 w-1/3 rounded-lg m-auto text-center">It's a trap!</div>
</template>
<style src="./Table.css"></style>
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
        console.log(results);
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
      return this.characters.filter((character) => {
        const person = character.name.toString().toLowerCase();
        const searchTerm = this.filter.toLowerCase();
        return person.includes(searchTerm);
      });
    },
    sortedCharacters() {
      const list = this.filteredCharacters.slice();
      if (!!this.sort.key) {
        list.sort((a, b) => {
          a = a[this.sort.key];
          b = b[this.sort.key];
          return (a === b ? 0 : a > b ? 1 : -1) * (this.sort.isAsc ? 1 : -1);
        });
      }
      return list;
    },
  },
};
</script>
