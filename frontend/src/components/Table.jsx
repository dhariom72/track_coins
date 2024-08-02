import { useColumn } from "../hooks/useColumn";
import { convertToDateString } from "../utils/date.utils";

export const Table = (props) => {
    const { data } = props;
    const columns = useColumn(data);

    return <table className="table">
        <thead>
            <tr>
                {
                    columns.map(col => {
                        return <th>{col}</th>
                    })
                }
            </tr>
        </thead>
        <tbody>
            {
                data.map((row) => {
                    return (
                        <tr>
                            {
                                columns.map((header) => (
                                    <td key={header}>{header == 'createdAt' || header == 'updatedAt' || header == 'date'? convertToDateString(row[header]) : row[header]}</td>
                                ))
                            }
                        </tr>
                    )
                })
            }
        </tbody>
    </table>
}