type PostCardProps = {
  src: string;
  title: string;
  description?: string;
  likes?: number;
};

function PostCard(props: PostCardProps) {
  const { src, title, description, likes = 0 } = props;

  return (
    <article style={{ background: 'red' }}>
      <img width={220} height={220} src={src} />
      <h1>{title}</h1>
      <p>{description}</p>
      <p>Le ha gustado a {likes} personas</p>
      <hr />
    </article>
  );
}

export default PostCard;
