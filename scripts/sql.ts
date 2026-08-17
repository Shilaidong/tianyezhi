export function sqlString(value: string): string {
  return `'${value.replace(/'/g, "''")}'`;
}

export function sqlNullable(value: string | undefined | null): string {
  return value == null || value === "" ? "NULL" : sqlString(value);
}

export function sqlReal(value: number | undefined): string {
  return value == null || Number.isNaN(value) ? "NULL" : String(value);
}
