import { useState, ChangeEvent, useEffect } from "react";
import { Data, Group } from "../Dashboard/DashboardInterface";
import { v4 as uuidv4 } from "uuid";
import {
	deleteGroupsWithEmptyId,
    getDataFromLocalStorage,
    saveDataToLocalStorage,
} from "../../utils/common";
import { useNavigate } from "react-router-dom";
import styles from "./CreateGroup.module.css";

const CreateGroup = () => {
    const [data, setData] = useState<Data>({ data: [] });
    const navigate = useNavigate();

    useEffect(() => {
        // Load data from local storage on component mount
        const localData = getDataFromLocalStorage();
        if (localData) {
            setData(localData);
        }
    }, []);

    const [userNames, setUserNames] = useState<string[]>([]);
    const [nameInput, setNameInput] = useState<string>("");
    const [groupName, setGroupName] = useState<string>("");
    const [group, setGroup] = useState<Group>({
        id: "",
        name: "",
        membersCount: 0,
        members: [],
        total: 0,
    });

    const handleGroupNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setGroupName(e.target.value);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNameInput(e.target.value);
    };

    const handleAddUserName = () => {
        const trimmedName = nameInput.trim();
        if (trimmedName) {
            setUserNames((prevUserNames) => [...prevUserNames, trimmedName]);
            setNameInput("");
        }
    };

	const handleRemoveUserName = (indexToRemove: number) => {
        setUserNames((prevUserNames) =>
            prevUserNames.filter((_, index) => index !== indexToRemove)
        );
    };

    const handleSaveMembersToGroup = () => {
        // Create new member objects from the userNames
        const newMembers = userNames.map((name) => ({
            name,
            paid: 0,
            id: uuidv4(),
        }));
        setGroup({
            ...group,
            id: uuidv4(),
            members: newMembers,
            membersCount: newMembers.length,
            name: groupName,
        });
        setUserNames([]);
    };
    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            data: [...prevData.data, group],
        }));
    }, [group]);

    useEffect(() => {
        // Only save to local storage if data is not empty
        if (group.membersCount > 0) {
            saveDataToLocalStorage(data);
            deleteGroupsWithEmptyId(data);
            navigate("/");
        }
        deleteGroupsWithEmptyId(data);
    }, [data]);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <img
                    src="/logo.png?url"
                    alt="Logo"
                    onClick={() => navigate("/")}
                />
                <h1 onClick={() => navigate("/")}>EACHPAYS</h1>
            </div>
            <h2>Create Expense Group</h2>
            <div className={styles.formContainer}>
                <input
                    type="text"
                    placeholder="Expense Group Name"
                    onChange={handleGroupNameChange}
                />
                <div className={styles.list}>
                    {userNames.map((userName, index) => (
                        <span
                            key={index}
                            onClick={() => handleRemoveUserName(index)}
                        >
                            {userName}
                        </span>
                    ))}
                </div>
                <input
                    type="text"
                    placeholder="Enter user name"
                    value={nameInput}
                    onChange={handleInputChange}
                />
                <button onClick={handleAddUserName} className={styles.button}>
                    Add User
                </button>
                <button
                    onClick={() => handleSaveMembersToGroup()}
                    className={styles.button2}
                >
                    Create a new Group Expense
                </button>
            </div>
        </div>
    );
};

export default CreateGroup;
