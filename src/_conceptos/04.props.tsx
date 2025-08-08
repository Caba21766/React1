function PostCard(props) {
  const { src, title, description } = props;

  return (
    <article>
      <img width={220} height={220} src={src} />
      <h1>{title}</h1>
      <p>{description}</p>
    </article>
  );
}

function App() {
  return (
    <>
      <PostCard
        title="Titulo"
        description="Descripcion"
        src="https://electroluxar.vtexassets.com/arquivos/ids/162063/Toaster_ETS10_Perspective_Electrolux_Spanish_1000x1000.png?v=637841640276870000"
      />
      <PostCard
        title="Otro titulo"
        description="Otra descripcion"
        src="https://electroluxar.vtexassets.com/arquivos/ids/162063/Toaster_ETS10_Perspective_Electrolux_Spanish_1000x1000.png?v=637841640276870000"
      />
    </>
  );
}
