export interface TableType {
  title: string
  width: number
  height: number
  x: number
  y: number
  columns: ColumnType[]
}

export type DataType = 'varchar' | 'int' | 'datetime' | 'boolean'

export interface ColumnType {
  name: string
  dataType: string
}
