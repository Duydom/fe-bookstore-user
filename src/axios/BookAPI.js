import axiosHandle from "./AxiosHandle";

export const GetBooks = (page, pageSize, key, sortBy) => {
    return axiosHandle.get(process.env.REACT_APP_URL_API + `Book?page=${page}&pageSize=${pageSize}&key=${key}&sortBy=${sortBy}`);
}

export const GetBookById = (id) => {
    return axiosHandle.get(process.env.REACT_APP_URL_API + `Book/${id}`);
}