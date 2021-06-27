import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Col } from "reactstrap";
import "../assets/style.css";
import Footer from "./footer";
import frame from "../assets/frame.png";
import pollyName from "../assets/polly_name.png";
import { useLocation } from "react-router-dom";

const PollySpeaking = (props) => {
    const { audioText } = props;
    const imageheight = window.screen.height - 250;
    const location = useLocation();
    // console.log("pollySpeaking", audioText.input);
    return (
        <>
            <Container fluid={true} style={{padding: '0px', margin: '0px'}}>
                <Row style={{padding: '0px', margin: '0px'}}>
                    <Col md={12} style={{padding: '0px', margin: '0px'}}>
                        <div className="heading-wrapper">
                            <p className="heading">
                                Polly is speaking
                            </p>
                        </div>
                    </Col>
                </Row>
                <Row style={{padding: '0px', margin: '0px'}}>
                    <Col md={12} style={{padding: '0px', margin: '0px'}}>
                        <div className="polly-wrapper">
                            <p className="polly-text">
                                {audioText ? audioText.input : location.state.detail}
                            </p>
                        </div>
                    </Col>
                </Row>
                <div className="imageBack_wrapper" style={{height: imageheight}}>
                    <img src={frame} className="frame" />
                    <br />
                    <img src={pollyName} className="polly_name" />
                </div>
            </Container> 
            <Footer />
        </>
    );
}
 
export default PollySpeaking;