// eslint-disable-next-line no-undef
export const API_KEY = process.env.YOUTUBE_API_KEY;

export const getApiEndpointForPlaylist = id =>
    `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=50&playlistId=${id}&key=${API_KEY}`;

export const getApiEndpointForVideosDetails = ids =>
    `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&id=${ids}&key=${API_KEY}`;
