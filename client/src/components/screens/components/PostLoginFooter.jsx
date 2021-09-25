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
                            <p className="footer-info">Company Email: suboptify@gmail.com</p>
                            <p className="footer-info" >Martin: martinj3904@gmail.com</p>
                            <p className="footer-info last-item" >Anthony: anthonyp0329@gmail.com</p>

                        </Col>
                        <Col sm={4}>
                            <p className="footer-block-title">Give us Feedback:</p>
                            <a className="link" href="https://forms.gle/W2Xbo3L4rBZJ15Lv9" >Website Feedback</a>
                            <br/>
                            <a className="link" href="https://forms.gle/cEYHv9nGx2j3oW9VA">Join the team</a>
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