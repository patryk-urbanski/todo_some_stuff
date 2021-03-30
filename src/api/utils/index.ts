import { ITask } from "../../types";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface Props {
    path: string,
    httpMethod?: HttpMethod,
    body?: ITask,
    formDataRequest?: {
        method: HttpMethod,
        body: FormData,
        mode: RequestMode,
        credentials: RequestCredentials,
    }
}

export const generateFormDataRequest = (formData: FormData, method: HttpMethod) => {
    return {
        method: method,
        body: formData,
        mode: 'cors' as RequestMode,
        credentials: 'include' as RequestCredentials,
    };
};

export const fetchFromApi = async ({
    path,
    httpMethod,
    body,
    formDataRequest,
}: Props):Promise<any> => {
    const requestObject: RequestInit = formDataRequest ? formDataRequest : { method: httpMethod, body: body && JSON.stringify(body) }
    
    try {
        const response = await fetch(path, requestObject);

        if (response.ok) {
            const result = await response.json();

            if(result) {
                if (result.error) {
                    throw Error(JSON.stringify(result));
                }
                return result 
            } else {
                return {
                    error: `Unexpected result shape: ${JSON.stringify(result)}`,
                };
            }
        } else if (response.status !== 200) {
            return {
                httpError: response.statusText || `It's ${response.status} status - thats all we know.`,
            };
        }
    } catch(error) {
        return {
            unhandledError: error
        };
    }
};