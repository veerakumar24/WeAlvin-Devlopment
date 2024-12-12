import axios from "axios";
import { useSearch } from "../../../context/search";
import { useNavigate } from "react-router-dom";

export default function Search() {
    const [values, setValues] = useSearch(); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get(
                `https://backend-7-o9m5.onrender.com/api/employees/search/${values.keyword}`
            );
            setValues({ ...values, results: data });
            navigate("/search");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <form className="d-flex" onSubmit={handleSubmit}>
            <input
                type="search"
                className="form-control"
                placeholder="Search"
                onChange={(e) => setValues({ ...values, keyword: e.target.value })} 
            />
            <button className="btn btn-outline-success" type="submit">
                Search
            </button>
        </form>
    );
}
