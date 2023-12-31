import React, {useState} from 'react';
import styled from './RegisterForm.module.css'
import FormWrapper from "../UI/Common/FormWrapper/FormWrapper";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import InputLabel from "../UI/Common/InputLabel/InputLabel";
import {Input} from "../UI/Common/Input/Input";
import eyeSeenShow from "../../assets/icons/password-eye.svg";
import {Link, useNavigate} from "react-router-dom";
import ButtonHeader from "../UI/Common/Button/Button";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useAddUserMutation} from "../../features/userAPI";
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { auth } from '../../firebase-config/firebase';


const schema = yup.object({
    email: yup.string().email().required(),
    fullName: yup.string().required(),
    password: yup.string().min(6).required(),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Password must match').required(),
}).required();

type FormData = yup.InferType<typeof schema>;

let changeType:boolean = false

const RegisterForm = () => {
    const [errorMessage, setErrorMessage] = useState('')
    const [seePassword, setSeePassword] = useState<string>('password')
    const methods = useForm<FormData>({
        resolver: yupResolver(schema)
    })
    const [addUser] = useAddUserMutation()
    const navigate = useNavigate()

    const onSubmit: SubmitHandler<FormData> = async (data) => {

        await createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                // Signed in
                const userId = userCredential.user.uid;
                const user = {
                    email: data.email,
                    fullName: data.fullName,
                    createAt: Date.now().toString(),
                    phone: '',
                    location: '',
                    avatar: '',
                    productId: [],
                }
                addUser({
                    data: user,
                    uid:userId
                })
                methods.reset()
                navigate("/")
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
            <FormWrapper name="Register" className={styled.wrapper_log_reg_res} >
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
                            FULL NAME
                                <span className={styled.input_wrapper_area}>
                                    <Input
                                        name='fullName'
                                        placeholder="Tony Stark"
                                        required
                                    />
                            </span>
                            <p className={styled.error}>{methods.formState.errors.fullName?.message}</p>
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
                            <p className={styled.error}>{methods.formState.errors.password?.message}</p>
                        </InputLabel>
                        <InputLabel className={styled.form_login}>
                            PASSWORD AGAIN
                            <span  className={styled.input_wrapper_area}>

                                <Input
                                    className={styled.input_search_item}
                                    name='confirmPassword'
                                    type={seePassword}
                                    required
                                />
                                <span className={styled.input_password_eye}>
                                    <img onClick={handleClickSeePassword}  src={eyeSeenShow} alt="Password Icon"/>
                                </span>
                             </span>
                            <p className={styled.error}>{methods.formState.errors.confirmPassword?.message}</p>
                        </InputLabel>

                        <ButtonHeader className={styled.button_log} >Register</ButtonHeader>
                    </form>
                </FormProvider>
            </FormWrapper>
            <FormWrapper title={false} className={`${styled.wrapper_log_reg_res} ${styled.auth}`}>
                I already have an account, <Link className={styled.auth_text} to={"/login"}>Log in</Link>
            </FormWrapper>
        </>
    );
};

export default RegisterForm;
