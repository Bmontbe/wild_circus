import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { FormControl } from 'react-bootstrap';
import resaIndex from '../../indexResaAction';
import editBasket from '../../basketAction';
import editPlaces from '../../placesAction';
import { Container, Form, FormGroup, Input, Label, Button, Row, Col, CardText, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'underscore';
import axios from 'axios';
import 'moment/locale/fr';
import moment from 'moment';
import './Shows.css';

moment.locale('fr');

function Shows(props) {
  const [totalBasket, setTotalBasket] = useState([])
  const [shows, setShows] = useState([])
  const [newShows, setNewShows] = useState([])
  const [modal, setModal] = useState(false)
  const [selectPlacesAdult, setSelectPlacesAdult] = useState(0)
  const [selectPlacesChildren, setSelectPlacesChildren] = useState(0)
  const [places, setPlaces] = useState([])
  const [searchShow, setSearchShow] = useState('')

  useEffect(() => {
    let temp = [...shows];
    console.log(temp)
    temp = _.filter(temp, (event) => {
      return event.city.toLowerCase().includes(searchShow.toLowerCase())
        || event.code_postal.includes(searchShow)
        || event.name.toLowerCase().includes(searchShow.toLowerCase());
    })
    setNewShows(temp);
  }, [searchShow])

  const handleSearchShow = (e) => {
    setSearchShow(e.target.value)
  }

  useEffect(() => {
    var url = 'http://localhost:8000/shows';
    axios.get(url)
      .then((result) => {
        setShows(result.data)
        setNewShows(result.data)
        console.log(result)
      })
  }, []);

  useEffect(() => {
    var url = 'http://localhost:8000/places';
    axios.get(url)
      .then((result) => {
        setPlaces(result.data)
        props.dispatch(editPlaces(result.data))
        console.log(result)
      })
  }, []);

  useEffect(() => {
    setTotalBasket(props.basket)
  }, []);

  useEffect(() => {
    props.dispatch(editBasket(totalBasket));
  });

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
    const totalOneOrder = (index) => {
      const total = selectPlacesAdult * shows[props.indexResa].price_adult + selectPlacesChildren * shows[props.indexResa].price_child
      return total
    }
    const order = {
      id: shows[props.indexResa].id,
      show: shows[props.indexResa].name,
      city: shows[props.indexResa].city,
      adultPrice: shows[props.indexResa].price_adult,
      adultPlaces: selectPlacesAdult,
      childPrice: shows[props.indexResa].price_child,
      childrenPlaces: selectPlacesChildren,
      totalOrder: totalOneOrder()
    }
    setTotalBasket([...totalBasket, order])
    setModal(!modal)
    console.log(order)
  }

  const quantity = (id) => {
    let result = {}
    props.places.map((item, index) => {
      if (id === item.id) {
        if (item.num_places <= (item.total_adult + item.total_child)) {
          result = { text: "Plus de places", statut: true }
        } else {
          result = { text: item.num_places - (item.total_adult + item.total_child), statut: false }
        }
      }
    })
    return result
  }

  return (
    <div className='showComponent'>
      <h2>Nos spectacles en cours</h2>

      <Container>
        <Form className="searchBar" inline> Rechercher
        <FormControl type="text" placeholder="ville / code postal / spectacle" className="mr-sm-2 ml-sm-2" onChange={handleSearchShow} />
        </Form>
        {newShows ? newShows.map((show, index) => (
          <Row>
            <Col sm="3" className="commentHome">
              <CardText className='CardText'>{show.name}</CardText>
            </Col>
            <Col sm="2" className="commentHome">
              <CardText className='CardText'>{show.city}</CardText>
            </Col>
            <Col sm="3" className="commentHome">
              <CardText className='CardText'>{moment(show.date_show).format("dddd Do MMMM YYYY")}</CardText>
            </Col>
            <Col sm="2" className="commentHome">
              {quantity(show.id).statut ? <Button disabled className="noPlace">Réserver</Button> : <Button onClick={() => addShow(index)}>Réserver</Button>}
            </Col>
            <Col sm="2" className="commentHome">
              <CardText className='CardText'>{show.id && quantity(show.id).text}</CardText>
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
                    <option>0</option>
                    <option>1</option>
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
                    <option>0</option>
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
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  indexResa: state.indexResa,
  basket: state.basket,
  places: state.places
});

export default connect(mapStateToProps)(Shows);
