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
    //첫번째 파라미터로 설정한 unique Key는 다른 컴포넌트에서도 해당 키를 사용하면 호출 가능.
    //배열로 넘기면 0번 값은 string값으로 다른 컴포넌트에서 부를 값이 들어가고,
    //두번째 값을 넣으면 query 함수 내부에 파라미터로 해당 값이 전달됩니다.
    //데이터를 get 하기 위한 api.
    //post, update는 useMutation을 사용.

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
