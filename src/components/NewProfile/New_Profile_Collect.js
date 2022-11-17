import { Send } from '@mui/icons-material';
import { Avatar, Card, Button, CardActions, Input, CardContent, CardHeader, CardMedia, CircularProgress, Divider, IconButton, InputBase, Typography } from '@mui/material';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { postsByComment } from '../../lensprotocol/post/get-post';
import CollectComponent from '../publications/CollectComponent';
import MirrorComponent from '../publications/MirrorComponent';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import { useNavigate } from 'react-router-dom';
import Profile_Likes from '../profile/Profile_Likes';
import { Box } from '@mui/system';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import SwapHorizSharpIcon from '@mui/icons-material/SwapHorizSharp';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import { styled } from '@mui/material/styles';

const ExpandMore = styled((props) => {

    const { expand, ...other } = props;

    return <IconButton {...other} />;

})(({ theme, expand }) => ({

    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',

    marginLeft: 'auto',

    transition: theme.transitions.create('transform', {

        duration: theme.transitions.duration.shortest,

    }),

}));

function New_Profile_Collect() {
    const [showComment, setShowComment] = useState(false);
    const [comment, setComments] = React.useState("");
    const [loading, setLoading] = useState(false);

    const handleShowComment = () => {
        setShowComment(!showComment);
    };



    return (
        <div style={{ background: "#FFFFFF1A"  }} className='row' >
            <div className='row'>
                <div className='col-xxl-2 col-xl-2 col-lg-2 col-sm-2 col-1' style={{ width: "10%" }}>
                    <img className='post-profile' src='https://superfun.infura-ipfs.io/ipfs/QmRY4nWq3tr6SZPUbs1Q4c8jBnLB296zS249n9pRjfdobF'></img>
                </div>
                <div className='col-lg-6 offset-xl-0 offset-md-1 mt-3 col-sm-7 offset-sm-1 col-7 offset-1'>
                    <div className='row new-profile-name'>
                        <strong>@Name</strong>
                    </div>
                    <div className='row'>
                        <small>September 19, 2022 4:15 PM</small>
                    </div>
                </div>

                <div className='offset-lg-0 offset-xl-2 offset-sm-0 col-1 offset-0 col-sm-1 new-profile-follw-btn'>
                    <Button variant='outlined' >Follow</Button>
                </div>
                <div className='col-12 post-img' style={{ padding: "0px", margin: "0px" }}>
                    <img style={{ height: "400px" }} src='https://superfun.infura-ipfs.io/ipfs/QmdFb3y3jeAMg6aD3gXCpdbGTXRTGqwfstgzV7aRZcBK3m'>
                    </img>
                </div>
                <div className='col-12 mt-3'>
                    Title here
                </div>
                <div className='col-12 mt-3 mb-4'>
                    here is a description bio , description will come here
                </div>

                <div className='row mb-4 like-comment-icons'>
                    <div className='col-4'>

                        <CardActions disableSpacing>
                            <strong>100</strong><IconButton>
                                <FavoriteBorderIcon />
                            </IconButton>
                        </CardActions>
                    </div>
                    <div onClick={handleShowComment} className='offset-5 col-1'>
                        <CardActions disableSpacing>
                            <IconButton>
                                <ModeCommentOutlinedIcon />
                            </IconButton>
                        </CardActions>
                    </div>

                    <div className='col-1'>
                        <CardActions disableSpacing>
                            <IconButton>
                                <SwapHorizSharpIcon />
                            </IconButton>
                        </CardActions>
                    </div>

                    <div className='col-1'>
                        <CardActions disableSpacing>
                            <IconButton>
                                <LibraryAddOutlinedIcon />
                            </IconButton>
                        </CardActions>
                    </div>
                </div>
                <div className='row'>
                    {showComment ? (
                        <div className='m-2' style={{ maxHeight: '300px', overflowY: 'hide' }}>
                            <div className="d-flex justify-content-around mt-2">
                                <div className="p-0">
                                    <Avatar src={"https://superfun.infura-ipfs.io/ipfs/QmRY4nWq3tr6SZPUbs1Q4c8jBnLB296zS249n9pRjfdobF"} />
                                </div>
                                <form className="col-10 header-search ms-3 d-flex align-items-center">
                                    <div className="input-group" style={{ background: 'white', borderRadius: '14px' }}>
                                        <Input
                                            sx={{ ml: 1, flex: 1, color: 'black' }}
                                            placeholder="Write a comment.."
                                            value={comment}
                                        />
                                    </div>
                                    <IconButton >
                                        {loading ? <CircularProgress size={20} /> : <Send />}
                                    </IconButton>
                                </form>
                            </div>
                            <div style={{ margin: '10px' }} >
                                <Divider />
                                <div className="p-0 d-flex " style={{ padding: '5px' }}>
                                    <Avatar src='https://superfun.infura-ipfs.io/ipfs/QmRY4nWq3tr6SZPUbs1Q4c8jBnLB296zS249n9pRjfdobF' />
                                    <p style={{ marginLeft: '7px' }} className='mb-2  align-self-end ml-5'>@MansiTest</p>
                                </div>
                                <small><p style={{
                                    padding: '5px 10px',
                                    background: '#000',
                                    borderRadius: '14px',
                                    margin: '0px 0px 5px 45px',
                                    width: 'fit-content'
                                }}>This is comment This is comment This is comment This is comment This is comment This is comment This is comment</p>
                                </small>
                                
                                <Divider />
                                {/* <Divider />
                                <div className="p-0 d-flex " style={{ padding: '5px' }}>
                                    <Avatar src='https://superfun.infura-ipfs.io/ipfs/QmRY4nWq3tr6SZPUbs1Q4c8jBnLB296zS249n9pRjfdobF' />
                                    <p style={{ marginLeft: '7px' }} className='mb-2  align-self-end ml-5'>@MansiTest</p>
                                </div>
                                <small><p style={{
                                    padding: '5px 10px',
                                    background: '#000',
                                    borderRadius: '14px',
                                    margin: '0px 0px 5px 45px',
                                    width: 'fit-content'
                                }}>This is comment This is comment This is comment This is comment This is comment This is comment This is comment</p>
                                </small>
                                
                                <Divider /> */}
                            </div>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </div>
    )
}

export default New_Profile_Collect;