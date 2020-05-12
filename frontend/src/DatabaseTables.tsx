import * as React from 'react'

import { makeStyles, createStyles, Theme } from '@material-ui/core'
import { TableType } from './types'
import DatabaseTable from './DatabaseTable'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
)

export default function DatabaseTables({
  tables,
  onChange,
  onRemove,
}: {
  tables: TableType[]
  onChange: (tableIndex: number, table: TableType) => any
  onRemove: (tableIndex: number) => any
}) {
  // eslint-disable-next-line
  const classes = useStyles()

  return (
    <>
      {tables.map((table, tableIndex) => (
        <DatabaseTable
          key={tableIndex}
          table={table}
          tableIndex={tableIndex}
          onChange={onChange}
          onRemove={onRemove}
        />
      ))}
    </>
  )
}
