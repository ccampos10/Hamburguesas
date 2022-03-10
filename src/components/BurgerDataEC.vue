<template>
  <form id="hamburguesaEdit" @submit="Guardar($event)">
    <h1 id="HE-titulo">{{tipo == 'crear' ? 'Crear: ' : "Editar: "}}</h1>

    <h3 for="HE-nombre" class="HE-subTitulo">Titulo: </h3>
    <input type="text" name="nombre" id="HE-nombre" class="HE-elemento" :value="hamburguesa.nombre" />

    <h3 for="HE-descripcion" class="HE-subTitulo">Descripcion: </h3>
    <textarea name="descripcion" id="HE-descripcion" class="HE-elemento" cols="40" rows="5" v-model="descripcion" disabled></textarea>

    <h3 for="HE-ingredientes" class="HE-subTitulo">Ingredientes: </h3>
    <input type="text" name="ingredientes" id="HE-ingredientes" class="HE-elemento" :value="hamburguesa.ingredientes" >

    <h3 for="HE-calorias" class="HE-subTitulo">Calorias: </h3>
    <input type="text" name="calorias" id="HE-calorias" class="HE-elemento" :value="hamburguesa.calorias" >
    
    <div id="HE-buttons">
      <input id='HE-guardar' class='HE-button' type="submit" value="Guardar" />
      <input id='HE-cancelar' class='HE-button' type="button" value="Cancelar" @click="Cancelar()" />
    </div>
  </form>
</template>

<script>
export default {
  name: 'BurgerDataEdit',
  props: ['tipo', 'Hid'],
  data() {
    return {
      hamburguesa: this.tipo == 'crear' ? {} : {id: -1, nombre: '...', ingredientes: [],calorias: -1},
      descripcion: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni nostrum aliquid illum cumque suscipit voluptas odio sapiente illo. Atque, possimus veritatis! Ab ipsum eveniet iste dignissimos, quasi nulla molestiae consequatur!'
    }
  },
  methods: {
    Cancelar() {
        this.$parent.popUpDisable({target: {}}, false);
    },
    Guardar(e) {
      // Guardar la hamburguesa con el id
      e.preventDefault();
      let datos = {
        nombre: e.target['HE-nombre'].value,
        ingredientes: e.target['HE-ingredientes'].value.split(', '),
        calorias: e.target['HE-calorias'].value
      };
      let propiedades = this.tipo == 'editar' ? {id: this.Hid+'/', method: 'PUT'} : {id: '', method: 'POST'}

      fetch('https://prueba-hamburguesas.herokuapp.com/burger/'+ propiedades.id, {
        method: propiedades.method,
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(datos)
      })
      .then(() => {
        this.$parent.popUpDisable({target: {}}, false);
        this.$parent.reload();
      })
      .catch(err => console.log(err));
    }
  },
  created() {
    if (this.tipo == 'editar') {
      fetch('https://prueba-hamburguesas.herokuapp.com/burger/'+this.Hid+'/', {method: "GET"})
      .then(res => res.json())
      .then(res => this.hamburguesa = res)
    }
  }
}
</script>

<style>
#hamburguesaEdit {
  width: 500px;
  padding: 10px;

  background-color: white;
  border-radius: 10px;

  text-align: left;
}
#HE-titulo {
  margin-left: 20px;
  margin-bottom: 30px;

  font-size: 34px;
  color: #42b983;
}
.HE-subTitulo {
  margin-left: 60px;
}
.HE-elemento {
  margin-left: 80px;
}

/* ---------- Botones cancelar y guardar -------------- */

#HE-buttons {
  margin-right: 25px;

  text-align: right;
}
.HE-button {
  color: white;
  border: none;
  cursor: pointer;

  padding: 10px;
  margin: 5px;

  border-radius: 10px;
}
#HE-cancelar {
  background-color:rgb(221, 54, 54);
  transition: background-color .1s ease;
}
#HE-cancelar:hover {
  background-color:rgb(168, 38, 38);
}
#HE-cancelar:active {
  background-color:rgb(235, 114, 114);
}
#HE-guardar {
  background-color:rgb(54, 121, 221);
  transition: background-color .1s ease;
}
#HE-guardar:hover {
  background-color:rgb(25, 67, 129);
}
#HE-guardar:active {
  background-color:rgb(113, 152, 209);
}
</style>