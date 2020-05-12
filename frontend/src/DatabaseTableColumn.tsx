import React from 'react'
import { ColumnType } from './types'
import { Typography } from '@material-ui/core'

export default function DatabaseTableColumn({
  column,
}: {
  column: ColumnType
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', padding: 12 }}>
      <Typography>{column.name}</Typography>
      <div style={{ flex: 1 }} />
      <Typography>{column.dataType}</Typography>
    </div>
  )
}
