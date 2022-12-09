import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Card from "../components/Card";
import { instance } from "../utils/axios";

const Search = () => {
    const [videos, setVideos] = useState([]);
    const query = useLocation().search;

    useEffect(() => {
        const fetchVideos = async () => {
            const res = await instance.get(`/videos/search${query}`);
            setVideos(res.data);
        };
        fetchVideos();
    }, [query]);

    return <Container>
        {videos.map(video => (
            <Card key={video._id} video={video} />
        ))}
    </Container>;
};

const Container = styled.div`
    display:grid ;
    grid-template-columns:repeat(auto-fit,minmax(240px,1fr)) ;
    gap: 1.4rem ;
    justify-items:center ;
    align-items:center ;
`;

export default Search;