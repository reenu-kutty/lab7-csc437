import { MainLayout } from "../MainLayout.jsx";
import { useImageFetching } from "./useImageFetching.js";
import {useParams} from "react-router";

export function ImageDetails({authToken}) {
    const { imageId } = useParams()
    const { isLoading, fetchedImages } = useImageFetching(authToken);
    if (isLoading) {
        return <>Loading...</>;
    }
    const imageData = fetchedImages.find(image => image._id === imageId);
    if (!imageData) {
        return <><h2>Image not found</h2></>;
    }

    return (
        <>
            <h2>{imageData.name}</h2>
            <img className="ImageDetails-img" src={imageData.src} alt={imageData.name} />
        </>
    )
}
