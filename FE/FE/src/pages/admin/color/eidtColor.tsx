import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import requestApi from "../../../helper/api";
import { toast } from "react-toastify";
import "../../../../public/assets/css/admin/createProduct.css";

const EditColor = () => {
    const { id } = useParams();
    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        name: "",
        active: true
    });

    useEffect(() => {
        const fetchDataColor = async () => {
            try {
                const res = await requestApi(`colors/${id}`, 'GET', {});
                setFormData({
                    name: res.data.name,
                    active: res.data.active
                })
            } catch (error) {
                console.error('Error fetching colors:', error);
            }
        };

        fetchDataColor();

    }, [id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: name === "price" ? parseFloat(value) : value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await requestApi(`colors/${id}`, 'PUT', formData);
            toast.success("update colors success")

        } catch (error) {
            console.error('Error fetching colors:', error);
            toast.error("update colors error")
        }
        navigate("/admin/colors");
    };

    return (
        <div className="container-full">
            <h2>Update Color</h2>
            <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="name" className="form-label">
                            Color Name
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
                    Update
                </button>
            </form>
        </div>
    );
};

export default EditColor;
