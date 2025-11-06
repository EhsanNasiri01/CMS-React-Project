import React, { useEffect, useState } from "react";

const Register = () => {
    const [message, setMessage] = useState("");

    useEffect(() => {
        // فراخوانی API بک‌اند
        fetch("http://localhost:8585/register")
            .then((response) => response.json())
            .then((data) => setMessage(data.message))
            .catch((error) => console.error("Error fetching register API:", error));
    }, []);

    return (
        <div>
            <h1>Register Page</h1>
            <p>{message}</p>
            <form>
                <label>Email:</label>
                <input type="email" name="email" required />
                <label>Password:</label>
                <input type="password" name="password" required />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;