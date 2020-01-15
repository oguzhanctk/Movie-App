import React, { useEffect } from 'react'
import { View, Text, SafeAreaView, ImageBackground, Dimensions } from 'react-native'
import CustomAnimation from "../../animation_Components/animations/";

const MovieDetail = (props) => {
    const url = `https://api.themoviedb.org/3/movie/${props.movieId}?api_key=e02b145f1588ea6f178b8e24b19a93f8&language=en-US`
    const baseImageUrl = "https://image.tmdb.org/t/p/w500";
    const width = Dimensions.get("window").width;
    const height = Dimensions.get("window").height/2;
    const imagePath = (props.movieDetail.backdrop_path) || (props.movieDetail.poster_path); 

    useEffect(() => {
        const fetchMovie = async () => {
            await props.fetchMovieDetails(url);
        }
        fetchMovie();
    }, [])

    return (
        <SafeAreaView>
            <CustomAnimation>
                <ImageBackground source = {{ uri : `${baseImageUrl}${imagePath}`}}
                    style = {{width : width, height : height}}
                    resizeMode = "cover">
                </ImageBackground>
            </CustomAnimation>    
        </SafeAreaView>
    )
}

export default MovieDetail;
