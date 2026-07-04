export function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function formatarData(dataISO) {
  return new Date(dataISO).toLocaleDateString("pt-BR");
}

export function formatarDataHora(dataISO) {
  const data = new Date(dataISO);
  const hora = data.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${formatarData(dataISO)} às ${hora}`;
}
