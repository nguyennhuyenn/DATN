import { useContext, useEffect, useState } from "react";
import requestApi from "../../../helper/api";
import { toast } from "react-toastify";
import "../../../../public/assets/css/admin/createProduct.css";
import { ProductFormData, SKU } from "../../../util";
import { useNavigate } from "react-router-dom";
import SkuComponent from "./pages/skuComponent";
import InforProductComponent from "./pages/inforProductComponent";
import { LoaderContext } from "../../../hook/admin/contexts/loader";
import { errorCreateProduct, validDataFormProduct } from "../../../util/validate/validateFormCreateDelivery";

function CreateProduct() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<ProductFormData>({
        name: "",
        category: "",
        price: 0,
        description: "",
        colors: [{ name: "", image: "" }],
        sizes: [""],
        imageUrl: "",
        sku: [{ size: "", color: "", quantity: 0 }],
        type: "quần",
        active: true,
    });
    const [file, setFile] = useState<File>()
    const [fileSku, setFileSku] = useState<{ file: File, name: string }[]>([])
    const { setLoader } = useContext(LoaderContext);
    const [errorForm, setErrorForm] = useState(errorCreateProduct)
    const [isSubmit, setIsSubmit] = useState(false)

    useEffect(() => {
        const generateSkuList = () => {
            const skuList: SKU[] = [...formData.sku];
            formData.sizes.forEach(size => {
                formData.colors.forEach(color => {
                    const index = skuList.findIndex(item => item.size === size && item.color === color.name);
                    if (index !== -1) {
                        skuList[index] = { ...skuList[index], size, color: color.name };
                    } else {
                        skuList.push({ size, color: color.name, quantity: 0 });
                    }
                });
            });
            setFormData(prev => ({ ...prev, sku: skuList }));
        };

        generateSkuList();
    }, [formData.colors, formData.sizes]);

    useEffect(() => {
        if (isSubmit) {
            setErrorForm(validDataFormProduct(formData))
        }
    }, [formData, isSubmit])


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmit(true)
        const error = validDataFormProduct({ ...formData, imageUrl: file ? "file" : formData.imageUrl })

        console.log(error);

        if (!error.isSuccess) {
            setErrorForm(error)
            toast.error("Vui lòng nhập đúng các trường")
            return
        }



        setLoader(true);
        const formCreate = await uploadFile()

        if (formCreate) {
            try {
                await requestApi(`products`, 'POST', formCreate, "application/json");
                toast.success("Tạo sản phẩm thành công")

            } catch (error) {
                console.error('Error fetching products:', error);
                toast.error("create product error")
            }
            navigate("/admin/products");
        }
        setLoader(false);

    };

    const uploadFile = async () => {
        const formCreate = { ...formData };
        try {
            // Upload ảnh chính
            if (file) {
                formCreate.imageUrl = await upload(file);
            }

            // Upload ảnh cho SKU
            if (fileSku.length > 0) {
                fileSku.forEach(async (item) => {
                    const image = await upload(item.file)
                    const index = formCreate.colors.findIndex((itemForm) => item.name === itemForm.name)
                    formCreate.colors[index].image = image
                })
            }

            return formCreate
        } catch (error) {
            console.error("Upload error:", error);
            toast.error("Upload failed!");
        }

    }

    const upload = async (file: File) => {
        const formFile = new FormData();
        formFile.append("image", file)
        const dataUpload = await requestApi("upload", "POST", formFile, "multipart/form-data");
        return dataUpload.data.imageUrl;
    }

    return (
        <div className="container-full create-product">
            <h1 className="product-title pb-4 mb-4">Tạo sản phẩm</h1>
            <form onSubmit={handleSubmit} className=" needs-validation" noValidate>

                <div>
                    <InforProductComponent
                        formData={formData}
                        setFormData={setFormData}
                        setFile={setFile}
                        errorForm={errorForm}
                    />
                </div>

                <div>
                    <SkuComponent
                        formData={formData}
                        setFormData={setFormData}
                        setFileSku={setFileSku}
                        errorForm={errorForm}

                    />
                </div>

                {<button type="submit" className="btn btn-success">
                    Tạo sản phẩm
                </button>}
            </form>
        </div>
    );
}

export default CreateProduct;