import { type ReactNode } from 'react';
import styles from './PostCardContainer.module.css';
import React from 'react';

type PostCardContainerProps = {
  title: string;
  description: string;
  children: ReactNode;
};

function PostCardContainer({ title, description, children }: PostCardContainerProps) {
  const noResults = React.Children.count(children) === 0;

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <p>{description}</p>
      <div className={styles.postsContainer}>
        {noResults ? (
          <div className={styles.noResults}>
            No hay Peliculas en la busqueda
          </div>
        ) : (
          children
        )}
      </div>
    </section>
  );
}

export default PostCardContainer;
