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
    computed: {
      colorData() {
        const colorMap = ColorMap({colormap: 'jet', format: 'hex', nshades: 24, alpha: 1})
        console.log('colorMap', colorMap)
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
        this.$emit('click', colors)
      }
    }
  }
</script>

<template>
  <VCard class="pa-4">
    <VCardTitle>Colorpicker</VCardTitle>
    <VPie v-bind="colorData" @click="emit"></VPie>
  </VCard>
</template>
