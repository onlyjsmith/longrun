"use strict"

module.exports = (context, callback) => {
  const params = JSON.parse(context)
  const delay_s = params['delay_s'] || 10

  const start = new Date()
  const end = start.setSeconds(start.getSeconds() + delay_s)

  let count = 0
  while (new Date < end) {
    count += 1
  }

  callback(undefined, {
    status: `done after ${delay_s} seconds`,
    count: count,
  });
}