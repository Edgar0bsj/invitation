interface User {
  id: string;
  name: string;
  email?: string;
  status: "confirmado" | "pendente" | "ausente";
}

export function user(): User[] {
  return [
    {
      id: "01",
      name: "Pedro Henrique José Manoel Rodrigues",
      email: "diego-ramos89@goldenhotel.com.br",
      status: "confirmado",
    },
    {
      id: "02",
      name: "Analu Daiane da Conceição",
      email: "tiago.breno.dasneves@tia.mat.br",
      status: "pendente",
    },
    {
      id: "03",
      name: "Carolina Isis Viana",
      email: "stella.giovanna.lima@cppcoder.com",
      status: "ausente",
    },
    {
      id: "04",
      name: "Daniel Benício Raul Brito",
      email: "marcia.cecilia.damata@granadaimoveis.com.br",
      status: "confirmado",
    },
    {
      id: "05",
      name: "Renata Sueli Rafaela Silva",
      email: "fatima.hadassa.assuncao@allcor.com.br",
      status: "confirmado",
    },
    {
      id: "06",
      name: "Melissa Isabelly Jéssica Almeida",
      email: "franciscoricardocavalcanti@barratravel.com.br",
      status: "confirmado",
    },
    {
      id: "07",
      name: "Isadora Juliana Nair Ferreira",
      email: "giovanni-castro94@igoralcantara.com.br",
      status: "pendente",
    },
    {
      id: "08",
      name: "Esther Rita Mariah Novaes",
      email: "henrique_otavio_peixoto@cssmi.com.br",
      status: "ausente",
    },
    {
      id: "09",
      name: "Sabrina Lúcia Rafaela Gomes",
      email: "laurasebastianadossantos@pmi.com",
      status: "confirmado",
    },
    {
      id: "10",
      name: "Tiago Breno Ramos",
      email: "arthur-duarte76@splicenet.com.br",
      status: "ausente",
    },
    {
      id: "11",
      name: "Nathan Felipe Moreira",
      email: "luiz-caldeira81@deca.com.br",
      status: "confirmado",
    },
  ];
}
