"use strict";

module.exports = (context, callback) => {
  const MAX_DELAY_S = 30;
  const MIN_DELAY_S = 0;
  const ALLOWED_PARAMS = ["delay_s"];

  let params;
  let params_delay_s;
  let count = 0;

  try {
    if (!context) {
      throw new Error("Required param missing: \'delay_s\'");
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
    params_delay_s = params["delay_s"];

    if (typeof params_delay_s === "undefined") {
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
    const end = start.setMilliseconds(
      start.getMilliseconds() + params_delay_s * 1000
    );

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
      count: count,
      params,
      status: `done after ${params_delay_s} seconds`
    }
  });
};
