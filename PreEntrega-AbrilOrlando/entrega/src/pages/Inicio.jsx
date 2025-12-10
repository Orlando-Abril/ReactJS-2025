import React from 'react'
import styled from 'styled-components';
import { FaPlay, FaInfoCircle } from 'react-icons/fa'; // Iconos para jugar e info

// Definimos un contenedor estilizado para toda la sección de inicio
const HeroContainer = styled.div`
  /* Fondo suave o un color que complemente el navbar (Dark Slate Gray: #2F4F4F) */
  background-color: #E6E6FA; /* Lavender Blush, color muy suave y cálido */
  padding: 5rem 0 3rem 0; /* Más padding vertical para respirar */
  border-bottom: 2px solid #dee2e6;
`;

const ContentWrapper = styled.div`
  background-color: #ffffff;
  padding: 2.5rem;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 2rem;
  
  img {
    border-radius: 8px;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  img:hover {
    transform: scale(1.03);
  }
`;

function Inicio() {
  return (
    <HeroContainer>
      <div className="container" style={{maxWidth: '1000px'}}>
        <ContentWrapper>
          {/* Título Principal */}
          <h1 className="display-4 fw-bold text-center text-dark mb-4">
            | Juegos de Mesa |
          </h1>
          <p className="lead text-center text-muted mb-5">
            Una mirada a la historia, estrategia y beneficios cognitivos.
          </p>

          {/* Sección de Texto */}
          <div className="row justify-content-center mb-5">
            <div className="col-12">
              <h2 className="h4 text-primary mb-3">El Origen: Senet, el juego de la vida eterna</h2>
              <p>El <strong>Senet</strong> fue un juego muy popular en el antiguo Egipto. Además del entretenimiento, poseía un profundo sentido ritual vinculado a la vida eterna. Los egipcios creían que desarrollar habilidades estratégicas para controlar el azar durante el juego era una forma de prepararse para justificar sus acciones en la vida y ante los dioses.</p> 
              <p>El rol de los juegos de mesa trasciende el mero pasatiempo, siendo herramientas lúdicas fundamentales en la infancia para el desarrollo de habilidades estratégicas y de gestión emocional.</p>
            </div>
          </div>

          {/* Sección de Imágenes */}
          <div className="row justify-content-center">
            <div className="col-12 mb-4 text-center">
              <img 
                src="https://www.glueckshaendler.de/wp-content/uploads/2020/09/Senet-Brettspiel-aus-Holz-con-Spielsteinen.jpg" 
                alt="Juego de Senet" 
                className="img-fluid rounded shadow" 
                style={{ maxWidth: '450px' }} 
              />
            </div>
            
            {/* Imágenes más pequeñas en línea */}
            <ImageContainer>
                <img 
                    src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi1jKo9c_Vh2Rsg0jUj4idDOhBge3smcm8qrjmJklxoNe9vPpFSKJWhfi00lMaGrpn3oyAABwhhVwrxxnDk0Vsvno-HiGhOuUXN0mC_42I8CLswGKJzUHgl-UqtkDdEf5SsbmsAHg9CxZ0/s320/492ca122590140b5b1366be3336cd2d3.jpg" 
                    alt="Juego Antiguo" 
                    style={{ width: '150px', height: '150px' }}
                    className="shadow-sm"
                />
                <img 
                    src="https://scontent.fepa14-1.fna.fbcdn.net/v/t39.30808-6/485278816_1103223241605755_1856274675638214079_n.jpg?stp=dst-jpg_p180x540_tt6&_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHRm-52f8Nyl2Aq3_8k4x40LoFa5vVOtb4ugVrm9U61vv4pJGDH8tuLLQgPWa9w3fk&_nc_ohc=jM0LMFwKjhQQ7kNvwFtZNyZ&_nc_oc=AdmNfb72UoZ87i7Hv1C1_Wjjh8b9yqkSod55KCQQjdM30MKebwi_ctS7nuDe1cXjj1OrDMsGq0bSQpcJYi3znjev&_nc_zt=23&_nc_ht=scontent.fepa14-1.fna&_nc_gid=6WpRTuASSz3w4INUwmI67Q&oh=00_Affsp3uWHnS58_UFciUtOCWpG7I0tXRiRXJKwxTS3t0JnA&oe=68ECE8BB" 
                    alt="Juegos en la Colonia" 
                    style={{ width: '150px', height: '150px' }}
                    className="shadow-sm"
                />
            </ImageContainer>
          </div>

          <hr className="my-5" />

          {/* Sección de Enlaces y CTAs */}
          <div className="row justify-content-center text-center">
            <div className="col-12 col-md-10">
              <h3 className="h5 mb-4 text-secondary">Recursos y Experiencias</h3>
              <div className="d-flex flex-wrap justify-content-center gap-3">
                {/* Botones Primarios (Jugar) */}
                <a 
                    href="https://play.google.com/store/apps/details?id=air.EgyptianSenetFree&hl=es" 
                    className="btn btn-success btn-lg d-flex align-items-center gap-2"
                >
                    <FaPlay /> Jugar Senet (Android)
                </a>
                <a 
                    href="https://apps.apple.com/us/app/egyptian-senet/id598710611" 
                    className="btn btn-success btn-lg d-flex align-items-center gap-2"
                >
                    <FaPlay /> Jugar Senet (IOS)
                </a>
              </div>
              
              <div className="d-flex flex-wrap justify-content-center gap-3 mt-3">
                {/* Botones Secundarios (Info) */}
                <a 
                    href="https://www.man.es/man/en/educacion/recursos/juegos.html" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-outline-info d-flex align-items-center gap-2"
                >
                    <FaInfoCircle /> Juegos Históricos [+] info
                </a>
                <a 
                    href="https://www.danielschavelzon.com.ar/?p=2927" 
                    target='_blank' 
                    rel="noopener noreferrer" 
                    className="btn btn-outline-info d-flex align-items-center gap-2"
                >
                    <FaInfoCircle /> Juegos en Tiempos de la Colonia
                </a>
              </div>
            </div>
          </div>
        </ContentWrapper>
      </div>
    </HeroContainer>
  )
}

export default Inicio