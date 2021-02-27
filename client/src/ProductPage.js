import { useState, useEffect } from 'react'
import { Row, Col, Container } from 'reactstrap';
import { useParams } from "react-router-dom";

import axios from 'axios'
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

function ProductPage(props) {
	const [product, setProducts] = useState({})
	const [loading, setLoading] = useState(true)
	const [color, setColor] = useState("#ffffff");
	const { id } = useParams()

	useEffect(() => {
		axios.get(`http://localhost:3001/api/product/${id}`)
			.then((response) => {
				console.log(response.data.product)
				setProducts(response.data.product)
				setLoading(false)
			})
	}, []);

	const override = css`
			display: block;
			margin: 0 auto;
			border-color: black;
	`;

	const material = () => {
		return (
			<>
				<Row className="mt-5 ml-5 mr-5 row-bg shadow-sm">
					<Col sm="5" className="d-flex justify-content-center">
						<img src={product.img} className="img-fluid" width="100%" style={{ objectFit: "cover" }} />
					</Col>
					<Col sm="7" className="mt-5 mb-5">
						<h1>{product.title}</h1>
						<h2>₱{typeof (product.price) === 'undefined' ? '' : product.price.toLocaleString()} </h2>
						<b>AVAILABLE</b>
						<form method="POST" className="mt-5">
							<div>
								<input className="mb-2 number-input" type="number" name="quantity" />
							</div>
							<div>
								<input type="submit" value="Add to Cart" className="btn btn-dark" />
							</div>
						</form>
						<Row className="mt-5 pr-3 pl-2 d-flex align-items-center">
							<p dangerouslySetInnerHTML={{ __html: product.desc }}></p>
						</Row>
					</Col>
				</Row>
				<Row className="mt-3 ml-5 mr-5 row-bg shadow-sm">
					<Col>
						<h2 className="mt-4 ml-4">Product Details</h2>
						<div className="mt-3 mb-5 pl-5">
							<p dangerouslySetInnerHTML={{ __html: product.details }}></p>
						</div>
					</Col>
				</Row>
			</>
		)
	}

	return (
		<Container>
			{loading ? <ClipLoader color={color} loading={loading} css={override} size={150} /> : material()}
		</Container>
	)
}

export default ProductPage