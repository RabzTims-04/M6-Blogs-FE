import React, { Component } from "react";
import { Row, Col, Image } from "react-bootstrap";
import "./styles.css";
export default class BlogAuthor extends Component {
  render() {    
    return (
      this.props.authors && this.props.authors.map(author => 
      <Row>
        <Col xs={2}>
          <Image className="blog-author" src={author.avatar} roundedCircle />
        </Col>
        <Col>
          <div>by</div>
          <h6>{author.name} {author.surname}</h6>
        </Col>
      </Row>
      )
    );
  }
}
