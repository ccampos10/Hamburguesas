<template>
  <form id="filtrar" @submit="Filtrar($event)">
    <h1 id="F-titulo">Filtros: </h1>

    <h3 class="F-subTitulo">Nombre: </h3>
    <input class="F-elemento" type="text" name="nombre" id="F-nombre">

    <h3 class="F-subTitulo">Maxima cantidad de calorias: </h3>
    <input class="F-elemento" type="text" name="maxCalorias" id="F-maxCalorias">

    <h3 class="F-subTitulo">Ingredientes: </h3>
    <ul id="F-lista">
      <!-- Por cada ingrediente -->
      <li class="F-li" v-for="ingrediente, i of ingredientes" :key="i" >
        <input type="checkbox" :name="ingrediente" class="F-check" >
        {{ingrediente}}
      </li>
    </ul>

    <input id="F-filtrar" class="F-boton" type="submit" value="Filtrar">
    <input id="F-cancelar" class="F-boton" type="button" value="Cancelar" @click="Cancelar()">
  </form>
</template>

<script>
export default {
  name: 'Filtrar',
  props: ['ingredientes'],
  methods: {
    Filtrar(e) {
      e.preventDefault();
      const nombre = e.target['F-nombre'].value;
      const maxCalorias = parseInt(e.target['F-maxCalorias'].value);

      let filtro = {nombre: '', maxCalorias: 0, ingredientes: []};
      for (let i = 0; i < this.ingredientes.length; i++) {
        // Agregar un ingrediente por cada checkbox activo
        if (e.target[i+2].checked) filtro.ingredientes.push(e.target[i+2].name);
      }
      if (nombre != '') filtro.nombre = nombre;
      if (maxCalorias) filtro.maxCalorias = maxCalorias;
      this.$parent.filtrar(filtro);
      this.$parent.popUpDisable({target: {}}, false);
    },
    Cancelar() {
      this.$parent.popUpDisable({target: {}}, false);
    }
  }
}
</script>

<style>
#filtrar {
  width: 500px;
  padding: 10px;

  background-color: white;
  border-radius: 10px;

  text-align: left;
}
#F-titulo {
  margin-left: 20px;
  margin-bottom: 30px;

  font-size: 34px;
  color: #42b983;
}
.F-subTitulo {
  margin-left: 60px;
}
.F-elemento {
  margin-left: 80px;
}
#F-lista {
  height: 150px;
  padding: 5px;
  margin-left: 80px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  overflow: auto;
}
.F-li {
  list-style: none;
  display: inline-block;
}


.F-boton{
  color: white;
  border: none;
  cursor: pointer;

  padding: 10px;
  margin: 5px;

  border-radius: 10px;
}
#F-filtrar {
  background-color:rgb(54, 121, 221);
  transition: background-color .1s ease;
}
#F-filtrar:hover {
  background-color:rgb(25, 67, 129);
}
#F-filtrar:active {
  background-color:rgb(113, 152, 209);
}
#F-cancelar {
  background-color:rgb(221, 54, 54);
  transition: background-color .1s ease;
}
#F-cancelar:hover {
  background-color:rgb(168, 38, 38);
}
#F-cancelar:active {
  background-color:rgb(235, 114, 114);
}
</style>