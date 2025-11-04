interface Props {
  title: string;
  subtitle: string;
}

export default function Section(props: Props) {
  return (
    <>
      <section className="section content ">
        <h1 className="title ">
          <strong>{props.title}</strong>
        </h1>
        <p className="subtitle">{props.subtitle}</p>
      </section>
    </>
  );
}
