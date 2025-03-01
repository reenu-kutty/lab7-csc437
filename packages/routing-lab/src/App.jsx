import { Homepage } from "./Homepage";
import { AccountSettings } from "./AccountSettings";
import { ImageGallery } from "./images/ImageGallery.jsx";
import { ImageDetails } from "./images/ImageDetails.jsx";
import { Route, Routes } from "react-router";
import {useState} from "react";
import {MainLayout} from "./MainLayout.jsx";
import {useImageFetching} from "./images/useImageFetching.js";

function App() {
    const [userName, setUserName] = useState("Jane Doe");
    const { isLoading, fetchedImages } = useImageFetching("");

    const POSSIBLE_PAGES = [
        <Homepage userName={userName} />,
        <AccountSettings userName = {userName} setUserName={setUserName} />,
        <ImageGallery />,
        <ImageDetails/>
    ]

    return (
        <Routes>
            <Route path="/" element={<MainLayout/>}>
                <Route index element={<Homepage userName={userName} />}/>
                <Route path="account" element={<AccountSettings userName = {userName} setUserName={setUserName}/>}/>
                <Route path="images" element={<ImageGallery isLoading={isLoading} fetchedImages={fetchedImages} />}/>
                <Route path="images/:imageId" element={<ImageDetails/>}/>
            </Route>
        </Routes>
    )
}

export default App
