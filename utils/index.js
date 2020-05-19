export function formatCompanyName(store_id) {
  let companyName = store_id.split("_")[0];
  if (companyName.includes("-")) {
    return companyName.split("-").join(" ")
  }
  return companyName
}

export function parseStoreIdNumber(storeId) {
  return storeId.split("_")[1]
}

export function formatTsPlot(storeData) {
  if (storeData) {
    let rankData = storeData;
    let dates = rankData.map((v) => v.date_comment);
    let metrics = rankData.map((v) => v.metric);
    let benchmark = rankData.map((v) => v.benchmark);

    let dataset = [{
      data: metrics,
      label: "Metric Value",
      borderColor: "#575A89"
    }, {
      data: benchmark,
      label: "Benchmark",
      borderColor: "#EC4E20"
    }];

    return {
      labels: dates,
      datasets: dataset
    }
  }
  return null
}
