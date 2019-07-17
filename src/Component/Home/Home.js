import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Container, Card, Row, Col, CardImg, Button, CardText, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import moment from 'moment';
import 'moment/locale/fr';
import axios from 'axios';
import './Home.css';

moment.locale('fr');

function Home() {
  const [comments, setComments] = useState([])
  const [button, setButton] = useState(true)
  const [modal, setModal] = useState(false)
  const [score, setScore] = useState('')
  const [pseudo, setPseudo] = useState('')
  const [comment, setComment] = useState('')

  useEffect(() => {
    var url = 'http://localhost:8000/comments';
    axios.get(url)
      .then((result) => {
        console.log(result.data);
        setComments(result.data)
      })
  }, []);

  const seeMore = () => {
    setButton(!button)
  }

  const addComment = () => {
    setModal(!modal)
  }

  const handlePseudo = (e) => {
    setPseudo(e.target.value)
  }

  const handleComment = (e) => {
    setComment(e.target.value)
  }

  const handleScore = (e) => {
    setScore(e.target.value)
  }

  const clickPost = () => {
    const url = 'http://localhost:8000/comments';
    const inputComment = {
      pseudo: pseudo,
      customer_comment: comment,
      score: score
    }
    axios.post(url, inputComment)
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error, 'probleme');
      });
    setComments([...comments, inputComment])
    setPseudo('');
    setComment('');
    setScore('');
    setModal(!modal)
  };

  return (
    <div className="homeComponent">
      <h1>Bienvenue au Wild Circus</h1>
      <Container className='homeCardImg'>
        <Row>
          <Col sm="4" className="picHome">
            <CardImg src={`${process.env.PUBLIC_URL}/assets/pics/magician.jpg`} alt="magician" className="homeImg" />
          </Col>
          <Col sm="4" className="picHome">
            <CardImg src={`${process.env.PUBLIC_URL}/assets/pics/acrobat.jpg`} alt="acrobat" className="homeImg" />
          </Col>
          <Col sm="4" className="picHome">
            <CardImg src={`${process.env.PUBLIC_URL}/assets/pics/clown.jpg`} alt="clown" className="homeImg" />
          </Col>
        </Row>
      </Container>

      <Container>
      <Row>
        <Col sm="9"></Col>
        <Col sm="3">
        <Button onClick={addComment} className>Ajouter un commentaire</Button>
        </Col>
        </Row>
        {button ?
          (<Row>
            <Col sm="6" className="commentHome">
              <Card body className="cardComment">
                <CardText className='score'> {comments.length > 0 ? ` ${comments[comments.length - 1].pseudo} : ${comments[comments.length - 1].score}/5` : null}</CardText>
                <CardText className='comment'>"{comments.length > 0 ? comments[comments.length - 1].customer_comment : null}"</CardText>
              </Card>
            </Col>
            <Col sm="6" className="commentHome">
              <Card body className="cardComment">
                <CardText className='score'> {comments.length > 0 ? ` ${comments[comments.length - 2].pseudo} : ${comments[comments.length - 2].score}/5` : null}</CardText>
                <CardText className='comment'>"{comments.length > 0 ? comments[comments.length - 2].customer_comment : null}"</CardText>
              </Card>
            </Col>
          </Row>) :
          (<Row>
            {comments ? comments.map((comment, index) => (
              <Col sm="6" className="commentHome">
                <Card body className="cardComment">
                  <CardText className='score'> {comment.pseudo} : {comment.score}/5</CardText>
                  <CardText className='comment'>"{comment.customer_comment}"</CardText>
                </Card>
              </Col>
            )) : ""}
          </Row>)}
        <Row>
        <Col sm="3">
        <Button onClick={seeMore} className>{!button ? 'Voir moins' : 'Voir plus'}</Button>
        </Col>
        <Col sm="9"></Col>
        </Row>
      </Container>
      <Modal isOpen={modal} toggle={addComment} >
        <ModalHeader toggle={addComment}>Ajouter un commentaire</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="exampleEmail">Votre pseudo</Label>
              <Input type="text" name="pseudo" placeholder="pseudo" onChange={handlePseudo} />
            </FormGroup>
            <FormGroup>
              <Label for="exampleText">Votre commentaire</Label>
              <Input type="textarea" name="comment" placeholder="Ajoutez un commentaire !" onChange={handleComment} />
            </FormGroup>
            <FormGroup>
              <Label for="exampleSelect">Note</Label>
              <Input type="select" name="select" id="exampleSelect" onChange={handleScore}>
                <option>0</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Input>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => clickPost()} >Ajouter mon commentaire</Button>
        </ModalFooter>
      </Modal>

    </div>
  );
}

export default Home;