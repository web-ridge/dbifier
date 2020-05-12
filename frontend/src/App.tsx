import * as React from 'react'
import createPersistedState from 'use-persisted-state'
import {
  Button,
  Typography,
  makeStyles,
  Toolbar,
  AppBar,
  createStyles,
  Theme,
} from '@material-ui/core'
import AppLogoIcon from './AppLogoIcon'
import { TableType } from './types'
import DatabaseTables from './DatabaseTables'
import DatabaseImport from './DatabaseImport'
import DatabaseExport from './DatabaseExport'

const useTablesState = createPersistedState('tables')

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appbar: {
      backgroundColor: 'transparent',
      boxShadow: 'none',
      pointerEvents: 'none',
    },
    title: {
      fontWeight: 'bold',
      marginLeft: 12,
    },
    slogan: {
      fontSize: 15,
      fontWeight: 'normal',
      marginLeft: 10,
      letterSpacing: 0.5,
      opacity: 0.7,
    },
    tableContainer: {
      height: '100vh',
      width: '100vw',
      backgroundColor: '#E4EBF4',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
    },
    logoContainer: {
      marginTop: 10,
      marginBottom: 10,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      flexGrow: 1,
    },
    button: {
      pointerEvents: 'all',
      backgroundColor: '#fff',
      borderRadius: 20,
      boxShadow: 'rgba(0,0,0,0.15) 0px 5px 10px 0px',
      textTransform: 'none',
      paddingLeft: 20,
      paddingRight: 20,
      marginLeft: 12,
    },
  })
)

const initialTable = {
  title: '',
  height: 200,
  width: 300,
  x: 20, // TODO decide where to add table based on current tables or let user click
  y: 100, // TODO decide where to add table based on current tables or let user click
  columns: [],
}

export default function App() {
  const classes = useStyles()

  const [tables, setTables] = useTablesState<TableType[]>([])
  const onChangeTables = React.useCallback(
    (indexToUpdate: number, updatedTable: TableType) =>
      setTables((prev) =>
        prev.map((previousTable, tableIndex) =>
          tableIndex === indexToUpdate ? updatedTable : previousTable
        )
      ),
    [setTables]
  )

  const onRemoveTable = React.useCallback(
    (indexToRemove: number) =>
      setTables((prev) => prev.filter((_, i) => i !== indexToRemove)),
    [setTables]
  )

  return (
    <>
      <AppBar color="default" className={classes.appbar}>
        <Toolbar>
          <div className={classes.logoContainer}>
            <AppLogoIcon />
            <Typography className={classes.title} variant="h5" noWrap>
              dbifier
            </Typography>
            <Typography className={classes.slogan} variant="h6" noWrap>
              database modeling with a strong opinion
            </Typography>
          </div>
          <Button
            size="large"
            className={classes.button}
            onClick={() => setTables((prev) => [...prev, initialTable])}
          >
            Add table
          </Button>
          <DatabaseExport tables={tables} />
          <DatabaseImport tables={tables} />
        </Toolbar>
      </AppBar>

      <div className={classes.tableContainer}>
        <DatabaseTables
          tables={tables}
          onChange={onChangeTables}
          onRemove={onRemoveTable}
        />
      </div>
    </>
  )
}
