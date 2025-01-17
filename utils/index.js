export function formatCompanyName(store_id) {
  let companyName = store_id.split("_")[0];
  if (companyName.includes("-")) {
    return companyName.split("-").join(" ")
  }
  return companyName
}

export function formatIssueType(issue_id) {
  return issue_id.split("_").join(" ")
}

export function parseStoreIdNumber(storeId) {
  return storeId.split("_")[1]
}

export function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export function formatTsPlot(storeData) {
  if (storeData) {
    let rankData = storeData;
    let dates = rankData.map((v) => v.date_comment);
    let metrics = rankData.map((v) => v.metric).map((val)=> Math.round(val * 100) / 100);
    let benchmark = rankData.map((v) => v.benchmark).map((val)=> Math.round(val * 100) / 100);
    let ptRadius = 5;
    let dataset = [];

    if(metrics.length > 0){
      dataset.push({
        data: metrics,
        label: "Metric Value",
        pointRadius: ptRadius,
        pointBackgroundColor:"#575A89",
        borderColor: "#575A89"
      })
    }

    if(benchmark.length > 0){
      dataset.push({
        data: benchmark,
        label: "Benchmark",
        pointRadius: ptRadius,
        pointBackgroundColor:"#EC4E20",
        borderColor: "#EC4E20"
      })
    }

    return {
      labels: dates,
      datasets: dataset
    }
  }
  return null
}
