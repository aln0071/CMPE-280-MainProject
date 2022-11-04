import React, { useState } from "react";
import BlogMinimized from "./BlogMinimized";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function GridExample() {
  return (
    <Row xs={1} md={2} className="g-4 m-5 p-5">
      {Array.from({ length: 4 }).map((_, idx) => (
        <Col>
        <BlogMinimized />
        </Col>
      ))}
    </Row>
  );
}

export default GridExample;