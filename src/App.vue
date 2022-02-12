<template>
  <div id="nav" class="flex justify-center items-center pt-10">
    <router-link to="/" class="p-2 text-xl hover:text-yellow-500">Table</router-link> |
    <router-link to="/about" class="p-2 text-xl hover:text-yellow-500">About</router-link>
  </div>
  <router-view />
</template>
