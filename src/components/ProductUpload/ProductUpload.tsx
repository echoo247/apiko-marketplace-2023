import React from 'react';
import styled from './ProductUpload.module.css'
import { Input } from "../UI/Common/Input/Input";
import InputLabel from "../UI/Common/InputLabel/InputLabel";
import ButtonHeader from "../UI/Common/Button-Header/ButtonHeader";
import {SubmitHandler, useForm, FormProvider} from "react-hook-form";
import photo from '../../assets/icons/Mask1.svg'
import {IProduct} from "../../types";
import {useAddProductMutation} from "../../store/userAPI";


export type Inputs = {
    title: string,
    description: string,
    price: string,
    location: string
}

const defaultValues = {
    title: '' ,
    location: '',
    description: '',
    price: ''
}

const ProductUpload = () => {
    const methods = useForm<Inputs>({
        defaultValues
    })
    const [ addProduct ] = useAddProductMutation()

    const onSubmit: SubmitHandler<Inputs> = async (data) => {

        const newProduct = {
            ...data,
            id: Date.now().toString(),
            photos: photo,
            createdAt: Date.now().toString(),
            saved: false
        }
        await addProduct(newProduct as IProduct)
        console.log(newProduct);
    }
  /*  const addNewProduct = async (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault()
        console.log(product)

        const newProduct = {
            ...product,
            id: Date.now().toString(),
            photos: photo,
            createdAt: Date.now().toString(),
            saved: false
        }
        console.log(newProduct)

        await addProduct(newProduct as IProduct)
        setProduct(newProduct)
    }


    const handleAddProduct = async () => {
        try {
            await addProduct(product).unwrap()
            setProduct(initialValue)
        } catch {
            console.log(error)
        }
    }*/



    const styleDescription: string = `${styled.input_wrapper_area} ${styled.input_description}`
    return (
        <FormProvider {...methods}>
        <div className={styled.container}>
            <p className={styled.title}>Add Product</p>
            <div className={styled.wrapper_upload}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <InputLabel styles={styled.form_upload}>
                        TITLE
                        <span className={styled.input_wrapper_area}>

                          <Input
                            placeholder="For example: Iron man suit"
                            name='title'
                          />
                        </span>
                    </InputLabel>
                    <InputLabel styles={styled.form_upload}>
                        LOCATION
                        <span className={styled.input_wrapper_area}>
                            <Input
                                name='location'
                                placeholder="For example: Los Angeles, CA"
                            />
                        </span>
                    </InputLabel>
                    <InputLabel styles={styled.form_upload}>
                        DESCRIPTION
                        <span  className={styleDescription}>`

                            <Input
                                placeholder="For example: Iron man suit"
                                className={styled.input_search_item}
                                name='description'
                            />
                        </span>
                    </InputLabel>
                    <InputLabel styles={styled.form_upload}>
                        PHOTOS
                        <span className={styled.input_wrapper_area}>
                            {/*<Input
                                name='files'
                                placeholder="For example: Iron man suit"
                                className={styled}
                            />*/}
                        </span>
                    </InputLabel>
                    <InputLabel styles={styled.form_upload}>
                        PRICE
                        <span className={styled.input_wrapper_area}>

                            <Input
                                placeholder="For example:$ 150,25"
                                className={styled}
                                name='price'
                            />
                        </span>
                    </InputLabel>
                    <ButtonHeader className={styled.button_upload}>Submit</ButtonHeader>
                </form>
            </div>
        </div>
        </FormProvider>

    );
};

export default ProductUpload;
