import "./WeatherForm.css";
import "css/icon.css";
import {
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
  Col,
} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import React from "react";
import { useState } from "react";

function WeatherForm({ onDataChange }) {
  const [cityName, setCity] = useState("Hanoi");
  const [countryName, setCountry] = useState("Vietnam");
  const [validated, setValidate] = useState(false);
  const handleSubmitWeatherForm = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setValidate(true);
    const formData = {
      city: cityName,
      country: countryName,
    };
    onDataChange(formData);
  };

  return (
    <div className="weather-form">
      <Form noValidate validated={validated} onSubmit={handleSubmitWeatherForm}>
        <Row>
          <FormGroup as={Col}>
            <FormLabel>Thành phố</FormLabel>
            <FormControl
              type="text"
              defaultValue={"Hanoi"}
              onChange={(event) => {
                setCity(event.target.value);
              }}
              required
            ></FormControl>
          </FormGroup>
          <FormGroup as={Col}>
            <FormLabel>Quốc gia</FormLabel>
            <FormControl
              type="text"
              defaultValue={"Vietnam"}
              onChange={(event) => {
                setCountry(event.target.value);
              }}
            ></FormControl>
          </FormGroup>
          <Button type="submit" className="button-icon button-icon-search-icon">
            <ion-icon name="search-sharp" size="large"></ion-icon>
          </Button>
        </Row>
      </Form>
    </div>
  );
}

export default WeatherForm;
