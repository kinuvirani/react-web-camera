import React, { useEffect, useState, useRef, useContext } from 'react'
// import { Container, Row, Col } from 'reactstrap'
import '../assets/style.css'
import CreateIcon from '@material-ui/icons/Create'
import PanToolIcon from '@material-ui/icons/PanTool'
import HighlightIcon from '@material-ui/icons/Highlight'
// import CameraControll from '../assets/Camera_controls.png'
import CameraControll from '../assets/camera.png'
import RssFeedIcon from '@material-ui/icons/RssFeed'
import KeyboardIcon from '@material-ui/icons/Keyboard'
import { Grid } from '@material-ui/core'
import styled from 'styled-components'
import Keyboard from '../keyboard/keyboard'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import { ChangeKeyBoardContext } from '../../contexts/ChangeKeyBoard'


const FooterWrapper = styled(Grid)`
  position: fixed;
  bottom: 0;
  width: 100%;
  /* height: 60px; */
  z-index: 999;
  /* background: #f0f1f5; */
  background: #e5e5e5;
`

const IconWrapper = styled.div`
  /* transition: all 0.2s ease; */
  text-align: center;
  padding: 20px;
  &:hover {
    background-color: #e73745;
  }
  &:hover .icon-ui {
    color: #fff;
  }
  .icon-ui {
    color: #e73745;
  }
`

const ImageWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
`

const ImageNavigate = styled.img`
  width: 80px;
  height: auto;
  object-fit: cover;
`

const KeyboardWrapper = styled.div`
  z-index: 999;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, 0);
  background-color: #ddd;
  display: ${({ isKeyBoard }) => (isKeyBoard ? 'block' : 'none')};
`

const ModalSelectOption = (props) => {

  const { onClose, open, optionsKeyBoard, handleKeyboard } = props

  const handleClose = () => {
    onClose()
  }

  const handleListItemClick = (value) => {
    onClose(value)
    handleKeyboard();
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">{`Please select an option below`}</DialogTitle>
      <List>
        {optionsKeyBoard?.map((optionKey) => (
          <ListItem
            button
            onClick={() => handleListItemClick(optionKey)}
            key={optionKey}
          >
            <ListItemText primary={optionKey} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  )
}

const Footer = props => {

  const { toggleSidebar, optionsKeyBoard, setSelectopOption, handleKeyboard, takePhoto, changeKeyBoardStatus } = props
  // const [openKeyBoard, setOpenKeyBoard] = useState(false)
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = (value) => {
    setOpen(false)
    // console.log(`value>>`,value);
    setSelectopOption(value)
  }

  return (
    <>
      {/* <KeyboardWrapper isKeyBoard={selectedValue}>
        <Keyboard typeKeyboard={selectedValue} />
      </KeyboardWrapper> */}
      <ModalSelectOption open={open} onClose={handleClose} optionsKeyBoard={optionsKeyBoard} handleKeyboard={handleKeyboard} />
      <FooterWrapper container alignItems="center" wrap={true}>
        {/* <Grid container alignItems="center"> */}
        <Grid item md={4}>
          <Grid container wrap={true}>
            <Grid item xs>
              <IconWrapper onClick={toggleSidebar} className="button_click_cursor">
                <CreateIcon className="icon-ui" />
              </IconWrapper>
            </Grid>
            <Grid item xs>
              <IconWrapper onClick={changeKeyBoardStatus} className="button_click_cursor">
                <KeyboardIcon className="icon-ui" />
              </IconWrapper>
            </Grid>
            <Grid item xs>
              {/* <IconWrapper>
                <RssFeedIcon className="icon-ui" />
              </IconWrapper> */}
            </Grid>
          </Grid>
        </Grid>

        <Grid item md={4}>
          <Grid container>
            <Grid item xs>
              <ImageWrapper>
                <ImageNavigate src={CameraControll} alt="" onClick={takePhoto} className="button_click_cursor" />
              </ImageWrapper>
            </Grid>
          </Grid>
        </Grid>
        {/* </Grid> */}
      </FooterWrapper>
    </>
  )
}
export default Footer
