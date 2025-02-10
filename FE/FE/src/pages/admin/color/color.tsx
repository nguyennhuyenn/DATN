import { useEffect, useState } from "react";
import "../../../../public/assets/css/admin/product.css";
import { useNavigate } from "react-router-dom";
import requestApi from "../../../helper/api";
import { toast } from "react-toastify";
import { CirclePlus } from "lucide-react";


function ColorList() {
    const [colors, setColors] = useState<any[]>([])
    const fetchData = async () => {
        try {
            const res = await requestApi('colors', 'GET', {});
            setColors(res.data);
        } catch (error) {
            console.error('Error fetching colors:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    const navigate = useNavigate();

    const handleEdit = (id: string) => {
        navigate(`/admin/colors/edit/${id}`);
    };

    const handleAddNew = () => {
        navigate("/admin/colors/new");
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            // Logic to delete product here
            try {
                await requestApi(`colors/${id}`, 'DELETE', {});
                toast.success("delete success")
                fetchData();

            } catch (error) {
                console.error('Error fetching colors:', error);
                toast.error("delete error")
            }
        }
    };

    const setIsActive = async (id: string) => {
        try {
            await requestApi(`colors/${id}/toggle`, 'PATCH', {});
            toast.success("change active success")
            fetchData();

        } catch (error) {
            console.error('Error fetching colors:', error);
            toast.error("change active error")
        }
    }

    return (
        <>
            <div className="product-container">
                <div className="product-header">
                    <h1 className="product-title">Color List</h1>
                    <button className="add-product-btn" onClick={handleAddNew}>
                        Create <CirclePlus className="icon" size={20} />
                    </button>
                </div>
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Active</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {colors.map((color) => (
                            <tr key={color.id}>
                                <td>{color.name}</td>
                                <td>
                                    <input
                                        className="form-control"
                                        type="checkbox"
                                        id="flexSwitchCheckDefault"
                                        checked={color.active}
                                        onChange={() => setIsActive(color.id)}
                                    />
                                </td>

                                <td>
                                    <button className="product-btn" onClick={() => handleEdit(color.id)}>
                                        View Details
                                    </button>
                                    <button className="product-delete-btn" onClick={() => handleDelete(color.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>

    );
}

export default ColorList;