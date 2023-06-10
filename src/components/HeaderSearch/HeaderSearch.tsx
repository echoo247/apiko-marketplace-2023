import React from 'react';
import styled from './HeaderSearch.module.css'
import InputLabel from "../UI/Common/InputLabel/InputLabel";
import searchIcon from '../../assets/icons/search_icon.svg'
import locationIcon from '../../assets/icons/location_filled.svg'
import ButtonHeader from "../UI/Common/Button/Button";
import {Input} from "../UI/Common/Input/Input";
import {useForm, FormProvider, SubmitHandler} from "react-hook-form";
import {useAppDispatch} from "../../store/Redux";
import {FilterType, productsActions} from "../../features/filterSlice";
import * as yup from "yup";



const schema = yup.object({
    title: yup.string(),
    location: yup.string(),
}).required();
type FormData = yup.InferType<typeof schema>;

const defaultValues = {
    title: '' ,
    location: '',
}

const HeaderSearch = () => {

    const dispatch = useAppDispatch();
    const methods = useForm<FormData>({
        defaultValues
    })

    const onSubmit: SubmitHandler<FormData> =  (data) => {
        dispatch(productsActions.searchAndSorted(data as FilterType))
        methods.reset()
    }

    return (
        <div className={styled.header_search}>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} className={styled.header_search_form}>
                    <InputLabel>
                    <span className={styled.header_search_item}>
                        <span className={styled.input_icon}>
                            <img src={searchIcon} alt="search"/>
                        </span>
                        <Input className={styled.input_search_item} name="title" placeholder="Search products by name"/>
                    </span>
                    </InputLabel>
                    <InputLabel>
                    <span className={styled.header_search_location}>
                        <span className={styled.input_icon}>
                            <img src={locationIcon} alt="location"/>
                        </span>
                        <Input className={styled.input_search_item} name="location" placeholder="Location"/>
                    </span>
                    </InputLabel>
                    <ButtonHeader className={styled.header_search_button}>
                        Search
                    </ButtonHeader>
                </form>
            </FormProvider>
        </div>
    );
};

export default HeaderSearch;
