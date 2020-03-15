import { getPlaylistData, getVideosListWithReqDetails } from "./utils";
import { createBarChartFromData } from "./chart";

const form = document.querySelector("#form");
const input = document.querySelector("#playlisturl");

form.addEventListener("submit", handleForm);

async function handleForm(e) {
    e.preventDefault();
    const regex = /list=(.*)/;
    const playlistUrl = input.value;
    const playlistId = regex.exec(playlistUrl)
        ? regex.exec(playlistUrl)[1]
        : null;

    console.log(playlistId);
    if (!playlistId) {
        alert("Please Enter Correct URL");
        e.target.reset();
        return;
    }

    const { data, error } = await getPlaylistData(playlistId);
    if (!error) {
        const parsedVideosData = await getVideosListWithReqDetails(data);
        console.log("Videos", parsedVideosData);
        createBarChartFromData(parsedVideosData.videos);
    } else {
        alert(error.message);
    }
}
