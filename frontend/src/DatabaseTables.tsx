import * as React from 'react'

import { makeStyles, createStyles, Theme } from '@material-ui/core'
import { TableType, TableRelationType } from './types'
import DatabaseTable from './DatabaseTable'
import PF from 'pathfinding'
//@ts-ignore
import { PathLine } from 'react-svg-pathline'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
)

export const precision = 25 // 50 px

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

  // TODO: let user create relations
  const relations = React.useMemo<TableRelationType[]>(() => {
    if (tables.length >= 2) {
      return [
        { from: tables[0], to: tables[1], relationshipType: 'one-to-one' },
      ]
    }
    return []
  }, [tables])

  // We divide our screen in blocks of 50px
  const getPathBetweenTwoTables = React.useCallback(
    (from, to) => {
      let w = window.innerWidth
      let h = window.innerHeight

      // divide in blocks of precision
      let width = Math.ceil(w / precision)
      let height = Math.ceil(h / precision)

      const grid = new PF.Grid(width, height)

      // let set all other tables as obstacles
      tables
        .filter((table) => table !== from && table !== to)
        .forEach((table) => {
          // TODO: how much of the table
          let gridHeight = Math.ceil(table.height / precision)
          let gridWidth = Math.ceil(table.width / precision)

          console.log({ gridWidth, gridHeight })

          const gridX = Math.ceil(table.x / precision)
          const gridY = Math.ceil(table.y / precision)

          // e.g. height is 5
          // gridY is 2
          // we need to block 5,6 of y
          //
          // width is 4
          // gridX is 5
          // we need to block 5, 6, 7, 8

          for (let x = gridX; x <= gridX + gridWidth; x++) {
            for (let y = gridY; y <= gridY + gridHeight; y++) {
              grid.setWalkableAt(x, y, false)
            }
          }
        })

      const finder = new PF.BestFirstFinder({
        //@ts-ignore
        allowDiagonal: false,
        heuristic: function (dx, dy) {
          return Math.min(dx, dy)
        },
      })

      const path = finder.findPath(
        Math.ceil(from.x / precision),
        Math.ceil(from.y / precision),
        Math.ceil(to.x / precision),
        Math.ceil(to.y / precision),
        grid
      )
      return path
    },
    [tables]
  )
  console.log({ tables, relations })
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
      <svg
        style={{
          pointerEvents: 'none',
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          right: 0,
          width: '100%',
          height: '100%',
        }}
      >
        {relations.map((relation, relationIndex: number) => {
          const path = getPathBetweenTwoTables(relation.from, relation.to)
          console.log({ path })
          return (
            <PathLine
              points={path.map((coordinates: number[]) => ({
                x: coordinates[0] * precision,
                y: coordinates[1] * precision,
              }))}
              stroke="black"
              strokeWidth="3"
              fill="none"
              r={10}
            />
          )
        })}
      </svg>
    </>
  )
}
