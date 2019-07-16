import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col, CardImg, CardTitle, CardText } from 'reactstrap';
import moment from 'moment';
import 'moment/locale/fr';
import axios from 'axios';
import './Home.css';

moment.locale('fr');

function Home() {
  const [comments, setComments] = useState ([])

  useEffect(() => {
    var url = 'http://localhost:8000/comments';
    axios.get(url)
    .then((result) => {
        console.log(result.data);
        setComments(result.data)
      })
  }, []);

  return (
    <div className="homeComponent">
    <h1>Bienvenue au Wild Circus</h1>
    <Container>
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
          {comments ? comments.map((comment, index) => (
            <Col sm="6" className="commentHome">
            <Card body>
            <CardText className='score'> Note : {comment.score}/5</CardText>
            <CardText className='comment'>"{comment.customer_comment}"</CardText>
            </Card>
            </Col>
          )) : ""}
          </Row>
          </Container>
    </div>
  );
}

export default Home;