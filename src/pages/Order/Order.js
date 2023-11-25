import React, { useEffect, useState } from 'react'
import Waiting from '../Waiting/Waiting'
import { Card, Col, Image, List, Radio, Row, Space, Typography } from 'antd'
import './Order.css'
import { GetAddressByUser } from '../../axios/AccountAPI'
import { CreateOrder, GetShippingModes } from '../../axios/OrderAPI'
import { useNavigate } from 'react-router-dom'

function Order() {
    const [wait, setWait] = useState(false)
    const [total, setTotal] = useState(0)
    const [books, setBook] = useState([])
    const [quantities, setQuantities] = useState([])
    const [address, setAddress] = useState([])
    const [shippingMode, setShippingMode] = useState(1)
    const [shippingModes, setShippingModes] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        fecthData()
    }, [])
    const fecthData = async () => {
        setWait(true)
        console.log(JSON.parse(sessionStorage.getItem('order')));
        setBook(JSON.parse(sessionStorage.getItem('order')).books);
        setQuantities(JSON.parse(sessionStorage.getItem('order')).quantities);

        var res = await GetAddressByUser(sessionStorage.getItem('userId'))
        if (res?.code == 200) {
            setAddress(res?.data[0]);
        }

        var res = await GetShippingModes()
        if (res?.code == 200)
            setShippingModes(res?.data);
        console.log(res?.data);

        var sum = 0;
        for (var index = 0; index < JSON.parse(sessionStorage.getItem('order')).books?.length; index++) {
            sum += JSON.parse(sessionStorage.getItem('order')).books[index]?.price * JSON.parse(sessionStorage.getItem('order')).quantities[index]?.count
        }
        setTotal(sum)

        setWait(false)
    }

    const Order = async () => {
        setWait(true)

        var order = {
            status: "CRE",
            description: "",
            userId: parseInt(sessionStorage.getItem('userId')),
            shippingModeId: shippingMode,
            addressId: address?.id,
            quantitieCounts: [

            ],
            bookIds: [

            ]
        }

        for (var i = 0; i < books?.length; i++) {
            order.bookIds.push(books[i]?.id)
            order.quantitieCounts.push(quantities[i]?.count)
        }

        var res = await CreateOrder(order)
        console.log(res);
        if (res?.code == 200)
            navigate('/account/history')
        console.log(order);
        setWait(false)
    }
    return (
        <>
            {
                wait ? <Waiting /> : <></>
            }
            <div className='main-order'>
                <Row gutter={[24, 0]} className='mb-24'>
                    <Col span={24} md={24}>
                        <Card style={{
                            borderRadius: "0px"
                        }}
                            title={(
                                <div>
                                    ĐỊA CHỈ GIAO HÀNG
                                </div>
                            )}
                        >
                            {
                                address?.name + ' - ' + address?.phone + " | " + address?.street + ", " + address?.state + " , " + address?.city
                            }
                        </Card>
                    </Col>
                </Row>

                <Row gutter={[24, 0]} className='mb-24'>
                    <Col span={24} md={24}>
                        <Card style={{
                            borderRadius: "0px"
                        }}
                            title={(
                                <div>
                                    PHƯƠNG THỨC VẬN CHUYỂN
                                </div>
                            )}
                        >
                            <Radio.Group onChange={(e) => setShippingMode(e.target.value)} value={1}>
                                <Space direction="vertical">
                                    {
                                        shippingModes?.map((item, index) => (
                                            <Radio value={item?.id}>{item?.name}</Radio>
                                        ))
                                    }
                                </Space>
                            </Radio.Group>
                        </Card>
                    </Col>
                </Row>

                <Row gutter={[24, 0]} className='mb-24'>
                    <Col span={24} md={24}>
                        <Card style={{
                            borderRadius: "0px"
                        }}
                            title={(
                                <div>
                                    PHƯƠNG THỨC THANH TOÁN
                                </div>
                            )}
                        >
                            <Radio.Group value={1}>
                                <Space direction="vertical">
                                    <Radio value={1}>Thanh toán khi nhận hàng</Radio>
                                    <Radio value={2} disabled><Image src='https://cdn0.fahasa.com/skin/frontend/base/default/images/payment_icon/ico_vnpay.svg?q=10298' />   VN Pay (Đang phát triển)</Radio>
                                </Space>
                            </Radio.Group>
                        </Card>
                    </Col>
                </Row>

                <Row gutter={[24, 0]} className='mb-24'>
                    <Col span={24} md={24}>
                        <Card style={{
                            borderRadius: "0px"
                        }}
                            title={(
                                <div>
                                    ĐƠN HÀNG
                                </div>
                            )}
                        >
                            {
                                books?.map((book, index) => (
                                    <div
                                        className={`cart-line-book ${index == 0 ? "first" : ""}`}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}>
                                        <div style={{ width: "70%", display: "flex" }}>
                                            <Image src={book?.image} preview={false}
                                                onClick={() => navigate(`/book/${book?.id}`)}
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

                                        <div
                                            style={{
                                                width: "10%",
                                                display: "flex",
                                                justifyContent: "space-between",
                                                fontSize: "18px",
                                                fontWeight: "600"
                                            }}
                                        >
                                            <div>
                                                {quantities[index]?.count}
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
                                                }).format(book?.price * quantities[index]?.count)}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </Card>
                    </Col>
                </Row>

                <Row gutter={[24, 0]} className='mb-24'>
                    <Col span={24} md={24}>
                        <Card style={{
                            borderRadius: "0px"
                        }}
                            title={(
                                <div>
                                    THÀNH TIỀN
                                </div>
                            )}
                        >
                            <div>
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    marginBottom: "12px"
                                }}>
                                    <div style={{ width: "85%", textAlign: "end", fontSize: "18px", fontWeight: "600", }}>Tổng số tiền (VAT)</div>
                                    <div style={{ width: "10%", textAlign: "end", fontSize: "20px", fontWeight: "600", color: "rgb(255, 61, 61)", }}>
                                        {Intl.NumberFormat('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND',
                                        }).format(total)}</div>
                                </div>
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}>
                                    <div className='to-cart' style={{
                                        fontSize: "18px",
                                        fontWeight: "600",
                                        display: "flex",
                                        alignItems: "center"
                                    }} onClick={() => navigate('/cart')}>
                                        <img src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/btn_back.svg?q=10298" style={{ marginRight: "10px" }}></img>
                                        Quay về giỏ hàng
                                    </div>
                                    <button style={{
                                        width: "120px",
                                        height: "40px",
                                        borderRadius: "2px",
                                        backgroundColor: "rgb(255, 61, 61)",
                                        border: "1px solid rgb(255, 61, 61)",
                                        color: "#fff",
                                        fontSize: "16px",
                                        // fontWeight:"600"
                                    }} onClick={Order}>THANH TOÁN</button>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Order