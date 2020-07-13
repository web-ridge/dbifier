import * as React from 'react'

import Draggable, { DraggableData } from 'react-draggable'
import classNames from 'classnames'
import {
  IconButton,
  makeStyles,
  createStyles,
  Theme,
  Typography,
  TextField,
} from '@material-ui/core'
import { DeleteOutline, Edit } from '@material-ui/icons'
import { TableType, ColumnType } from './types'
import DatabaseTableColumns from './DatabaseTableColumns'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      position: 'absolute',
      left: 0,
      top: 0,

      borderRadius: 10,
      background: '#fff',
      boxShadow: 'rgb(0, 0, 0, 0.2) 0px 5px 10px 0px',
      zIndex: 10,
    },
    tableTitle: {
      background: '#38DF84',

      borderRadius: 10,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,

      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      padding: 10,
      cursor: 'pointer',
    },
    titleLabel: { fontWeight: 700 },
    titleInput: {},
    iconButton: {
      opacity: 0.8,
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
  const [isTyping, setIsTyping] = React.useState<boolean>(false)
  const onBlurTitle = () => setIsTyping(false)

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
      // onDrag={(e, data) => {
      //   // TODO: throttle / debounce
      //   onChange(tableIndex, { ...table, x: data.x, y: data.y })
      // }}
      disabled={isTyping}
    >
      <div
        id={`table-${tableIndex}`}
        className={classes.table}
        style={{ width: table.width }}
      >
        <div className={classNames('handle', classes.tableTitle)}>
          {isTyping ? (
            <TextField
              type={'text'}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const title = event.currentTarget.value
                onChange(tableIndex, { ...table, title })
              }}
              defaultValue={table.title}
              className={classes.titleInput}
              placeholder="Untitled"
              onBlur={onBlurTitle}
            />
          ) : (
            <Typography className={classes.titleLabel}>
              {table.title || 'Untitled'}
              <IconButton
                onClick={() => setIsTyping(true)}
                className={classes.iconButton}
              >
                <Edit fontSize={'small'} />
              </IconButton>
            </Typography>
          )}
          <div style={{ flex: 1 }}></div>
          <IconButton
            onClick={() => onRemove(tableIndex)}
            className={classes.iconButton}
          >
            <DeleteOutline fontSize={'small'} />
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
