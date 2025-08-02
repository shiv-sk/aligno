"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

const data = {
    labels: ['Open', 'Assigned', 'Review' , 'Reopen' , 'Closed'],
    datasets:[
        {
            label: 'Task status wise',
            data:[12, 19, 3 , 0 , 2],
            backgroundColor:[
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(153, 102, 255, 0.2)',
            ],
            borderColor:[
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 0.5,
        }
    ]
};
const options = {
    cutout: '40%',
}
ChartJS.register(ArcElement, Tooltip, Legend);
export default function StatusBasedIssue(){
    return(
        <div className="bg-base-300 py-6 px-3 shadow-lg rounded-lg mb-6 w-full">
            <h1 className="text-center font-semibold text-xl">StatusBased Tasks </h1>
            <div className="md:w-[550px] md:h-[500px] flex justify-center items-center mx-auto">
                <Doughnut options={options} data={data} />
            </div>
        </div>
    )
}