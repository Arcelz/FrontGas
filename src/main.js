import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import App from './App'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAEnFVZCRV51i9sDpwqoH_w2LPXW02WuyY'
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
