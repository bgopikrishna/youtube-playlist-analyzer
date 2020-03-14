import axios from "axios";
import {
    getApiEndpointForPlaylist,
    getApiEndpointForVideosDetails
} from "./constants";

export async function getPlaylistData(id) {
    let data = null;
    try {
        if (localStorage.getItem(id) === null) {
            const apiResponse = await axios.get(getApiEndpointForPlaylist(id));
            data = apiResponse.data;
            localStorage.setItem(id, JSON.stringify(data));
            return { data, error: false };
        }

        data = localStorage.getItem(id);
        data = JSON.parse(data);
        return { data, error: false };
    } catch (error) {
        return { data, error };
    }
}

export async function getVideosListWithReqDetails(data) {
    let videos = null;

    const videoIds = data.items.map(item => item.contentDetails.videoId);

    const { data: videosList, error } = await getVideosDetails(videoIds);

    console.log("list", videosList);

    if (!error) {
        videos = parseReqVideoDetails(videosList);
    }

    return { videos, error };
}

async function getVideosDetails(ids) {
    const videoIds = ids.join();

    let data = null;

    try {
        if (localStorage.getItem(videoIds) === null) {
            const apiResponse = await axios.get(
                getApiEndpointForVideosDetails(videoIds)
            );
            data = apiResponse.data;
            localStorage.setItem(videoIds, JSON.stringify(data));
            return { data, error: false };
        }

        data = localStorage.getItem(videoIds);
        data = JSON.parse(data);
        return { data, error: false };
    } catch (error) {
        return { data, error };
    }
}

function parseReqVideoDetails(data) {
    const result = data.items.map(item => ({
        duration: convertYouTubeDuration(item.contentDetails.duration),
        title: item.snippet.title,
        id: item.id
    }));
    return result;
}

function convertYouTubeDuration(duration) {
    const time_extractor = /([0-9]*H)?([0-9]*M)?([0-9]*S)?$/;
    const extracted = time_extractor.exec(duration);
    const hours = parseInt(extracted[1], 10) || 0;
    const minutes = parseInt(extracted[2], 10) || 0;
    const seconds = parseInt(extracted[3], 10) || 0;
    return hours * 3600 * 1000 + minutes * 60 * 1000 + seconds * 1000;
}
