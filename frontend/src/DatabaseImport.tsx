import * as React from 'react'
import { Button, makeStyles, createStyles, Theme } from '@material-ui/core'
import { TableType } from './types'

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

export default function DatabaseImport({ tables }: { tables: TableType[] }) {
  const classes = useStyles()

  return (
    <>
      <Button
        size="large"
        className={classes.button}
        aria-controls="export-options-menu"
        aria-haspopup="true"
        onClick={() => {}}
      >
        Import
      </Button>
    </>
  )
}
