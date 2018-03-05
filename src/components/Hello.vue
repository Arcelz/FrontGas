<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
    <gmap-map
    :center="currentLocation"
    :zoom="15"
    @dragend="chamaEu"
    style="width: 100%; height: 85vh;min-height:85vh"
  >
    <gmap-marker
      :key="index"
      v-for="(m, index) in markers"
      :position="m.position"
      :clickable="true"
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
      markers: [],
      currentLocation: { lat: 0, lng: 0 }
    };
  },
  watch: {
    $route(to, from) {
      // Call resizePreserveCenter() on all maps
      Vue.$gmapDefaultResizeBus.$emit("resize");
    }
  },
  mounted: function() {
    this.geolocation();
  },
  methods: {
    geolocation: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.chamaEu({
          latLng: {
            lat: function() {
              return position.coords.latitude;
            },
            lng: function() {
              return position.coords.longitude;
            }
          }
        });
      });
    },
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
          this.markers = [];
          var array = {};
          response.data.forEach(element => {
            const createdMarker = this.addMarker();
            createdMarker.position.lat = parseFloat(element.latitude);
            createdMarker.position.lng = parseFloat(element.longitude);
          });
          console.log(this.markers);
        });
    },
    addMarker() {
      this.markers.push({
        position: { lat: 48.8538302, lng: 2.2982161 },
        draggable: true,
        enabled: true
      });
      return this.markers[this.markers.length - 1];
    }
  }
};
</script>

<style></style>

