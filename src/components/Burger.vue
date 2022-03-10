<template>
  <li class="hamburguesaLi">
    <router-link :to="'/hamburguesas/'+hamburguesa.id">
      <h2 class="hamburguesaLi-nombre">{{ hamburguesa.nombre }}</h2>
      <p class="hamburguesaLi-descripcion">{{ descripcion }}</p>
      <p class="hamburguesaLi-calorias">{{"Calorias: "+hamburguesa.calorias }}</p>
    </router-link>
  </li>
</template>

<script>
export default {
  name: "Burger",
  props: ["hamburguesa","descripcion"]
}
</script>


<style>
/* haburguesa Item List */
.hamburguesaLi {
  list-style: none;
  text-align: left;

  margin: 25px 15px;
  padding: 1px 20px;

  background-color: white;
  border-radius: 10px;
  transition: all .7s ease;
}
/* Animacion de las targetas */
.hamburguesaLi:hover {
  transform: scale(1.06);
  box-shadow: 3px 3px 15px;
}
.hamburguesaLi a {
  color: #2c3e50;
  text-decoration: none;
}

.hamburguesaLi-nombre {
  font-size: 24px;
  color: #42b983;
}
.hamburguesaLi-descripcion {
  margin-left: 40px;
  font-size: 18px;
}

.hamburguesaLi-calorias {
  text-align: right;
  color: #a8a8a8;
}
</style>