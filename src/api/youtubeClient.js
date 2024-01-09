import axios from "axios";

export default class YoutubeClient {
    constructor() {
        this.httpClient = axios.create({
            baseURL: "https://www.googleapis.com/youtube/v3",
            params: { key: process.env.REACT_APP_YOUTUBE_API_KEY },
        });
    }

    //refer youtube.js
    async search(params) {
        return this.httpClient.get("search", params);
    }

    //refer Videos.jsx
    async videos(params) {
        return this.httpClient.get("videos", params);
    }

    // refer ChannelInfo.jsx
    async channels(params) {
        return this.httpClient.get("channels", params);
    }
}
