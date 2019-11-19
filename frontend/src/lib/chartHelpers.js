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

  static paymentsOnDays(day_of_week, amount) {
    // const day_of_week = 'thursday'
    const exampleDateLine = this.makeDateLine(89)
    const paymentsArray = exampleDateLine.map(date => {
      if (moment(date).format('dddd').toLowerCase() === day_of_week) {
        return amount
      } else {
        return 0
      }
    })
    return paymentsArray
  }

  static paymentsOnDates(date_in_month, amount) {
    // const date_in_month = 20
    const exampleDateLine = this.makeDateLine(89)
    const paymentsArray = exampleDateLine.map(date => {
      if (moment(date).get('date') === parseInt(date_in_month)) {
        
        return amount
      } else {
        return 0
      }
    })
    return paymentsArray
  }

  static paymentsOneOff(one_off_date, amount) {
    // const one_off_date = '2019-11-30'
    const exampleDateLine = this.makeDateLine(89)
    const paymentsArray = exampleDateLine.map(date => {
      if (moment(date).format('YYYY-MM-DD') === moment(one_off_date).format('YYYY-MM-DD')) {
        return amount
      } else {
        return 0
      }
    })
    return paymentsArray
  }

}

export default ChartHelpers