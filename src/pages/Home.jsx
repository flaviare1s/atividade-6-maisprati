import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const libraries = [
  {
    name: 'Bootstrap',
    path: '/produtos/bootstrap',
    description: 'Explore os produtos da categoria Bootstrap e visualize um dos frameworks mais populares para estilização de interfaces.',
    className: 'bootstrap'
  },
  {
    name: 'Material UI',
    path: '/produtos/material',
    description: 'Explore os produtos da categoria Material UI e explore o visual do Material Design em seus projetos.',
    className: 'material'
  },
  {
    name: 'Milligram',
    path: '/produtos/milligram',
    description: 'Explore os produtos da categoria Milligram e conheça esse framework CSS minimalista que fornece uma base limpa e rápida para seus projetos.',
    className: 'milligram'
  }
];

export const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1 className={styles.title}>
          Explore Diferentes Bibliotecas de UI
        </h1>
        <p className={styles.subtitle}>
          Compare estilos e funcionalidades em um só lugar
        </p>
        <p className={styles.description}>
          Descubra as principais bibliotecas e frameworks CSS/React do mercado.
          Cada seção demonstra produtos estilizados com uma biblioteca diferente,
          permitindo que você veja as diferenças visuais e funcionais entre elas.
        </p>
      </div>

      <div className={styles.cardsGrid}>
        {libraries.map((library) => (
          <Link
            key={library.name}
            to={library.path}
            className={`${styles.card} ${styles[library.className]}`}
            role="button"
            tabIndex={0}
          >
            <span className={styles.cardIcon}>{library.icon}</span>
            <h2 className={styles.cardTitle}>{library.name}</h2>
            <p className={styles.cardDescription}>{library.description}</p>
            <span className={styles.cardCta}>
              Explorar produtos
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
