export function filterObj({ objectToFilter: obj, filterValue }) {
  const filtered = {};

  for (const prop in obj) {
    if (obj[prop].location.toLowerCase() === filterValue.toLowerCase()) {
      filtered[prop] = obj[prop];
    }
  }

  return filtered;
}
export function filterDestinations({ city, destinationsDB, res }) {
  if (city !== undefined) {
    const filterDests = filterObj({
      objectToFilter: destinationsDB,
      filterValue: city,
    });
    return res.send(filterDests);
  }
  return res.send(destinationsDB);
}
