import cron from 'cron';

/**
 * Schedules a cronjob
 * @param {any} interval The interval to execute the cronjob
 * @param {any} timezone The zimezone to calculate the time
 * @param {any} callback Is called every interval
 * @return {any} The cronjob
 */
function scheduleJob(interval, timezone, callback) {
  const job = new cron.CronJob(
    interval,
    function () {
      callback();
    },
    null,
    false,
    timezone
  );

  return job;
}

export default { scheduleJob };
