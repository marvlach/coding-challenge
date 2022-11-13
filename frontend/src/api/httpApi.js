import axios from 'axios';
import { getTokenFromLocalStorage } from '../utils/manageLocalStorage';

const API_URL = process.env.REACT_APP_API;

export default class httpApi {

    static instance = axios.create({
        baseURL: API_URL
    });
    
    
    static checkAuthentication(response) {
        if (response.status === 401) {
            /* AppStore.store.dispatch(logout());
            AppStore.store.dispatch(errorToken(response.data)); */
            console.log("not authenticated, should logout");
        }
    }
    
    
    static checkAuthorization(response) {
        if (response.status === 403) {
            /* AppStore.store.dispatch(errorToken({ message: response.data.msg })); */
            console.log("not authorized, stay in");
        }
    }
    
   
    static async makeRequest(config) {
        // if there is token in local storage include authorization header + token
        // we need to revisit this if/when we want authenticated customer users to view 
        // restaurants' public info
        const requestConfig = {
            ...config,
            ...(!!getTokenFromLocalStorage() && 
            {
                headers: {
                    Authorization: `Bearer ${getTokenFromLocalStorage()}`,
                }
            })
        };

        try {
            const response = await this.instance(requestConfig);
            console.log('superclass', response);
            return response;
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                httpApi.checkAuthentication(error.response);
                httpApi.checkAuthorization(error.response);
            }
            return Promise.reject(error);
        }
    }

    
    static get(url, queryParams, options) {
        let config = {
            ...options,
            url,
            params: queryParams,
            method: 'GET'
        };
        return httpApi.makeRequest(config);
    }
    
    
    static post(url, body, queryParams, options) {
        let config = {
            ...options,
            url,
            params: queryParams,
            method: 'POST',
            data: body
        };
        return httpApi.makeRequest(config);
    }
    
    
    
    static put(url, body, queryParams, options) {
        let config = {
            ...options,
            url,
            params: queryParams,
            method: 'PUT',
            data: body
        };
        return httpApi.makeRequest(config);
    }
    

    static patch(url, body, queryParams, options) {
        let config = {
            ...options,
            url,
            params: queryParams,
            method: 'PATCH',
            data: body
        };
        return httpApi.makeRequest(config);
    }


    static options(url, body, queryParams, options) {
        let config = {
            ...options,
            url,
            params: queryParams,
            method: 'OPTIONS'
        };
        return httpApi.makeRequest(config);
    }

    
    static delete(url, queryParams, options) {
        let config = {
            ...options,
            url,
            params: queryParams,
            method: 'DELETE'
        };
        return httpApi.makeRequest(config);
    }
}