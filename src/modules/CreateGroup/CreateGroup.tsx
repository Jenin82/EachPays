import { useState, ChangeEvent, useEffect } from "react";
import { Data, Group } from "../Dashboard/DashboardInterface";
import { v4 as uuidv4 } from "uuid";
import {
	deleteGroupsWithEmptyId,
    getDataFromLocalStorage,
    saveDataToLocalStorage,
} from "../../utils/common";
import { useNavigate } from "react-router-dom";

const CreateGroup = () => {
    const [data, setData] = useState<Data>({ data: [] });
	const navigate = useNavigate()

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

    const handleSaveMembersToGroup = () => {
        // Create new member objects from the userNames
        const newMembers = userNames.map((name) => ({ name, paid: 0, id: uuidv4() }));
		setGroup({
			...group,
			id: uuidv4(),
			members: newMembers,
			membersCount: newMembers.length,
			name: groupName,
		})
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
			navigate("/")
        }
    }, [data]);

    return (
        <div>
            <h1>CreateGroup</h1>
            <div>
                <input
                    type="text"
                    placeholder="Expense Group Name"
                    onChange={handleGroupNameChange}
                />
                <input
                    type="text"
                    placeholder="Enter user name"
                    value={nameInput}
                    onChange={handleInputChange}
                />
                <button onClick={handleAddUserName}>Add User</button>
            </div>
            <div>
                <h2>User Names List:</h2>
                <ul>
                    {userNames.map((userName, index) => (
                        <li key={index}>{userName}</li>
                    ))}
                </ul>
            </div>
            <button onClick={() => handleSaveMembersToGroup()}>
                Create a new Group Expense
            </button>
        </div>
    );
};

export default CreateGroup;
