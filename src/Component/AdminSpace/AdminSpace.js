import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { FormControl } from 'react-bootstrap';
import { CardText, Row, Col, Container, Form, FormGroup, Label, Input, Button, Table } from 'reactstrap';
import editShows from '../../Actions/showsAction';
import axios from 'axios';
import 'moment/locale/fr';
import moment from 'moment';
import './AdminSpace.css';
import _ from 'underscore';

moment.locale('fr');

function AdminSpace(props) {
  const [totalOrders, setTotalOrders] = useState([]);
  const [newOrders, setNewOrders] = useState([]);
  const [name, setName] = useState('')
  const [city, setCity] = useState('')
  const [date, setDate] = useState('')
  const [priceAdult, setPriceAdult] = useState('')
  const [priceChild, setPriceChild] = useState('')
  const [codePostal, setCodePostal] = useState('')
  const [places, setPlaces] = useState('')
  const [searchShow, setSearchShow] = useState('')
  const [searchCity, setSearchCity] = useState('')
  const [downOrder, setDownOrder] = useState(false)
  const [downShows, setDownShows] = useState(false)

  useEffect(() => {
    let temp = [...totalOrders];
    temp = _.filter(temp, (event) => {
      return event.city.toLowerCase().includes(searchCity.toLowerCase())
        || event.code_postal.includes(searchCity);
    })
    setNewOrders(temp);
  }, [searchCity])

  useEffect(() => {
    let temp = [...newOrders];
    temp = _.filter(temp, (event) => {
      return event.id.toString().includes(searchShow)
        || event.name.toLowerCase().includes(searchShow.toLowerCase());
    })
    setNewOrders(temp);
  }, [searchShow])

  const handleSearchShow = (e) => {
    setSearchShow(e.target.value)
  }

  const handleSearchCity = (e) => {
    setSearchCity(e.target.value)
    console.log(searchShow)
  }


  const handleName = (e) => {
    setName(e.target.value)
  }

  const handleCity = (e) => {
    setCity(e.target.value)
  }

  const handleDate = (e) => {
    setDate(e.target.value)
  }

  const handlePriceAdult = (e) => {
    setPriceAdult(e.target.value)
  }

  const handlePriceChild = (e) => {
    setPriceChild(e.target.value)
  }

  const handleCodePostal = (e) => {
    setCodePostal(e.target.value)
  }

  const handlePlaces = (e) => {
    setPlaces(e.target.value)
  }

  useEffect(() => {
    var url = 'http://localhost:8000/orders';
    axios.get(url)
      .then((result) => {
        setTotalOrders(result.data);
        setNewOrders(result.data);
        console.log(result)
      })
  }, []);

  useEffect(() => {
    var url = 'http://localhost:8000/shows';
    axios.get(url)
      .then((result) => {
        console.log(result)
        props.dispatch(editShows(result.data))
      })
  }, []);

  const clickPost = () => {
    const url = 'http://localhost:8000/shows';
    const inputShow = {
      name: name,
      city: city,
      date_show: date,
      num_places: places,
      price_adult: priceAdult,
      price_child: priceChild,
      code_postal: codePostal
    }
    axios.post(url, inputShow)
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error, 'probleme');
      });
  };

  const totalOneOrder = (index) => {
    const total = newOrders[index].adult_place * newOrders[index].price_adult + newOrders[index].child_place * newOrders[index].price_child
    return total
  }

  const totalPlaces = () => {
    let addPlaces = 0;
    newOrders.map(order => {
      return addPlaces += order.adult_place + order.child_place;
    })
    return addPlaces;
  }

  const totalEuros = () => {
    let addPlaces = 0;
    newOrders.map(order => {
      return addPlaces += order.adult_place*order.price_adult + order.child_place*order.price_child;
    })
    return addPlaces;
  }

  return (
    <div className='showComponent'>
      <h2>Ajouter un spectacle<i onClick={()=>(setDownShows(!downShows))} class="fas fa-chevron-circle-down"></i></h2>
    {downShows ?
<Fragment>
      <Form inline>
        <Container>
          <Row>
            <Col sm="6" className="commentHome">
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="exampleEmail" className="mr-sm-2">Spectacle</Label>
                <Input type="text" name="name" placeholder="spectacle" onChange={handleName} />
              </FormGroup>
            </Col>
            <Col sm="6" className="commentHome">
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="exampleEmail" className="mr-sm-2">Date</Label>
                <Input type="date" name="name" placeholder="Date" onChange={handleDate} />
              </FormGroup>
            </Col>
            <Col sm="6" className="commentHome">
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="exampleEmail" className="mr-sm-2">Ville</Label>
                <Input type="text" name="name" placeholder="Ville" onChange={handleCity} />
              </FormGroup>
            </Col>
            <Col sm="6" className="commentHome">
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="exampleEmail" className="mr-sm-2">Code Postal</Label>
                <Input type="number" name="name" placeholder="Code Postal" onChange={handleCodePostal} />
              </FormGroup>
            </Col>
            <Col sm="6" className="commentHome">
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="exampleEmail" className="mr-sm-2">Prix Adultes</Label>
                <Input type="number" name="name" placeholder="Prix Adultes" onChange={handlePriceAdult} />
              </FormGroup>
            </Col>
            <Col sm="6" className="commentHome">
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="exampleEmail" className="mr-sm-2">Prix Enfants</Label>
                <Input type="number" name="name" placeholder="Prix Enfants" onChange={handlePriceChild} />
              </FormGroup>
            </Col>
            <Col sm="6" className="commentHome">
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="exampleEmail" className="mr-sm-2">Nombre de places</Label>
                <Input type="number" name="name" placeholder="Nombre de places" onChange={handlePlaces} />
              </FormGroup>
            </Col>
            <Col sm="6" className="commentHome">
              <Button onClick={clickPost}>Ajouter le spectacle</Button>
            </Col>
          </Row>
        </Container>
      </Form>
            <Container>
            <Table>
              <thead>
                <tr>
                  <th>Nom du spactacle</th>
                  <th>Date</th>
                  <th>Ville</th>
                  <th>Code Postal</th>
                  <th>Prix Adultes</th>
                  <th>Prix Enfants</th>
                  <th>Nombre de places</th>
                </tr>
              </thead>
              <tbody>
                {props.shows ? props.shows.map((show, index) => (
                  <tr classeName={moment(show.date_show).format("Do/MM/YYYY") < moment(new Date()).format("Do/MM/YYYY") ? "end":null}>
                    <th scope="row">{show.name}</th>
                    <td>{moment(show.date_show).format("Do/MM/YYYY")}</td>
                    <td>{show.city}</td>
                    <td>{show.code_postal}</td>
                    <td>{show.price_adult}€</td>
                    <td>{show.price_child}€</td>
                    <td>{show.num_places}</td>
                  </tr>
                )) : ""}
              </tbody>
            </Table>
          </Container>
          </Fragment>
      : null}
      
      <hr />
      <h2>Commandes clients : {totalOrders.length}<i onClick={()=>(setDownOrder(!downOrder))} class="fas fa-chevron-circle-down"></i></h2>
      { downOrder ?
      <Container>
        <Form className="searchBar" inline> Rechercher
        <FormControl type="text" placeholder="ville / code postal" className="mb-sm-2 ml-sm-2 mr-sm-2" onChange={handleSearchCity} />
        <FormControl type="text" placeholder="spectacle" className="mb-sm-2 ml-sm-2 mr-sm-2" onChange={handleSearchShow} />
        <CardText>Total : {newOrders.length} commandes - {totalPlaces()} places - {totalEuros()}€</CardText>
        </Form>
        <Table>
          <thead>
            <tr>
              <th>n° commande</th>
              <th>Spectacle</th>
              <th>Ville</th>
              <th>Date</th>
              <th>Adultes</th>
              <th>Enfants</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {newOrders ? newOrders.map((order, index) => (
              <tr>
                <th scope="row">{order.id}</th>
                <td>{order.name}</td>
                <td>{order.city}</td>
                <td>{moment(order.date_show).format("Do/MM/YYYY")}</td>
                <td>{order.adult_place}p - {order.price_adult}€</td>
                <td>{order.child_place}p - {order.price_child}€</td>
                <td>{totalOneOrder(index)}€</td>
              </tr>
            )) : ""}
          </tbody>
        </Table>
      </Container>
      : null}
    </div>
    
  );
}

const mapStateToProps = state => ({
  indexResa: state.indexResa,
  basket: state.basket,
  shows:state.shows
});

export default connect(mapStateToProps)(AdminSpace);