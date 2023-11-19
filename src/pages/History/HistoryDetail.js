import { Card, Col, Image, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import Menu from '../../components/Menu/Menu'
import Waiting from '../Waiting/Waiting'
import "./HistoryDetail.css"
import { useNavigate, useParams } from 'react-router-dom'
import { GetOrderById } from '../../axios/OrderAPI'

function HistoryDetail() {
    const navigate = useNavigate()
    const [wait, setWait] = useState(false)
    const [history, setHistory] = useState([])
    const param = useParams()
    useEffect(() => {
        fecthData()
    }, [])
    const fecthData = async () => {
        setWait(true)
        var res = await GetOrderById(param?.id)
        setHistory(res?.data)
        setWait(false)
    }

    const CalculateMoney = (books, quantities) => {
        var total = 0;
        for (var i = 0; i < books?.length; i++) {
            total += books[i]?.price * quantities[i]?.count
        }
        return total
    }
    return (
        <>

            {
                wait ? <Waiting /> : <></>
            }
            <div className='main-history-detail'>
                <Row gutter={[24, 0]}>
                    <Col span={24} md={6}>
                        <div className='menu-account'>
                            <Menu />
                        </div>
                    </Col>
                    <Col span={24} md={18}>
                        <Row gutter={[24, 0]} className='mb-24'>
                            <Col span={24} md={24}>
                                <div className='content-history'>
                                    <Card style={{
                                        borderRadius: "0px"
                                    }}
                                        title={(
                                            <div style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center"
                                            }}>
                                                <div style={{ textTransform: "uppercase" }}>
                                                    Chi tiết đơn hàng
                                                </div>
                                            </div>
                                        )}
                                    >
                                        <div className='history-information'>
                                            <div>
                                                Đơn hàng:
                                                <span>
                                                    {
                                                        history?.status == "DON" ? "Đã hoàn thành" :
                                                            history?.status == "CAN" ? "Đã bị hủy" :
                                                                history?.status == "INP" ? "Đang được vận chuyển" :
                                                                    "Đang chờ xác nhận"
                                                    }
                                                </span>
                                            </div>
                                            <div>
                                                Mã đơn hàng:
                                                <span>
                                                    {history?.id}
                                                </span>
                                            </div>
                                            <div>
                                                Tổng tiền:
                                                <span>
                                                    {
                                                        Intl.NumberFormat('vi-VN', {
                                                            style: 'currency',
                                                            currency: 'VND',
                                                        }).format(CalculateMoney(history?.books, history?.quantities))
                                                    }
                                                </span>
                                            </div>
                                            <div>Ghi chú: &nbsp; {history?.description?.length == 0 ? "(Không có)" : history?.description}</div>

                                            <div>
                                                Phương thức vận chuyển:
                                                <span>
                                                    {history?.shippingMode?.name}
                                                </span>
                                            </div>

                                            <div>
                                                Phương thức thanh toán:
                                                <span>
                                                    Thanh toán khi nhận hàng
                                                </span>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </Col>
                        </Row>

                        <Row gutter={[24, 0]} className='mb-24'>
                            <Col span={24} md={24}>
                                <div className='content-address'>
                                    <Card style={{
                                        borderRadius: "0px"
                                    }}
                                        title={(
                                            <div style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center"
                                            }}>
                                                <div style={{ textTransform: "uppercase" }}>
                                                    Địa chỉ
                                                </div>
                                            </div>
                                        )}
                                    >
                                        <div className='history-address'>
                                            <span style={{ fontWeight: "700" }}>
                                                {history?.address?.name + " - " + history?.address?.phone}
                                            </span>
                                            <div>
                                                {history?.address?.street + " / " + history?.address?.state + " / " + history?.address?.city}
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </Col>
                        </Row>

                        <Row gutter={[24, 0]} className='mb-24'>
                            <Col span={24} md={24}>
                                <div className='content-list-book'>
                                    <Card style={{
                                        borderRadius: "0px"
                                    }}
                                        title={(
                                            <div style={{
                                                display: "flex",
                                                // marginBottom: "10px",
                                                // paddingBottom: "10px",
                                                // borderBottom: "1px solid red"
                                            }}>
                                                <div style={{ fontWeight: "700", width: "15%" }}>Hình ảnh</div>
                                                <div style={{ fontWeight: "700", width: "40%" }}>Tên sách</div>
                                                <div style={{ fontWeight: "700", width: "10%" }}>Giá bán</div>
                                                <div style={{ fontWeight: "700", width: "10%" }}>SL</div>
                                                <div style={{ fontWeight: "700", width: "15%" }}>Thành tiền</div>
                                                <div style={{ fontWeight: "700", width: "10%" }}></div>
                                            </div>
                                        )}
                                    >

                                        {
                                            history?.books?.map((book, index) => (
                                                <div style={{
                                                    display: "flex"
                                                }}>
                                                    <div style={{ width: "15%" }}>
                                                        <Image preview={false} src={book?.image} style={{ width: "100%", height: "80px", objectFit: "cover" }} />
                                                    </div>
                                                    <div style={{ width: "40%" }}>
                                                        {book?.title}
                                                    </div>
                                                    <div style={{ width: "10%" }}>
                                                        {
                                                            Intl.NumberFormat('vi-VN', {
                                                                style: 'currency',
                                                                currency: 'VND',
                                                            }).format(book?.price)
                                                        }
                                                    </div>
                                                    <div style={{ width: "10%" }}>
                                                        {history?.quantities[index]?.count}
                                                    </div>
                                                    <div style={{ width: "15%" }}>
                                                        {
                                                            Intl.NumberFormat('vi-VN', {
                                                                style: 'currency',
                                                                currency: 'VND',
                                                            }).format(book?.price * history?.quantities[index]?.count)
                                                        }
                                                    </div>
                                                    {/* <div style={{ width: "10%"}} onClick={() => navigate(`/rating/${param?.id}`)}>
                                                        Đánh giá
                                                    </div> */}
                                                    <div style={{ width: "10%" }}>
                                                        {
                                                            history?.status == "DON" ? <button onClick={() => navigate(`/rating/${book?.id}`)} className='button-rating'>Đánh giá</button> : <></>
                                                        }
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </Card>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default HistoryDetail