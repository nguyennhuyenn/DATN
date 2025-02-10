import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import requestApi from "../../../helper/api";
import { toast } from "react-toastify";
import "../../../../public/assets/css/admin/createProduct.css";
import { DeleteIcon, PlusCircle } from "lucide-react";
import { LoaderContext } from "../../../hook/admin/contexts/loader";


function CreateCategory() {
    const [formData, setFormData] = useState({
        name: "",
        imageCategory: "",
        active: true
    });
    const [prevImages, setPrevImages] = useState("")
    const inputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File>()
    const [errorForm, setErrorForm] = useState({ name: "", imageCategory: "", isSuccess: true })
    const [isSubmit, setIsSubmit] = useState(false)
    const { setLoader } = useContext(LoaderContext);

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
            setErrorForm(validForm)
        }
    }, [formData, isSubmit])

    const validForm = () => {
        const error = { name: "", imageCategory: "", isSuccess: true }
        if (!formData.name) {
            error.name = "Không được để trống"
            error.isSuccess = false
        }
        if (!file) {
            error.imageCategory = "Không được để trống"
            error.isSuccess = false
        }

        return error
    }

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
        setIsSubmit(true)

        const errorForm = validForm()
        if (!errorForm.isSuccess) {
            setErrorForm(errorForm)
            toast.error("Vui lòng điền đủ các trường")
            return
        }

        setLoader(true)
        if (file) {
            formData.imageCategory = await upload(file);
        }
        try {
            await requestApi(`categories`, 'POST', formData, "application/json");
            toast.success("Tạo mới danh mục thành công")

        } catch (error) {
            console.error('Error fetching categories:', error);
            toast.error("create categories error")
        }
        setLoader(false)

        navigate("/admin/categories");
    };

    const upload = async (file: File) => {
        try {
            const formFile = new FormData();
            formFile.append("image", file)
            const dataUpload = await requestApi("upload", "POST", formFile, "multipart/form-data");
            return dataUpload.data.imageUrl;
        } catch (error) {
            console.error('Error fetching upload:', error);
            toast.error("upload thất bại")
            setLoader(false)
        }
    }

    return (
        <div className="container-full">
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
                            />
                        </div>
                    </div>

                    <p className=" text-danger">
                        {errorForm.name}
                    </p>
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
                    <p className=" text-danger">
                        {!prevImages && errorForm.imageCategory}
                    </p>
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