export function getLocalDateAsUTC(timezone = 'America/Sao_Paulo') {
  const now = new Date();
  const parts = new Intl.DateTimeFormat('sv-SE', {
    timeZone: timezone,
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
    .formatToParts(now)
    .reduce((acc, part) => {
      if (part.type !== 'literal') acc[part.type] = part.value;
      return acc;
    }, {} as Record<string, string>);

  // Monta a string no formato ISO local
  const localISO = `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}`;
  // Cria um Date como se fosse UTC, mas com os valores do horário local
  const [year, month, day, hour, minute, second] = localISO
    .replace('T', '-')
    .split(/[-:]/)
    .map(Number);

  return new Date(Date.UTC(year, month - 1, day, hour, minute, second));
}