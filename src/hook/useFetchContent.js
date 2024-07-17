import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useFetchContent = (fetchFunction, getContentStart, getContentSuccess, getContentFailure, name, type, page = 1, query, delay = 300) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchData = async () => {
            dispatch(getContentStart());
            try {
                const response = await fetchFunction(name, type, page, query);
                setTimeout(() => {
                    dispatch(getContentSuccess(response));
                }, delay);
            } catch (error) {
                dispatch(getContentFailure(error.message));
            }
        };

        fetchData();
    }, [dispatch, fetchFunction, getContentStart, getContentSuccess, getContentFailure, name, delay, page, type, query]);
};

export default useFetchContent;
