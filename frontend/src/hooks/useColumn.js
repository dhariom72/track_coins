import { useEffect, useState } from "react"

export const useColumn = (data) => {
    const [column, setColumn] = useState([])
    useEffect(() => {
        if(data && data.length){
        const cols = Object.keys(data[0]).filter(k => !['_id', '__v'].includes(k));
            setColumn(cols);
        }
    }, [data])

    return column;
}