import * as React from 'react'
import { TextField, makeStyles, createStyles, Theme } from '@material-ui/core'
import { ColumnType, DataType } from './types'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 12,
      marginBottom: 24,
    },
    // Put styles here
    textField: {},
  })
)

export interface NameToDataTypeMap {
  [columnName: string]: DataType
}

// map column name to a data type
const veryVerySmartAiSystem: NameToDataTypeMap = {
  order: 'int',
  name: 'varchar',
  text: 'varchar',
  id: 'int', // TODO: unsigned etc
}

function getDataTypeFromName(name: string): DataType {
  if (name.includes('id')) {
    return 'int'
  }
  return veryVerySmartAiSystem[name] || 'varchar'
}

export default function DatabaseTableColumnCreate({
  onAdd,
}: {
  onAdd: (column: ColumnType) => any
}) {
  const [name, setName] = React.useState<string>('')
  const classes = useStyles()
  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (name === '') {
      return
    }
    if (event.key === 'Enter') {
      setName('')
      onAdd({
        name,
        dataType: getDataTypeFromName(name),
      })
    }
  }
  return (
    <div className={classes.root}>
      <TextField
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setName(event.currentTarget.value)
        }
        value={name}
        label="Column name"
        placeholder="Type and press enter"
        onKeyDown={onKeyDown}
        className={classes.textField}
        fullWidth
        variant="outlined"
      />
    </div>
  )
}
