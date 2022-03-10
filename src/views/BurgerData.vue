<template>
  <div id="hamburguesaData">
    <!-- Formulario para editar una hamburguesa -->
    <PopUp v-if="popUpEstaActivo" tipo="editar" :Hid="$route.params.id" />

    <h1 id="HD-nombre">{{hamburguesa.nombre}}</h1>

    <h3 class="HD-subTitle">Descripcion:</h3>
    <p id="HD-descripcion">{{descripcion}}</p>

    <h3 class="HD-subTitle">Ingredientes:</h3>
    <ul id="HD-listaIngredientes">
      <!-- Por cada ingrediente de hamburguesa -->
      <li v-for="ingrediente, i of hamburguesa.ingredientes" :key="i">{{ingrediente}}</li>
    </ul>

    <p id="HD-calorias">{{"Calorias: " + hamburguesa.calorias }}</p>
    
    <div id="HD-buttons">
      <input id='HD-editar' class='HD-button' type="button" value="Editar" @click="Editar()" />
      <input id='HD-eliminar' class='HD-button' type="button" value="Eliminar" @click="Eliminar()" />
    </div>
  </div>
</template>

<script>
import PopUp from "@/components/PopUp.vue"

export default {
  name: 'BurgerData',
  components: {
    PopUp
  },
  data() {
    return {
      hamburguesa: {id: -1, nombre: '...', ingredientes: [],calorias: -1},
      //Simulador de descripcion
      descripcion: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet enim mollitia quis ad sed, dolorum ipsum quod molestias odit dolorem eaque itaque sit est. Minus quasi laboriosam mollitia repellat quibusdam.",
      popUpEstaActivo: false
    }
  },
  methods: {
    Editar() {
      this.popUpEstaActivo = true;
    },
    Eliminar() {
      // Eliminar la hamburguesa con el id
      fetch('https://prueba-hamburguesas.herokuapp.com/burger/'+this.$route.params.id+'/', {method: "DELETE"})
      .then(res => {
        // Volver a /hamburguesas
        if (res.status == 204) this.$router.push('/hamburguesas');
      })
      .catch(err => console.log(err));
    },
    obtenerDatos() {
    // Pedir datos de hamburguesa
    fetch('https://prueba-hamburguesas.herokuapp.com/burger/'+this.$route.params.id+'/', {method: "GET"})
    .then(res => res.json())
    .then(res => this.hamburguesa = res);
    }
  },
  created() {
    this.obtenerDatos();
  }
}
</script>

<style>
#hamburguesaData {
  margin: 0 60px;
  padding: 10px;

  background-color: white;
  border-radius: 10px;

  text-align: left;
}
#HD-nombre {
  margin-left: 20px;
  margin-bottom: 30px;

  font-size: 34px;
  color: #42b983;
}
.HD-subTitle {
  margin-left: 60px;
}
#HD-descripcion {
  margin-left: 80px;
}
#HD-listaIngredientes {
  margin-left: 80px;
  padding-left: 20px;
}
#HD-calorias {
  text-align: right;
  color: #a8a8a8;
}

/* ---------- Botones eliminar y editar -------------- */

#HD-buttons {
  margin-left: 25px;
}
.HD-button {
  color: white;
  border: none;

  padding: 10px;
  margin: 5px;

  border-radius: 10px;
}
#HD-eliminar {
  background-color:rgb(221, 54, 54);
  transition: background-color .1s ease;
}
#HD-eliminar:hover {
  background-color:rgb(168, 38, 38);
}
#HD-eliminar:active {
  background-color:rgb(235, 114, 114);
}
#HD-editar {
  background-color:rgb(54, 121, 221);
  transition: background-color .1s ease;
}
#HD-editar:hover {
  background-color:rgb(25, 67, 129);
}
#HD-editar:active {
  background-color:rgb(113, 152, 209);
}
</style>