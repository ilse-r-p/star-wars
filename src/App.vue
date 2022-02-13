<template>
  <div id="nav" class="flex justify-center items-center pt-10">
    <div class="bg-yellow-100 rounded flex">
      <router-link to="/" class="text-lg py-1 border-r border-gray-500">
        <p class="pl-4 pr-3 hover:text-red-800">Table</p>
      </router-link>
      <router-link to="/about" class="text-lg py-1">
        <p class="pr-4 pl-3 hover:text-red-800">About</p>
      </router-link>
    </div>
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
