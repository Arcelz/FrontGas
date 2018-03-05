<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
    <gmap-map
    :center="center"
    :zoom="15"
    @dragend="chamaEu"
    style="width: 100%; height: 85vh;min-height:85vh"
  >
    <gmap-marker
      :key="index"
      v-for="(m, index) in markers"
      :position="m.position"
      :clickable="true"
      :draggable="true"
      @click="center=m.position"
    ></gmap-marker>
  </gmap-map>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>
<script>
import * as VueGoogleMaps from "vue2-google-maps";
import axios from "axios";
import Vue from "vue";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyAEnFVZCRV51i9sDpwqoH_w2LPXW02WuyY"
  }
});
export default {
  data() {
    return {
      center: { lat: -17.72314, lng: -49.117599 },
      markers: []
    };
  },
  created() {},
  methods: {
    chamaEu(params) {
      // pensar um jeito de atualizar o maps quando mudar a var pq nao ta atualizando
      axios
        .get(
          "http://localhost:8000/coord/15/" +
            params.latLng.lat() +
            "/" +
            params.latLng.lng()
        )
        .then(response => {
          this.markers = []
          var array = {};
          response.data.forEach(element => {
            array = {
              position: { lat: parseInt(element.latitude), lng: parseInt(element.longitude) }
            };
            this.markers.push(array)
          });
          
        });
    }
  },
  watch: {
    $route(to, from) {
      // Call resizePreserveCenter() on all maps
      Vue.$gmapDefaultResizeBus.$emit("resize");
    }
  }
};
</script>

<style></style>

