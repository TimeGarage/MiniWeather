const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function weekDay(week) {
  var weekDay;
  //var week = new Date().getDay()
  console.log(week)
  switch (week) {
    case 0: 
      weekDay = 'Sunday'
      break;
    case 1:
      weekDay = 'Monday'
      break;
    case 2:
      weekDay = 'Tuesday'
      break;
    case 3:
      weekDay = 'Wednesday'
      break;
    case 4:
      weekDay = 'Thursday'
      break;
    case 5:
      weekDay = "Friday"
      break;
    case 6:
      weekDay = 'Sunday'
      break;
  }
  return weekDay;
}

module.exports = {
  formatTime,
  weekDay
}
