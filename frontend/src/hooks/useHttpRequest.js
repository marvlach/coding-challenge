import { useCallback, useState } from "react";

const useHttpRequest = () =>  {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = useCallback( async (apiCall, apiCallArgs, responseCallback) => {
        setIsLoading(true);
        setError(null);

        try {
            console.log('hook', apiCallArgs)
            const response = await apiCall.apply(null, apiCallArgs);

            if (!response.ok) {
                throw new Error('Request failed!');
            }
        
            const data = await response.json();
            responseCallback(data);

        } catch (err) {
            setError(err.message || 'Something went wrong!');
        } finally {
            setIsLoading(false);
        }
    }, []);

    return [isLoading, error, sendRequest];
}

export default useHttpRequest;