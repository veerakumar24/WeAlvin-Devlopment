import { useSearch } from "../context/search";

export default function SearchPage() {
    const [values] = useSearch(); // Use the context

    return (
        <div className="container mt-3">
            <div className="row">
                {values?.results?.map((employee) => (
                    <div className="col-md-4" key={employee._id}>
                        <div className="card mb-3">
                            <img 
                                src={`https://backend-7-o9m5.onrender.com/api/employee/photo/${employee._id}`} 
                                alt={employee.f_Name} 
                                className="card-img-top" 
                                style={{ height: '200px', objectFit: 'cover' }} 
                            />
                            <div className="card-body">
                                <h5 className="card-title">{employee.f_Name}</h5>
                                <p className="card-text"><strong>ID:</strong> {employee.f_Id}</p>
                                <p className="card-text"><strong>Email:</strong> {employee.f_Email}</p>
                                <p className="card-text"><strong>Gender:</strong> <small className="text-muted">{employee.f_gender}</small></p>
                                <p className="card-text"><strong>Designation:</strong> {employee.f_Designation}</p> 

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
