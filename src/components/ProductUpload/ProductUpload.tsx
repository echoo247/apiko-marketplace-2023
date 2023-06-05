import React from 'react';
import styled from './ProductUpload.module.css'
import { Input } from "../UI/Common/Input/Input";
import InputLabel from "../UI/Common/InputLabel/InputLabel";
import ButtonHeader from "../UI/Common/Button/Button";
import {SubmitHandler, useForm, FormProvider} from "react-hook-form";
import photo from '../../assets/icons/Mask1.svg'
import {IProduct, IUser} from "../../types";
import {useAddProductMutation} from "../../store/productAPI";
import FormWrapper from "../UI/Common/FormWrapper/FormWrapper";
import * as yup from "yup";
import {useGetUserQuery, useUpdateUserMutation} from "../../store/userAPI";
import {useNavigate} from "react-router-dom";




const schema = yup.object({
    title: yup.string().required(),
    description: yup.string().required(),
    price: yup.number().required(),
    location: yup.string().required(),
}).required();
type FormData = yup.InferType<typeof schema>;



const ProductUpload = () => {
    const idUser = window.localStorage.getItem("userId")
    const methods = useForm<FormData>()
    const {data: user} = useGetUserQuery(Number(idUser))
    const [ addProduct ] = useAddProductMutation()
    const [updateUser] = useUpdateUserMutation()
    const navigation = useNavigate()

    const onSubmit: SubmitHandler<FormData> = async (data) => {

        if(user) {
            const newProduct = {
                ...data,
                id: Date.now(),
                photos: photo,
                ownerId: user.id,
                createdAt: Date.now().toString(),
                saved: false
            }
            await addProduct(newProduct as IProduct)

            if (user.productId) {
                const newObject = {
                    ...user,
                    productId: [...user.productId, newProduct.id]
                }
                await updateUser(newObject as IUser)
                console.log("array", newObject)
            }
            methods.reset()
            navigation('/')
        }
    }


    const styleDescription: string = `${styled.input_wrapper_area} ${styled.input_description}`
    return (
        <FormProvider {...methods}>
            <FormWrapper name="Add Product" className={styled.wrapper_upload}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <InputLabel className={styled.form_upload}>
                        TITLE
                        <span className={styled.input_wrapper_area}>

                          <Input
                              placeholder="For example: Iron man suit"
                              name='title'
                          />
                        </span>
                    </InputLabel>
                    <InputLabel className={styled.form_upload}>
                        LOCATION
                        <span className={styled.input_wrapper_area}>
                            <Input
                                name='location'
                                placeholder="For example: Los Angeles, CA"
                            />
                        </span>
                    </InputLabel>
                    <InputLabel className={styled.form_upload}>
                        DESCRIPTION
                        <span  className={styleDescription}>`

                            <Input
                                placeholder="For example: Iron man suit"
                                className={styled.input_search_item}
                                name='description'
                            />
                        </span>
                    </InputLabel>
                    <InputLabel className={styled.form_upload}>
                        PHOTOS
                        <span className={styled.input_wrapper_area}>
                            {/*<Input
                                name='files'
                                placeholder="For example: Iron man suit"
                                className={styled}
                            />*/}
                        </span>
                    </InputLabel>
                    <InputLabel className={styled.form_upload}>
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
            </FormWrapper>
        </FormProvider>

    );
};

export default ProductUpload;
