import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios'
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Row, Col,
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators
} from 'reactstrap'

const baseURL = "/api" //http://localhost:3001/api

export function Product({ product }) {
  return (
    <Card className="rounded-0 shadow-sm card-width ml-2 mr-2 mt-2 mb-2">
      <CardImg top src={product.img} />
      <CardBody>
        <Link className="stretched-link product-link" to={`/product/${product._id}`}><CardTitle tag="h5">{product.title}</CardTitle></Link>
        <CardText tag="p">₱{product.price.toLocaleString()}</CardText>
      </CardBody>
    </Card>
  )
}

export function Products(props) {
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get(`${baseURL}/product/all`)
      .then((response) => {
        setProducts(response.data.products)
      })
  }, [])

  return (
    <Row className="justify-content-center mt-3 mb-3">
      {products.map(product => <Product key={product._id} product={product}></Product>)}
    </Row>
  )
}

export function FeaturedProducts(props) {
  const [fproducts, setFProducts] = useState([])
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    axios.get(`${baseURL}/fproduct/all`)
      .then(response => {
        console.log(response.data.products)
        setFProducts(response.data.products)
      })
  }, [])

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === fproducts.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? fproducts.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slides = fproducts.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.bannerImg}
      >
        <img className="border d-block w-100" src={item.bannerImg} />
      </CarouselItem>
    );
  });

  return (
    <Row className="justify-content-center mt-3 mb-3">
      <Col sm="8">
        <Carousel
          activeIndex={activeIndex}
          next={next}
          previous={previous}
        >
          <CarouselIndicators items={fproducts} activeIndex={activeIndex} onClickHandler={goToIndex} />
          {slides}
          <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
          <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
        </Carousel>
      </Col>
    </Row>
  )
}
