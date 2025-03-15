import { useState } from "react";

export function ImageEditForm() {
    const [imageId, setImageId] = useState("");
    const [imageName, setImageName] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit() {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/images/${imageId}`, {
                method: "PATCH",
                    headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: imageName }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        } catch (error) {
            console.error("Failed to fetch images:", error);
        }

        setImageId("");
        setImageName("");
        setIsLoading(false);
    }

    return (
        <div>
            <label style={{ display: "block" }}>
                Image ID
                <input
                    value={imageId}
                    disabled={isLoading}
                    onChange={(e) => setImageId(e.target.value)}
                />
            </label>
            <label style={{ display: "block" }}>
                New image name
                <input
                    value={imageName}
                    disabled={isLoading}
                    onChange={(e) => setImageName(e.target.value)}
                />
            </label>
            <button disabled={isLoading} onClick={handleSubmit}>Send request</button>
        </div>
    );
}