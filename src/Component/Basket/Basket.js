import React, { Fragment, useState, useEffect } from 'react';
import { Container, Card, Row, Col, Button, CardText } from 'reactstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import './Basket.css';

function Basket(props) {
  const [totalBasket, setTotalBasket] = useState([])

  useEffect(() => {
    setTotalBasket(props.basket);
    console.log(totalBasket)
  });


  const totalOneOrder = (index) => {
    const total = props.basket[index].adultPlaces * props.basket[index].adultPrice + props.basket[index].childrenPlaces * props.basket[index].childPrice
    return total
  }

  const totalPrice = (basket) => {
    let totalPrice = 0;
    basket.map(article => {
      return totalPrice += article.totalOrder;
    })
    return totalPrice;
  }

  const clickPost = () => {
    const url = 'http://localhost:8000/orders';
    totalBasket.map(order => {
      const validateOrders = {
        id_show: order.id,
        adult_place: order.adultPlaces,
        child_place: order.childrenPlaces
      }
      axios.post(url, validateOrders)
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error, 'probleme');
        });
    })
  };

  return (
    <div>
      {totalBasket.length > 0 ?
        (
          <Fragment>
            <Container className='blocBasket'>
              
                {totalBasket.length > 0 ? totalBasket.map((article, index) => (
                  <Card body>
                  <Row>
                    <Col sm="2" className="commentHome">
                      <CardText className='score'> {article.show}</CardText>
                    </Col>
                    <Col sm="2" className="commentHome">
                      <CardText className='score'> {article.city}</CardText>
                    </Col>
                    <Col sm="5" className="commentHome">
                      <CardText className='score'> Nombre de places Adultes : {article.adultPlaces} ({article.adultPrice} €)</CardText>
                      <CardText className='score'> Nombre de places Enfants : {article.childrenPlaces} ({article.childPrice} €)</CardText>
                    </Col>
                    <Col sm="1" className="commentHome"></Col>
                    <Col sm="2" className="commentHome">
                      <CardText className='score'> {totalOneOrder(index)} € </CardText>
                    </Col>
                  </Row>
                  </Card>
                )) : ""}
              
            </Container>
            <Container>
              <CardText className='totalPrice'>Total : {totalPrice(props.basket)} €</CardText>
              <Button onClick={clickPost}>Valider ma commande</Button>
            </Container>
          </Fragment>)
        : (<h2>Votre panier est vide</h2>)}
    </div>
  );
}

const mapStateToProps = state => ({
  basket: state.basket
});

export default connect(mapStateToProps)(Basket);

