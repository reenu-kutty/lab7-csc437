import React, {useEffect} from "react";
import {groceryFetcher} from "./groceryFetcher.js";

export function useGroceryFetch(source) {
    const [groceryData, setGroceryData] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(null);


    useEffect(() => {
        let isStale = false;

        async function fetchGroceryData(url) {
            setIsLoading(true);
            setGroceryData([])
            setError(null)

            if (!url) {
                setIsLoading(false);
                return;
            }
            try {
                const response = await groceryFetcher.fetch(url);
                if(!isStale) {
                    setGroceryData(response);
                }
            } catch (err) {
                if(!isStale) {
                    setError(err.message);
                }
            } finally {
                if(!isStale) {
                    setIsLoading(false);
                }
            }
        }

        if(!isStale) {
            fetchGroceryData(source);
        }

        return () => {
            isStale = true;
        }
    }, [source]);

    return {groceryData, isLoading, error}
}