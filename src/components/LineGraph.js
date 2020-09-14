import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import numeral from 'numeral';

const options = {
    legend: {
        display: false
    },
    elements: {
        point: {
            radius: 0
        }        
    },
    maintainAspectRatio: false,
    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: (tooltipItem, data) => {
                return numeral(tooltipItem.value).format("+0,0");
            }
        }
    },
    scales: {
        xAxes: [
            {
                type: 'time',
                time: {
                    format: "MM/DD/YY",
                    tooltipFormat: "ll"
                }
            }
        ],
        yAxes: [
            {
                gridLines: {
                    display: false
                },
                ticks: {
                    callback: (value, index, values) => {
                        return numeral(value).format("0a");
                    }
                }
            }
        ]
    }
}

const buildChartData = (data, dataType = 'cases') => {
    const chartData = [];
    let lastDataPoint;

    for (let date in data.cases) {
        if (lastDataPoint) {
            const newDataPoint = {
                x: date,
                y: data[dataType][date] - lastDataPoint
            }
            chartData.push(newDataPoint);
        }
        lastDataPoint = data[dataType][date];
    };
    return chartData;
}


function LineGraph({ caseType = 'cases', graphBGColor, className, country }) {
    const [data, setData] = useState({});
    //"https://disease.sh/v3/covid-19/historical/all?lastdays=120"

   useEffect(() => {
        //effect
        (async () => {
            await fetch(`https://disease.sh/v3/covid-19/historical/${country==='worldwide'?'all':country}?lastdays=120`)
                .then(response => response.json())
                .then(data => {
                    let chartData;
                    if(country==='worldwide'){
                    chartData = buildChartData((data), caseType);
                    }else{
                        chartData = buildChartData((data.timeline), caseType);
                    }

                    setData(chartData);
                });
        })();


        return () => {
            //cleanup
        }
    }, [caseType, country])

    return (
        <div className={className}>
            {data?.length>0&&(
                <Line
                options = {options}
                data={{
                    datasets: [{
                        backgroundColor: graphBGColor,
                        color: '#cc1034',
                        data: data
                    }]
                }}
            />
            )}
            
        </div>
    )
}

export default LineGraph
