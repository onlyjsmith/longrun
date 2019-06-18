"use strict";

module.exports = (context, callback) => {
  const MAX_DELAY_S = 30;
  const MIN_DELAY_S = 0;
  const DEFAULT_DELAY_S = 10;
  const ALLOWED_PARAMS = ["delay_s"];

  let delay_s = DEFAULT_DELAY_S;
  let params;
  let count = 0;

  try {
    if (!context) {
      throw new Error("No params passed. Need either `delay_s`");
    }

    params = JSON.parse(context);

    // Check allowed params
    const param_keys = Object.keys(params);
    param_keys.forEach(k => {
      if (!ALLOWED_PARAMS.includes(k)) {
        throw new Error(`Param '${k}' not allowed`);
      }
    });

    // Checks for delay_s param
    const params_delay_s = params["delay_s"];
    
    if (!params_delay_s) {
      throw new Error(
        "Param 'delay_s' required. No longer defaults to anything without it."
      );
    }

    if (params_delay_s > MAX_DELAY_S) {
      throw new Error(
        `Param 'delay_s' set longer than allowed maximum of ${MAX_DELAY_S} seconds`
      );
    } else if (params_delay_s < 0) {
      throw new Error(
        `Param 'delay_s' set shorter than allowed minimum of ${MIN_DELAY_S} seconds`
      );
    } else if (typeof params_delay_s !== "number") {
      throw new Error(`Param 'delay_s' provided, but is not a number`);
    }

    const start = new Date();
    const end = start.setMilliseconds(start.getMilliseconds() + params_delay_s * 1000);

    while (+new Date() < end) {
      count = count + 1;
    }
  } catch (error) {
    return callback(undefined, {
      function_status: "error",
      result: {
        message: error.message,
        params
      }
    });
  }

  return callback(undefined, {
    function_status: "success",
    result: {
      params,
      status: `done after ${delay_s} seconds`,
      count: count
    }
  });
};
