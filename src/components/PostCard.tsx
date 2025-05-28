import { useState } from 'react';
import styles from './PostCard.module.css';

type PostCardProps = {
  src: string;
  title: string;
  read: boolean;
  description?: string;
  likes?: number;
  handleClick?: () => void;
};

function PostCard(props: PostCardProps) {
  const { src, title, description, likes = 0, read } = props;
  const [liked, setLiked] = useState(false);

  function toggleLike() {
    setLiked(!liked);
  }

  return (
    <article className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <img className={styles.img} src={src} />
        <p className={styles.description}>{description}</p>
        <p className={styles.read}>
          {title} {read ? 'Post leído' : 'Post por leer'}
        </p>
      </div>
    </article>
  );
}

export default PostCard;
