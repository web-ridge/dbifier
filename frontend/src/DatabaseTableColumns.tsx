import * as React from 'react'
import { ColumnType } from './types'

import DatabaseTableColumn from './DatabaseTableColumn'

import DatabaseTableColumnCreate from './DatabaseTableColumnCreate'

export default function DatabaseTableColumns({
  columns,
  onChange,
}: {
  columns: ColumnType[]
  onChange: (columns: ColumnType[]) => any
}) {
  return (
    <>
      {columns.map((column) => (
        <DatabaseTableColumn key={column.name} column={column} />
      ))}

      <DatabaseTableColumnCreate
        onAdd={(newColumn) => onChange([...columns, newColumn])}
      />
    </>
  )
}
