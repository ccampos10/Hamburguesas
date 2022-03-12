<template>
  <div>
    <!-- Formulario para crear una nueva hamburguesa -->
    <PopUp v-if="popUpEstaActivo" :tipo="tipo" :ingredientes="ingredientes" />
    <h1>Hamburguesas</h1>
    <div id="H-opciones">
      <input type="button" value="Crear" id="H-crear" class="H-botones" @click="popUpCrear()">
      <input type="button" value="Filtrar" id="H-filtrar" class="H-botones" @click="popUpFiltrar()">
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
      tipo: 'crear',
      listaOriginal: [],
      ingredientes: [],
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
    popUpCrear() {
      this.tipo = 'crear';
      this.popUpEstaActivo = true;
    },
    popUpFiltrar() {
      this.tipo = 'filtrar';
      this.popUpEstaActivo = true;
    },
    obtenerDatos() {
    // Pedir lista de hamburguesas
    fetch('https://prueba-hamburguesas.herokuapp.com/burger/', {method: 'GET'})
    .then(res => res.json())
    .then(res => {
      this.hamburguesas = res;
      this.listaOriginal = res;
      this.listarIngredientes(res);
    })
    .catch(err => console.log(err))
    },
    listarIngredientes(res) {
      // Listar todos los ingredientes de las hamburguesas
      let listaIngredientes = [];
      for (const elemento of res) {
        for (const ingrediente of elemento.ingredientes) {
          // Por cada ingrediente de cada elemento
          let parseIngrediente = ingrediente.toLowerCase();
          let estaEnLista = (listaIngredientes.findIndex(e => e == parseIngrediente)) != -1;
          if (!estaEnLista) listaIngredientes.push(parseIngrediente);
        }
      }
      this.ingredientes = listaIngredientes;
    },
    filtrar(filtro) {
      // Filtrar por nombre y por las calorias maximas
      let filtrado = this.listaOriginal.filter(e => {
        let nombre = filtro.nombre != '' ? e.nombre.toLowerCase().includes(filtro.nombre.toLowerCase()) : true;
        let maxCalorias = filtro.maxCalorias != 0 ? e.calorias <= filtro.maxCalorias : true;
        return nombre && maxCalorias;
      });

      // Filtrar por los ingredientes
      filtrado = filtrado.filter(e => {
        let contIngredientes = false;
        if (filtro.ingredientes.length > 0) {
          for (const [i, filtroIngrediente] of filtro.ingredientes.entries()) {
            let parseFiltroIngrediente = filtroIngrediente.toLowerCase();
            // Contiene el ingrediente
            let contieneIngrediente = (e.ingredientes.findIndex(ingrediente => ingrediente.toLowerCase() == parseFiltroIngrediente)) != -1;
            
            if (contieneIngrediente && i == 0) contIngredientes = true;
            if (contieneIngrediente && i > 0) contIngredientes = false;
          }
        } else contIngredientes = true;
        return contIngredientes;
      });

      this.hamburguesas = filtrado;
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
.H-botones {
  width: 100px;
  padding: 10px;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  color: white;
  background-color:rgb(54, 121, 221);
  transition: background-color .1s ease;
}
#H-crear {
  margin: 0 15px;
}
#H-crear:hover {
  background-color:rgb(25, 67, 129);
}
#H-crear:active {
  background-color:rgb(113, 152, 209);
}

#H-filtrar:hover {
  background-color:rgb(25, 67, 129);
}
#H-filtrar:active {
  background-color:rgb(113, 152, 209);
}

/* --------------Lista de hamburguesas------------- */

#hamburguesasLista {
  margin: 0 150px;
  padding: 0;
}
</style>
