import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { registerSW } from "virtual:pwa-register";

interface UpdatePromptProps {
    onUpdate: () => void; // This specifies that onUpdate is a function that returns void
}

// Use the props in the component
const UpdatePrompt: React.FC<UpdatePromptProps> = ({ onUpdate }) => {
    return (
        <div>
            New version available!
            <button onClick={onUpdate}>Update</button>
        </div>
    );
};

const Main = () => {
    const [showUpdate, setShowUpdate] = useState(false);
    const [updateSW, setUpdateSW] = useState<() => Promise<void>>(
        () => Promise.resolve
    );

    useEffect(() => {
        const updateSW = registerSW({
            onNeedRefresh() {
                setShowUpdate(true);
            },
            onOfflineReady() {
                // Handle offline readiness, perhaps with a toast notification
            },
        });

        // Store the update function
        setUpdateSW(() => updateSW);
    }, []);

    const onUpdate = async () => {
        await updateSW(); // Call without arguments
        window.location.reload(); // Reload the page after the update
    };

    return (
        <React.StrictMode>
            {showUpdate && <UpdatePrompt onUpdate={onUpdate} />}
            <App />
        </React.StrictMode>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<Main />);