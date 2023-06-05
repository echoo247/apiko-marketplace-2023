import React, {useState} from 'react';
import styled from './LoginForm.module.css'
import eyeSeenShow from '../../assets/icons/password-eye.svg'

import FormWrapper from "../UI/Common/FormWrapper/FormWrapper";
import {useForm, FormProvider, SubmitHandler} from "react-hook-form";
import InputLabel from "../UI/Common/InputLabel/InputLabel";
import {Input} from "../UI/Common/Input/Input";
import ButtonHeader from "../UI/Common/Button/Button";
import {Link, useNavigate} from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import {useGetUsersQuery} from "../../store/userAPI";
import {logoutAction, registerUser} from "../../features/authSlice";
import {useAppDispatch} from "../../store/Redux";


const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
}).required();
type FormData = yup.InferType<typeof schema>;


const LoginForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const [seePassword, setSeePassword] = useState<string>('password')
    const methods = useForm<FormData>({
        resolver: yupResolver(schema)
    })
    const {data: user = []} = useGetUsersQuery()

    let changeType:boolean = false

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        const findUser = user.find(u => u.email === data.email)
        if(findUser) {
            await dispatch(logoutAction);
            window.localStorage.setItem("userId", JSON.stringify(findUser?.id))
            navigate("/")
        }
        methods.reset()
        console.log(findUser)
    }

       /* const onSubmit: SubmitHandler<Login> = async (data) => {

        const newProduct = {
            ...data,
            id: Date.now().toString(),
            photos: photo,
            createdAt: Date.now().toString(),
            saved: false
        }
        await addProduct(newProduct as IProduct)
        console.log(newProduct);
    }*/


    const handleClickSeePassword = () => {
        changeType = !changeType
        const type = changeType ? 'text' : 'password'
        setSeePassword(type)
        console.log(seePassword)
        console.log(changeType)
    }

    return (
        <>
            <FormWrapper name="Login" className={styled.wrapper_log_reg_res} >
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <InputLabel className={styled.form_login}>
                            EMAIL
                            <span className={styled.input_wrapper_area}>
                            <Input
                                name='email'
                                placeholder="EXAMPLE@gmail.com"
                                required
                            />
                        </span>
                        </InputLabel>
                        <InputLabel className={styled.form_login}>
                            PASSWORD
                            <span  className={styled.input_wrapper_area}>

                                <Input
                                    className={styled.input_search_item}
                                    name='password'
                                    type={seePassword}
                                    required
                                />
                                <span className={styled.input_password_eye}>
                                    <img onClick={handleClickSeePassword}  src={eyeSeenShow} alt="Password Icon"/>
                                </span>
                             </span>
                        </InputLabel>
                        <div className={styled.login_remember}>
                            <p className={styled.remember_text_password}>
                                Don't remember
                                <Link className={styled.auth_text} to={'/'}> password?</Link>
                            </p>
                        </div>
                        <ButtonHeader className={styled.button_log}>Continue</ButtonHeader>
                    </form>
                </FormProvider>
            </FormWrapper>
            <FormWrapper title={false} className={`${styled.wrapper_log_reg_res} ${styled.auth}`}>
                I have no account, <Link className={styled.auth_text} to="/register">REGISTER NOW</Link>
            </FormWrapper>
        </>

    );
};

export default LoginForm;
