import { useEffect, useRef, useState } from "react"
import { Category, ProductFormData } from "../../../../util";
import requestApi from "../../../../helper/api";
import { DeleteIcon, PlusCircle } from "lucide-react";
import CkEditorComponent from "./ckeditorComponent";
import { errorProduct } from "../../../../util/validate/validateFormCreateDelivery";

const InforProductComponent = ({ formData, setFormData, setFile, errorForm }: {
    formData: ProductFormData,
    setFormData: React.Dispatch<React.SetStateAction<ProductFormData>>,
    setFile: React.Dispatch<React.SetStateAction<File | undefined>>
    errorForm: errorProduct
}) => {

    const [prevImages, setPrevImages] = useState("")
    const [categories, setCategories] = useState<Category[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        if (formData.imageUrl)
            setPrevImages(formData.imageUrl)
    }, [formData.imageUrl])

    const fetchCategories = async () => {
        try {
            const res = await requestApi('categories', 'GET', {});
            setCategories(res.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            const preview = URL.createObjectURL(file);
            setPrevImages(preview);
            setFile(file);
        }
    };

    const deleteFile = () => {
        setPrevImages("");
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: name === "price" ? parseFloat(value) : value });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEditorChange = (_: any, editor: any) => {
        const data = editor.getData();
        setFormData({ ...formData, description: data });
    };

    return (
        <div className=" my-4 border border-2 rounded p-4 shadow bg-body-tertiary rounded">
            <div className="row mb-5">
                <div className="col-md-12">
                    <label htmlFor="validationCustom01" className="form-label">
                        Ảnh sản phẩm
                    </label>
                    {
                        prevImages ?
                            <>
                                <div className="d-flex">
                                    <img
                                        className="border rounded"
                                        style={{
                                            height: "10rem", minWidth: "100px"
                                        }}
                                        src={prevImages}
                                    />
                                    <div
                                        onClick={() => deleteFile()}
                                        className=" text-danger cursor-pointer"
                                        style={{}}
                                    >
                                        <DeleteIcon />
                                    </div>
                                </div>
                            </> :
                            <>
                                <div
                                    onClick={handleClick}
                                    className={`d-inline-block px-2 py-4 border border-dashed rounded text-center  ${errorForm.imageUrl && " border-danger"} `}
                                    style={{ cursor: 'pointer', width: "150px", height: "10rem" }}
                                >
                                    <p className="display-4 d-flex justify-content-center align-items-center">
                                        <PlusCircle />
                                    </p>
                                    <p className="text-muted small">Thêm hình ảnh</p>
                                </div>
                                <input
                                    className="d-none"
                                    id="uploadFile1"
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    ref={inputRef}
                                />
                            </>
                    }
                    <p className=" text-danger">
                        {!prevImages && errorForm.imageUrl}
                    </p>
                </div>
            </div>

            <div className="row mb-5">
                <div className="col-md-6">
                    <label htmlFor="validationCustom01" className="form-label">
                        Tên sản phẩm
                    </label>
                    <input
                        type="text"
                        className={`custom-input ${errorForm.name && " border-danger"}`}
                        name="name"
                        onChange={handleInputChange}
                        value={formData.name}
                        placeholder="Vui lòng nhập tên"
                    />
                    <p className=" text-danger">
                        {errorForm.name && errorForm.name}
                    </p>
                </div>

                <div className="col-md-3">
                    <label htmlFor="validationCustom01" className="form-label">
                        Giá
                    </label>

                    <input
                        className="custom-input"
                        type="number"
                        id="price"
                        name="price"
                        min={0}
                        onChange={handleInputChange}
                        value={formData.price}
                        required
                    />
                </div>

                <div className="col-md-3">
                    <label htmlFor="validationCustom01" className="form-label">
                        Danh mục
                    </label>
                    <select
                        id="category"
                        name="category"
                        className={`custom-input ${errorForm.name && " border-danger"}`}
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="" className="text-body-tertiary"> Chọn danh mục</option>
                        {categories && categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                    <p className=" text-danger">
                        {errorForm.category && errorForm.category}
                    </p>
                </div>

            </div>

            <div className="row mb-5 ">
                <div className="col-md-6 ">
                    <label htmlFor="type" className="form-label me-3">
                        Loại sản phẩm
                    </label>
                    <select
                        id="type"
                        name="type"
                        className="custom-input"
                        value={formData.type}
                        onChange={handleInputChange}
                        style={{ maxWidth: "200px" }}
                    >
                        <option value="quần">Quần</option>
                        <option value="áo">Áo</option>
                        <option value="combo">Combo</option>
                    </select>
                </div>

                <div className="col-md-6 ">
                    <label className="form-label me-3" htmlFor="active">
                        Active
                    </label>

                    <input
                        type="checkbox"
                        id="active"
                        name="active"
                        className="form-check-input mx-0"
                        checked={formData.active}
                        onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                    />

                </div>
            </div>

            <div className="row mb-5">
                <div className="col-md-12">
                    <label htmlFor="description" className="form-label">
                        Mô tả
                    </label>
                    <div>
                        <CkEditorComponent description={formData.description} onHandleEditorChange={handleEditorChange} />
                    </div>
                    <p className=" text-danger">
                        {errorForm.description && errorForm.description}
                    </p>
                </div>
            </div>


        </div>
    )
}

export default InforProductComponent