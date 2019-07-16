import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import resaIndex from '../../indexResaAction';
import editBasket from '../../basketAction';
import { Container, FormGroup, Input, Label, Button, Row, Col, CardText, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import 'moment/locale/fr';
import moment from 'moment';
import './Shows.css';

moment.locale('fr');

function Shows(props) {
  const [totalBasket, setTotalBasket] = useState([])
  const [shows, setShows] = useState([])
  const [modal, setModal] = useState(false)
  const [selectPlacesAdult, setSelectPlacesAdult] = useState(0)
  const [selectPlacesChildren, setSelectPlacesChildren] = useState(0)


  useEffect(() => {
    var url = 'http://localhost:8000/shows';
    axios.get(url)
      .then((result) => {
        setShows(result.data)
      })
  }, []);

  useEffect(() => {
    setTotalBasket(props.basket);
  }, []);

  const addShow = index => {
    props.dispatch(resaIndex(index));
    setModal(!modal)
  }

  const handleSelectPlacesAdult = (e) => {
    setSelectPlacesAdult(e.target.value)
    console.log(selectPlacesAdult)
  }

  const handleSelectPlacesChildren = (e) => {
    setSelectPlacesChildren(e.target.value)
  }

  const addBasket = () => {
    const order = {
      show : shows[props.indexResa].name,
      city : shows[props.indexResa].city,
      adultPrice : shows[props.indexResa].price_adult,
      adultPlaces : selectPlacesAdult,
      adultPrice : shows[props.indexResa].price_child,
      childrenPlaces : selectPlacesChildren
    }
    setTotalBasket([...totalBasket, order])
    console.log(order)
    props.dispatch(editBasket(totalBasket))
  }

  return (
    <div className='showComponent'>
      <h2>Nos spectacles en cours</h2>
      <Container>
        {shows ? shows.map((show, index) => (
          <Row>
            <Col sm="3" className="commentHome">
              <CardText className='CardText'>{show.name}</CardText>
            </Col>
            <Col sm="3" className="commentHome">
              <CardText className='CardText'>{show.city}</CardText>
            </Col>
            <Col sm="3" className="commentHome">
              <CardText className='CardText'>{moment(show.date_show).format("dddd Do MMMM YYYY")}</CardText>
            </Col>
            <Col sm="3" className="commentHome">
              <Button onClick={e => addShow(index)}>Réserver</Button>
            </Col>
          </Row>
        )) : ""}

      </Container>

      <div>
        <Modal isOpen={modal} toggle={addShow} >
          <ModalHeader toggle={addShow}>Réserver vos billets</ModalHeader>
          <ModalBody>
            {shows[props.indexResa] ?
              <CardText>
                Vous souhaitez réservé le spectacle : <span>{shows[props.indexResa].name} à {shows[props.indexResa].city} le {moment(shows[props.indexResa].date_show).format("dddd Do MMMM YYYY")}</span>
              </CardText> : null}
            <Row>
              <Col sm="4" className="commentHome">
                <CardText className='CardText'>Tarif Adulte : {shows[props.indexResa] && shows[props.indexResa].price_adult}€</CardText>
              </Col>
              <Col sm="4" className="commentHome">
                <FormGroup>
                  <Input type="select" name="select" id="exampleSelect" onChange={handleSelectPlacesAdult}>
                    <option>1</option>
                    <option>0</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col sm="4" className="commentHome">
                <CardText className='CardText'>Tarif Enfant : {shows[props.indexResa] && shows[props.indexResa].price_child}€</CardText>
              </Col>
              <Col sm="4" className="commentHome">
                <FormGroup>
                  <Input type="select" name="select" id="exampleSelect" onChange={handleSelectPlacesChildren}>
                    <option>1</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={addBasket}>Ajouter au panier</Button>
            <Button color="secondary">Retour</Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  indexResa: state.indexResa,
  basket:state.basket
});

export default connect(mapStateToProps)(Shows);
