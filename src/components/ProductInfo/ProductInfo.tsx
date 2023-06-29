import React, {useEffect, useState} from 'react';
import styled from './ProductInfo.module.css'
import {useParams} from "react-router";
import {useFetchProductQuery, useUpdateProductMutation} from "../../features/productAPI";
import photo from '../../assets/icons/location_filled.svg'
import unSavedIcon from '../../assets/icons/product-unsaved.svg'
import savedIcon from '../../assets/icons/product-saved.svg'
import Button from "../UI/Common/Button/Button";
import {useFetchUserQuery} from "../../features/userAPI";



const ProductInfo = () => {
    const [date, setDate] = useState<Date>()
    const params = useParams()
    const [prodId, setProdId] = useState<string>('');
    const [id, setId] = useState<string>('');
    const {data: product} = useFetchProductQuery(prodId)
    const {data: user} = useFetchUserQuery(id)

    const [updateProduct] = useUpdateProductMutation()

    const handleChangeSave = async () => {
        if(product) {
            await updateProduct({
                id: prodId,
                data: {saved: !product.saved}
            })
        }
    }

    useEffect(() => {
        if (params.id) {
            setProdId(params.id)
        }
        if(product) {
            setId(product.ownerId)
            setDate(new Date(Number(product.createdAt)))
        }
    }, [params, product])


    return (
        <div className={styled.wrapper}>
            <div className={styled.position_info}>
                <div className={styled.product_detail}>
                    <div className={styled.product_detail_image_block}>
                        <img src={product && product.photos} className={styled.product_detail_image} alt="card"/>
                        <div className={styled.product_detail_price}>$ {product && product.price}</div>
                    </div>
                    <div className={styled.product_detail_container}>
                        <div className={styled.product_detail_detail}>
                            <h2 className={styled.product_detail_text_m}>{product && product.title}</h2>
                            <p className={styled.product_detail_text}>{date?.toDateString()}</p>
                        </div>
                        <div className={styled.product_detail_detail}>
                            <img src={photo} alt="location"/>
                            <p className={styled.product_detail_text}>{product && product.location}</p>
                        </div>
                        <p className={styled.product_detail_description}>
                            {product && product.description}
                        </p>
                    </div>
                </div>
                <div className={styled.product_detail_other}>
                    <div className={styled.product_detail_owner}>
                        <span className={styled.product_detail_owner_top}></span>
                        <div className={styled.owner_info}>
                            <div className={styled.avatar_owner}>
                                {user?.avatar ? <img style={{borderRadius: "50%", width: '2em', height: '2em',}} src={user.avatar} alt={'Avatar'}/>
                                    :
                                    <div className={`${styled.avatar_text_wrapper} ${styled.avatar_text_hover}`}>
                                        {user && user.fullName.split(' ').map((word: string )=> word.charAt(0)).join('')}
                                    </div>
                                }
                            </div>
                            <h2 className={styled.product_detail_fullname}>{user && user.fullName}</h2>
                            <p className={styled.product_detail_location}>{user && user.location}</p>
                        </div>
                    </div>
                    <Button className={`${styled.product_detail_chat} ${styled.correct_button}`}>Chat with seller</Button>
                    <Button onClick={handleChangeSave} className={`${styled.product_detail_like} ${styled.product_detail_chat} ${styled.correct_button}`}>
                        <div className={styled.product_detail_like_position}>
                            <img src={product && product.saved ? savedIcon : unSavedIcon } alt={"like_product"} style={{marginRight: "14px"}}/>
                            Add to favorite
                        </div>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductInfo;
