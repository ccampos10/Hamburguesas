<template>
  <div id="seccion">
    <h1 id="nombre">{{hamburguesa.nombre}}</h1>
    <h3 class="subTitle">Descripcion:</h3>
    <p id="descripcion">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus sapiente quo est expedita eaque laudantium, nihil maxime, nam eveniet porro minus suscipit dolorum perspiciatis quas? Animi dolor ullam illo soluta.</p>
    <h3 class="subTitle">Ingredientes:</h3>
    <ul>
      <li v-for="ingrediente, i of hamburguesa.ingredientes" :key="i">{{ingrediente}}</li>
    </ul>
    <p id="calorias">{{hamburguesa.calorias}}</p>
  </div>
</template>

<script>
export default {
  name: 'BurgerData',
  data() {
    return {
      hamburguesa: {id: -1, nombre: '...', ingredientes: [],calorias: -1}
    }
  },
  created() {
    fetch('https://prueba-hamburguesas.herokuapp.com/burger', {method: "GET"})
    .then(res => res.json())
    .then(res => this.hamburguesa = (res.filter((elemento) => elemento.id == this.$route.params.id))[0]);
  }
}
</script>

<style>
#seccion {
  margin: 0 60px;
  padding: 10px;

  background-color: white;
  border-radius: 10px;

  text-align: left;
}
#nombre {
  margin-left: 20px;
  margin-bottom: 30px;
  font-size: 34px;
  color: #42b983;
}
.subTitle {
  margin-left: 60px;
}
#descripcion {
  margin-left: 80px;
}
#calorias {
  text-align: right;
  color: #a8a8a8;
}
</style>