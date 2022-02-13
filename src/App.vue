<template>
  <div id="nav" class="flex justify-center items-center pt-10">
    <button
      class="text-lg py-1 border-r-2 rounded-l-lg bg-yellow-100 border-yellow-300"
    >
      <router-link to="/">
        <p class="pl-4 pr-3 hover:text-red-600">Table</p>
      </router-link>
    </button>
    <button class="text-lg py-1 rounded-r-lg bg-yellow-100">
      <router-link to="/about">
        <p class="pr-4 pl-3 hover:text-red-600">About</p>
      </router-link>
    </button>
  </div>
  <router-view />
</template>
<style>
body {
  background-image: url("https://i.gifer.com/CqNH.gif");
  background-size: cover;
  height: 100vh;
  padding: 0;
  margin: 0;
}
</style>
