import { Button, CircularProgress, IconButton, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LensAuthContext } from '../../context/LensContext';
import { follow } from '../../lensprotocol/follow/follow';
import OutlinedFlagOutlinedIcon from '@mui/icons-material/OutlinedFlagOutlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function VideoCard(props) {
    const [loading, setLoading] = useState(false);
    const [update, setUpdate] = useState(false);
    const lensAuthContext = React.useContext(LensAuthContext);
    const { login, profile } = lensAuthContext;

    const navigate = useNavigate();

    const replaceUrl = (e) => {
        const str = e && e.startsWith("ipfs://");
        if (str) {
            const res = 'https://superfun.infura-ipfs.io/ipfs/' + e.slice(7);
            return res;
        }
        return e;
    }
    const handleNavigate = (id) => {
        navigate(`/newprofile/${id}`)
    }

    const handleNavigateVideo=(id)=>{
        navigate(`/video/${id}`)
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <div  className='m-2' >
                <span>
                    <div className='video-image' 
                      onClick={() => handleNavigateVideo(props.data?.id)}
                        style={{
                            backgroundImage: `linear-gradient(360deg, rgba(0,0,0,0.3) 100%, rgba(0,0,0,0.1) 100%), url(${props.data?.picture != null ? replaceUrl(props.data?.picture?.original?.url) : "https://superfun.infura-ipfs.io/ipfs/QmRY4nWq3tr6SZPUbs1Q4c8jBnLB296zS249n9pRjfdobF"} )`,
                             margin: "10px 0",
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            borderRadius: '10px'
                        }}
                    ></div>
                    <div className='d-flex justify-content-between'>
                        <img alt="" src={`${props.data?.picture != null ? replaceUrl(props.data?.picture?.original?.url) : "https://superfun.infura-ipfs.io/ipfs/QmRY4nWq3tr6SZPUbs1Q4c8jBnLB296zS249n9pRjfdobF"}`} style={{ width: '40px', height: '40px', borderRadius: '6px' }} loading="eager" />
                        <div className='user-info' onClick={() => handleNavigate(props.data?.id)} style={{ cursor: 'pointer' }}>
                            <p>{props.data?.name !== null && props.data?.name !== "[NULL]" ? props.data?.name : props.data?.handle}</p>
                            <div> {props.data?.bio}</div>
                        </div>
                        <IconButton aria-label="settings">
                        <MoreVertIcon
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        />
                    </IconButton>
                    <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose}><IconButton><OutlinedFlagOutlinedIcon style={{ fontSize: "18px" }} /></IconButton><small>Report Post</small></MenuItem>
                <MenuItem onClick={handleClose}><IconButton><CodeOutlinedIcon style={{ fontSize: "18px" }} /></IconButton><small>Embed</small></MenuItem>
            </Menu>
                    </div>
                </span>
            </div>
        </>
    )
}

export default VideoCard