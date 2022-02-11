import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

// const app = createApp(App, {
//   el: "#app",
//   data() {
//     return {
//       characters: [],
//       currentSort: "name",
//       currentSortDir: "asc",
//       function() {
//         fetch("https://swapi.dev/api/people")
//           .then((res) => res.json())
//           .then((res) => {
//             this.characters = res;
//           });
//       },
//     };
//   },
// });

app.use(createPinia());
app.use(router);

app.mount("#app");
