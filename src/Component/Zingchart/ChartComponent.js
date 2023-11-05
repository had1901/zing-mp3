import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

function ChartComponent() {
  const dataTime = ['13:00', ' ', '14:00', ' ', '15:00', '', '16:00', '', '17:00', '', '18:00', '', '19:00', ' ', '20:00', '', '21:00', '', '22:00', '', '23:00', '', '00:00', '', '01:00', '', '02:00',];
  const dataNumber = ['4', '2', '6', '1', '8', '2', '1', '4', '6', '5', '3', '2', '4', '5', '2', '6', '8', '2', '1', '2'];

  const chartRef = useRef(null);

  useEffect(() => {
    let chartInstance = null;
    if (chartRef.current) {
      // Kiểm tra xem biểu đồ đã tồn tại chưa, nếu tồn tại thì xóa nó.
      if (chartInstance) {
        chartInstance.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: dataTime.map(time => time),
          datasets: [
            {
              label: 'Blue',
              data: dataNumber.map(number => number),
              pointBorderWidth: 3,
              borderWidth: 3,
              backgroundColor: 'white',
              pointBorderColor: '#4a90e2',
              borderColor: '#4a90e2',
              tension: 0.4
            },
            {
              label: 'Red',
              data: [2,4,1,6,2, 8,3,5,7,2, 2,4,1,6,2],
              pointBorderWidth: 3,
              pointBorderColor: '#e35050',
              borderWidth: 3,
              backgroundColor: 'white',
              borderColor: '#e35050',
              tension: 0.4

            },
            {
              label: 'Green',
              data: [8,3,5,7,2, 4,1,2,3,6, 2,4,1,6,2],
              pointBorderWidth: 3,
              borderWidth: 3,
              pointBackgroundColor: '#27937b', 
              backgroundColor: 'white',
              borderColor: '#27937b',
              tension: 0.4,
              barPercentage: 0.4,

            },
          ]
        },
        options: {
          plugins: {
            legend: {
              display: true,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            }
          },
          layout: {
            padding: '10px',
          }
        }
      });
    }

    // Xóa biểu đồ khi component bị unmount (thoát khỏi trang)
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, []);

  return (
    <div className=' mt-28'>
      <div className='ml-240' style={{width: '1560px', height: '300px'}}>
        <canvas id='chart' ref={chartRef} className='w-full' ></canvas>
      </div>
    </div>
  );
}

export default ChartComponent;
