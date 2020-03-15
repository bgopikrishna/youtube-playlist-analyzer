import { getPlaylistData, getVideosListWithReqDetails } from "./utils";
import Chart from "chart.js";

const form = document.querySelector("#form");
const input = document.querySelector("#playlisturl");

form.addEventListener("submit", handleForm);

async function handleForm(e) {
    e.preventDefault();
    const regex = /list=(.*)/;
    const playlistUrl = input.value;
    const playlistId = regex.exec(playlistUrl)[1];

    const { data, error } = await getPlaylistData(playlistId);
    if (!error) {
        const parsedVideosData = await getVideosListWithReqDetails(data);
        console.log("Videos", parsedVideosData);
        createBarChartFromData(parsedVideosData.videos);
    } else {
        alert(error.message);
    }
}

function createBarChartFromData(videos) {
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
        type: "bar", // bar, horizontalBar, pie, line, doughnut, radar, polarArea
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
