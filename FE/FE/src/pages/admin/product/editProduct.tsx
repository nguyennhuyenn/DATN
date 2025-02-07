import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import requestApi from "../../../helper/api";
import { toast } from "react-toastify";
import { ProductFormData, SKU } from "../../../util";


const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<ProductFormData>({
        name: "",
        category: "",
        price: 0,
        description: "",
        colors: [""],
        sizes: [""],
        imageUrl: "",
        sku: [{ size: "", color: "", quantity: 0 }],
        type: "quần",
        active: true,
    });

    const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);

    useEffect(() => {
        const fetchDataCategory = async () => {
            try {
                const res = await requestApi('categories', 'GET', {});
                setCategories(res.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        const fetchDataProduct = async () => {
            try {
                const res = await requestApi(`products/${id}`, 'GET', {});
                const sku = res.data.sku.map((item: any) => {
                    return {
                        color: item.color,
                        size: item.size,
                        quantity: item.quantity,
                    }
                })
                setFormData({ ...res.data, category: res.data.category.id, sku })
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchDataCategory();
        fetchDataProduct();

    }, [id]);

    console.log(formData);



    useEffect(() => {
        const generateSkuList = () => {
            const skuList: SKU[] = [];
            formData.sizes.forEach(size => {
                formData.colors.forEach(color => {
                    const sku = formData.sku.find(item => {
                        return item.color == color && item.size == size
                    })

                    skuList.push({ size, color, quantity: sku ? sku.quantity : 0 });
                });
            });
            setFormData(prev => ({ ...prev, sku: skuList }));
        };

        generateSkuList();
    }, [formData.colors, formData.sizes]);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: name === "price" ? parseFloat(value) : value });
    };

    const handleListChange = (index: number, field: string, value: string) => {

        let sku: SKU[] = [{ size: "", color: "", quantity: 0 }]
        formData.sizes.forEach(size => {
            formData.colors.forEach(color => {
                sku.push({ size, color, quantity: 0 })
            })
        })

        setFormData((prev) => {
            const updatedList = [...(prev[field as keyof typeof formData] as string[])];
            updatedList[index] = value;
            return { ...prev, [field]: updatedList, sku };
        });
    };

    const addListItem = (field: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: [...(prev[field as keyof typeof formData] as string[]), ""],
        }));
    };

    const removeListItem = (index: number, field: string) => {
        setFormData((prev) => {
            const updatedList = [...(prev[field as keyof typeof formData] as string[])];
            updatedList.splice(index, 1);
            return { ...prev, [field]: updatedList };
        });
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSkuChange = (index: number, field: keyof SKU, value: string | number) => {
        setFormData((prev) => {
            const updatedSku = [...prev.sku];
            updatedSku[index] = { ...updatedSku[index], [field]: value };
            return { ...prev, sku: updatedSku };
        });
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await requestApi(`products/${id}`, 'PUT', formData);
            toast.success("update product success")

        } catch (error) {
            console.error('Error fetching products:', error);
            toast.error("update product error")
        }
        navigate("/admin/products");
    };

    return (
        <div className="container mt-5 create-product">
            <h2>Create New Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="name" className="form-label">
                            Product Name
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

                    <div className="col-md-6">
                        <label htmlFor="price" className="form-label">
                            Price
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            className="form-control"
                            value={formData.price}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="category" className="form-label">
                            Category
                        </label>
                        <select
                            id="category"
                            name="category"
                            className="form-select"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="description" className="form-label">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            className="form-control"
                            value={formData.description}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>


                <div className="row mb-3">
                    <div className="col-md-6">
                        <label className="form-label">Colors</label>
                        {formData.colors.map((color, index) => (
                            <div key={index} className="d-flex mb-2">
                                <input
                                    type="text"
                                    className="form-control me-2"
                                    value={color}
                                    onChange={(e) => handleListChange(index, "colors", e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => removeListItem(index, "colors")}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button type="button" className="btn btn-primary" onClick={() => addListItem("colors")}>
                            Add Color
                        </button>
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Sizes</label>
                        {formData.sizes.map((size, index) => (
                            <div key={index} className="d-flex mb-2">
                                <input
                                    type="text"
                                    className="form-control me-2"
                                    value={size}
                                    onChange={(e) => handleListChange(index, "sizes", e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => removeListItem(index, "sizes")}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button type="button" className="btn btn-primary" onClick={() => addListItem("sizes")}>
                            Add Size
                        </button>
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label">SKU Details</label>
                    {formData.sku.map((skuItem, index) => (
                        <div key={index} className="d-flex align-items-center mb-2">
                            <input
                                type="text"
                                className="form-control m-2"
                                placeholder="Size"
                                value={skuItem.size}
                                onChange={(e) => handleSkuChange(index, "size", e.target.value)}
                            />
                            <input
                                type="text"
                                className="form-control m-2"
                                placeholder="Color"
                                value={skuItem.color}
                                onChange={(e) => handleSkuChange(index, "color", e.target.value)}
                            />
                            <input
                                type="number"
                                className="form-control m-2"
                                placeholder="Quantity"
                                value={skuItem.quantity}
                                onChange={(e) => handleSkuChange(index, "quantity", Number(e.target.value))}
                            />
                        </div>
                    ))}
                </div>

                <div className="row mb-3">

                    <div className="col-md-6">
                        <label htmlFor="type" className="form-label">
                            Product Type
                        </label>
                        <select
                            id="type"
                            name="type"
                            className="form-control"
                            value={formData.type}
                            onChange={handleInputChange}
                        >
                            <option value="quần">Quần</option>
                            <option value="áo">Áo</option>
                            <option value="combo">Combo</option>
                        </select>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="imageUrl" className="form-label">
                            Image URL
                        </label>
                        <input
                            type="text"
                            id="imageUrl"
                            name="imageUrl"
                            className="form-control"
                            value={formData.imageUrl}
                            onChange={handleInputChange}
                        />

                        <img src={formData.imageUrl} alt="" style={{ "maxWidth": "200px", "padding": "10px 0" }} />
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
                    Create Product
                </button>
            </form>
        </div>
    );
};

export default EditProduct;
