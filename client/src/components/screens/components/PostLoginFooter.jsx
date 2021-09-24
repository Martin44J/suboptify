import React from "react";
import "./PostLoginFooter.css";
import {Container, Row, Col} from 'react-bootstrap'

const PostLoginFooter = () =>{


    return(
        <div>
            <div className="push"></div>
            <footer className="footer">
                <Container>
                    <Row>
                        <Col sm={4}>
                            <p className="footer-block-title">Contact us:</p>

                        </Col>
                        <Col sm={4}>

                        </Col>
                        <Col sm={4}>

                        </Col>

                    </Row>
                </Container>
            </footer>
        </div>
    );
}

export default PostLoginFooter;