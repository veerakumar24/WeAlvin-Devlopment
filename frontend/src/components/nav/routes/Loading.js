import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Loading() {
    // state
    const [count, setCount] = useState(3);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((curr) => --curr);
        }, 1000);

        if (count === 0) {
            navigate('/login');
        }

        return () => clearInterval(interval);
    }, [count, navigate]); 
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            Redirecting You in {count} seconds
        </div>
    );
}
