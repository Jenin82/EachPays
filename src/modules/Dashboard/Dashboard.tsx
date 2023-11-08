import { useEffect, useState } from "react";
import { Data } from "./DashboardInterface";
import {
	deleteGroupsWithEmptyId,
    getDataFromLocalStorage,
} from "../../utils/common";
import { useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";
import { AiOutlinePlusCircle } from "react-icons/ai";

export const Dashboard = () => {
    const navigate = useNavigate();
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
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>EACHPAYS</h1>
            </div>
            <div className={styles.logo}>
                <img src="/logo.png?url" alt="Logo" />
            </div>
            <div className={styles.heading}>
                <h3>Track your group expenses and split the bill</h3>
            </div>
            <div className={styles.button}>
                <button onClick={() => navigate("/create")}>
                    Create
                    <AiOutlinePlusCircle />
                </button>
            </div>
            <div className={styles.groups}>
                {data.data.map((group) => (
                    <div key={group.id} className={styles.group}>
                        <h2 onClick={() => navigate(`/group/${group.id}`)}>
                            {group.name}
                        </h2>
                        <div>
							<span>Total: {group.total}</span>
                            <span>Members: {group.membersCount}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
