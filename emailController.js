const sgMail = require("@sendgrid/mail");
const {
  getHongKongVaccinationStatistics,
  getFranceVaccinationStatistics,
  getUnitedKingdomVaccinationStatistics,
} = require("./covidStatsController");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const getDate = () => {
  const date = new Date();
  return date.getDate() + "/" + (date.getMonth() + 1);
};

exports.sendEmail = async () => {
  const hongKongVaccinationStatistics =
    await getHongKongVaccinationStatistics();

  const franceVaccinationStatistics = await getFranceVaccinationStatistics();

  const unitedKingdomVaccinationStatistics =
    await getUnitedKingdomVaccinationStatistics();

  const msg = {
    to: process.env.EMAIL, // Change to your recipient
    from: process.env.EMAIL, // Change to your verified sender
    subject: "[CovidTracker] Daily Update (" + getDate() + ")",
    text: `
    Here's your daily recap:

    Hong Kong:
    - First dose percent: ${hongKongVaccinationStatistics.firstDosePercent}
    - Second dose percent: ${hongKongVaccinationStatistics.secondDosePercent}
    - First doses daily: ${hongKongVaccinationStatistics.firstDoseDaily}
    - First doses total: ${hongKongVaccinationStatistics.firstDoseTotal}

    United Kingdom:
    - First dose percent: ${unitedKingdomVaccinationStatistics.firstDosePercent}%
    - Second dose percent: ${unitedKingdomVaccinationStatistics.secondDosePercent}%
    - First doses daily: ${unitedKingdomVaccinationStatistics.firstDoseDaily}
    - First doses total: ${unitedKingdomVaccinationStatistics.firstDoseTotal}

    France:
    - First dose percent: ${franceVaccinationStatistics.firstDosePercent}%
    - Second dose percent: ${franceVaccinationStatistics.secondDosePercent}%
    - First doses total: ${franceVaccinationStatistics.firstDoseTotal}
    
    `,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};
