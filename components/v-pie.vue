<script>
  import 'chartjs-plugin-datalabels'
  import {Pie} from 'vue-chartjs'

  export default {
    name: 'VPie',
    mixins: [Pie],
    props: {
      data: {
        type: Array
      },
      colors: {
        type: Array
      },
      title: {
        type: String
      },
      labels: {
        type: Array
      },
      options: {
        type: Object,
        default: () => ({legend: false, tooltips: false, datalabels: false})
      }
    },
    data() {
      return {
        cplugins: []
      }
    },
    mounted() {
      const vm = this
      const {legend = false, tooltips = false, datalabels = false} = this.options || {}

      // deactivate default label printing
      this.cplugins = {
        datalabels: {
          formatter: () => ''
        }
      }
      if (datalabels) {
        this.cplugins.datalabels = {
          formatter: (value, ctx) => {
            if (!datalabels) return ''

            const datasets = ctx.chart.data.datasets
            if (datasets.indexOf(ctx.dataset) === datasets.length - 1) {
              const sum = datasets[0].data.reduce((a, b) => a + b, 0)
              return Math.round((value / sum) * 100) + '%'
            }
            return ''
          },
          anchor: 'end',
          backgroundColor: 'rgba(0, 0, 0, 0.65)',
          color: '#FFFFFF',
          borderRadius: '10',
          font: {
            family: 'Rubik',
            size: '24',
            lineHeight: '24px'
          }
        }
      }

      // Overwriting base render method with actual data.
      vm.renderChart({
        datasets: [
          {
            data: this.data,
            backgroundColor: this.colors,
            label: this.title || ''
          }
        ],
        labels: this.labels
      }, {
        legend: {
          display: legend
        },
        plugins: this.cplugins,
        tooltips: {
          enabled: tooltips,
          callbacks: {
            label(tooltipItem, data) {
              return data.labels[tooltipItem.index]
            }
          }
        },
        maintainAspectRatio: false,
        onClick: (event, el) => {
          const item = el[0]
          if (!item) return
          // item._chart.outerRadius -= 10
          // item._model.outerRadius += 10
          // item._model.borderColor = '#000'
          const data = this.data[item._index]
          const color = this.colors[item._index]
          const label = this.labels[item._index]
          this.$emit('click', {data, color, label})
        }
      })
    }
  }
</script>
