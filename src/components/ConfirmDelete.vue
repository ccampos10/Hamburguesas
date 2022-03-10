<template>
  <div id="Confirmar">
    <p>Seguro que desea eliminar este elemento</p>
    <input id="C-eliminar" class="C-buttons" type="button" value="Eliminar" @click="Eliminar()">
    <input id='C-cancelar' class="C-buttons" type="button" value="Cancelar" @click="Cancelar()">
  </div>
</template>

<script>
export default {
  name: 'ConfirmDelete',
  methods: {
    Eliminar() {
      // Eliminar la hamburguesa con el id
      fetch('https://prueba-hamburguesas.herokuapp.com/burger/'+this.$route.params.id+'/', {method: "DELETE"})
      .then(res => {
        // Volver a /hamburguesas
        if (res.status == 204) this.$router.push('/hamburguesas');
      })
      .catch(err => console.log(err));
    },
    Cancelar() {
      this.$parent.popUpDisable({target: {}}, false)
    }
  }
}
</script>

<style>
#Confirmar {
  width: 400px;
  border-radius: 10px;
  background-color: white;
  text-align: center;
}
.C-buttons {
  color: white;
  border: none;
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
  margin-top: 0;
}
#C-eliminar {
  background-color:rgb(221, 54, 54);
  transition: background-color .1s ease;
}
#C-eliminar:hover {
  background-color:rgb(168, 38, 38);
}
#C-eliminar:active {
  background-color:rgb(235, 114, 114);
}
#C-cancelar {
  background-color:rgb(54, 121, 221);
  transition: background-color .1s ease;
}
#C-cancelar:hover {
  background-color:rgb(25, 67, 129);
}
#C-cancelar:active {
  background-color:rgb(113, 152, 209);
}
</style>