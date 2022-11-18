import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/system';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Avatar, Box, CircularProgress, Divider } from '@mui/material';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { createPost, createPostViaDis } from '../../lensprotocol/post/create-post';
import { LensAuthContext } from '../../context/LensContext';
import { Buffer } from 'buffer';

import { create } from 'ipfs-http-client';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { toast } from 'react-toastify';
import { createPostByDispatcher } from '../../lensprotocol/post/dispatcher/post-despatcher';
 

import Tooltip from '@mui/material/Tooltip';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faImages, faFileVideo, faFileText } from '@fortawesome/free-regular-svg-icons'
import CancelIcon from '@mui/icons-material/Cancel';
import VideocamIcon from '@mui/icons-material/Videocam';

const auth =
    "Basic " +
    Buffer.from(
        process.env.REACT_APP_INFURA_PID + ":" + process.env.REACT_APP_INFURA_SECRET
    ).toString("base64");

const client = create({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
    headers: {
        authorization: auth,
    },
}); 

 


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
    '&.MuiBackdrop-root': {
        backgroundColor: 'rgba(0, 0, 0, .8)',
    }
}));

function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}


BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};



export default function CreateVideo() {
    const lensAuthContext = React.useContext(LensAuthContext);
    const { profile, login, update, setUpdate } = lensAuthContext;
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [tags, setTags] = React.useState([]);
    const [file, setFile] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [videoLoader, setVideoLoader] = React.useState(false);
    const openAndSetOpen = React.useContext(LensAuthContext);

    const { open, setOpen } = openAndSetOpen;
    const inputRef = React.useRef();
    const [source, setSource] = React.useState("");
 
 

    const handleFileChange = async (e) => {
        setVideoLoader(true);
        const file = e.target.files[0];
        const ipfsResult = await client.add(file);
        const imageURI = `https://superfun.infura-ipfs.io/ipfs/${ipfsResult.path}`;  
        setSource(imageURI);
        setVideoLoader(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setFile("");
        setTags([]);
        setTitle("");
        setSource("");
        setDescription("");
    };

    const addTags = event => {
        if (event.key === "Enter" && event.target.value !== "") {
            setTags([...tags, event.target.value]);
            event.target.value = "";
        }
    };

    const removeTags = index => {
        setTags([...tags.filter(tag => tags.indexOf(tag) !== index)]);
    };

    const handleUpload = async () => {
        const fId = window.localStorage.getItem("profileId");
        if (title.length !== 0 &&  source !== "" && tags.length !== 0) {
            if (fId === undefined) {
                toast.error("Please Login First!");
                return;
            }
            var res;
            var media = 'video'; 
            try {

                setLoading(true);
                const postData = {
                    title: title,
                    photo: file,
                    tags: tags,
                    login: login,
                    description: description,
                    video: source,
                    name: profile.handle,
                    profile: profile,
                    fileTyepe:  media
                }
                if (profile?.dispatcher?.canUseRelay) {
                    res = await createPostViaDis(postData); 
                } else {
                    res = await createPost(postData); 
                } 
                if (res) {
                    setUpdate(!update);
                    setFile("");
                    setTags([]);
                    setTitle("");
                    setDescription("");
                    setLoading(false);
                    toast.success("Post is Successfully created!");
                    setOpen(false);
                }
            } catch (error) {
                toast.error(error);
                setLoading(false);
                setUpdate(!update);
            }
        } else {
            toast.error("Required all the fields!");
        }

    } 
    const handleRemoveVideo = () => {
        setSource("");
        setFile("");
    }
    return (
        <div>
            <Button className='' style={{ background: '#001C3E', color: 'white', textTransform: 'capitalize' }} onClick={handleClickOpen}  >Create Video</ Button>
            <BootstrapDialog open={open} onClose={handleClose} maxWidth="sm" fullWidth style={{ borderRadius: '30px' }}>
                <BootstrapDialogTitle onClose={handleClose}>Create Video</BootstrapDialogTitle>

                <DialogContent dividers >

                    <div>
                        <input onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Title" className="title" /><br></br>
                       <textarea onChange={(e) => setDescription(e.target.value)} rows={3} type="text" placeholder="Take a Note..." className="take-note" autoFocus="autofocus " />
  
                        <input onKeyUp={event => addTags(event)} type="text" placeholder='#Add Tags' className="take-note" /><br></br>
                    </div>

                    <Stack direction="row" spacing={1}>
                        <div style={{ width: '100%' }}>
                            {tags.map((tag, index) => (
                                <Chip label={`#${tag}`}
                                    variant="outlined"
                                    className='m-1'
                                    key={index}
                                    onDelete={() => removeTags(index)}
                                />

                            ))}
                        </div>
                    </Stack> 
                    {
                        videoLoader && <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <CircularProgress size={35}  color="primary"/>
                    </Box>
                    }
                    {source && (
                        <div className='d-flex justify-content-between '>
                            <video
                                className="VideoInput_video"
                                width="100%"
                                height="250px"
                                controls
                                src={source}
                            />
                            <CancelIcon style={{ fontSize: '24px', }} onClick={handleRemoveVideo} />
                        </div>
                    )}

                   <div className='d-flex mt-2'> 
                            {
                                source === "" && <Tooltip title="Upload Video">
                                    <IconButton
                                        size="small"
                                        sx={{ ml: 2 }}
                                    >
                                        <input
                                            ref={inputRef}
                                            className="input-file d-none"
                                            type="file"
                                            name="video"
                                            id="video"
                                            onChange={(e) => handleFileChange(e)}
                                            accept=".mov,.mp4"
                                        />
                                        <label
                                            htmlFor="video"
                                            style={{ width: '100%', cursor: 'pointer', padding: '2px 10px' }}
                                            className="rounded-3 text-center   js-labelFile " >
                                            <FontAwesomeIcon color='#468f72' size="lg" icon={faFileVideo} />
                                        </label>
                                    </IconButton>
                                </Tooltip>
                            }
                        </div> 

                </DialogContent>
                <DialogActions className='d-flex justify-content-end'>
                    <Button variant='contained'  onClick={handleClose}>Cancel</Button>
                    <Button variant='contained' onClick={handleUpload}>{loading ? <CircularProgress size={20} color="inherit" /> : "Upload"}</Button>

                </DialogActions>
            </BootstrapDialog>
        </div >
    );
}
