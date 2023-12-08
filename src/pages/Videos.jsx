import React from "react";
import { useParams } from "react-router-dom";
import { useYoutubeApi } from "../context/YoutubeApiContext";
import { useQuery } from "@tanstack/react-query";
import VideoCard from "../components/VideoCard";

export default function Videos() {
    const { keyword } = useParams();
    const { youtube } = useYoutubeApi();
    const {
        isLoading,
        error,
        data: videos,
    } = useQuery(["videos", keyword], () => youtube.search(keyword), {
        staleTime: 1000 * 60 * 1,
    });
    //frist parameter = cache key(s), second parameter = (call back)function

    return (
        <>
            {/* <div>Videos {keyword ? `🔍${keyword}` : '🔥'}</div>; */}

            {isLoading && <p>Loading...</p>}
            {error && <p>Something is wrong</p>}
            {videos && (
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 gap-y-4">
                    {videos.map((video) => (
                        <VideoCard key={video.id} video={video} />
                    ))}
                </ul>
            )}
        </>
    );
}
