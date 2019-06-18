"use strict";

const DEFAULT_DELAY_S = 3; // 10;
const MAX_DELAY_S = 30;

module.exports = (context, callback) => {
  let delay_s = DEFAULT_DELAY_S;
  let params;
  let count = 0;

  try {
    if (context) {
      params = JSON.parse(context);
      
      // Check for delay_s param
      const params_delay_s = params["delay_s"];
      if (typeof params_delay_s === "number" && params_delay_s <= MAX_DELAY_S) {
        delay_s = params_delay_s;
      } else if (params_delay_s > MAX_DELAY_S) {
        throw new Error(`Param 'delay_s' set longer than allowed maximum of ${MAX_DELAY_S} seconds`)
      }
      
      // Check for force_error param
      if (!!params['force_error']) {
        throw new Error('Forcing throw by param')
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
        message: error.message,
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
