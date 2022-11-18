import { Button, Divider, IconButton, Menu, MenuItem } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import { exploreProfileOnSlider } from '../lensprotocol/profile/explore-profiles';
import SkeletonCard from './assets/SkeletonSlider';
import UserCard from './Cards/UserCard';
import VideoCard from './Cards/VideoCard';
import OutlinedFlagOutlinedIcon from '@mui/icons-material/OutlinedFlagOutlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CreateVideo from './modals/CreateVideo';

function Gameplay() {

    const [story, setStory] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNavigate = (id) => {
        navigate(`/newprofile/${id}`)
    }
    const replaceUrl = (e) => {
        const str = e && e.startsWith("ipfs://");
        if (str) {
            const res = 'https://superfun.infura-ipfs.io/ipfs/' + e.slice(7);
            return res;
        }
        return e;
    }



    useEffect(() => {
        async function getCreator() {
            var user = [];
            const res = await exploreProfileOnSlider();
            res.exploreProfiles.items && res.exploreProfiles.items.map((e, i) => {
                user.push(e);
            })
            setStory(user)
        }
        getCreator()
    }, [])

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 540,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    const handleNavigateVideo=(id)=>{
        navigate(`/video/${id}`)
    }
    const skele = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    return (
        <div className='container'>
            <Box sx={{ width: '100%', padding: '0', marginTop: { xs: '50px', sm: '60px', md: '70px', lg: '100px' } }}>
                <div className='footer-position '>
                    <div className='container mt-4' style={{ margin: '5% 0' }}>
                        <div className='row'>
                            <div className='col'>
                                <div className="d-flex justify-content-between mb-2">
                                    <p className='m-0'>Latest</p>
                                    <CreateVideo/>
                                </div>
                                {
                                    story.length === 0 && <Slider {...settings}>
                                        {
                                            skele.map((e, i) => {
                                                return (
                                                    <SkeletonCard key={i} />
                                                )
                                            })
                                        }
                                    </Slider>
                                }

                                {
                                    story === undefined && <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <h4>No data Available</h4>
                                    </Box>
                                }
                                <Slider {...settings}>
                                    {
                                        story && story.map((e, i) => {
                                            return (
                                                <VideoCard key={i} data={e} index={i} />
                                            )
                                        })
                                    }
                                </Slider>
                            </div>
                            <Divider orientation='horizontal' sx={{ margin: '30px 0' }} />

                            {
                                story && story.map((data, i) => {
                                    return (
                                        <div key={i} className='col-12 col-xs-2 col-sm-3 col-md-4 col-lg-4 ' style={{margin:'20px 0'}}>
                                            <div className='m-2' >
                                                <span>
                                                    <div className='video-image'
                                                        onClick={() => handleNavigateVideo(data?.id)}
                                                        style={{
                                                            backgroundImage: `linear-gradient(360deg, rgba(0,0,0,0.3) 100%, rgba(0,0,0,0.1) 100%), url(${data?.picture != null ? replaceUrl(data?.picture?.original?.url) : "https://superfun.infura-ipfs.io/ipfs/QmRY4nWq3tr6SZPUbs1Q4c8jBnLB296zS249n9pRjfdobF"} )`,
                                                            margin: "10px 0",
                                                            backgroundPosition: 'center',
                                                            backgroundSize: 'cover',
                                                            borderRadius: '10px'
                                                        }}
                                                    ></div>
                                                    <div className='d-flex justify-content-between'>
                                                        <div className='d-flex justify-content-start'>
                                                        <img alt="" src={`${data?.picture != null ? replaceUrl(data?.picture?.original?.url) : "https://superfun.infura-ipfs.io/ipfs/QmRY4nWq3tr6SZPUbs1Q4c8jBnLB296zS249n9pRjfdobF"}`} style={{ width: '40px', height: '40px', borderRadius: '6px' }} loading="eager" />
                                                        <div className='user-info' onClick={() => handleNavigate(data?.id)} style={{ cursor: 'pointer' }}>
                                                            <p>{data?.name !== null && data?.name !== "[NULL]" ? data?.name : data?.handle}</p>
                                                            <div> {data?.bio}</div>
                                                        </div>
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
                                        </div>
                                    )
                                })
                            }

                        </div>
                    </div>
                </div>
            </Box>
        </div>

    )
}

export default Gameplay