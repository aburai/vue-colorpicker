import VColorpicker from './components/v-colorpicker'

// This is your plugin object. It can be exported to be used anywhere.
const VueColorpicker = {
  // The install method is all that needs to exist on the plugin object.
  // It takes the global Vue object as well as user-defined options.
  install(Vue, options = {}) {
    Vue.component(VColorpicker.name, VColorpicker)
  }
}

export default VueColorpicker

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueColorpicker)
}
