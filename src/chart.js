import Chart from "chart.js";

export function createBarChartFromData(videos) {
    let chartEl = document.querySelector("canvas");
    if ("$chartjs" in chartEl) {
        chartEl.remove();
        const canvas = document.createElement("canvas");
        document.querySelector("#app").appendChild(canvas);
        chartEl = document.querySelector("canvas");
    }
    let chartCtx = chartEl.getContext("2d");
    const durationList = videos.map(video => video.duration / 60000);
    const titleList = videos.map(video => video.title);
    const totalMinutes = durationList.reduce((acc, total) => acc + total);
    const totalDurationInHHMM =
        Math.floor(totalMinutes / 60) +
        " Hour(s), " +
        (totalMinutes % 60).toFixed(2) +
        " Minute(s)";
    console.log(`total minutes`, totalMinutes);
    console.log("titles", titleList, durationList);
    const options = {
        type: "bar",
        data: {
            labels: [...titleList],
            datasets: [
                {
                    label: "Minutes",
                    data: [...durationList],
                    backgroundColor: "dodgerblue",
                    borderWidth: 1,
                    borderColor: "#777",
                    hoverBorderWidth: 1,
                    hoverBorderColor: "green"
                }
            ]
        },
        options: {
            title: {
                display: true,
                text: `Total Duration: ${totalDurationInHHMM}`,
                fontSize: 14
            },
            scales: {
                xAxes: [
                    {
                        ticks: {
                            display: false,
                            beginAtZero: true
                        }
                    }
                ]
            }
        }
    };
    // eslint-disable-next-line no-unused-vars
    let chart = new Chart(chartCtx, options);
}
