import React,{useState} from 'react'
import Chart from "react-apexcharts";
import Button from '@mui/material/Button';
import "../App.css"
function ApexChart() {
    
    const [series_data,setSeriesData] = useState([{name:"percentage",data:[10,20,30,10,20,10,10]}])
    const chart_options = {
        chart: {
            id: "basic-bar"
          },
          xaxis: {
            categories: ["Savings", "House Rent", "Grocerys and Food", "Electronics","Entertaiment" ,"EMI'S", "Credit Card Bill's"],
            position:"top",
            labels: {
                style: {
                    fontSize: '15px'
                }
           }
          },
          legend: {
            show: true,
            fontSize:"20px"
          },
          yaxis: {
            min: 0,
            max: 100,
            tickAmount: 4,
          },
          colors: ["#000","#6acc90","#9da7d4","#c27959","#ffa500","#800080","#cc0066"],
        plotOptions: {
          bar: {
            columnWidth: '45%',
            borderRadius: 20,
            distributed: true,
            dataLabels:{
                position:'top'
            }
          }
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
              return val + "%";
            },
            offsetY: -20,
            style: {
              fontSize: '12px',
              colors: ["#304758"]
            }
          },
          tooltip: {
            enabled:false
          },
          hover: {
            filter: {
                type: 'none',
            }
        },
          labels: {
            style: {
              fontSize: '12px'
            }
          },
          exporting:{
            enabled:false
          }
    }

    const addData = (trans_data) => {
        console.log("data of trans",trans_data)
        let porcess_data = trans_data[0]["data"]
        for(let i =0;i<porcess_data.length;i++){
            if(i === 2){
                porcess_data[i] = 20;
            }else if (i === 1){
                porcess_data[i] = 30;
            }
        }
        setSeriesData([{data:porcess_data}])
    }

    return (
    <div>ApexChart
        <div>
        <Chart
              options={chart_options}
              series={series_data}
              type="bar"
              width="950"
            />
            <Button color="success" onClick={() => addData(series_data)}>Add data</Button>
        </div>
    </div>
  )
}

export default ApexChart