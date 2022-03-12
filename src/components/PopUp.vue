<template>
  <div id="PopUp" @mousedown="popUpDisable($event, true)">
    <!-- Paner de edicion o creacion de hamburguesas dependiendo de 'tipo' -->
    <BurgerDataEC v-if="tipo == 'crear' || tipo == 'editar'" :tipo="tipo" :Hid="Hid" />
    <ConfirmDelete v-else-if="tipo == 'confirmar'" />
    <Filtrar v-else-if="tipo == 'filtrar'" :ingredientes="ingredientes" />
  </div>
</template>

<script>
import BurgerDataEC from "@/components/BurgerDataEC.vue"
import ConfirmDelete from "@/components/ConfirmDelete.vue"
import Filtrar from "@/components/Filtrar.vue"

export default {
  name: 'PopUp',
  props: ['tipo', 'Hid', 'ingredientes'],
  components: {
    BurgerDataEC,
    ConfirmDelete,
    Filtrar,
  },
  methods: {
    popUpDisable(e, esteElemento) {
      // Si clicas fuera del panel o en el boton 'Cerrar' del panel
      if ((esteElemento && e.target.id == 'PopUp') || !esteElemento) this.$parent.popUpEstaActivo = false;
    },
    reload() {
      this.$parent.obtenerDatos();
    },
    filtrar(filtro) {
      this.$parent.filtrar(filtro);
    }
  }
}
</script>

<style>
#PopUp {
  width: 100%;
  height: 100%;
  position:fixed;
  top: 0;
  left: 0;
  z-index: 2;

  background-color: rgba(0, 0, 0, 0.507);
  backdrop-filter: blur(10px);

  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
}
</style>