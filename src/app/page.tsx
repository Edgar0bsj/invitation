import Section from "@/components/layout/Section";
import Table from "@/components/Table";

export default function Home() {
  return (
    <>
      <div className="container">
        <div className="columns is-desktop ">
          <div className="column">
            <Section
              title="Lista de Convidados"
              subtitle="Gerencie facilmente os convidados do evento visualize, edite ou remova registros"
            />
          </div>
        </div>
        <div className="columns is-desktop mb-5">
          <div className="column is-flex is-justify-content-center">
            <Table />
          </div>
        </div>
      </div>
    </>
  );
}
