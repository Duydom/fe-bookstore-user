
import { Button, Card, Carousel, Checkbox, Col, Image, Input, List, Pagination, Row, Select, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons'
import { GetBookById } from '../../axios/BookAPI';
import "./Cart.css"
import { AddToCart, GetCartByUser } from '../../axios/CartAPI';
import Waiting from '../Waiting/Waiting.js';

const bookTmps = [
    {
        "id": 3,
        "title": "Sach upadte",
        "description": "ssdfs",
        "numberOfPages": 234,
        "publishDate": "2023-10-30T00:00:00",
        "language": "VN",
        "count": 100,
        "price": 2345235,
        "image": "http://res.cloudinary.com/bong-oliver/image/upload/v1698671201/image/127133655_411546676715245_3087798390270697567_n_ty08yl.jpg",
        "isDeleted": false,
        "publisher": {
            "id": 1,
            "name": "Kim Đồng",
            "isDeleted": false
        },
        "author": {
            "id": 2,
            "name": "Aoyama Gōshō",
            "isDeleted": false
        },
        "tags": [
            {
                "id": 1,
                "name": "Truyện",
                "isDeleted": false
            },
            {
                "id": 2,
                "name": "Tiểu thuyết",
                "isDeleted": false
            },
            {
                "id": 6,
                "name": "gdfg",
                "isDeleted": false
            }
        ]
    },
    {
        "id": 4,
        "title": "Tesst tao",
        "description": "wer",
        "numberOfPages": 123,
        "publishDate": "2023-11-08T11:03:49.568",
        "language": "134",
        "count": 100,
        "price": 10000,
        "image": "http://res.cloudinary.com/bong-oliver/image/upload/v1698664041/image/368368183_257075097209901_647778669221044847_n_grecmc.jpg",
        "isDeleted": false,
        "publisher": {
            "id": 2,
            "name": "Giáo dục",
            "isDeleted": false
        },
        "author": {
            "id": 2,
            "name": "Aoyama Gōshō",
            "isDeleted": false
        },
        "tags": [
            {
                "id": 4,
                "name": "Test",
                "isDeleted": false
            },
            {
                "id": 6,
                "name": "gdfg",
                "isDeleted": false
            },
            {
                "id": 9,
                "name": "aaa",
                "isDeleted": false
            }
        ]
    },
    {
        "id": 1,
        "title": "Dế mèn phiêu lưu ký",
        "description": "Truyện về cuộc phiêu lưu của chú dế mèn dũng cảm",
        "numberOfPages": 132,
        "publishDate": "2023-10-29T00:00:00",
        "language": "Vietnamese",
        "count": 100,
        "price": 11000,
        "image": "values.image",
        "isDeleted": true,
        "publisher": {
            "id": 1,
            "name": "Kim Đồng",
            "isDeleted": false
        },
        "author": {
            "id": 1,
            "name": "Tô Hoài",
            "isDeleted": false
        },
        "tags": [
            {
                "id": 1,
                "name": "Truyện",
                "isDeleted": false
            },
            {
                "id": 2,
                "name": "Tiểu thuyết",
                "isDeleted": false
            }
        ]
    },
    {
        "id": 2,
        "title": "Thám tử lừng danh Conan",
        "description": "Truyện về cuộc phiêu lưu của chàng thám tử trung học lừng danh Kudo Shinichi, bị cho uống thứ thuốc teo nhỏ cơ thể",
        "numberOfPages": 200,
        "publishDate": "2023-10-29T00:00:00",
        "language": "Vietnamese",
        "count": 100,
        "price": 20000,
        "image": "values.image",
        "isDeleted": true,
        "publisher": {
            "id": 1,
            "name": "Kim Đồng",
            "isDeleted": false
        },
        "author": {
            "id": 2,
            "name": "Aoyama Gōshō",
            "isDeleted": false
        },
        "tags": [
            {
                "id": 1,
                "name": "Truyện",
                "isDeleted": false
            }
        ]
    }
]
const quantities = [1, 2, 3, 4]
function Cart() {
    const [total, setTotal] = useState(0)
    const [userId, setUserId] = useState(0)
    const [cart, setCart] = useState([])
    const [checkes, setCheck] = useState([])
    const navigate = useNavigate();
    const [wait, setWait] = useState(false)


    useEffect(() => {
        fecthData()
    }, [])
    const fecthData = async () => {
        setWait(true)
        var res = await GetCartByUser(sessionStorage.getItem('userId'))
        if (res?.code == 200) {
            setCart(res?.data);
            setCheck(new Array(res?.data?.books?.length).fill(false))
        }

        console.log(res);
        setWait(false)
    }
    const ChooseBook = (index) => {
        var tmp = checkes
        tmp[index] = !tmp[index]
        setCheck([...tmp])
        Canculate()
    }
    const Canculate = () => {
        var sum = 0;
        for (var index = 0; index < cart?.books?.length; index++) {
            if (checkes[index])
                sum += cart?.books[index]?.price * cart?.quantities[index]?.count
        }

        setTotal(sum)
    }
    const ChangeQuantity = async (index, number) => {
        setWait(true)
        var res = await AddToCart(sessionStorage.getItem('userId'), cart?.books[index]?.id, number)
        if (res?.code == 200) {
            setTimeout(() => {
                window.location.reload()
            }, 1000);
        }
        setWait(false)
    }

    const CheckOut = () => {
        var order = {
            books : [],
            quantities : []
        }
        for (var i = 0; i < cart?.books.length; i++) {
            if (checkes[i] == true){
            order.books.push(cart?.books[i])
            order.quantities.push(cart?.quantities[i])}
        }

        if (order.books.length > 0) {
            sessionStorage.setItem('order', JSON.stringify(order))
            navigate('/order')
        } else alert("Vui lòng chọn sản phẩm")
    }
    return (
        <>
            {
                wait ? <Waiting /> : <></>
            }
            {
                !sessionStorage.getItem('userId') ?
                    <div style={{
                        marginTop: 20
                    }}>
                        <Row gutter={[24, 0]}>
                            <Col span={24} md={24}>
                                <Card className="mb-24 cart-line">
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        fontSize: "32px",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}>
                                        <div>
                                            Bạn chưa đăng nhập
                                        </div>
                                        <button style={{
                                            height: "35px",
                                            width: "240px",
                                            padding: "0px 10px",
                                            background: "rgb(253, 56, 56)",
                                            border: "2px solid rgba(253, 56, 56,0.5)",
                                            fontSize: "24px",
                                            color: "#fff",
                                            borderRadius: "5px",
                                            marginTop: "20px"
                                        }} onClick={() => navigate('/login')}>Đăng nhập ngay</button>
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                    :
                    <div className='cart-main'
                        style={{
                            marginTop: 20
                        }}>
                        <Row gutter={[24, 0]}>
                            <Col span={24} md={16} className="mb-24">
                                <div style={{ fontSize: "20px" }}>
                                    GIỎ HÀNG
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={[24, 0]}>
                            <Col span={24} md={16} className="mb-24">
                                <Card className="mb-24 cart-line">
                                    <div style={{
                                        display: "flex",
                                        fontSize: "16px"
                                    }}>
                                        {/* <div style={{ width: "65%" }}><Checkbox className='cart-all' style={{ marginRight: "10px" }} onChange={() => ChooseBook(-1)}></Checkbox>Chọn cả (Sản phẩm)</div> */}
                                        <div style={{ width: "60%" }}>Sản phẩm</div>
                                        <div style={{ width: "20%" }}>Số lượng</div>
                                        <div style={{ width: "20%" }}>Thành tiền</div>
                                    </div>
                                </Card>
                                <Card>
                                    <div style={{
                                        // display: "flex",
                                        // fontSize: "16px"
                                    }}>
                                        {
                                            cart?.books?.map((book, index) => (
                                                <div
                                                    className={`cart-line-book ${index == 0 ? "first" : ""}`}
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                    }}>
                                                    <div style={{ width: "60%", display: "flex" }}>
                                                        <Checkbox checked={checkes[index]} className='cart-all' style={{ marginRight: "30px" }} onChange={() => ChooseBook(index)}></Checkbox>
                                                        <Image src={book?.image} preview={false}
                                                            onClick={() => navigate(`/book/${cart?.books[index]?.id}`)}
                                                            style={{
                                                                width: "100px",
                                                                height: "100px",
                                                                objectFit: "cover",
                                                                cursor: "pointer"
                                                            }}></Image>
                                                        <div style={{
                                                            paddingLeft: "20px",
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            justifyContent: "space-between"
                                                        }}>
                                                            <div style={{ fontSize: "16px" }}>{book?.title}</div>
                                                            <div style={{
                                                                fontSize: "18px",
                                                                fontWeight: "600"
                                                            }}>
                                                                {Intl.NumberFormat('vi-VN', {
                                                                    style: 'currency',
                                                                    currency: 'VND',
                                                                }).format(book?.price)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div style={{ width: "20%" }}>
                                                        <div style={{
                                                            display: "flex",
                                                            border: "1px solid rgba(180,180,180,0.8)",
                                                            borderRadius: "2px",
                                                            height: "30px",
                                                            width: "90px"

                                                        }}>
                                                            <button style={{
                                                                border: "0",
                                                                padding: "0px 10px",
                                                                fontSize: "18px",
                                                                fontWeight: "600"
                                                            }} disabled={cart?.quantities[index]?.count == 1 ?? true} onClick={() => ChangeQuantity(index, -1)}>-</button>
                                                            <div style={{
                                                                width: "40px",
                                                                display: "flex",
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                                fontSize: "18px",
                                                                fontWeight: "600"
                                                            }}>{cart?.quantities[index]?.count}</div>
                                                            <button style={{
                                                                border: "0",
                                                                padding: "0px 10px",
                                                                fontSize: "18px",
                                                                fontWeight: "600"
                                                            }} onClick={() => ChangeQuantity(index, 1)}>+</button>
                                                        </div>
                                                    </div>
                                                    <div
                                                        style={{
                                                            width: "20%",
                                                            display: "flex",
                                                            justifyContent: "space-between",
                                                            fontSize: "20px",
                                                            fontWeight: "600"
                                                        }}
                                                    >
                                                        <div style={{ color: "rgb(255, 61, 61)", }}>
                                                            {Intl.NumberFormat('vi-VN', {
                                                                style: 'currency',
                                                                currency: 'VND',
                                                            }).format(book?.price * cart?.quantities[index]?.count)}
                                                        </div>
                                                        <div>
                                                            <DeleteOutlined onClick={() => ChangeQuantity(index, -cart?.quantities[index]?.count)} />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </Card>
                            </Col>
                            <Col span={24} md={8} className="mb-24">
                                <Card
                                    title={(
                                        <>THÀNH TIỀN</>
                                    )}>
                                    <div>
                                        <div style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center"
                                        }}>
                                            <div>
                                                Tổng số tiền (VAT)
                                            </div>
                                            <div
                                                style={{
                                                    color: "rgb(255, 61, 61)",
                                                    fontSize: "25px",
                                                    fontWeight: "600"
                                                }}>
                                                {Intl.NumberFormat('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                }).format(total)}
                                            </div>
                                        </div>
                                        <button style={{
                                            width: "100%",
                                            height: "40px",
                                            borderRadius: "2px",
                                            backgroundColor: "rgb(255, 61, 61)",
                                            border: "1px solid rgb(255, 61, 61)",
                                            color: "#fff",
                                            fontSize: "16px",
                                            marginTop: "20px"
                                            // fontWeight:"600"
                                        }} onClick={CheckOut}>THANH TOÁN</button>
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </div>
            }
        </>
    )
}

export default Cart