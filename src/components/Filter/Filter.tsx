import React, {useEffect} from 'react';
import styled from './Filter.module.css'
import categoryIcon from '../../assets/icons/selectArrow.svg'
import gridIcon from '../../assets/icons/selectGrid.svg'
import InputLabel from "../UI/Common/InputLabel/InputLabel";
import {Input} from "../UI/Common/Input/Input";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "../../features/redux-hooks";
import {FilterType, productsActions} from "../../features/filterSlice";
import * as yup from "yup";
import Button from "../UI/Common/Button/Button";

const schema = yup.object({
    priceTo: yup.number().positive(),
    priceFrom: yup.number().positive(),
}).required();
type FormData = yup.InferType<typeof schema>;


const Filter = () => {
    const dispatch = useAppDispatch();
    const methods = useForm<FormData>()
    const products = useAppSelector((state) => state.product.filteredProducts);


    useEffect(() => {
        if(products) {
            let priceFrom = 0;
            let priceTo = 0;
            products.forEach(function(object) {
                if (object.price < priceFrom) {
                    priceFrom = object.price;
                }
                if (object.price > priceTo) {
                    priceTo = object.price;
                }
            });
            methods.setValue('priceTo', priceTo)
            methods.setValue('priceFrom', priceFrom)
        }
    }, [products, methods.formState])

    const onSubmit: SubmitHandler<FormData> =  (data) => {
        dispatch(productsActions.searchAndSorted(data as FilterType))
    }

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
                            <form onSubmit={methods.handleSubmit(onSubmit)} className={styled.filter_price}>
                                <InputLabel>
                                <span className={styled.filter_price}>
                                    <Input className={styled.filter_price_wrapper}
                                           type="number"
                                           name="priceFrom"
                                           placeholder="Price from (USD)"
                                    />
                                </span>
                                </InputLabel>
                                <span className={styled.filter_line}></span>
                                <InputLabel>
                                    <span className={styled.filter_price}>
                                        <Input className={styled.filter_price_wrapper}
                                           type="number"
                                           name="priceTo"
                                           placeholder="Price to (USD)"
                                        />
                                    </span>
                                </InputLabel>
                                <Button className={`${styled.filter_price_wrapper} ${styled.filter_submit}`}>Price</Button>
                            </form>
                        </FormProvider>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Filter;
