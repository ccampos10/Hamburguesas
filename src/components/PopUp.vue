<template>
  <div id="PopUp" @click="popUpDisable($event, true)">
    <!-- Paner de edicion o creacion de hamburguesas dependiendo de 'tipo' -->
    <BurgerDataEC :tipo="tipo" :Hid="Hid" />
  </div>
</template>

<script>
import BurgerDataEC from "@/components/BurgerDataEC.vue"

export default {
  name: 'PopUp',
  props: ['tipo', 'Hid'],
  components: {
    BurgerDataEC
  },
  methods: {
    popUpDisable(e, esteElemento) {
      // Si clicas fuera del panel o en el boton 'Cerrar' del panel
      if ((esteElemento && e.target.id == 'PopUp') || !esteElemento) this.$parent.popUpEstaActivo = false;
    },
    reload() {
      this.$parent.obtenerDatos();
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