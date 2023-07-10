import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (endpoint, query) => {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // const axios = require('axios');

    const options = {
        method: 'GET',
        url: 'https://jsearch.p.rapidapi.com/${endpoint}',
        headers: {
            'X-RapidAPI-Key': 'fee229f605mshb7c079ebd0318b0p17d1bcjsn7cd095307b77',
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        },
        params: { ...query },

    };

    const fetchData = async () => {
        setIsLoading(true);

        try {
            const response = await axios.request(options);
            setData(response.data.data);
            setIsLoading(false);
        } catch (error) {
            setError(error);
            alert('There is an error');
        } finally {
            setLoading(false);
        }
    }
    useEffect(()=>{
        fetchData();
    },[]); 

    const refetch =()=>{
        setIsLoading(true);
        fetchData();
    }

    return {data,isLoading,error,refetch};
}

export default useFetch;
