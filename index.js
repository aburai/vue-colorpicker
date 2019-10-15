import VColorpicker from './components/v-colorpicker'
import ColorMap from 'colormap'

// This is your plugin object. It can be exported to be used anywhere.
const VueColorpicker = {
  // The install method is all that needs to exist on the plugin object.
  // It takes the global Vue object as well as user-defined options.
  install(Vue, options = {}) {
    Vue.component(VColorpicker.name, VColorpicker)
    Vue.prototype.$colorpicker = {
      colorMap(params = {}) {
        const colormap = params.colormap || 'hsv'
        const format = params.format || 'hex'
        const nshades = params.nshades || 24
        const alpha = params.alpha || 1
        return ColorMap({colormap, format, nshades, alpha})
      }
    }
  }
}

export default VueColorpicker

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueColorpicker)
}
