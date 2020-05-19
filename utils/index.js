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
