import React from 'react'
import './Footer.css'
import { Card, Carousel, Col, Row } from 'antd'
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
function Footer() {
  return (
    <div className='footer-main'>
      <Row gutter={[24, 0]} className="mb-24">
        <Col span={24} md={24}>
          <img src=""></img>
        </Col>
        {/* <Col span={24} md={9}>
          <Card
            bordered={false}
            className="header-solid h-full ant-invoice-card"
            bodyStyle={{
              display: 'none',
              borderRadius: "0px"
            }}
            cover={
              <Carousel autoplay>
                <div>
                  <img src='https://cdn0.fahasa.com/media/magentothem/banner7/Manga_mainbanner_T10_Slide_840x320_1.jpg' style={contentStyle}></img>
                </div>
                <div>
                  <img src='https://cdn0.fahasa.com/media/magentothem/banner7/NCCMcBooksT1023_Silver_BannerSlide_840x320.jpg' style={contentStyle}></img>
                </div>
                <div>
                  <img src='https://cdn0.fahasa.com/media/magentothem/banner7/WimpyKid_banner_840x320.jpg' style={contentStyle}></img>
                </div>
                <div>
                  <img src='https://cdn0.fahasa.com/media/magentothem/banner7/NCCDinhTiT1023_Diamond_BannerSlide_840x320.jpg' style={contentStyle}></img>
                </div>
                <div>
                  <img src='https://cdn0.fahasa.com/media/magentothem/banner7/NCC1980BooksT1023_Gold_BannerSlide_840x320.jpg' style={contentStyle}></img>
                </div>
              </Carousel>
            }
          >
          </Card>
        </Col>
        <Col span={24} md={9}>
          <Card
            bordered={false}
            className="header-solid h-full ant-invoice-card"
            bodyStyle={{
              display: 'none',
              borderRadius: "0px"
            }}
            cover={
              <Carousel autoplay>
                <div>
                  <img src='https://cdn0.fahasa.com/media/magentothem/banner7/Manga_mainbanner_T10_Slide_840x320_1.jpg' style={contentStyle}></img>
                </div>
                <div>
                  <img src='https://cdn0.fahasa.com/media/magentothem/banner7/NCCMcBooksT1023_Silver_BannerSlide_840x320.jpg' style={contentStyle}></img>
                </div>
                <div>
                  <img src='https://cdn0.fahasa.com/media/magentothem/banner7/WimpyKid_banner_840x320.jpg' style={contentStyle}></img>
                </div>
                <div>
                  <img src='https://cdn0.fahasa.com/media/magentothem/banner7/NCCDinhTiT1023_Diamond_BannerSlide_840x320.jpg' style={contentStyle}></img>
                </div>
                <div>
                  <img src='https://cdn0.fahasa.com/media/magentothem/banner7/NCC1980BooksT1023_Gold_BannerSlide_840x320.jpg' style={contentStyle}></img>
                </div>
              </Carousel>
            }
          >
          </Card>
        </Col> */}
      </Row>
    </div>
  )
}

export default Footer