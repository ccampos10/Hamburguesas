<template>
  <div>
    <h1>Hamburguesas</h1>
    <ul>
      <!-- sacar un componente de cada hamburguesa -->
      <!-- <li class='hamburgesa' v-for="item of hamburguesas" v-bind:key="item.nombre">
        <router-link :to="'/hamburguesas/'+item.id">
          <h2>{{ item.nombre }}</h2>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet enim mollitia quis ad sed, dolorum ipsum quod molestias odit dolorem eaque itaque sit est. Minus quasi laboriosam mollitia repellat quibusdam.
          </p>
          <p class="calorias">calorias: {{item.calorias}}</p>
        </router-link>
      </li> -->
      <Burger v-for="item, i of hamburguesas" :key="i" :hamburguesa="item" :descripcion="descripcion"/>
    </ul>
  </div>
</template>

<script>
import Burger from "@/components/Burger.vue"

export default {
  name: 'Burgers',
  components: {
    Burger
  },
  data() {
    return {
      hamburguesas: [],
      //Simulador de descripcion
      descripcion: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet enim mollitia quis ad sed, dolorum ipsum quod molestias odit dolorem eaque itaque sit est. Minus quasi laboriosam mollitia repellat quibusdam."
    };
  },
  created() {
    fetch('https://prueba-hamburguesas.herokuapp.com/burger', {method: 'GET'})
    .then(res => res.json())
    .then(res => this.hamburguesas = res)
  }
}
</script>

<style>
ul {
  margin: 0 150px;
}
/* .hamburgesa {
  list-style: none;
  text-align: left;

  margin: 25px 15px;
  padding: 1px 20px;

  font-size: 22px;

  background-color: white;
  border-radius: 10px;
  transition: all .7s ease;
}
.hamburgesa a {
  color: #2c3e50;
  text-decoration: none;
}
.hamburgesa:hover {
  transform: scale(1.06);
  box-shadow: 3px 3px 15px;
}
.calorias {
  text-align: right;
  color: #a8a8a8;
} */
</style>
