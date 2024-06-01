import { useContext } from "react";
import { MyContext } from "./MyContext";

const Chart = () => {
    const { state, setState } = useContext(MyContext);
    
    const chartOptions = {
        series: [{
            name: 'Yesterday',
            data: [31, 40, 28, 51, 42, 109, 100]
        }, {
            name: 'Today',
            data: [11, 32, 45, 32, 34, 52, 41]
        }],
        options: {
            chart: {
                height: 350,
                type: 'area',
                toolbar: {
                    show: false
                },
            },
            stroke: {
                curve: 'smooth'
            },
            yaxis: {
                labels: {
                    style: {
                        colors: state ? 'white' : "" // This sets the color of the y-axis labels to white
                    }
                }
            },
            xaxis: {
                labels: {
                    style: {
                        colors: state ? 'white' : "" // This sets the color of the x-axis labels to white
                    }
                }
            },
            legend: {
                labels: {
                    colors: state ? 'white' : "" // This sets the color of the legend text to white
                }
            },
            tooltip: {
                theme: state?"dark":"light", 
            }
        },
    };

    return { chartOptions };
}

export default Chart;
