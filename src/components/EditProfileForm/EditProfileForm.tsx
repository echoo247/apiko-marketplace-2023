import React, {useEffect, useState} from 'react';
import FormWrapper from "../UI/Common/FormWrapper/FormWrapper";
import styled from "../RegisterForm/RegisterForm.module.css";
import {FormProvider, SubmitHandler, useForm, useWatch} from "react-hook-form";
import InputLabel from "../UI/Common/InputLabel/InputLabel";
import {Input} from "../UI/Common/Input/Input";
import ButtonHeader from "../UI/Common/Button/Button";
import {useNavigate} from "react-router-dom";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useFetchUserQuery, useUpdateUserMutation} from "../../features/userAPI";
import {useAppSelector} from "../../features/redux-hooks";
import style from './EditProfileForm.module.css'
import FileInput from "../UI/Upload";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import {storage} from "../../firebase-config/firebase";


const schema = yup.object({
    email: yup.string().email(),
    fullName: yup.string(),
    phone: yup.string().min(10).max(11),
    location: yup.string(),
    avatar: yup.string(),
    fileAvatar: yup.array(),
}).required();
type FormData = yup.InferType<typeof schema>;


const EditProfileForm = () => {
    const userId = useAppSelector(state => state.auth.id)
    const [percent, setPercent] = useState(0);
    const {data: user} = useFetchUserQuery(userId)
    const [updateUser] = useUpdateUserMutation()
    const navigation = useNavigate()

    const methods = useForm<FormData>(
        {
            defaultValues: {
                location: '',
                email: '',
                phone: '',
                fullName: '',
                fileAvatar: []
            },
        resolver: yupResolver(schema)
    })


    const fileAvatar = useWatch({
        control: methods.control,
        name: "fileAvatar",
    })

    const thumbs = fileAvatar?.map(file => (
        <img
            key={file.name}
            src={file.preview}
            alt={"avatar"}
            style={{borderRadius: "50%", width: "6.5em", height: "6.5em"}}
            onLoad={() => { URL.revokeObjectURL(file.preview) }}
        />
    ));

    useEffect(() => {
        if (fileAvatar) {
            const file: File = fileAvatar[0];
            const storageRef = ref(storage,`/avatar/${file?.name}`)
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const percent = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setPercent(percent);
                },
                (err) => console.log(err),
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        methods.setValue("avatar", url)
                    });
                }
            );
        }
    }, [fileAvatar]);

    useEffect(() => {
        if(user) {
            methods.setValue("email", user.email)
            methods.setValue("phone", user.phone)
            methods.setValue("location", user.location)
            methods.setValue("fullName", user.fullName)
            methods.setValue("avatar", user.avatar)
        }
    },[methods, user])


    const onSubmit: SubmitHandler<FormData> = async (data) => {

        if(user) {
            const newDoc = {
                ...data,
                createdAt: Date.now().toString(),
                avatar: methods.getValues('avatar'),
            }
            const {fileAvatar, ...user} = newDoc

            await updateUser({
                id: userId,
                data: user
            })

            methods.reset()
            navigation('/')
        }
    }

    return (
        <FormWrapper name="Edit Profile" className={styled.wrapper_log_reg_res} >
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <InputLabel className={style.circleContainer}>
                        <div className={style.circle}>
                            <div className={style.content}>
                                {user && user.avatar
                                    ? thumbs && thumbs[0] ?
                                        thumbs
                                        : <img src={user.avatar} alt="avatar" style={{borderRadius: "50%", width: "6.5em", height: "6.5em"}}/>
                                    : <span className={style.avatarText}>{user && user.fullName.split(' ').map((word: string )=> word.charAt(0)).join('')}</span>
                                }
                            </div>
                        </div>
                        <div className={style.upgradeText}>
                            <span>
                                Upgrade Photo
                            </span>
                            <FileInput
                                name='fileAvatar'
                                maxfile={1}
                            />
                        </div>
                    </InputLabel>
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

                    <ButtonHeader className={styled.button_log}>Edit Profile</ButtonHeader>
                </form>
            </FormProvider>
        </FormWrapper>
    );
};

export default EditProfileForm;
