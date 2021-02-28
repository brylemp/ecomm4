import { useState, useEffect } from 'react'
import { Row, Col, Container, Card, CardTitle, CardBody } from 'reactstrap';
import axios from 'axios'

import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

const baseURL = "/api" //http://localhost:3001/api

function CartCard({item}){
  return (
    <Card className="border border-0 rounded-0 w-100 mb-2">
      <Row className="shadow-sm no-gutters" style={{height: "100%"}}>
        <Col sm="3" className="d-flex justify-content-center">
          <img src={item.img} className="img-fluid" width="100%"/>
        </Col>
        <Col sm="9" className="d-flex">
          <CardBody className="d-flex justify-content-between align-items-center">
            <Col md="4" className="align-middle">
              <CardTitle tag="h5">{item.title}</CardTitle>
            </Col>
            <input className="number-input" type="number"/>
            <h5 className="card-text">₱5,000</h5>
            <form method="POST">
                <button id="deleteButton"><i id="deleteIcon" className="las la-trash-alt" style={{ fontSize: "25px" }}></i></button>
            </form>
          </CardBody>
        </Col>
      </Row>
    </Card>
  )
}

function CheckOutSummaryCard({item}){
  return(
    <>
      <li className="list-group-item d-flex justify-content-between">
        {item.title}
        <div></div>
        <span>₱1000 x 1</span>
      </li>
    </>
  )
}

function CartPage(props) {
  const [cart, setCart] = useState()
  const [loading, setLoading] = useState(true)
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    axios.get(`${baseURL}/cart`, { withCredentials: true })
      .then(response => {
        setCart(response.data.cart)
        setLoading(false)
      })
  }, [])

  const addItem = () => {
    axios.post(`${baseURL}/cart/addItem/60086c23afa4b81c48350670`, {
      quantity: 1,
    }, { withCredentials: true })
      .then(response => {
        setCart(response.data.cart)
        setLoading(false)
      })
  }

  const showCart = () => {
    console.log(cart)
  }

  const override = css`
			display: block;
			margin: 0 auto;
			border-color: black;
	`;

  const material = () =>{
    return (
      <Row className="mt-2 pt-5 d-flex justify-content-center">
        <div id="error" className="alert alert-danger d-none"></div>
        <div id="message" className="alert alert-success d-none"></div>
        {/* <div key={item.productId}>{item.productId} - {item.quantity}</div> */}
        <Col md="7" id="cartItems">
          {cart.items.map(item => <CartCard key={item.productId} item={item}></CartCard>)}
        </Col>
        <Col md="5">
          <Card className="rounded-0 w-100">
            <CardTitle tag="h3" className="ml-5 mr-5 mt-5 mb-5">
              Checkout Summary
            </CardTitle>
          </Card>
          <ul className="list-group rounded-0" id="summaryCheckout">
            {cart.items.map(item => <CheckOutSummaryCard key={item.productId} item={item}></CheckOutSummaryCard>)}
            
            <li className="list-group-item d-flex justify-content-between">
              <h5>Delivery Fee</h5>
              <div></div>
              ₱100
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <h4>Total</h4>
              <div></div>
              <b id="total">₱1100</b> 
            </li>
          </ul>
          <div class="mt-2 d-flex justify-content-end">
            <form method="POST">
              <button class="btn btn-dark" type="submit">Checkout</button>
            </form>
          </div>
        </Col>
      </Row>
    )
  }

  return (
    <Container>
      {/* <button onClick={material}>showCart</button>
      <button onClick={addItem}>AddItem</button> */}
      {loading ? <ClipLoader color={color} loading={loading} css={override} size={150} /> : material()}
    </Container>
  )
}

export default CartPage