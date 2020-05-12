import * as React from 'react'
import {
  Menu,
  MenuItem,
  Button,
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core'
import { TableType } from './types'

//@ts-ignore
import { exporter } from '@dbml/core'

type databaseType = 'mysql' | 'postgres'

export function TablesToDBML(tables: TableType[]): string {
  return `${tables
    .map(
      (table) =>
        `Table ${table.title} { ` +
        '\n' +
        `${table.columns
          .map((column) => `\n\t${column.name} ${column.dataType}`)
          .join('')}` +
        '\n' +
        `}`
    )
    .join('\n')}`
}

export function TablesToSQL(
  tables: TableType[],
  database: databaseType
): string {
  const dbml = TablesToDBML(tables)
  console.log('DBML START__________________')
  console.log(dbml)
  console.log('DBML END__________________')

  return exporter.export(dbml, database)
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      pointerEvents: 'all',
      border: '2px solid #000',
      borderRadius: 20,
      boxShadow: 'none',
      textTransform: 'none',
      paddingLeft: 20,
      paddingRight: 20,
      marginLeft: 12,
    },
  })
)

export default function DatabasExport({ tables }: { tables: TableType[] }) {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const onDownloadSQL = (database: databaseType) => {
    const sql = TablesToSQL(tables, database)

    // https://stackoverflow.com/questions/3665115/how-to-create-a-file-in-memory-for-user-to-download-but-not-through-server
    var element = document.createElement('a')
    element.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(sql)
    )
    element.setAttribute('download', `${database}.sql`)

    element.style.display = 'none'
    document.body.appendChild(element)

    element.click()

    document.body.removeChild(element)
  }

  return (
    <>
      <Button
        size="large"
        className={classes.button}
        aria-controls="export-options-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Export
      </Button>
      <Menu
        id="export-options-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            onDownloadSQL('mysql')
          }}
        >
          MySQL
        </MenuItem>
        <MenuItem
          onClick={() => {
            onDownloadSQL('postgres')
          }}
        >
          PostgreSQL
        </MenuItem>
      </Menu>
    </>
  )
}
