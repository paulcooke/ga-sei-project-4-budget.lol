/* eslint-disable camelcase */
import Moment from 'moment'
import { extendMoment } from 'moment-range'
const moment = extendMoment(Moment)

class ChartHelpers {

  static makeDateLine(length) {
    const today = moment()
    const lastDate = moment().add(length, 'days')
    const range = moment.range(today, lastDate)
    const dayRange = Array.from(range.by('day')).map(d => d.format('MM-DD-YYYY'))
    return dayRange
  }

  static paymentsOnDays() {
    const day_of_week = 'thursday'
    const exampleDateLine = this.makeDateLine(89)
    const paymentsArray = exampleDateLine.map(date => {
      if (moment(date).format('dddd').toLowerCase() === day_of_week) {
        return 5
      } else {
        return 0
      }
    })
    return paymentsArray
  }

  static paymentsOnDates() {
    const date_in_month = 20
    const exampleDateLine = this.makeDateLine(89)
    const paymentsArray = exampleDateLine.map(date => {
      if (moment(date).get('date') === parseInt(date_in_month)) {
        return 20
      } else {
        return 0
      }
    })
    return paymentsArray
  }

  static paymentsOneOff() {
    const one_off_date = '2019-11-30'
    const exampleDateLine = this.makeDateLine(89)
    const paymentsArray = exampleDateLine.map(date => {
      if (moment(date).format('YYYY-MM-DD') === one_off_date) {
        return 'banana'
      } else {
        return 0
      }
    })
    return paymentsArray
  }

}

export default ChartHelpers