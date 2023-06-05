import React, {useEffect, useState} from 'react';
import FormWrapper from "./UI/Common/FormWrapper/FormWrapper";
import styled from "./RegisterForm/RegisterForm.module.css";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import InputLabel from "./UI/Common/InputLabel/InputLabel";
import {Input} from "./UI/Common/Input/Input";
import ButtonHeader from "./UI/Common/Button/Button";
import {useNavigate} from "react-router-dom";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useGetUserQuery, useUpdateUserMutation} from "../store/userAPI";
import {IUser} from "../types";
import photo from "../assets/icons/Mask1.svg";
import {useAddProductMutation} from "../store/productAPI";

const schema = yup.object({
    email: yup.string().email(),
    fullName: yup.string(),
    phone: yup.string().min(10).max(11),
    location: yup.string(),
}).required();

type FormData = yup.InferType<typeof schema>;

const EditProfileForm = () => {
    const idUser = window.localStorage.getItem("userId")
    const {data: user} = useGetUserQuery(Number(idUser))
    const [ addProduct ] = useAddProductMutation()
    const [ updateUser] = useUpdateUserMutation()
    const navigation = useNavigate()

    const methods = useForm<FormData>(
        {
            defaultValues: {
                location: '',
                email: '',
                phone: '',
                fullName: '',
            },
        resolver: yupResolver(schema)
    })

    useEffect(() => {
        if(user) {
            methods.setValue("email", user.email)
            methods.setValue("phone", user.phone)
            methods.setValue("location", user.location)
            methods.setValue("fullName", user.fullName)
        }
    },[user])


    const onSubmit: SubmitHandler<FormData> = async (data) => {

        if(user) {
            if (user.productId) {
                const newObject = {
                    ...user,
                    ...data
                }
                await updateUser(newObject as IUser)
                console.log("array", newObject)
            }
            methods.reset()
            navigation('/')

        }
    }


    return (
        <FormWrapper name="EditProfile" className={styled.wrapper_log_reg_res} >
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <InputLabel className={styled.form_login}>
                        EMAIL
                        <span className={styled.input_wrapper_area}>
                                    <Input
                                        name='email'
                                        placeholder="EXAMPLE@gmail.com"
                                    />
                            </span>
                        <p className={styled.error}>{methods.formState.errors.email?.message}</p>
                    </InputLabel>
                    <InputLabel className={styled.form_login}>
                        FULL NAME
                        <span className={styled.input_wrapper_area}>
                                    <Input
                                        name='fullName'
                                        placeholder="Tony Stark"
                                    />
                            </span>
                        <p className={styled.error}>{methods.formState.errors.fullName?.message}</p>
                    </InputLabel>
                    <InputLabel className={styled.form_login}>
                        PHONE
                        <span  className={styled.input_wrapper_area}>
                                <Input
                                    className={styled.input_search_item}
                                    name='phone'
                                />

                             </span>
                        <p className={styled.error}>{methods.formState.errors.phone?.message}</p>
                    </InputLabel>
                    <InputLabel className={styled.form_login}>
                        LOCATION
                        <span  className={styled.input_wrapper_area}>

                                <Input
                                    className={styled.input_search_item}
                                    name='location'
                                />

                             </span>
                        <p className={styled.error}>{methods.formState.errors.location?.message}</p>
                    </InputLabel>

                    <ButtonHeader className={styled.button_log} >Edit Profile</ButtonHeader>
                </form>
            </FormProvider>
        </FormWrapper>
    );
};

export default EditProfileForm;
