import { Dimensions } from "react-native";

const movieCardHeight = Dimensions.get("window").height / 3;
const movieCardWidth = Dimensions.get("window").width / 3;

export const DimensionDeclaration = {
    movieCardHeight,
    movieCardWidth
};