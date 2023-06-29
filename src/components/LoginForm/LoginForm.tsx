import React, {useState} from 'react';
import styled from './LoginForm.module.css'
import eyeSeenShow from '../../assets/icons/password-eye.svg'
import {signInWithEmailAndPassword} from 'firebase/auth';
import FormWrapper from "../UI/Common/FormWrapper/FormWrapper";
import {useForm, FormProvider, SubmitHandler} from "react-hook-form";
import InputLabel from "../UI/Common/InputLabel/InputLabel";
import {Input} from "../UI/Common/Input/Input";
import ButtonHeader from "../UI/Common/Button/Button";
import {Link, useNavigate} from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import {auth} from "../../firebase-config/firebase";


const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
}).required();
type FormData = yup.InferType<typeof schema>;


const LoginForm = () => {
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('')
    const [seePassword, setSeePassword] = useState<string>('password')
    const methods = useForm<FormData>({
        resolver: yupResolver(schema)
    })
    let changeType:boolean = false

    const onSubmit: SubmitHandler<FormData> = async (data) => {

        signInWithEmailAndPassword(auth, data.email, data.password)
            .then(() => {
                navigate("/")
                methods.reset()
            })
            .catch((error) => {
                setErrorMessage(error.message)
            });
    }

    const handleClickSeePassword = () => {
        changeType = !changeType
        const type = changeType ? 'text' : 'password'
        setSeePassword(type)
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
                            <p className={styled.error}>{methods.formState.errors.email?.message} {errorMessage}</p>
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
