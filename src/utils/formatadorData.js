import { formatDistanceToNow, parseISO, isValid } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function formatarTempoRelativo(dataInput) {
  if (!dataInput) return 'Data recente';
  
  try {
    let data;
    if (dataInput instanceof Date) {
      data = dataInput;
    } else if (typeof dataInput === 'string') {
      data = new Date(dataInput);
      if (!isValid(data)) {
        data = parseISO(dataInput);
      }
    } else {
      data = new Date(dataInput);
    }

    if (!isValid(data)) {
      return String(dataInput);
    }

    return formatDistanceToNow(data, { addSuffix: true, locale: ptBR });
  } catch (_) {
    return 'Recentemente';
  }
}

export function formatarDataCompleta(dataInput) {
  if (!dataInput) return '';
  try {
    const data = new Date(dataInput);
    if (!isValid(data)) return String(dataInput);
    return new Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'full',
      timeStyle: 'short',
    }).format(data);
  } catch (_) {
    return String(dataInput);
  }
}
