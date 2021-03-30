import { fetchFromApi, generateFormDataRequest } from './utils';

const apiUser = process.env.REACT_APP_API_USER;

const apiCalls = () => {
    const getTasks = () => {
        return fetchFromApi({
            path: `https://react.massivepixel.io/api/${apiUser}`,
            httpMethod: 'GET',
        })
    };

    const addEditTask = (id: string | number | null, formData: FormData) => {
        return fetchFromApi({
            path: `https://react.massivepixel.io/api/${apiUser}/${id}`,
            formDataRequest: generateFormDataRequest(formData, 'POST'),
        })
    };

    const deleteTask = (id: string | number) => {
        return fetchFromApi({
            path: `https://react.massivepixel.io/api/${apiUser}/${id}`,
            httpMethod: 'DELETE',
        })
    };

    return {
        getTasks,
        addEditTask,
        deleteTask,
    }
};

export const api = apiCalls();