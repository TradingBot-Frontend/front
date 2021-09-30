import React, { useState } from 'react';
import Chart from 'react-apexcharts'

// constructor(props: any) {
//     super(props);
//
//     this.state = {
//         options: {
//             chart: {
//                 id: 'apexchart-example'
//             },
//             xaxis: {
//                 categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
//             }
//         },
//         series: [{
//             name: 'series-1',
//             data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
//         }]
//     }
// }
export interface IState {
  options: any;
  // series: Array<string | number>;
  series: any;
}
// interface chartState {
//         options: {
//             chart: {
//                 id: 'apexchart-example'
//             },
//             xaxis: {
//                 categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
//             }
//         },
//         series: [{
//             name: 'series-1',
//             data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
//         }]
//     }state

const PortfolioDonutChart = () =>  {
  //
  // function PortfolioDonutChart({options, series}: IState) {
  //     const [state, setState] = useState<IState>({
  const [state, setState] = useState({
    // options: {
    //     chart: {
    //         id: 'apexchart-example'
    //     },
    //     xaxis: {
    //         categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
    //     }
    // },
    // series: [{
    //     name: 'series-1',
    //     data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
    // }]
    series: [44, 55, 41, 17, 15],
    options: {
      dataLabels: {
        enabled: true,
      },
      plotOptions: {
        pie: {
          size: 200,
          customScale: 0.8,
          donut: {
            size: '40%',
          },
        },
      },
      labels: ['Apple', 'Mango', 'Orange', 'Watermelon'],
    },
  });

  return (
    <div>
       <Chart options={state.options} series={state.series} type="donut"/>
    </div>
  );
}
export default PortfolioDonutChart;
