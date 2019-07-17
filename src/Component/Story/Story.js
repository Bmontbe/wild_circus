import React, { useState, useEffect } from 'react';
import { Container, Row, Col, CardImg, CardText} from 'reactstrap';
import './Story.css';

function Story() {
  

  return (
    <div>
          <div className="homeComponent">
      <h1>Notre histoire</h1>
      <Container>
        <Row className='storyCard'>
          <Col sm="5" className="picHome">
            <CardImg src={`${process.env.PUBLIC_URL}/assets/pics/la-troupe-HD-60.jpg`} alt="magician" className="homeImg" />
          </Col>
          <Col sm="7" className="picHome">
            <CardText>Verum ad istam omnem orationem brevis est defensio. Nam quoad aetas M. Caeli dare potuit isti suspicioni
              locum, fuit primum ipsius pudore, deinde etiam patris diligentia disciplinaque munita. Qui ut huic virilem togam
              deditšnihil dicam hoc loco de me; tantum sit, quantum vos existimatis; hoc dicam, hunc a patre continuo ad me
              esse deductum; nemo hunc M. Caelium in illo aetatis flore vidit nisi aut cum patre aut mecum aut in M. Crassi
              castissima domo, cum artibus honestissimis erudiretur.
              Ciliciam vero, quae Cydno amni exultat, Tarsus nobilitat, urbs perspicabilis hanc condidisse Perseus memoratur, 
              Iovis filius et Danaes, vel certe ex Aethiopia profectus Sandan quidam 
              nomine vir opulentus et nobilis et Anazarbus auctoris vocabulum referens, et Mopsuestia vatis illius domicilium 
               </CardText>
          </Col>
        </Row>
        <Row className='storyCard'>
          <Col sm="7" className="picHome">
            <CardText>Verum ad istam omnem orationem brevis est defensio. Nam quoad aetas M. Caeli dare potuit isti suspicioni
              locum, fuit primum ipsius pudore, deinde etiam patris diligentia disciplinaque munita. Qui ut huic virilem togam
              deditšnihil dicam hoc loco de me; tantum sit, quantum vos existimatis; hoc dicam, hunc a patre continuo ad me
              esse deductum; nemo hunc M. Caelium in illo aetatis flore vidit nisi aut cum patre aut mecum aut in M. Crassi
              castissima domo, cum artibus honestissimis erudiretur.
              </CardText>
          </Col>
          <Col sm="5" className="picHome">
            <CardImg src={`${process.env.PUBLIC_URL}/assets/pics/saut-lion-60.jpg`} alt="magician" className="homeImg" />
          </Col>
        </Row>
      </Container>
    </div>
    </div>
  );
}

export default Story;