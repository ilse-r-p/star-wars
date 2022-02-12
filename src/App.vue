<template>
  <div class="flex items-center justify-center mt-10 mb-6">
    <input
      type="search"
      placeholder="Am I your father?"
      class="border rounded w-1/4 focus:outline-none focus:ring focus:ring-yellow-300 px-2 py-1"
    />
  </div>

  <table class="m-auto">
    <thead>
      <tr class="bg-blue-100">
        <th class="px-6 py-2">Name</th>
        <th class="px-6 py-2">Height</th>
        <th class="px-6 py-2">Mass</th>
        <th class="px-6 py-2">Created</th>
        <th class="px-6 py-2">Edited</th>
        <th class="px-6 py-2">Planet name</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="character in characters"
        v-bind:key="character"
        :name="character.name"
      >
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
import axios from "axios";

export default {
  data() {
    return {
      // characters: {
      //   name: { String },
      //   height: { Number },
      //   mass: { String },
      //   created: { String },
      //   edited: { String },
      //   homeworld: { String },
      // },
      characters: [],
    };
  },
  created() {
    axios
      .get("https://swapi.dev/api/people/")
      .then((response) => {
        console.log(response.data);
        this.characters = response.data.push;
      })
      .catch((error) => {
        console.log("error" + error.response);
      });
  },
};
</script>
