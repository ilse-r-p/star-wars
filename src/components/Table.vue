<template>
  <div class="flex items-center justify-center my-6">
    <input
      v-model="filter"
      type="search"
      placeholder="Am I your father?"
      class="border rounded w-3/4 md:w-1/4 focus:outline-none focus:ring focus:ring-yellow-400 px-2 py-1"
    />
  </div>
  <table class="mx-auto mx-2 xl:w-2/3 lg:border lg:border-gray-900 mb-16">
    <thead>
      <tr class="bg-gray-800 text-white text-left">
        <th class="px-6 py-2 cursor-pointer" @click="sortBy('name')">Name</th>
        <th class="px-6 py-2 cursor-pointer" @click="sortBy('height')">
          Height
        </th>
        <th class="px-6 py-2 cursor-pointer" @click="sortBy('mass')">Mass</th>
        <th class="px-6 py-2 cursor-pointer" @click="sortBy('created')">
          Created
        </th>
        <th class="px-6 py-2 cursor-pointer" @click="sortBy('edited')">
          Edited
        </th>
        <th class="px-6 py-2 cursor-pointer" @click="sortBy('homeworld')">
          Planet Name
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(character, index) in sortedCharacters"
        v-bind:key="character.name"
        class="border border-gray-800 lg:border-none"
      >
        <td v-html="highlightMatches(character.name)" class="px-6 lg:px-6 py-2 text-right lg:text-left"></td>
        <td class="px-6 lg:px-6 py-2 text-right lg:text-left">{{ character.height }} cms</td>
        <td class="px-6 lg:px-6 py-2 text-right lg:text-left">{{ character.mass }}</td>
        <td class="px-6 lg:px-6 py-2 text-right lg:text-left">{{ dateTime(character.created) }}</td>
        <td class="px-6 lg:px-6 py-2 text-right lg:text-left">{{ dateTime(character.edited) }}</td>
        <td class="px-6 lg:px-6 py-2 text-right lg:text-left">{{ characterPlanet[index].name }}</td>
      </tr>
    </tbody>
  </table>
</template>
<style>
/*
	Max width before this PARTICULAR table gets nasty. This query will take effect for any screen smaller than 760px and also iPads specifically.
	*/
@media only screen and (max-width: 660px),
  (min-device-width: 668px) and (max-device-width: 820px) {
  /* Force table to not be like tables anymore */
  table,
  thead,
  tbody,
  th,
  td,
  tr {
    display: block;
  }

  /* Hide table headers (but not display: none;, for accessibility) */
  thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }

  tr {
    margin: 0 0 1rem 0;
  }

  td {
    border: none;
    border-bottom: 1px solid #eee;
    position: relative;
    padding-left: 50%;
  }

  td:before {
    width: 45%;
    padding-right: 10px;
    white-space: nowrap;
  }

  td:nth-of-type(1):before {
    content: "Name";
    position: absolute;
    right: 50%;
    text-align: left;
  }
  td:nth-of-type(2):before {
    content: "Height";
    position: absolute;
    right: 50%;
    text-align: left;
  }
  td:nth-of-type(3):before {
    content: "Mass";
    position: absolute;
    right: 50%;
    text-align: left;
  }
  td:nth-of-type(4):before {
    content: "Created";
    position: absolute;
    right: 50%;
    text-align: left;
  }
  td:nth-of-type(5):before {
    content: "Edited";
    position: absolute;
    right: 50%;
    text-align: left;
  }
  td:nth-of-type(6):before {
    content: "Planet Name";
    position: absolute;
    right: 50%;
    text-align: left;
  }
}
</style>
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
