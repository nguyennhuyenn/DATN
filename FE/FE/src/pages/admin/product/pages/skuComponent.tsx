import React, { useEffect, useState } from 'react'
import { Color, ProductFormData, Size } from '../../../../util'
import { Minus, Plus } from 'lucide-react'
import RowSkuComponent from './rowSkuComponent'
import { toast } from 'react-toastify'
import requestApi from '../../../../helper/api'
import { errorProduct } from '../../../../util/validate/validateFormCreateDelivery'

const SkuComponent = ({ formData, setFormData, setFileSku, errorForm }: {
    formData: ProductFormData,
    setFormData: React.Dispatch<React.SetStateAction<ProductFormData>>,
    setFileSku: React.Dispatch<React.SetStateAction<{
        file: File;
        name: string;
    }[]>>
    errorForm: errorProduct
}) => {
    const [sizes, setSizes] = useState<Size[]>([]);
    const [colors, setColors] = useState<Color[]>([]);

    useEffect(() => {
        fetchSizes();
        fetchColors();
    }, []);


    const fetchSizes = async () => {
        try {
            const res = await requestApi('sizes', 'GET', {});
            setSizes(res.data);
        } catch (error) {
            console.error('Error fetching sizes:', error);
        }
    };

    const fetchColors = async () => {
        try {
            const res = await requestApi('colors', 'GET', {});
            setColors(res.data);
        } catch (error) {
            console.error('Error fetching colors:', error);
        }
    };

    const handleChangeSku = (index: number, field: "sizes" | "colors", value: string) => {

        setFormData((prev) => {
            const updatedList =
                field === "sizes"
                    ? [...(prev.sizes as string[])]
                    : [...(prev.colors as { name: string; image: string }[])];

            if (field === "sizes") {
                updatedList[index] = value;
            } else if (field === "colors") {
                updatedList[index] = { image: "", name: value };
            }

            const updatedSku = prev.sizes.flatMap((size) =>
                prev.colors.map((color) => {
                    const existing = prev.sku.find(
                        (item) => item.size === size && item.color === color.name
                    );
                    return existing || { size, color: color.name, quantity: 0 };
                })
            );

            return { ...prev, [field]: updatedList, sku: updatedSku };
        });

    };

    const addListItem = (field: "colors" | "sizes") => {
        if (field === "colors" && formData.colors.length >= colors.length) {
            toast.error("has maximized color")
            return
        }

        if (field === "sizes" && formData.sizes.length >= sizes.length) {
            toast.error("has maximized size")
            return
        }

        setFormData((prev) => ({
            ...prev,
            [field]: [...(prev[field as keyof typeof formData] as string[]), ""],
        }));
    };

    const removeListItem = (index: number, field: "colors" | "sizes") => {
        if (formData[field].length == 1) {
            toast.error(`You must have at least 1 ${field}`)
            return
        }

        setFormData((prev) => {
            const updatedList = [...(prev[field as keyof typeof formData] as string[])];
            updatedList.splice(index, 1);
            return { ...prev, [field]: updatedList };
        });

    };


    return (
        <div className=" my-4 border border-2 rounded p-4 shadow bg-body-tertiary rounded">
            <div className="row  mb-5">
                <div className="col-md-6">
                    <label className="form-label">Màu sắc</label>
                    {formData.colors && formData.colors.map((colorForm, index) => (
                        <div key={index} className="d-flex my-4">

                            <select
                                className={`custom-input custom-select ${errorForm.colors && !colorForm.name && " border-danger"}`}
                                value={colorForm.name}
                                onChange={(e) => handleChangeSku(index, "colors", e.target.value)}
                            >
                                <option value=""> ---------------</option>
                                {colors && colors.map((color) => {
                                    const checkColor = formData.colors.find(item => item.name === color.name)
                                    if (!checkColor || color.name === colorForm.name)
                                        return (
                                            <option key={color.id} value={color.name}>
                                                {color.name}
                                            </option>
                                        )
                                })}
                            </select>

                            <div className="cursor-pointer " onClick={() => removeListItem(index, "colors")}>
                                <Minus />
                            </div>
                        </div>
                    ))}

                    <p className=" text-danger pb-2">
                        {errorForm.colors && errorForm.colors}
                    </p>
                    <button type="button" className="btn btn-primary" onClick={() => addListItem("colors")}>
                        <Plus />
                    </button>
                </div>

                <div className="col-md-6">
                    <label className="form-label">Sizes</label>
                    {formData.sizes && formData.sizes.map((sizeForm, index) => (
                        <div key={index} className="d-flex my-4">
                            <select
                                className={`custom-input custom-select ${errorForm.sizes && !sizeForm && " border-danger"}`}
                                value={sizeForm}
                                onChange={(e) => handleChangeSku(index, "sizes", e.target.value)}
                            >
                                <option value=""> ---------------</option>
                                {sizes && sizes.map((size) => {
                                    const checkSize = formData.sizes.find(item => item === size.name)
                                    if (!checkSize || size.name === sizeForm)
                                        return (
                                            <option key={size.id} value={size.name}>
                                                {size.name}
                                            </option>
                                        )
                                })}
                            </select>


                            <div className="cursor-pointer " onClick={() => removeListItem(index, "sizes")}>
                                <Minus />
                            </div>
                        </div>
                    ))}


                    <p className=" text-danger pb-2">
                        {errorForm.sizes && errorForm.sizes}
                    </p>

                    <button type="button" className="btn btn-primary" onClick={() => addListItem("sizes")}>
                        <Plus />
                    </button>

                </div>
            </div>

            <div className="mb-3">
                <div className="container-full mt-5">
                    <div className="row text-center my-2  border py-2  rounded " style={{ backgroundColor: "rgba(21, 161, 28, 0.5)" }}>
                        <div className="col border-start">
                            <p style={{ fontWeight: "bold", color: "#333" }}>Hình ảnh</p>
                        </div>
                        <div className="col border-start">
                            <p style={{ fontWeight: "bold", color: "#333" }}>Màu sắc</p>
                        </div>
                        <div className="col border-start">
                            <p style={{ fontWeight: "bold", color: "#333" }}>Size</p>
                        </div>
                        <div className="col border-start">
                            <p style={{ fontWeight: "bold", color: "#333" }}>Số lượng</p>
                        </div>
                    </div>

                    {formData.colors && formData.colors.map((color, index) => (
                        <div key={index}>
                            <RowSkuComponent color={color} formData={formData} setFormData={setFormData} setFileSku={setFileSku} />
                        </div>
                    ))}
                </div>
            </div>



        </div>
    )
}

export default SkuComponent