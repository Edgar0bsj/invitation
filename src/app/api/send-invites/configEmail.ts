const configEmail = (
  guestName: string,
  confirmLink: string,
  declineLink: string,
  options: { data: string; hora: string; local: string } = {
    data: "",
    hora: "",
    local: "",
  }
) => {
  const title = "Vai ter festa, e você tá convocado!";
  const msgHtml = `
		<h1>Olá, ${guestName}!</h1>
          <h2>Tô preparando uma comemoração daquelas pra celebrar meu aniversário, e não seria a mesma coisa sem você lá! Vai ter risada, música, comidinhas gostosas e, claro, muita diversão.</h2>
          <p>📅 Data: ${options.data}</p>
          <p>🕒 Hora: ${options.hora}</p>
          <p>📍 Local: ${options.local}</p>
          <p>Vem comemorar comigo e trazer sua energia boa!</p>
          <p>Clique no link abaixo para confirmar sua presença:</p>
          <a href="${confirmLink}" target="_blank" 
             style="background:#4CAF50;color:white;padding:10px 15px;text-decoration:none;border-radius:5px;">
             Confirmar Presença
          </a>
			<a href="${declineLink}" target="_blank" 
			style="background:#f44336;color:white;padding:10px 15px;text-decoration:none;border-radius:5px;">
			Não poderei ir 😢
			</a>
        `;

  return {
    title,
    msgHtml,
  };
};

export default configEmail;
