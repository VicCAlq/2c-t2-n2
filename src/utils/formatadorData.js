export function formatarTempoRelativo(dataInput) {
  if (!dataInput) return 'Data recente';
  
  try {
    const data = dataInput instanceof Date ? dataInput : new Date(dataInput);
    if (isNaN(data.getTime())) {
      return String(dataInput);
    }

    const agora = new Date();
    const diffEmSegundos = Math.floor((agora.getTime() - data.getTime()) / 1000);

    if (diffEmSegundos < 60) return 'há menos de um minuto';
    const diffEmMinutos = Math.floor(diffEmSegundos / 60);
    if (diffEmMinutos < 60) return `há ${diffEmMinutos} ${diffEmMinutos === 1 ? 'minuto' : 'minutos'}`;
    const diffEmHoras = Math.floor(diffEmMinutos / 60);
    if (diffEmHoras < 24) return `há ${diffEmHoras} ${diffEmHoras === 1 ? 'hora' : 'horas'}`;
    const diffEmDias = Math.floor(diffEmHoras / 24);
    if (diffEmDias < 30) return `há ${diffEmDias} ${diffEmDias === 1 ? 'dia' : 'dias'}`;
    const diffEmMeses = Math.floor(diffEmDias / 30);
    if (diffEmMeses < 12) return `há ${diffEmMeses} ${diffEmMeses === 1 ? 'mês' : 'meses'}`;
    const diffEmAnos = Math.floor(diffEmDias / 365);
    return `há ${diffEmAnos} ${diffEmAnos === 1 ? 'ano' : 'anos'}`;
  } catch (_) {
    return 'Recentemente';
  }
}

export function formatarDataCompleta(dataInput) {
  if (!dataInput) return '';
  try {
    const data = dataInput instanceof Date ? dataInput : new Date(dataInput);
    if (isNaN(data.getTime())) return String(dataInput);
    return new Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'full',
      timeStyle: 'short',
    }).format(data);
  } catch (_) {
    return String(dataInput);
  }
}
