import { Button, Card, Carousel, Col, Image, List, Radio, Row, Space, Statistic, Table, Upload } from 'antd'
import React, { useEffect, useState } from 'react'
import { ToTopOutlined, PlusOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom';
import "./Home.css"
import { GetBookById, GetBookByIds, GetBooks, GetBooksRecomend } from '../../axios/BookAPI';
import { GetTags } from '../../axios/TagAPI';
const contentStyle = {
    margin: 0,
    height: '400px',
    color: '#000',
    lineHeight: '400px',
    textAlign: 'center',
    background: '#000',
    borderRadius: "5px",
    width: "100%",
    objectFit: "contain"
};
const data = [
    {
        title: 'Văn học',
        image: 'https://streetstyleshop.vn/wp-content/uploads/2020/08/gi%C3%A0y-th%E1%BB%83-thao-nam-m%E1%BB%9Bi-nh%E1%BA%A5t-2-1.jpg',
    },
    {
        title: 'Tiểu thuyết',
        image: 'https://cungnhaulamgiau.vn/index/img/product/2023/09/03/CNLG_1693758102.jpg',
    },
    {
        title: 'Thiếu nhi',
        image: 'https://bizweb.dktcdn.net/100/301/479/products/giay-cau-long-bong-chuyen-nam-nu-gia-re-3.jpg?v=1641268394260',
    },
    {
        title: 'Kinh tế',
        image: 'https://pos.nvncdn.com/be3294-43017/art/20220612_UQ6ghXLo6AejeaPwUIJqfrfs.jpg',
    },
    {
        title: 'Tâm lý',
        image: 'https://product.hstatic.net/1000011840/product/giay-banh-xe-giay-truot-patin-tre-em-gb01_master.jpg',
    },
    {
        title: 'Tâm linh',
        image: 'https://cdn0.fahasa.com/media/wysiwyg/Duy-VHDT/Danh-muc-san-pham/T_m_linh.jpg',
    },
    {
        title: 'Truyện',
        image: 'https://cdn0.fahasa.com/media/wysiwyg/Duy-VHDT/Danh-muc-san-pham/_am_m_.jpg'
    },
    {
        title: 'Ngoại ngữ',
        image: 'https://cdn0.fahasa.com/media/catalog/product/9/7/9781108430425.jpg'
    },
];
function Home() {
    const navigate = useNavigate();
    const [books, setBook] = useState([])
    const [bookRecomends, setBookRecomend] = useState([])
    const [tags, setTag] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        var res = await GetBooks(1, 5, "", "ID")
        if (res?.code == 200) setBook(res?.data)

        var res = await GetBooksRecomend(3)
        if (res?.code == 200) {
            var response = await GetBookByIds(res?.data)
            if(response?.code == 200) setBookRecomend(response?.data)
        }

        var res = await GetTags(1, 10000, "", "ID")
        if (res?.code == 200) setTag(res?.data)
    }
    return (
        <div className='home-main tabled'
            style={{
                marginTop: 20
            }}>
            <Row gutter={[24, 0]} className="mb-24">
                <Col span={24} md={24}>
                    <Card
                        bordered={false}
                        className="header-solid h-full ant-invoice-card"
                        bodyStyle={{
                            padding: '0px',
                            borderRadius: "0px"
                        }}
                        cover={
                            <Carousel autoplay>
                                <div>
                                    <img src='https://cdn.authentic-shoes.com/wp-content/uploads/2024/02/Authentic-Shoes-Jordan-4-Bread-2048x648.webp' style={contentStyle}></img>
                                </div>
                                <div>
                                    <img src='https://cdn.authentic-shoes.com/wp-content/uploads/2024/01/BrandCampaign_LaunchBanners_Prim-1-2048x623.webp' style={contentStyle}></img>
                                </div>
                                <div>
                                    <img src='https://cdn.authentic-shoes.com/wp-content/uploads/2024/01/AJ1_Yellow_Ochre_Release_DayPrim-2048x625.webp' style={contentStyle}></img>
                                </div>
                                <div>
                                    <img src='https://cdn.authentic-shoes.com/wp-content/uploads/2023/09/image-54-2048x711-2.webp' style={contentStyle}></img>
                                </div>
                                <div>
                                    <img src='https://cdn.authentic-shoes.com/wp-content/uploads/2024/01/Designer-Below-Retail-Apparel-an-2048x648.webp' style={contentStyle}></img>
                                </div>
                            </Carousel>
                        }
                    >
                    </Card>
                </Col>
            </Row>
            <Row gutter={[24, 0]} className="mb-24">
                <Col xs={24} md={24}>
                    <Card
                        title={
                            <div style={{
                                display: "flex",
                                alignItems: "center"
                            }}>
                                <span className='home-icon-tag' style={{
                                    marginRight: "10px"
                                }}></span>
                                <h3 style={{
                                    margin: 0
                                }}>
                                    DANH MỤC SẢN PHẨM
                                </h3>
                            </div>
                        }
                        bordered={false}
                        className="home-card-list-tag"
                        style={{
                            borderRadius: 0
                        }}
                    >
                        <List
                            className='home-list-tag'
                            grid={{
                                gutter: 12,
                                xs: 2,
                                sm: 2,
                                md: 4,
                                lg: 4,
                                xl: 8,
                                xxl: 8,
                            }}
                            dataSource={tags}
                            renderItem={(tag, index) => (
                                <List.Item>
                                    <Card bordered={false} style={{
                                        outline: "none",
                                        boxShadow: "none",
                                    }}>
                                        <Link state={{ key: tag.id}} to={{ pathname: '/book' }} style={{ color: "#000" }}>
                                            <div
                                                className='home-tag-item'
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "center",
                                                }}>
                                                <Image src={data[index].image} preview={false}
                                                    height={80}
                                                    width={80}
                                                ></Image>
                                                <span href=""
                                                    className='home-tag-title'
                                                >{tag.name}</span>
                                            </div>
                                        </Link>
                                    </Card>
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
            </Row>
            <Row gutter={[24, 0]} className="mb-24">
                <Col span={24} md={8}>
                    <Card
                        style={{ borderRadius: "0px" }}
                        bordered={false}
                        className="header-solid h-full ant-invoice-card"
                        bodyStyle={{
                            padding: '0px'
                        }}
                    >
                        <Image
                            style={{
                                objectFit: "cover"
                            }}
                            preview={false}
                            // height={210}
                            width={"100%"}
                            src='https://theme.hstatic.net/1000150581/1001194384/14/lookbook_1_image.jpg?v=365'
                        />
                    </Card>
                </Col>
                <Col span={24} md={8}>
                    <Card
                        style={{ borderRadius: "0px" }}
                        bordered={false}
                        className="header-solid h-full ant-invoice-card"
                        bodyStyle={{
                            padding: '0px'
                        }}
                    >
                        <Image
                            style={{
                                objectFit: "cover"
                            }}
                            preview={false}
                            // height={210}
                            width={"100%"}
                            src='https://theme.hstatic.net/1000150581/1001194384/14/lookbook_2_image.jpg?v=365'
                        />
                    </Card>
                </Col>
                <Col span={24} md={8}>
                    <Card
                        style={{ borderRadius: "0px" }}
                        bordered={false}
                        className="header-solid h-full ant-invoice-card"
                        bodyStyle={{
                            padding: '0px'
                        }}
                    >
                        <Image
                            style={{
                                objectFit: "cover"
                            }}
                            preview={false}
                            // height={210}
                            width={"100%"}
                            src='https://theme.hstatic.net/1000150581/1001194384/14/lookbook_3_image.jpg?v=365'
                        />
                    </Card>
                </Col>
            </Row>
            <Row gutter={[24, 0]} className="mb-24">
                <Col span={24} md={24}>
                    <Card style={{
                        borderRadius: 0
                    }}
                        className='home-card-list-book'
                        title={
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center"
                                }}
                            >
                                <span className='home-icon-list-book most'></span>
                                <h3 style={{
                                    margin: 0
                                }}>GIÀY NỔI BẬT</h3>
                            </div>
                        }
                    >
                        <List
                            className='home-list-book'
                            grid={{
                                gutter: 12,
                                xs: 1,
                                sm: 2,
                                md: 3,
                                lg: 4,
                                xl: 5,
                                xxl: 5,
                            }}
                            dataSource={books}
                            renderItem={(item) => (
                                <List.Item>
                                    <Card bordered={false}
                                        style={{
                                            // outline: "none",
                                            borderRadius: 0
                                        }}
                                        className='home-book'
                                    >
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                        }}>
                                            <div style={{
                                                cursor: "pointer"
                                            }}
                                                onClick={() => navigate(`/book/${item?.id}`)}>
                                                <Image src={item?.image} preview={false}
                                                    height={240}
                                                    width={190}
                                                    style={{
                                                        objectFit: "cover"
                                                    }}
                                                ></Image>
                                                <div className='home-book-detail'>
                                                    <Link
                                                        className='home-book-title'
                                                    >
                                                        {item?.title}
                                                    </Link>
                                                    <div className='home-book-detail-price'>
                                                        {Intl.NumberFormat('vi-VN', {
                                                            style: 'currency',
                                                            currency: 'VND',
                                                        }).format(item?.price)}
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </List.Item>
                            )}
                        />
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                        }}>
                            <Button style={{
                                color: "#C92127",
                                border: "2px solid #C92127",
                                fontSize: "18px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                height: "40px",
                                width: "150px"
                            }}
                                onClick={() => navigate("/book")}
                            >Xem thêm</Button>
                        </div>
                    </Card>
                </Col>
            </Row>

            {/* <Row gutter={[24, 0]} className="mb-24">
                <Col span={24} md={24}>
                    <Card style={{
                        borderRadius: 0
                    }}
                        className='home-card-list-book'
                        title={
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center"
                                }}
                            >
                                <span className='recomend'></span>
                                <h3 style={{
                                    margin: 0
                                }}>GIÀY NỔI BẬT</h3>
                            </div>
                        }
                    >
                        <List
                            className='home-list-book'
                            grid={{
                                gutter: 12,
                                xs: 1,
                                sm: 2,
                                md: 3,
                                lg: 4,
                                xl: 5,
                                xxl: 5,
                            }}
                            dataSource={bookRecomends}
                            renderItem={(item) => (
                                <List.Item>
                                    <Card bordered={false}
                                        style={{
                                            // outline: "none",
                                            borderRadius: 0
                                        }}
                                        className='home-book'
                                    >
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                        }}>
                                            <div style={{
                                                cursor: "pointer"
                                            }}
                                                onClick={() => navigate(`/book/${item?.id}`)}>
                                                <Image src={item?.image} preview={false}
                                                    height={240}
                                                    width={190}
                                                    style={{
                                                        objectFit: "cover"
                                                    }}
                                                ></Image>
                                                <div className='home-book-detail'>
                                                    <Link
                                                        className='home-book-title'
                                                    >
                                                        {item?.title}
                                                    </Link>
                                                    <div className='home-book-detail-price'>
                                                        {Intl.NumberFormat('vi-VN', {
                                                            style: 'currency',
                                                            currency: 'VND',
                                                        }).format(item?.price)}
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </List.Item>
                            )}
                        />
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                        }}>
                            <Button style={{
                                color: "#C92127",
                                border: "2px solid #C92127",
                                fontSize: "18px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                height: "40px",
                                width: "150px"
                            }}
                                onClick={() => navigate("/book")}
                            >Xem thêm</Button>
                        </div>
                    </Card>
                </Col>
            </Row> */}
        </div>
    )
}

export default Home