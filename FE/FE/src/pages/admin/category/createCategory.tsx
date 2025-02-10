import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import requestApi from "../../../helper/api";
import { toast } from "react-toastify";
import "../../../../public/assets/css/admin/createProduct.css";
import { DeleteIcon, PlusCircle } from "lucide-react";


function CreateCategory() {
    const [formData, setFormData] = useState({
        name: "",
        imageCategory: "",
        active: true
    });
    const [prevImages, setPrevImages] = useState("")
    const inputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File>()
    const [errorForm, setErrorForm] = useState({ name: "", imageCategory: "" })
    const [isSubmit, setIsSubmit] = useState(false)


    const navigate = useNavigate();


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: name === "price" ? parseFloat(value) : value });
    };

    const handleClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    useEffect(() => {
        if (isSubmit) {
            const error = { ...errorForm }
            error.name = formData.name ? "" : "Không được để trống"
        }
    }, [formData, isSubmit])

    const deleteFile = () => {
        setPrevImages("");
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            const preview = URL.createObjectURL(file);
            setPrevImages(preview);
            setFile(file);
        }
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (file) {
            formData.imageCategory = await upload(file);
        }
        try {
            await requestApi(`categories`, 'POST', formData);
            toast.success("Tạo mới danh mục thành công")

        } catch (error) {
            console.error('Error fetching categories:', error);
            toast.error("create categories error")
        }
        navigate("/admin/categories");
    };

    const upload = async (file: File) => {
        const formFile = new FormData();
        formFile.append("image", file)
        const dataUpload = await requestApi("upload", "POST", formFile, "multipart/form-data");
        return dataUpload.data.imageUrl;
    }

    return (
        <div className="container-full mt-5">
            <h2>Thêm mới danh mục</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 mt-5">
                    <div className="row">
                        <div className="col-md-4">
                            <label htmlFor="name" className="form-label">
                                Tên danh mục
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

                </div>


                <div className="mb-3">
                    <div>
                        <label htmlFor="name" className="form-label">
                            Thêm ảnh
                        </label>
                    </div>
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
                                    className={`d-inline-block px-2 py-4 border border-dashed rounded text-center"} `}
                                    style={{ cursor: 'pointer', width: "150px", height: "10rem" }}
                                >
                                    <p className="display-4 d-flex justify-content-center align-items-center">
                                        <PlusCircle />
                                    </p>
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
                    Tạo
                </button>
            </form>
        </div>
    );
}

export default CreateCategory;