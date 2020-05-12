import * as React from 'react'

import Draggable, { DraggableData } from 'react-draggable'
import classNames from 'classnames'
import {
  IconButton,
  makeStyles,
  InputBase,
  createStyles,
  Theme,
} from '@material-ui/core'
import { DeleteOutline } from '@material-ui/icons'
import { TableType, ColumnType } from './types'
import DatabaseTableColumns from './DatabaseTableColumns'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      position: 'absolute',
      left: 0,
      top: 0,
      border: '2px solid rgb(64,67,209)',
      borderRadius: 10,
      background: 'rgba(255,255,255,0.9)',
      boxShadow: 'rgb(0, 0, 255, 0.2) 0px 5px 10px 0px',
    },
    tableTitle: {
      background: 'rgb(64,67,209)',
      color: '#fff',

      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      padding: 10,
      cursor: 'pointer',
    },
    titleInput: {
      color: '#fff',
      fontWeight: 'bold',
    },
  })
)

function DatabaseTable({
  tableIndex,
  table,
  onChange,
  onRemove,
}: {
  tableIndex: number
  table: TableType
  onChange: (tableIndex: number, table: TableType) => any
  onRemove: (tableIndex: number) => any
}) {
  const classes = useStyles()
  const [dragEnabled, setDragEnabled] = React.useState<boolean>(true)
  const onBlurTitle = () => setDragEnabled(true)
  const onFocusTitle = () => setDragEnabled(false)

  const onChangeColumns = React.useCallback(
    (newColumns: ColumnType[]) => {
      onChange(tableIndex, {
        ...table,
        columns: newColumns,
      })
    },
    [onChange, table, tableIndex]
  )

  return (
    <Draggable
      handle={'.handle'}
      defaultPosition={{ x: table.x, y: table.y }}
      onStop={(_: any, data: DraggableData) => {
        onChange(tableIndex, { ...table, x: data.x, y: data.y })
      }}
      disabled={!dragEnabled}
    >
      <div className={classes.table} style={{ width: table.width }}>
        <div className={classNames('handle', classes.tableTitle)}>
          <InputBase
            type={'text'}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const title = event.currentTarget.value
              onChange(tableIndex, { ...table, title })
            }}
            defaultValue={table.title}
            className={classes.titleInput}
            placeholder="Untitled"
            onBlur={onBlurTitle}
            onFocus={onFocusTitle}
          />
          <div style={{ flex: 1 }}></div>
          <IconButton
            onClick={() => onRemove(tableIndex)}
            style={{ color: '#fff', opacity: 0.9 }}
          >
            <DeleteOutline />
          </IconButton>
        </div>

        <DatabaseTableColumns
          columns={table.columns}
          onChange={onChangeColumns}
        />
      </div>
    </Draggable>
  )
}

export default React.memo(DatabaseTable)
