import { useEffect, useState } from "react";
import { Data } from "./DashboardInterface";
import {
	deleteGroupsWithEmptyId,
    getDataFromLocalStorage,
} from "../../utils/common";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
	const navigate = useNavigate()
    const [data, setData] = useState<Data>({ data: [] });
    useEffect(() => {
        // Load data from local storage on component mount
        const localData = getDataFromLocalStorage();
        if (localData) {
            setData(localData);
        }
		deleteGroupsWithEmptyId(data);
    }, []);

    return (
        <div>
            <div>Test</div>
            <button
                onClick={() =>
                    navigate('/create')
                }
            >
                click
            </button>
            <div>
                {data.data.map((group) => (
                    <div key={group.id}>
                        <h2 onClick={() => navigate(`/group/${group.id}`)}>{group.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
};
