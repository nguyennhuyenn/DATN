import { useEffect, useState } from "react";
import "../../../../public/assets/css/admin/product.css";
import { useNavigate } from "react-router-dom";
import requestApi from "../../../helper/api";
import { toast } from "react-toastify";


function CategoryList() {
    const [categories, setCategorys] = useState<any[]>([])
    const fetchData = async () => {
        try {
            const res = await requestApi('categories', 'GET', {});
            console.log(res);
            setCategorys(res.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    const navigate = useNavigate();

    const handleEdit = (id: string) => {
        navigate(`/admin/categories/edit/${id}`);
    };

    const handleAddNew = () => {
        navigate("/admin/categories/new");
    };

    const handleDelete = async (id: string) => {
        try {
            await requestApi(`categories/${id}/toggle`, 'PATCH', {});
            toast.success("Thay đổi trạng thái thành công")
            fetchData();

        } catch (error) {
            console.error('Error fetching categories:', error);
            toast.error("delete error")
        }
    };

    return (
        <>
            <div className="product-container">
                <div className="product-header">
                    <h1 className="product-title">Danh sách danh mục</h1>
                    <button className="add-product-btn" onClick={handleAddNew}>Thêm mới</button>
                </div>
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Hình ảnh</th>
                            <th>Tên danh mục</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category) => (
                            <tr key={category.id}>
                                <td><img src={category.imageCategory} alt={category.name} className="product-image" /></td>
                                <td>{category.name}</td>
                                <td>{category.active ? "Hoạt động" : "Ngừng hoạt động"}</td>

                                <td>
                                    <button className="product-btn" onClick={() => handleEdit(category.id)}>
                                        Xem chi tiết
                                    </button>
                                    <button className="product-delete-btn" onClick={() => handleDelete(category.id)}>
                                        Thay đổi trạng thái
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

export default CategoryList;