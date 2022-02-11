<template>
  <div class="flex items-center justify-center mt-10 mb-6">
    <input
      type="search"
      placeholder="Am I your father?"
      class="border rounded w-1/4 focus:outline-none focus:ring focus:ring-yellow-300 px-2 py-1"
      v-model="filter"
    />
  </div>

  <table class="m-auto">
    <thead>
      <tr class="bg-blue-100">
        <th class="p-6">Name</th>
        <th class="p-6">Height</th>
        <th class="p-6">Mass</th>
        <th class="p-6">Created</th>
        <th class="p-6">Edited</th>
        <th class="p-6">Planet name</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="character in characters" v-bind:key="character">
        <td>{{ character.name }}</td>
        <td>{{ character.height }}</td>
        <td>{{ character.mass }}</td>
        <td>{{ character.created }}</td>
        <td>{{ character.edited }}</td>
        <td>{{ character.homeworld }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import "./index.css";

export default {
  data() {
    return {
      characters: [],
      created() {
        fetch("https://swapi.dev/api/people")
          .then((res) => res.json())
          .then((res) => {
            this.characters = res;
            console.log(this.characters);
          });
      },
    };
  },
};
</script>
