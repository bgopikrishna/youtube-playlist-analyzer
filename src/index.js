import { getPlaylistData, getVideosListWithReqDetails } from "./utils";
import "./styles.css";

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
    } else {
        alert(error.message);
    }
}
