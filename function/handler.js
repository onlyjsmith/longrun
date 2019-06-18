"use strict";

const DEFAULT_DELAY_S = 10;
const MAX_DELAY_S = 120;

module.exports = (context, callback) => {
  let delay_s = DEFAULT_DELAY_S;
  let params;
  let count = 0;

  try {
    if (context) {
      params = JSON.parse(context);
      const params_delay_s = params["delay_s"];
      if (typeof params_delay_s === "number" && params_delay_s < MAX_DELAY_S) {
        delay_s = params_delay_s;
      }
    }

    const start = new Date();
    const end = start.setSeconds(start.getSeconds() + delay_s);

    while (new Date() < end) {
      count = count + 1;
    }
  } catch (error) {
    return callback(undefined, {
      function_status: "error",
      result: {
        message: JSON.stringify(error),
      }
    })
  }

  return callback(undefined, {
    function_status: "success",
    result: {
      params,
      status: `done after ${delay_s} seconds`,
      count: count,
    }
  });
};
