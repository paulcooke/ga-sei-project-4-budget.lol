import React from 'react'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'

class RunningTotalChart extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      views: '3m',
      options: {
        chart: {
          height: '40%'
        },
        title: {
          text: 'Your balance'
        },
        subtitle: {
          text: 'Add, change and delete items and see how your balance will change over time'
        },
        yAxis: {
          title: {
            text: '£ in your account'
          }
        },
        xAxis: {
          title: {
            // text: 'date'
          },
          categories: []
        },
        series: [{
          name: 'running total',
          data: [],
          step: 'left',
          marker: {
            enabled: false
          },
          lineWidth: 3
        }],
        plotOptions: {
          line: {
            negativeColor: 'red'
          }
        }
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      const xAxis = { 
        categories: this.props.dateAxis,
        title: {
          // text: 'date'
        }
      }
      const series = [{
        name: 'running total',
        data: this.props.runningTotal,
        step: 'left',
        marker: {
          enabled: false
        },
        lineWidth: 3
      }]
      const options = { ...this.state.options, 
        xAxis,
        series
      }
      this.setState({ options })
    }
  }

  render() {
    // console.log(this.props.dateAxis)
    // console.log(this.props.runningTotal)
    // console.log('chart props',this.props)
    // console.log('chart state', this.state)
    return (
      <div className="columns is-centered">
        <div className="column is-four-fifths">
          {this.props.runningTotal.length === 1 &&
            <>
              <h3 className="title is-6">When you start adding your income & costs your balance calculation will appear here</h3>
              <br/>
            </>
          }
          {this.props.runningTotal.length > 1 && 
            <>
              <div>
                <button className={`button is-success is-small${this.state.views !== '1m' ? ' is-light' : ''}`}
                  onClick={(e) => {
                    e.preventDefault()
                    this.props.handleViewSelect(30)
                    const views = '1m'
                    this.setState({ views })
                  }}
                >1 month</button><span> </span>
                <button className={`button is-success is-small${this.state.views !== '3m' ? ' is-light' : ''}`}
                  onClick={(e) => {
                    e.preventDefault()
                    this.props.handleViewSelect(90)
                    const views = '3m'
                    this.setState({ views })
                  }}
                >3 months</button><span> </span>
                <button className={`button is-success is-small${this.state.views !== '6m' ? ' is-light' : ''}`}
                  onClick={(e) => {
                    e.preventDefault()
                    this.props.handleViewSelect(180)
                    const views = '6m'
                    this.setState({ views })
                  }}
                >6 months</button><span> </span>
                <button className={`button is-success is-small${this.state.views !== '1y' ? ' is-light' : ''}`}
                  onClick={(e) => {
                    e.preventDefault()
                    this.props.handleViewSelect(365)
                    const views = '1y'
                    this.setState({ views })
                  }}
                >1 year</button>
              </div>
              <HighchartsReact 
                highcharts={Highcharts}
                options={this.state.options}
                allowChartUpdate = { true }
              />
            </>
          }
        </div>
      </div>
    )
  }
}

export default RunningTotalChart