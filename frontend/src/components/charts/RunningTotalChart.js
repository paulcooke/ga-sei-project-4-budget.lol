import React from 'react'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'

class RunningTotalChart extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      options: {
        chart: {
          height: '65%'
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
            text: 'date'
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
          text: 'date'
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
    console.log(this.props.dateAxis)
    console.log(this.props.runningTotal)
    console.log('chart props',this.props)
    console.log('chart state', this.state)
    console.log('')
    return (
      <div className="columns is-centered">
        <div className="column is-four-fifths">
          {this.props.runningTotal.length == 1 &&
            <>
              <h3 className="title is-6">When you start adding your income & costs your balance calculation will appear here</h3>
              <br/>
            </>
          }
          {this.props.runningTotal.length > 1 && 
            <HighchartsReact 
              highcharts={Highcharts}
              options={this.state.options}
              allowChartUpdate = { true }
            />
          }
        </div>
      </div>
    )
  }
}

export default RunningTotalChart