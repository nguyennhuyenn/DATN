import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import requestApi from "../../../helper/api";
import { toast } from "react-toastify";
import "../../../../public/assets/css/admin/createProduct.css";


function CreateSize() {
    const [formData, setFormData] = useState({
        name: "",
        active: true
    });
    const navigate = useNavigate();


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: name === "price" ? parseFloat(value) : value });
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await requestApi(`sizes`, 'POST', formData);
            toast.success("create sizes success")

        } catch (error) {
            console.error('Error fetching sizes:', error);
            toast.error("create sizes error")
        }
        navigate("/admin/sizes");
    };

    return (
        <div className="container-full mt-0">
            <h2>Create New Size</h2>
            <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="name" className="form-label">
                            Size Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-control"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>


                <div className="mb-3">
                    <div className="form-check">
                        <input
                            type="checkbox"
                            id="active"
                            name="active"
                            className="form-check-input"
                            checked={formData.active}
                            onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                        />
                        <label className="form-check-label" htmlFor="active">
                            Active
                        </label>
                    </div>
                </div>

                <button type="submit" className="btn btn-success">
                    Create
                </button>
            </form>
        </div>
    );
}

export default CreateSize;