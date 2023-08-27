import axios from "axios";
import IDataList from "../models/IDataList";

const getDataFromServer = () => {
    return axios.get<IDataList[]>(`http://localhost:3001/items`)
    .then(response => response.data) 
}

const pushDataToServer = (data : Omit<IDataList, 'id'>) => {
    return axios.post<IDataList>(
        `http://localhost:3001/items`,
        data,
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    ).then(res => res.data)
}

export {getDataFromServer, pushDataToServer};