<script>
  import { Radar , mixins} from 'vue-chartjs'
  const { reactiveProp } = mixins;

  export default {
    name: "rankRadarPlot",
    extends: Radar,
    mixins: [reactiveProp],
    props: {
      chartdata: {
        type: Object,
        default: null
      },
      options: {
        type: Object,
        default: null
      }
    },
    mounted () {
      this.renderChart(this.chartdata, this.options)
    }
  }
</script>

<style>
</style>
