<script>
  import { HorizontalBar , mixins} from 'vue-chartjs'
  const { reactiveProp } = mixins;

  export default {
    name: "rankBarPlot",
    extends: HorizontalBar,
    mixins: [reactiveProp],
    props: {
      options: {
        type: Object,
        default: null
      }
    },
    mounted () {
      this.renderChart(this.chartData, this.options)
    }
  }
</script>

<style>
</style>
