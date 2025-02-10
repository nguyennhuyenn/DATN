import { useEffect, useState } from "react";
import "../../../../public/assets/css/admin/product.css";
import { useNavigate } from "react-router-dom";
import requestApi from "../../../helper/api";
import { toast } from "react-toastify";
import { defaultPagination } from "../../../util/type/product";


function Product() {
    const [products, setProducts] = useState<any[]>([])
    const [pagination, setPagination] = useState(defaultPagination)

    const fetchData = async (page = 1) => {
        try {
            const res = await requestApi(`products/paginate?page=${page}&limit=6`, 'GET', {});
            setProducts(res.data.data);
            setPagination(res.data.pagination)
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    const navigate = useNavigate();

    const handleEdit = (id: string) => {
        navigate(`/admin/products/edit/${id}`);
    };

    const handleAddNew = () => {
        navigate("/admin/products/new");
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            // Logic to delete product here
            try {
                await requestApi(`products/${id}/toggle`, 'PATCH', {});
                toast.success("delete success")
                fetchData();

            } catch (error) {
                console.error('Error fetching products:', error);
                toast.error("delete error")
            }
        }
    };

    return (
        <>
            <div className="product-container">
                <div className="product-header">
                    <h1 className="product-title">Danh sách sản phẩm</h1>
                    <button className="add-product-btn" onClick={handleAddNew}>Thêm mới sản phẩm</button>
                </div>
                <table className="product-table">
                    <thead>
                        <tr>
                            <th style={{ "width": "200px" }} >Hình ảnh</th>
                            <th style={{ "width": "200px" }} >Tên sản phẩm</th>
                            <th>Mô tả</th>
                            <th style={{ "width": "200px" }} >Giá</th>
                            <th style={{ "width": "200px" }} >Tình trạng</th>
                            <th style={{ "width": "300px" }} >Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td><img src={product.imageUrl} alt={product.name} className="product-image" /></td>
                                <td>{product.name}</td>
                                <td style={{ maxHeight: "10px" }}>
                                    {
                                        product.description.length > 100 ? `${product.description.slice(0, 100)}...`
                                            : product?.description
                                    }
                                </td>
                                <td>${product.price.toFixed(2)}</td>
                                <td>{product.active ? "Hoạt động" : "Ngừng hoạt động"}</td>
                                <td>
                                    <button className="product-btn" onClick={() => handleEdit(product.id)}>
                                        Chi tiết
                                    </button>
                                    <button className="product-delete-btn" onClick={() => handleDelete(product.id)}>
                                        On/off hoạt động
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="page-navigation">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <ul>
                                {Array.from({ length: pagination.totalPages }, (_, index) => (
                                    <li key={index} className={pagination.currentPage === index + 1 ? "current-page mx-2" : " mx-2"}>
                                        <a onClick={() => fetchData(index + 1)}>{index + 1}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default Product;