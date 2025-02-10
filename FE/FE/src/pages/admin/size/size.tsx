import { useEffect, useState } from "react";
import "../../../../public/assets/css/admin/product.css";
import { useNavigate } from "react-router-dom";
import requestApi from "../../../helper/api";
import { toast } from "react-toastify";
import { CirclePlus } from "lucide-react";


function SizeList() {
    const [sizes, setSizes] = useState<any[]>([])
    const fetchData = async () => {
        try {
            const res = await requestApi('sizes', 'GET', {});
            console.log(res);
            setSizes(res.data);
        } catch (error) {
            console.error('Error fetching sizes:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    const navigate = useNavigate();

    const handleEdit = (id: string) => {
        navigate(`/admin/sizes/edit/${id}`);
    };

    const handleAddNew = () => {
        navigate("/admin/sizes/new");
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            // Logic to delete product here
            try {
                await requestApi(`sizes/${id}`, 'Delete', {});
                toast.success("delete success")
                fetchData();

            } catch (error) {
                console.error('Error fetching sizes:', error);
                toast.error("delete error")
            }
        }
    };

    const setIsActive = async (id: string) => {
        try {
            await requestApi(`sizes/${id}/toggle`, 'PATCH', {});
            toast.success("change active success")
            fetchData();

        } catch (error) {
            console.error('Error fetching sizes:', error);
            toast.error("change active error")
        }
    }

    return (
        <>
            <div className="product-container">
                <div className="product-header">
                    <h1 className="product-title">Size List</h1>
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
                        {sizes.map((size) => (
                            <tr key={size.id}>
                                <td>{size.name}</td>
                                <td>
                                    <input
                                        className="form-control"
                                        type="checkbox"
                                        id="flexSwitchCheckDefault"
                                        checked={size.active}
                                        onChange={() => setIsActive(size.id)}
                                    />
                                </td>

                                <td>
                                    <button className="product-btn" onClick={() => handleEdit(size.id)}>
                                        View Details
                                    </button>
                                    <button className="product-delete-btn" onClick={() => handleDelete(size.id)}>
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

export default SizeList;