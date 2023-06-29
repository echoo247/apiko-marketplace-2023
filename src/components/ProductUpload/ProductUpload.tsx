import React, {useEffect, useState} from 'react';
import styled from './ProductUpload.module.css'
import {Input} from "../UI/Common/Input/Input";
import InputLabel from "../UI/Common/InputLabel/InputLabel";
import ButtonHeader from "../UI/Common/Button/Button";
import {SubmitHandler, useForm, FormProvider, useFieldArray, useWatch} from "react-hook-form";
import {useAddProductMutation} from "../../features/productAPI";
import FormWrapper from "../UI/Common/FormWrapper/FormWrapper";
import * as yup from "yup";
import {useFetchUserQuery, useUpdateUserMutation} from "../../features/userAPI";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../features/redux-hooks";
import FileInput from "../UI/Upload";
import {yupResolver} from "@hookform/resolvers/yup";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {storage} from "../../firebase-config/firebase";



const schema = yup.object({
    title: yup.string().required(),
    description: yup.string().required(),
    price: yup.number().required(),
    location: yup.string().required(),
    photoFiles: yup.array().required(),
    photos: yup.array().required(),
}).required();
export type FormFields = yup.InferType<typeof schema>;



const ProductUpload = () => {
    const methods = useForm<FormFields>(
        {
            defaultValues: {
                title: '',
                description: '',
                location: '',
                photoFiles: [],
                photos: [],
            },
            resolver: yupResolver(schema)
        })
    const userId = useAppSelector(state => state.auth.id)
    const [initState, setInitState] = useState(0);
    const [percent, setPercent] = useState(0);
    const {data: user} = useFetchUserQuery(userId)
    const [addProduct] = useAddProductMutation()
    const [updateUser] = useUpdateUserMutation()
    const navigation = useNavigate()

    const photoTypeFile = useWatch({
        control: methods.control,
        name: "photoFiles",
    })
    const {
        fields: fileFields,
        remove: removeFile
    } = useFieldArray({
        control: methods.control,
        name: "photoFiles"
    });

    const {append: appendUrl} = useFieldArray({
        control: methods.control,
        name: "photos"
    });

    const thumbs = fileFields.map((file, index) => (
        <img
            onClick={() => removeFile(index)}
            key={file.id}
            src={file.preview}
            alt={`avatar:${index}`}
            onLoad={() => { URL.revokeObjectURL(file.preview) }}
        />
    ));

    useEffect( () => {
        if (photoTypeFile.length > 0) {
            for (let i = initState; i < photoTypeFile.length; ++i) {

                const file: File = photoTypeFile[i];
                const storageRef = ref(storage,`/product/${file.name}`)
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
                        // download url
                         getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                            appendUrl(url)
                        });
                    }
                );
            }
            setInitState(photoTypeFile.length)
        }
    }, [photoTypeFile])

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        const newProduct = {
            title: data.title,
            description: data.description,
            price: data.price,
            location: data.location,
            photos: data.photos,
            ownerId: userId,
            createdAt: Date.now().toString(),
            saved: false
        }
        const id = Date.now().toString()
        await addProduct({
            id: id,
            data: newProduct,
        })

        await updateUser({
            id: userId,
            data: {productId: [...user?.productId, id]}
        })

        methods.reset()
        navigation('/')
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
                        <span  className={styleDescription}>
                            <Input
                                placeholder="For example: Iron man suit"
                                className={styled.input_search_item}
                                name='description'
                            />
                        </span>
                    </InputLabel>
                    <InputLabel className={styled.form_upload}>
                        PHOTOS
                        <span className={`${styled.input_wrapper_area} ${styled.inputField}`}>
                             <div className={styled.square}>
                                    <div className={styled.plus}>
                                        <FileInput
                                            multiple
                                            name='photoFiles'
                                            maxfile={0}
                                        />
                                    </div>
                             </div>

                            <div className={styled.photoPreview}>
                                {thumbs[0] && thumbs}
                            </div>

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
