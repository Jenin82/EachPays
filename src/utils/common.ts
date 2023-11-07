import { Data, Group } from "../modules/Dashboard/DashboardInterface";

const EXPENSE_STORAGE_KEY = "groupExpenses";

export const saveDataToLocalStorage = (data: Data): void => {
    const dataString = JSON.stringify(data);
    localStorage.setItem(EXPENSE_STORAGE_KEY, dataString);
};

export const getDataFromLocalStorage = () => {
    const dataString = localStorage.getItem(EXPENSE_STORAGE_KEY);
    if (dataString) {
        return JSON.parse(dataString);
    }
};

export function deleteGroupsWithEmptyId(data: Data): Data {
    // Filter out groups with an empty 'id'
    const filteredData: Group[] = data.data.filter((group) => group.id !== "");

    // Return the filtered data
    return { data: filteredData };
}

// Usage
// Assuming you have a 'data' object that conforms to the Data interface
const dataFromLocalStorage: Data = JSON.parse(
    localStorage.getItem(EXPENSE_STORAGE_KEY) || "null"
);

if (dataFromLocalStorage) {
    const updatedData: Data = deleteGroupsWithEmptyId(dataFromLocalStorage);
    localStorage.setItem(EXPENSE_STORAGE_KEY, JSON.stringify(updatedData));
} else {
    console.error('No data found in local storage for key "groupsData"');
}