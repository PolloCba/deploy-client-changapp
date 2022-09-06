import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../context/authContext";
import { getAllCategories } from "../redux/actions";
import { Link, NavLink } from "react-router-dom";
import "./css/footer.css";

export default function Footer() {
  const { user } = useAuth();
  let category = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  category = category.slice(0, 4);
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  // const sendMail = (e) => {
  //   e.preventDefault();
  //   let body = document.getElementById("message");
  //   let subjetLine = "Formulario de Contacto";
  //   window.location.href =
  //     "mailto:pfhenrychangapp@gmail.com?subject=" +
  //     subjetLine +
  //     "&body=" +
  //     body;
  // };

  return (
    <div className="footer">
      <div className="footer__nombre">
        <h1>ChangaApp</h1>
      </div>
      <div className="seccion__footer--lista">
        <ul>
          <p>Categorias</p>
          {category &&
            category.map((c) => {
              return (
                <Link key={c.id} to="/home/todos" className="footerLink">
                  <div>
                    <li className="footer__lista--item">
                      <p>{c.name}</p>
                    </li>
                  </div>
                </Link>
              );
            })}
          <li className="footer__lista--item">
            <p>Otras</p>
          </li>
        </ul>
      </div>
      <div className="seccion__footer--lista">
        <ul className="footer__lista">
          <p>Legal</p>
          <li className="footer__lista--item">
            <p>Quienes Somos</p>
          </li>
          <li className="footer__lista--item">
            <p>Politica de Privacidad</p>
          </li>
          <li className="footer__lista--item">
            <p>Programa de Fidelidad</p>
          </li>
          <li className="footer__lista--item">
            <NavLink style={{color: 'white'}} to="/home/createService">
              <p>Anuncie Aqui</p>
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="seccion__footer--lista">
        <ul className="footer__lista">
          <p>Desarrollado por</p>
          <li className="footer__lista--item">
            <a
              className="footer__linkedIn"
              href="https://www.linkedin.com/in/enrique-gomez-naar-fullstackdeveloper/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Enrique Gomez Naar
            </a>
          </li>
          <li className="footer__lista--item">
            <a
              className="footer__linkedIn"
              href="https://www.linkedin.com/in/lucas-axel-hess/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Lucas Hess
            </a>
          </li>
          <li className="footer__lista--item">
            <a
              className="footer__linkedIn"
              href="https://www.linkedin.com/in/juan-pablo-cuadrelli-full-stack-dev/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Juan Pablo Cuadrelli
            </a>
          </li>
          <li className="footer__lista--item">
            <a
              className="footer__linkedIn"
              href="https://www.linkedin.com/in/agop-chorbadjian-369767218/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Agop Chorbadjian
            </a>
          </li>
          <li className="footer__lista--item">
            <a
              className="footer__linkedIn"
              href="https://www.linkedin.com/in/claudio-amaya-fullstack/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Claudio Amaya
            </a>
          </li>
        </ul>
      </div>

      <form
        action="mailto:pfhenrychangapp@gmail.com"
        method="post"
        encType="text/plain"
        className="formulario"
      >
        <h3 className="formulario__titulo">Contactanos</h3>
        <div className="formulario__campo">
          <label>Email</label>
          <input
            name="name"
            type="text"
            className="formulario__nombre"
            id="name"
            required
            data-tipo="name"
            placeholder={user?.email}
          />
        </div>
        <div className="formulario__campo">
          <label>Escribe tu mensaje</label>
          <textarea
            name="message"
            id="message"
            className="formulario__texto"
            required
            data-tipo="message"
          ></textarea>
        </div>
        <a
          href="mailto:pfhenrychangapp@gmail.com"
          className="formulario__boton"
        >
          Enviar mensaje
        </a>
      </form>
    </div>
  );
}
