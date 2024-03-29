export default class Youtube {
    constructor(apiClient) {
        this.apiClient = apiClient;
    }

    //Videos.jsx
    async search(keyword) {
        //# is private
        // if there is a key word, use keyword if not, use mostPopular
        return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular();
    }

    //ChannelInfo.jsx
    async channelImageURL(id) {
        return this.apiClient
            .channels({ params: { part: "snippet", id } })
            .then((res) => res.data.items[0].snippet.thumbnails.default.url);
    }

    //RelatedVideos.jsx
    async relatedVideos(id) {
        return this.apiClient
            .search({
                params: {
                    part: "snippet",
                    maxResults: 25,
                    type: "video",
                    relatedToVideoId: id,
                },
            })
            .then((res) =>
                res.data.items.map((item) => ({ ...item, id: item.id.videoId }))
            );
    }

    async #searchByKeyword(keyword) {
        return this.apiClient
            .search({
                params: {
                    part: "snippet",
                    maxResults: 25,
                    type: "video",
                    q: keyword,
                },
            })
            .then((res) => res.data.items)
            .then(
                (items) =>
                    items.map((item) => ({ ...item, id: item.id.videoId }))
                //this is to make same format with popular.json
            );
    }

    async #mostPopular() {
        return this.apiClient
            .videos({
                params: {
                    part: "snippet",
                    maxResults: 25,
                    chart: "mostPopular",
                },
            })
            .then((res) => res.data.items);
    }
}
