import { useCallback, useState } from "react";

const useHttpRequest = () =>  {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = useCallback( async (apiCall, apiCallArgs, responseCallback) => {
        setIsLoading(true);
        setError(null);

        try {
            // make API request with given arguments
            const response = await apiCall.apply(null, apiCallArgs);
            console.log(response)
            if (response.status !== 200) {
                throw new Error('Request failed!');
            }
        
            // call the function that handles the response with arguments: response body
            responseCallback(response.data);

        } catch (error) {
            console.log('error useHttpo', error);
            // prioritize backend error
            setError(error?.response?.data?.message || error.message || 'Something went wrong!');
        } finally {
            setIsLoading(false);
        }
    }, []);

    return [isLoading, error, sendRequest];
}

export default useHttpRequest;