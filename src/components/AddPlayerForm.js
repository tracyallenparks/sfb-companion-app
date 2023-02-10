/*
import { DBplayers,DBships } from "../data/db";
import { useState } from "react";

export function AddPlayerForm() {
    const [name, setName] = useState('');
    const [ships,setShips] = useState([]);
    const [status, setStatus] = useState('');

    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...ships];
        list.splice(index, 1);
        setShips(list);
    };

    // handle click event of the Add button
    const handleAddClick = input => {
        setShips([...ships, input]);
    };

    async function addPlayer() {
        try {
            const id = await DBplayers.add({
                name
            });

            setStatus(`Friend ${name} successfully added. Got id ${id}`);
            setName("");
        } catch (error) {
            setStatus(`Failed to add ${name}: ${error}`);
        }
    }

    return <>
    <p>
        {status}
    </p>
    Name:
    <input
        type="text"
        value={name}
        onChange={ev => setName(ev.target.value)}
    />
    <button onClick={addPlayer}>
        Add
    </button>
    </>
}
*/