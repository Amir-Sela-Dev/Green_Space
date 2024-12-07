import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, RadialLinearScale } from 'chart.js';
import { Doughnut, PolarArea, Pie } from 'react-chartjs-2';
import { plantService } from '../services/plant.service.local.js'
import { useSelector } from 'react-redux';
import { loadPlants } from '../store/plant.action.js';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);


export function Dashboard() {
    const [plantsTypeNum, setPlantsTypeNum] = useState({})
    const [plantsAvgPrice, setPlantsAvgPrice] = useState({})
    // let { plants } = useSelector((storeState) => storeState.plantModule)
    const { plants } = useSelector((storeState) => storeState.plantModule)

    useEffect(() => {
        loadPlants()
    }, [])

    useEffect(() => {
        if (plants.length) {
            getPlantsTypeNum()
        }
    }, [plants])



    function getPlantsTypeNum() {
        let plantsTypeNum = {}
        if (!plants) return

        plants.forEach(plant => {
            plant.lables.forEach(lable => {
                if (!plantsTypeNum[lable]) {
                    plantsTypeNum[lable] = 1
                } else {
                    plantsTypeNum[lable] += 1
                }
                return plantsTypeNum
            })
        })
        setPlantsTypeNum(plantsTypeNum)
        let plantsAvgPrice = {}

        let plantsLables = Object.keys(plantsTypeNum)
        plantsLables.forEach(type => {
            let filteredPlants = plants.filter(plant => plant.lables.includes(type))
            let count = 0
            let avg = 0
            filteredPlants.forEach(plant => {
                count += plant.price
            })
            avg = count / filteredPlants.length
            plantsAvgPrice[type] = avg

        })
        setPlantsAvgPrice(plantsAvgPrice)
    }



    const data = {
        labels: Object.keys(plantsTypeNum),
        datasets: [
            {
                label: 'Inventory by type',
                data: Object.values(plantsTypeNum),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(153, 102, 255, 0.7)',
                    'rgba(255, 159, 64, 0.7)',
                    'rgba(155, 159, 34, 0.7)',
                    'rgba(55, 209, 4, 0.7)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(155, 159, 34, 0.7)',
                    'rgba(55, 209, 4, 0.7)',

                ],
                borderWidth: 2,
            },
        ],
    };
    const priceData = {
        labels: Object.keys(plantsAvgPrice),
        datasets: [
            {
                label: 'Avg price of type in $',
                data: Object.values(plantsAvgPrice),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(153, 102, 255, 0.7)',
                    'rgba(255, 159, 64, 0.7)',
                    'rgba(155, 159, 34, 0.7)',
                    'rgba(55, 209, 4, 0.7)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(155, 159, 34, 0.7)',
                    'rgba(55, 209, 4, 0.7)',

                ],
                borderWidth: 2,
            },
        ],
    };
    return (
        <div style={{ width: '40%', margin: 'auto', display: 'flex', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>Inventory by type</h2>
                <Pie data={data} />
            </div>
            <div style={{ textAlign: 'center' }}>
                <h2>Avg prices by type </h2>
                <Doughnut data={priceData} />
            </div>
        </div>



    )
}
