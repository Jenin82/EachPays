import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Select from "react-select";
import {
    getDataFromLocalStorage,
    saveDataToLocalStorage,
} from "../../utils/common";
import { Data, Group, OptionType } from "../Dashboard/DashboardInterface";

const ExpenseGroup = () => {
    const { id } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState("");
    const [amount, setAmount] = useState("");

    const data: Data = getDataFromLocalStorage();
    const group = data.data.find((group: Group) => group.id === id);

    const options: any = group?.members.map((member) => ({
        value: member.id,
        label: member.name,
    }));



    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleMemberChange = (selectedOption: OptionType | null) => {
        setSelectedMember(selectedOption ? selectedOption.value : "");
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(e.target.value);
    };

    const handleContribute = () => {
        const groupToUpdate = data.data.find((g: Group) => g.id === id);
        if (groupToUpdate && selectedMember) {
            const memberToUpdate = groupToUpdate.members.find(
                (member) => member.id === selectedMember
            );
            if (memberToUpdate) {
                // Update the paid amount and total
                memberToUpdate.paid += parseFloat(amount);
                groupToUpdate.total += parseFloat(amount);

                // Save the updated data back to local storage
                saveDataToLocalStorage(data);

                // Close the modal
                handleCloseModal();
            }
        }
    };

    return (
        <div>
            <div>{id}</div>
            {group?.members.map((member) => (
                <div key={member.name}>
                    {member.name} : balance ={" "}
                    {(group?.total || 0) / (group?.membersCount || 1) -
                        member.paid}
                </div>
            ))}
            <div>{group?.name}</div>
            <div>Total: {group?.total}</div>
            <button onClick={handleOpenModal}>Add Payment</button>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseModal}>
                            &times;
                        </span>
                        <h2>Add Payment</h2>
                        <Select
                            options={options}
                            onChange={(selectedOption) =>
                                handleMemberChange(selectedOption)
                            }
                            value={options.find(
                                (option: { value: string; }) => option.value === selectedMember
                            )}
                        />
                        <input
                            type="number"
                            value={amount}
                            onChange={handleAmountChange}
                        />
                        <button onClick={handleContribute}>Contribute</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExpenseGroup;