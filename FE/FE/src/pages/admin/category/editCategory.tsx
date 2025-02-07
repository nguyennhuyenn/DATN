import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import requestApi from "../../../helper/api";
import { toast } from "react-toastify";
import "../../../../public/assets/css/admin/createProduct.css";

const EditCategory = () => {
    const { id } = useParams();
    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        name: "",
        imageCategory: "",
        active: true
    });

    useEffect(() => {
        const fetchDataCategory = async () => {
            try {
                const res = await requestApi(`categories/${id}`, 'GET', {});
                setFormData({
                    name: res.data.name,
                    imageCategory: res.data.imageCategory,
                    active: res.data.active
                })
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchDataCategory();

    }, [id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: name === "price" ? parseFloat(value) : value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await requestApi(`categories/${id}`, 'PUT', formData);
            toast.success("update categories success")

        } catch (error) {
            console.error('Error fetching categories:', error);
            toast.error("update categories error")
        }
        navigate("/admin/categories");
    };

    return (
        <div className="container mt-5">
            <h2>Create New Category</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Category Name
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


                <div className="mb-3">
                    <label htmlFor="imageCategory" className="form-label">
                        Image URL
                    </label>
                    <input
                        type="text"
                        id="imageCategory"
                        name="imageCategory"
                        className="form-control"
                        value={formData.imageCategory}
                        onChange={handleInputChange}
                    />
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

                <div className="mb-3">
                    <img src={formData.imageCategory} style={{ "maxWidth": "400px" }} />
                </div>

                <button type="submit" className="btn btn-success">
                    Create Category
                </button>
            </form>
        </div>
    );
};

export default EditCategory;
