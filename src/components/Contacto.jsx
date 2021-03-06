import React from "react";
import Header from "./Header";
import "../componentStyles/contact.css";
import vectorFondo from "../images/vectorFondo.svg";
import vector from "../images/Vector.svg";
import vector1 from "../images/Vector-1.svg";
import whatsApp from "../images/WhatsApp.svg";

import USA from "../images/banderaUsa.png";
import ARG from "../images/banderaArg.png";
import { postContactoAirtable } from "../functions/postContactoAirtable";
import ReCAPTCHA from "react-google-recaptcha";


export default function Contacto() {
  const [nombre, setNombre] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [motivoDeContacto, setMotivoDeContacto] = React.useState("");
  const [mensaje, setMensaje] = React.useState("");
  const [condicionesLegales, setCondicionesLegales] = React.useState("");
  const [errors, setErrors] = React.useState({});

  const [captcha, setCaptcha] = React.useState("");


  function validate(input, event) {
    console.log("input", input);
    let errorsObj = {};
    let contadorErrores = 0;
    if (input.nombre === "") {
      errorsObj.nombre = "El nombre es requerido";
      contadorErrores++;
    }
    if (input.email === "") {
      errorsObj.email = "El email es requerido";
      contadorErrores++;
    }
    if (input.motivoDeContacto === "") {
      errorsObj.direccion = "El motivo de contacto es requerido";
      contadorErrores++;
    }
    if (input.mensaje === "") {
      errorsObj.direccion = "La direccion es requerida";
      contadorErrores++;
    }
    if (input.condicionesLegales === "") {
      errorsObj.condicionesLegales = "Debes aceptar las condiciones legales";
      contadorErrores++;
    }

    if (input.captcha === "") {
      errorsObj.captcha = "El captcha es requerido";
      contadorErrores++;
    }

    if (contadorErrores === 0) {
      console.log("no hay errores");
      postContactoAirtable(
        input.nombre,
        input.email,
        input.motivoDeContacto,
        input.mensaje
      );
      event.preventDefault();
      setTimeout(() => window.location.reload(), 3000);

    } else {
      setErrors(errorsObj);
      console.log("hay errores no se hizo el post", errorsObj);
      event.preventDefault();
    }
  }

  function handleSubmit(event) {
    const objetoAVerificar = {
      nombre,
      email,
      motivoDeContacto,
      mensaje,
      condicionesLegales,
      captcha
    };
    validate(objetoAVerificar, event);
  }

  function onChangeCaptcha(value) {
    setCaptcha(value);
  }
  
  return (
    <div className="contacto">
      <Header />
      <div className="background">
        <img alt="" className="img_back1" src={vectorFondo} />
        <img alt="" className="img_back2" src={vectorFondo} />
      </div>
      <div className="contenedor-cuestion">
        <h1 className="cuestion">??Ten??s alguna consulta?</h1>
        <h2 className="exclamation">??CONT??CTANOS!</h2>
      </div>

      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="inputs-contact">
          <h3>Nombre*</h3>
          {errors.nombre ? <p className="alertaForm">{errors.nombre}</p> : null}
          <input
            className="nuevo-input"
            placeholder="Nombre"
            type="text"
            onChange={(e) => setNombre(e.target.value)}
          />
          <h3>Email*</h3>
          {errors.email ? <p className="alertaForm">{errors.email}</p> : null}
          <input
            className="nuevo-input"
            placeholder="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <h3>Motivo de contacto</h3>
          <input
            className="nuevo-input"
            placeholder="??Por qu?? nos contactaste?"
            type="text"
            onChange={(e) => setMotivoDeContacto(e.target.value)}
          />

          <h3>Mensaje</h3>
          <input
            className="nuevo-input"
            placeholder="Mensaje"
            type="text"
            onChange={(e) => setMensaje(e.target.value)}
          />

          <div className="conditionss">
          <ReCAPTCHA sitekey="6Lc2oTcgAAAAAPR8ONUY_0RU52exoKd4f45VPtmw" onChange={onChangeCaptcha} />
            {errors.captcha ? <p className="alertaForm">{errors.captcha}</p> : null}
            <div className="acept-conditions">
              <input
                type="checkbox"
                className="terms"
                onClick={(e) => setCondicionesLegales(e.target.value)}
              />
              <p className="acept-text">Aceptar condiciones legales</p>
            </div>
            <div className="contenedor-sumb">
              <button type="submit" className="send-button">
                Enviar
              </button>
            </div>
          </div>
        </div>
      </form>
      <footer>
        <div className="footer">
          <h4>
            Link<span>IT</span>
          </h4>
          <div className="social-media">
            <a
              target="_blank"
              className="linkedin"
              href="https://www.linkedin.com/company/linkit-hr/"
              rel="noopener noreferrer"
            >
              <img alt="" src={vector} />
            </a>
            <a
              className="gmail"
              href="#cont"
            >
              <img alt="" src={vector1} />
            </a>
            <a className="wpp" href="https://wa.me/+5491165287429" target="_blank">
              <img alt="" src={whatsApp} />
            </a>
          </div>
        </div>
        <div className="info-candidatos">
          <a href="/home">
            <p className="footer-button">INICIO</p>
          </a>
          <a className="empresas-button" href="/empresas">
            <p className="footer-button">EMPRESAS</p>
          </a>
          <a href="/Candidatos">
            <p className="footer-button">CANDIDATOS</p>
          </a>
          <a href="/faqs">
            <p className="footer-button">FAQS</p>
          </a>
          <div className="contenedor-idiomas-faqs">
            <a href="/homeENG" className="contenedor-bandera">
              <div className="idioma-component">ENG |</div>
            </a>
            <a className="contenedor-bandera" href="/home">
              <div className="idioma-component">ESP</div>
            </a>
          </div>
        </div>
        <div className="rights-candidatos">
          <p>?? 2022 LinkIT. All rights reserved.</p>
        </div>
      </footer>
      </div>
      )
}
