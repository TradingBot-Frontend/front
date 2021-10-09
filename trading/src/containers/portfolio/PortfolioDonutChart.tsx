import React, {useEffect, useState} from 'react';
import Chart from 'react-apexcharts'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@redux/reducers";
import {getPortfolioActions} from "@redux/reducers/portfolioReducer";

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
  series: any;
}

const PortfolioDonutChart = () =>  {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPortfolioActions.request());
  }, []);

  const portfolioItems= useSelector((state: RootState) => state.portfolio.portfolio);

  const labelsD: any = [];
  const seriesD: any = [];

  useEffect(() => {
    if (portfolioItems.tokenAsset) {
      portfolioItems.tokenAsset.forEach((e: any) => {
        const value: any = Object.values(e)[0]
        labelsD.push(Object.keys(e))
        seriesD.push(value.estimate)
      })
    }
  }, [portfolioItems.tokenAsset]);

  const [state, setState] = useState({
    series: seriesD,
    options: {
      dataLabels: {
        enabled: true,
      },
      plotOptions: {
        chart: {
          toolbar: {
            show: false
          },
          width: '100%'
        },
        pie: {
          size: 200,
          customScale: 0.8,
          donut: {
            size: '40%',
          },
        },
      },
      labels: labelsD,
    },
  });

  return (
    <div>
       <Chart options={state.options} series={state.series} type="donut"/>
    </div>
  );
}
export default PortfolioDonutChart;
