"use strict"

const DEFAULT_DELAY_S = 10
const MAX_DELAY_S     = 120

module.exports = (context, callback) => {
  let delay_s = DEFAULT_DELAY_S
  
  if (context) {
    const params = JSON.parse(context)
    const params_delay_s = params['delay_s']
    if (typeof params_delay_s === 'number' && params_delay_s < MAX_DELAY_S) {
      delay_s = params_delay_s
    }
  }

  const start = new Date()
  const end = start.setSeconds(start.getSeconds() + delay_s)

  let count = 0
  while (new Date < end) {
    count += 1
  }

  callback(undefined, {
    function_status: 'success',
    result: {
      status: `done after ${delay_s} seconds`,
      count: count,
    }
  });
}