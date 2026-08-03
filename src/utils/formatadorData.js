import { formatDistanceToNow, format, parseISO, isValid } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function formatarTempoRelativo(dataInput) {
  if (!dataInput) return 'Data recente';
  
  try {
    let data = typeof dataInput === 'string' ? parseISO(dataInput) : dataInput;
    
    if (!isValid(data)) {
      data = new Date(dataInput);
    }
    
    if (!isValid(data)) return String(dataInput);

    return formatDistanceToNow(data, { addSuffix: true, locale: ptBR });
  } catch {
    return 'Data recente';
  }
}

export function formatarDataExata(dataInput) {
  if (!dataInput) return '';

  try {
    let data = typeof dataInput === 'string' ? parseISO(dataInput) : dataInput;

    if (!isValid(data)) {
      data = new Date(dataInput);
    }

    if (!isValid(data)) return String(dataInput);

    return format(data, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
  } catch {
    return String(dataInput);
  }
}
