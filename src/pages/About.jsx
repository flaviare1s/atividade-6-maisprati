import './About.css';

export const About = () => {
  return (
    <div className="about-container">
      <h1>Sobre StyledStore</h1>

      <h2>Header</h2>
      <p>Feito com Tailwind CSS para estilização utilitária.</p>

      <h2>Footer</h2>
      <p>Feito com Styled Components para CSS-in-JS.</p>

      <h2>Página Sobre</h2>
      <p>Feita com CSS global tradicional.</p>

      <h2>Página Bootstrap</h2>
      <p>Usa o framework Bootstrap 5 com seus componentes nativos.</p>

      <h2>Página Material UI</h2>
      <p>Usa a biblioteca @mui/material com componentes React.</p>

      <h2>Página Milligram</h2>
      <p>Usa CSS Modules para isolar o framework Milligram e evitar conflitos.</p>
    </div>
  );
};
