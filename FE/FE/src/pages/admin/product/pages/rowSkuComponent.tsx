import { DeleteIcon, PlusCircle } from 'lucide-react'
import React, { useRef } from 'react'
import { ProductFormData } from '../../../../util';
import { toast } from 'react-toastify';

const RowSkuComponent = ({ color, formData, setFormData, setFileSku }: {
    color: {
        name: string;
        image: string;
    },
    formData: ProductFormData,
    setFormData: React.Dispatch<React.SetStateAction<ProductFormData>>
    setFileSku: React.Dispatch<React.SetStateAction<{
        file: File;
        name: string;
    }[]>>
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const handleClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const handleQuantitySku = (size: string, color: string, quantity: number) => {
        const sku = formData.sku.map((item) => {
            if (size === item.size && color === item.color)
                return { ...item, quantity }
            return item
        })

        setFormData((prev) => {
            return { ...prev, sku };
        });
    }

    const getValueSku = (size: string, color: string) => {
        const sku = formData.sku.find((item) => size === item.size && color === item.color)

        return sku?.quantity || 0
    }

    const deleteFile = () => {
        setFormData((prev) => {
            const colors = formData.colors.map((item) => {
                if (item.name === color.name)
                    return { ...item, image: "" }
                return item
            })
            return { ...prev, colors };
        });

        setFileSku((prev) => {
            const files = prev.filter((item) => item.name !== color.name)
            return files
        })
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!color.name) {
            toast.error("Bạn phải chọn tên màu trước")
            return
        }

        const file = event.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            const preview = URL.createObjectURL(file);

            setFormData((prev) => {
                const colors = formData.colors.map((item) => {
                    if (item.name === color.name)
                        return { ...item, image: preview }
                    return item
                })
                return { ...prev, colors };
            });

            const fileSku = {
                file,
                name: color.name
            }

            setFileSku(prev => {
                const index = prev.findIndex(item => item.name === color.name);

                if (index !== -1) {
                    const updatedList = [...prev];
                    updatedList[index] = fileSku;
                    return updatedList;
                }

                return [...prev, fileSku];
            });
        }

    };

    return (
        <>
            <div className="row text-center align-items-center border py-2">
                <div className="col d-flex justify-content-center ">
                    {
                        color.image ?

                            <>
                                <div className="d-flex">
                                    <img
                                        className="border rounded"
                                        style={{
                                            height: "10rem", minWidth: "100px"
                                        }}
                                        src={color.image}
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
                                    className="d-inline-block px-2 py-4 border border-dashed rounded text-center "
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
                </div>

                <div className="col d-flex justify-content-center align-items-center ">
                    <p className="m-0"> {color.name || "---"} </p>
                </div>

                <div className="col ">
                    <table className="table table-bordered" style={{ borderBottom: "1px" }}>
                        {
                            formData.sizes.map((size, index) => {
                                return <tr key={index}>
                                    <td>{size || "---"}</td>
                                </tr>
                            })
                        }
                    </table>
                </div>

                <div className="col ">
                    <table className="table">
                        {
                            formData.sizes.map((size, index) => {
                                return <input
                                    key={index}
                                    type="number"
                                    className="custom-input m-2 "
                                    placeholder="Quantity"
                                    value={getValueSku(size, color.name)}
                                    onChange={(e) => handleQuantitySku(size, color.name, Number(e.target.value))}
                                />
                            })
                        }
                    </table>
                </div>
            </div>
        </>
    )
}

export default RowSkuComponent