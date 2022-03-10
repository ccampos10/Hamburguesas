<template>
  <div>
    <!-- Formulario para crear una nueva hamburguesa -->
    <PopUp v-if="popUpEstaActivo" tipo="crear" Hid="" />
    <h1>Hamburguesas</h1>
    <div id="H-opciones">
      <input type="button" value="Crear" id="H-crear" @click="popUpEnable()">
    </div>
    <ul id="hamburguesasLista">
      <!-- Elemento hamburguesa por cada item de 'hamburguesas' -->
      <Burger v-for="item, i of hamburguesas" :key="i" :hamburguesa="item" :descripcion="descripcion"/>
    </ul>
  </div>
</template>

<script>
import Burger from "@/components/Burger.vue"
import PopUp from "@/components/PopUp.vue"

export default {
  name: 'Burgers',
  data() {
    return {
      popUpEstaActivo: false,
      hamburguesas: [],
      //Simulador de descripcion
      descripcion: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet enim mollitia quis ad sed, dolorum ipsum quod molestias odit dolorem eaque itaque sit est. Minus quasi laboriosam mollitia repellat quibusdam."
    };
  },
  components: {
    Burger,
    PopUp
  },
  methods: {
    popUpEnable() {
      this.popUpEstaActivo = true;
    },
    obtenerDatos() {
    // Pedir lista de hamburguesas
    fetch('https://prueba-hamburguesas.herokuapp.com/burger/', {method: 'GET'})
    .then(res => res.json())
    .then(res => this.hamburguesas = res)
    .catch(err => console.log(err))
    }
  },
  created() {
    this.obtenerDatos();
  }
}
</script>

<style>
/* ---------------------Opciones------------------ */
#H-opciones{
  width: 500px;
  padding: 0 150px ;

  text-align: left;
}
/* ---Botones--- */
#H-crear {
  width: 100px;
  margin: 0 15px;
  padding: 10px;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  color: white;
  background-color:rgb(54, 121, 221);
  transition: background-color .1s ease;
}
#H-crear:hover {
  background-color:rgb(25, 67, 129);
}
#H-crear:active {
  background-color:rgb(113, 152, 209);
}

/* --------------Lista de hamburguesas------------- */

#hamburguesasLista {
  margin: 0 150px;
  padding: 0;
}
</style>
