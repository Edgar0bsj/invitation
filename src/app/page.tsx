import ModalAddConvidado from "@/components/ModalAddConvidado";
import Table from "@/components/Table";

export default function Home() {
  return (
    <>
      <div className="container is-fluid my-6">
        <div className="columns is-desktop is-1 mb-6">
          <div className="column is-one-quarter">
            <ModalAddConvidado />
          </div>
        </div>
        <div className="columns is-desktop ">
          <div className="column is-flex is-justify-content-center">
            <Table />
          </div>
        </div>
      </div>
    </>
  );
}
