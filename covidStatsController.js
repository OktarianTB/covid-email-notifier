const Axios = require("axios");
const CSV = require("csv-string");

const parseCSV = (data) => {
  const arr = CSV.parse(data);
  return arr[0].reduce((obj, k, i) => ({ ...obj, [k]: arr[1][i] }), {});
};

exports.getHongKongVaccinationStatistics = async () => {
  const url = "https://static.data.gov.hk/covid-vaccine/summary.json";

  const response = await Axios.get(url);
  const data = response.data;

  return ({
    firstDosePercent,
    secondDosePercent,
    firstDoseDaily,
    firstDoseTotal,
  } = data);
};

exports.getFranceVaccinationStatistics = async () => {
  const url =
    "https://www.data.gouv.fr/fr/datasets/r/131c6b39-51b5-40a7-beaa-0eafc4b88466";

  const response = await Axios.get(url);
  const data = response.data;
  const processedData = parseCSV(data);

  return {
    firstDosePercent: processedData["couv_tot_dose1"],
    secondDosePercent: processedData["couv_tot_complet"],
    firstDoseTotal: processedData["n_tot_dose1"],
  };
};

exports.getUnitedKingdomVaccinationStatistics = async () => {
  const url =
    "https://api.coronavirus.data.gov.uk/v2/data?areaType=overview&metric=cumPeopleVaccinatedFirstDoseByPublishDate&metric=cumVaccinationCompleteCoverageByPublishDatePercentage&metric=cumVaccinationFirstDoseUptakeByPublishDatePercentage&metric=newPeopleVaccinatedFirstDoseByPublishDate&format=json";

  const response = await Axios.get(url);
  const data = response.data["body"][0];

  return {
    firstDosePercent:
      data["cumVaccinationFirstDoseUptakeByPublishDatePercentage"],
    secondDosePercent:
      data["cumVaccinationCompleteCoverageByPublishDatePercentage"],
    firstDoseDaily: data["newPeopleVaccinatedFirstDoseByPublishDate"],
    firstDoseTotal: data["cumPeopleVaccinatedFirstDoseByPublishDate"],
  };
};
