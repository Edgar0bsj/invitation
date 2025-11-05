import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Section from "@/components/layout/Section";
import Table from "@/components/Table";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="hero is-link is-fullheight-with-navbar">
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
      </div>
      <Footer />
    </>
  );
}
