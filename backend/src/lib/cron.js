import cron from "cron";
import https from "https";

const job = new cron.CronJob("*/14 * * * *", function () {
  https
    .get(process.env.API_URL, (res) => {
      if (res.statusCode === 200) console.log("Get request send successfully");
      else console.log("Get request failed", res.statusCode);
    })
    .on("error", (e) => console.error("Error in get request: ", e));
});

export default job;
