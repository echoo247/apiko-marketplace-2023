import React from 'react';
import styled from './HeaderSearch.module.css'
import InputLabel from "../../Common/InputLabel/InputLabel";
import searchIcon from '../../../../assets/icons/search_icon.svg'
import locationIcon from '../../../../assets/icons/location_filled.svg'
import ButtonHeader from "../../Common/Button-Header/ButtonHeader";
import {Input} from "../../Common/Input/Input";
import {useForm, FormProvider} from "react-hook-form";

type Search = {
    title: string,
    location: string
}

const defaultValues = {
    title: '' ,
    location: '',
}

const HeaderSearch = () => {
    const methods = useForm<Search>({
        defaultValues
    })

    return (
        <div className={styled.header_search}>
            <FormProvider {...methods}>
                <form className={styled.header_search_form}>
                    <InputLabel>
                    <span className={styled.header_search_item}>
                        <span className={styled.input_icon}>
                            <img src={searchIcon} alt="search"/>
                        </span>
                        <Input className={styled.input_search_item} name="name" placeholder="Search products by name"/>
                    </span>
                    </InputLabel>
                    <InputLabel>
                    <span className={styled.header_search_location}>
                        <span className={styled.input_icon}>
                            <img src={locationIcon} alt="location"/>
                        </span>
                        <Input className={styled.input_search_item} name="name" placeholder="Location"/>
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
