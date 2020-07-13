import * as React from 'react'
import { Menu, MenuItem, ButtonBase } from '@material-ui/core'

export default function DatabaseTableRelationCreate() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <ButtonBase
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <svg
          id="_x31__x2C_5"
          enable-background="new 0 0 36 36"
          height="46"
          viewBox="0 0 36 36"
          width="46"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m8.377 4.167c6.917 0 11.667-3.583 15-3.583s10.333 1.916 10.333 17.249-9.417 17.583-13.083 17.583c-17.167.001-24.5-31.249-12.25-31.249z"
            fill="#efefef"
          />
          <g fill="#a4afc1">
            <path
              d="m31.857 14.82h2v1h-2z"
              transform="matrix(.707 -.707 .707 .707 -1.21 27.72)"
            />
            <path
              d="m28.467 13.967h1v2h-1z"
              transform="matrix(.707 -.707 .707 .707 -2.099 24.866)"
            />
            <path
              d="m32.533 18.033h1v2h-1z"
              transform="matrix(.707 -.707 .707 .707 -3.783 28.933)"
            />
          </g>
          <path
            d="m23.25 8.75c0-1.1-.9-2-2-2h-12.5c-1.1 0-2 .9-2 2v5.25h16.5z"
            fill="#f3f3f1"
          />
          <path d="m6.75 14h16.5v7.75h-16.5z" fill="#2fdf84" />
          <path
            d="m23.25 27.25v-5.5h-16.5v5.5c0 1.105.895 2 2 2h12.5c1.105 0 2-.895 2-2z"
            fill="#f3f3f1"
          />
          <path
            d="m11 6.75h-2.25c-1.1 0-2 .9-2 2v5.25h2.25v-5.25c0-1.1.9-2 2-2z"
            fill="#d5dbe1"
          />
          <path
            d="m9 27.25v-5.5h-2.25v5.5c0 1.105.895 2 2 2h2.25c-1.105 0-2-.895-2-2z"
            fill="#d5dbe1"
          />
          <path d="m6.75 14h2.25v7.75h-2.25z" fill="#00b871" />
          <path d="m22 30h-13.25c-1.517 0-2.75-1.233-2.75-2.75v-18.5c0-1.517 1.233-2.75 2.75-2.75h12.5c1.517 0 2.75 1.233 2.75 2.75v7.25h-1.5v-7.25c0-.689-.561-1.25-1.25-1.25h-12.5c-.689 0-1.25.561-1.25 1.25v18.5c0 .689.561 1.25 1.25 1.25h13.25z" />
          <path d="m6.75 13.5h16.5v1.5h-16.5z" />
          <path d="m6 21h9v1.5h-9z" />
          <circle cx="19" cy="11" r="1" />
          <circle cx="15" cy="11" r="1" />
          <circle cx="11" cy="11" r="1" />
          <path d="m23.242 26.4c-.805 0-1.605-.312-2.217-.926l-3.107-3.126c-.591-.585-.918-1.373-.918-2.214s.327-1.629.922-2.219c1.143-1.169 3.237-1.186 4.423.003l.533.535-1.063 1.059-.533-.535c-.613-.615-1.702-.614-2.296-.005-.316.314-.486.725-.486 1.162s.17.848.479 1.154l3.11 3.129c.595.597 1.532.644 2.184.11l.951 1.16c-.581.477-1.283.713-1.982.713z" />
          <path d="m26.868 30c-.84 0-1.627-.328-2.216-.926l-.512-.514 1.063-1.059.515.517c.615.623 1.688.62 2.298.003.314-.313.484-.723.484-1.16s-.17-.848-.479-1.154l-3.11-3.129c-.574-.576-1.568-.621-2.181-.113l-.957-1.154c1.187-.983 3.099-.895 4.201.21l3.107 3.126c.592.585.919 1.374.919 2.214s-.327 1.629-.922 2.219c-.583.592-1.37.92-2.21.92z" />
        </svg>
      </ButtonBase>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>One-to-one</MenuItem>
        <MenuItem onClick={handleClose}>One-to-many</MenuItem>
        <MenuItem onClick={handleClose}>Many-to-many</MenuItem>
      </Menu>
    </div>
  )
}
