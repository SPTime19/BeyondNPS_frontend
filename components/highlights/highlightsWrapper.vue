<template>
  <section>
    <div class="columns is-multiline is-vcentered">
      <div class="column is-6">
        <p class="">Days to resolution</p>
      </div>
      <div class="column is-6">
        <rankBarPlotHorizontal :chartData="formatRankToPlot()"
                      :options="rankPlotOption"></rankBarPlotHorizontal>
      </div>
    </div>
  </section>
</template>

<script>
  import rankBarPlotHorizontal from "~/components/analytics/widgets/sidebar/rankBarPlotHorizontal";

  export default {
    name: "highlightsWrapper",
    components: {
      rankBarPlotHorizontal
    },
    data: function () {
      return {
        rankPlotOption: {
          legend: {display: false},
          title: {
            display: true,
            text: 'Avg. Number of Days to Ticket Resolution.'
          },
          scales: {
            xAxes: [{
              display: true,
              ticks: {
                suggestedMin: 0,    // minimum will be 0, unless there is a lower value.
                // OR //
                // beginAtZero: true   // minimum value will be 0.
              }
            }]
          }
        },
      }
    },
    methods: {
      formatRankToPlot: function () {


        let records = [{'metric': 2.0, 'company': 'Tok&Stok - Loja Online '},
            {'metric': 3.04, 'company': 'Openbox2'},
            {'metric': 3.41, 'company': 'Lojas Cem'},
            {'metric': 4.05, 'company': 'Marabraz - Lojas Físicas'},
            {'metric': 4.61, 'company': 'Viggore Móveis'},
            {'metric': 4.65, 'company': 'Esplanada Móveis'},
            {'metric': 5.06, 'company': 'Móveis Rainha'},
            {'metric': 5.83, 'company': 'Lider Interiores'},
            {'metric': 5.91, 'company': 'Lojas Lebes'},
            {'metric': 6.0, 'company': 'Magazine Luiza - Loja Física'},
            {'metric': 6.08, 'company': 'Inovar Móveis e Colchões'},
            {'metric': 6.56, 'company': 'King Star Colchões'},
            {'metric': 6.79, 'company': 'Magazine Luiza - Loja Online'},
            {'metric': 6.84, 'company': 'Fast Shop'},
            {'metric': 6.92, 'company': 'Lojas Guido'},
            {'metric': 7.24, 'company': 'Sylvia Design'},
            {'metric': 7.6, 'company': 'Casas Bahia - Loja Online'},
            {'metric': 7.77, 'company': 'Casas Bahia - Marketplace'},
            {'metric': 7.81, 'company': 'Ponto Frio - Loja Online'},
            {'metric': 7.86, 'company': 'Fabrispuma'},
            {'metric': 8.41, 'company': 'Mobly'},
            {'metric': 8.44, 'company': 'TUTTI MÓVEIS'},
            {'metric': 8.98, 'company': 'Marabraz - Loja Online'},
            {'metric': 9.38, 'company': 'MadeiraMadeira'},
            {'metric': 10.35, 'company': 'Casas Bahia - Lojas Físicas'},
            {'metric': 10.81, 'company': 'Etna Home Store'},
            {'metric': 11.05, 'company': 'Tok&Stok - Loja Física'}]

        let companies = records.map((val)=> val.company);
        let ranks = records.map((val)=> val.metric);

        let background = [];
        for (let idx in companies) {
          background.push("#c45850")
        }
        let dataset = [{
          data: ranks,
          label: "Avg. Number of Days to Ticket Resolution",
          background: background,
          backgroundColor: "#575A89",
        }];

        return {
          labels: companies,
          datasets: dataset
        }
      }
    }
  }
</script>

<style scoped>

</style>
