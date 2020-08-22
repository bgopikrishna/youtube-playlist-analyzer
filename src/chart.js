import Chart from 'chart.js'

export function createBarChartFromData(videos) {
    let chartEl = document.querySelector('canvas')
    if ('$chartjs' in chartEl) {
        chartEl.remove()
        const canvas = document.createElement('canvas')
        document.querySelector('#app').appendChild(canvas)
        chartEl = document.querySelector('canvas')
    }

    const chartCtx = chartEl.getContext('2d')

    const videosDurationList = videos.map((video) =>
        Math.round(video.duration / 60000)
    )
    const titleList = videos.map((video) => video.title)
    const totalMinutes = videosDurationList.reduce((acc, total) => acc + total)
    const totalDurationInHHMM = calucateDurationAtRates(totalMinutes)

    const options = {
        type: 'bar',
        data: {
            labels: [...titleList],
            datasets: [
                {
                    label: 'Minutes',
                    data: [...videosDurationList],
                    backgroundColor: 'dodgerblue',
                    borderWidth: 1,
                    borderColor: '#777',
                    hoverBorderWidth: 1,
                    hoverBorderColor: 'green',
                },
            ],
        },
        options: {
            title: {
                display: true,
                text: `Total Duration: ${totalDurationInHHMM}`,
                fontSize: 14,
            },
            scales: {
                xAxes: [
                    {
                        ticks: {
                            display: false,
                            beginAtZero: true,
                        },
                    },
                ],
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                        },
                    },
                ],
            },
        },
    }
    // eslint-disable-next-line no-unused-vars
    let chart = new Chart(chartCtx, options)

    updateAtSpeedUI(totalMinutes)
}

function updateAtSpeedUI(totalMinutes) {
    const totatDurationAt125x = calucateDurationAtRates(totalMinutes, 1.25)
    const totatDurationAt150x = calucateDurationAtRates(totalMinutes, 1.5)
    const totatDurationAt175x = calucateDurationAtRates(totalMinutes, 1.75)
    const totatDurationAt200x = calucateDurationAtRates(totalMinutes, 2.0)

    document.querySelector('#rate').innerHTML = `<ul>
    <li>Total duration at 1.25x speed : ${totatDurationAt125x}</li>
    <li>Total duration at 1.50x speed : ${totatDurationAt150x}</li>
    <li>Total duration at 1.75x speed : ${totatDurationAt175x}</li>
    <li>Total duration at 2.00x speed : ${totatDurationAt200x}</li>
    </ul>`
}

function calucateDurationAtRates(minutes, rate = 1) {
    return (
        Math.floor(minutes / 60 / rate) +
        ' Hour(s), ' +
        Math.round((minutes % 60) / rate) +
        ' Minute(s)'
    )
}
