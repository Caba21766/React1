import { type ReactNode } from 'react';
import styles from './PostCardContainer.module.css';

type PostCardContainerProps = {
  title: string;
  description: string;
  children: ReactNode;
};

function PostCardContainer(props: PostCardContainerProps) {
  const { title, description, children } = props;
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <p>{description}</p>
      <div className={styles.postsContainer}>{children}</div>
    </section>
  );
}

export default PostCardContainer;
