import { useEffect, useState } from "react";
import "../../../../public/assets/css/admin/product.css";
import { useNavigate } from "react-router-dom";
import requestApi from "../../../helper/api";
import { toast } from "react-toastify";

function Product() {
  const [products, setProducts] = useState<any[]>([]);

  const fetchData = async () => {
    try {
      const res = await requestApi("products", "GET", {});
      console.log(res);
      setProducts(res.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách sản phẩm:", error);
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
    if (window.confirm("Bạn có chắc chắn muốn cập nhật trạng thái ?")) {
      try {
        await requestApi(`products/${id}/toggle`, "PATCH", {});
        toast.success("Cập nhật sản phẩm thành công!");
        fetchData();
      } catch (error) {
        console.error("Lỗi khi xoá sản phẩm:", error);
        toast.error("Cập nhật sản phẩm thất bại!");
      }
    }
  };

  return (
    <>
      <div className="product-container">
        <div className="product-header">
          <h1 className="product-title">Danh Sách Sản Phẩm</h1>
          <button className="add-product-btn" onClick={handleAddNew}>
            Thêm Sản Phẩm Mới
          </button>
        </div>
        <table className="product-table">
          <thead>
            <tr>
              <th>Hình Ảnh</th>
              <th>Tên</th>
              <th>Mô Tả</th>
              <th>Giá</th>
              <th>Trạng Thái</th>
              <th>Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="product-image"
                  />
                </td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.active ? "Đang hoạt động" : "Ngừng hoạt động"}</td>
                <td>
                  <button
                    className="product-btn"
                    onClick={() => handleEdit(product.id)}
                  >
                    Xem Chi Tiết
                  </button>
                  <button
                    className="product-delete-btn"
                    onClick={() => handleDelete(product.id)}
                  >
                    Thay doi
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

export default Product;
