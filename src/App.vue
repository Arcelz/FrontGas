<template>
  <div>
    <div style="width: 100%; height: 800px">
      <google-map :center="center" :zoom="15" @dragend="newMarker">
         <map-marker
           :position="m.position"
           :opacity="m.opacity"
           :draggable="m.draggable"
           @position_changed="updMarker(m, $event)"
		   @dragend="logMarker(m)"
           v-for="m in markers"
           >
       </map-marker>
      </google-map>
    </div>
  </div>
</template>

<script>
import * as VueGoogleMaps from 'vue2-google-maps'

export default {
  data () {
    return {
      markers: [],
      center: { lat: -17.726699, lng: -49.115784 }
    }
  },
  methods: {
    newMarker (mouseArgs) {
      console.log(mouseArgs.latLng.lat(), mouseArgs.latLng.lng())
    },
    addMarker () {
      this.markers.push({
        position: { lat: -17.726699, lng: -49.115784 },
        draggable: true,
        enabled: true
      })
      return this.markers[this.markers.length - 1]
    },
    updMarker (m, event) {
      m.position = {
        lat: event.lat(),
        lng: event.lng()
      }
      console.log(event.lat())
    },
    logMarker (m) {
      console.log(m.position.lat, m.position.lng)
    }
  },
  components: {
    'googleMap': VueGoogleMaps.Map,
    'MapMarker': VueGoogleMaps.Marker
  }
}
</script>

<style></style>
