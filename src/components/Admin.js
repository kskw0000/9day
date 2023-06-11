import React, { useState } from 'react';
import axios from 'axios';

function Admin() {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [type, setType] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const nursery = {
            name: name,
            location: location,
            type: type
        };

        axios.post('http://localhost:3001/nurseries', nursery)
            .then(res => {
                console.log(res);

                setName('');
                setLocation('');
                setType('');
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div>
            <h2>保育園情報の管理</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    保育園の名前:
                    <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} />
                </label>
                <label>
                    保育園の場所:
                    <input type="text" name="location" value={location} onChange={e => setLocation(e.target.value)} />
                </label>
                <label>
                    保育園の種類:
                    <input type="text" name="type" value={type} onChange={e => setType(e.target.value)} />
                </label>
                <button type="submit">保育園を追加</button>
            </form>
        </div>
    );
}

export default Admin;
