<script>
  import VPie from './v-pie'
  import Colors from 'color-convert'
  import ColorMap from 'colormap'

  export default {
    name: 'VColorpicker',
    components: {VPie},
    props: {
      alpha: {
        type: Number,
        default: 1
      }
    },
    data() {
      return {
        colormaps: ['jet', 'hsv', 'hot', 'cool', 'spring', 'summer', 'autumn', 'winter', 'earth', 'electric', 'magma'],
        currentmap: 'jet'
      }
    },
    computed: {
      colorData() {
        const colormap = this.currentmap
        const colorMap = ColorMap({colormap, format: 'hex', nshades: 24, alpha: 1})
        // console.log('colorMap', colorMap)
        const data = []
        const colors = []
        const labels = []
        colorMap.forEach(color => {
          data.push(1)
          colors.push(color)
          // labels.push(color)
        })
        return {data, colors, labels, options: {tooltips: false}}
      }
    },
    methods: {
      emit(color) {
        const rgb = Colors.hex.rgb(color.color)
        const colors = {
          hex: color.color,
          rgb: `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`,
          rgba: `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${this.alpha})`
        }
        console.log('colors', colors)
        this.$emit('click', colors)
      }
    }
  }
</script>

<template>
  <VSheet class="pa-4">
    <VSelect v-model="currentmap" :items="colormaps" label="Colormap" dense></VSelect>
    <VPie v-bind="colorData" @click="emit"></VPie>
  </VSheet>
</template>
