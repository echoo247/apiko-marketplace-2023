import React from 'react';
import styled from './Filter.module.css'
import categoryIcon from '../../assets/icons/selectArrow.svg'
import gridIcon from '../../assets/icons/selectGrid.svg'
import InputLabel from "../UI/Common/InputLabel/InputLabel";
import {Input} from "../UI/Common/Input/Input";
import {FormProvider, useForm} from "react-hook-form";

interface Price {
    priceMin: number,
    priceMax: number
}

const defaultValues = {
    priceMin: 0,
    priceMax: 0
}


const Filter = () => {
    const methods = useForm<Price>({
        defaultValues
    })

    return (
        <div className={styled.header_filter}>
            <div className={styled.filter_main}>
                <div className={styled.wrapper_wrapper}>
                    <div className={styled.filter_filters}>
                        <div className={styled.filter_category}>
                            <div className={styled.category_select_wrapper}>
                                <select className={styled.category_select}>
                                    <option>Choose Category</option>
                                </select>
                                <div className={styled.category_select_icon}>
                                    <img src={categoryIcon} alt="select"
                                         role="presentation" aria-hidden="true" className={styled.select_icon}
                                    />
                                </div>
                                <img src={gridIcon} alt="grid"
                                     className={styled.grid_icon}
                                />
                            </div>
                        </div>
                        <FormProvider {...methods}>
                            <form className={styled.filter_price}>
                                <InputLabel>
                                <span className={styled.filter_price_low}>
                                    <Input className={styled.filter_price_wrapper}
                                           type="number"
                                           name="priceForm"
                                           placeholder="Price from (USD)"
                                    />
                                </span>
                                </InputLabel>
                                <span className={styled.filter_line}></span>
                                <InputLabel>
                                <span className={styled.filter_price_low}>
                                    <Input className={styled.filter_price_wrapper}
                                           type="number"
                                           name="priceForm"
                                           placeholder="Price to (USD)"
                                    />
                                </span>
                                </InputLabel>
                            </form>
                        </FormProvider>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Filter;
