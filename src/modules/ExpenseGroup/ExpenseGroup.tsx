import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import {
    getDataFromLocalStorage,
    saveDataToLocalStorage,
} from "../../utils/common";
import { Data, Group, OptionType } from "../Dashboard/DashboardInterface";
import styles from "./ExpenseGroup.module.css";

const ExpenseGroup = () => {
    const { id } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState("");
    const [amount, setAmount] = useState("");

    const data: Data = getDataFromLocalStorage();
    const group = data.data.find((group: Group) => group.id === id);
    const navigate = useNavigate();

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

	const customStyles = {
        control: (provided: any, state: { isFocused: any }) => ({
            ...provided,
            borderColor: state.isFocused
                ? "rgb(2, 179, 138);"
                : "var(--secondary)", 
            "&:hover": {
                borderColor: state.isFocused
                    ? "rgb(2, 179, 138);"
                    : "var(--secondary)", 
            },
            borderRadius: "8px",
        }),
        placeholder: (defaultStyles: any) => {
            return {
                ...defaultStyles,
				fontFamily: 'Plus Jakarta Sans', 
            };
        },
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
        <div className={styles.container}>
            <div className={styles.header}>
                <img
                    src="/logo.png?url"
                    alt="Logo"
                    onClick={() => navigate("/")}
                />
                <h1 onClick={() => navigate("/")}>EACHPAYS</h1>
            </div>
            <div className={styles.heading}>
                <h2>{group?.name}</h2>
                <button onClick={handleOpenModal} className={styles.button}>
                    Add Payment
                </button>
            </div>
            <h3>Total Spend: {group?.total}/-</h3>
            <div className={styles.members}>
                {group?.members.map((member) => (
                    <div key={member.name} className={styles.member}>
                        {member.name} : {member.paid}/-
                        {(group?.total || 0) / (group?.membersCount || 1) -
                            member.paid <=
                        0 ? (
                            <span className={styles.green}>
                                +{" "}
                                {Math.abs(
                                    Math.ceil(
                                        (group?.total || 0) /
                                            (group?.membersCount || 1) -
                                            member.paid
                                    )
                                )}
                            </span>
                        ) : (
                            <span className={styles.red}>
                                -{" "}
                                {Math.ceil(
                                    (group?.total || 0) /
                                        (group?.membersCount || 1) -
                                        member.paid
                                )}
                            </span>
                        )}
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className={styles.modal} onClick={handleCloseModal}>
                    <div
                        className={styles.modalContent}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2>Add Payment</h2>
                        <Select
                            options={options}
                            onChange={(selectedOption) =>
                                handleMemberChange(selectedOption)
                            }
                            value={options.find(
                                (option: { value: string }) =>
                                    option.value === selectedMember
                            )}
                            styles={customStyles}
                        />
                        <input
                            type="number"
                            placeholder="Enter the amount"
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