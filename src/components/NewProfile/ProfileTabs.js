import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Divider, ImageList, ImageListItem, useMediaQuery, useTheme } from '@mui/material';
import PostAddIcon from '@mui/icons-material/PostAdd';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import SwapHorizSharpIcon from '@mui/icons-material/SwapHorizSharp';
import New_Profile_Post from './New_Profille_Post';
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import New_Profile_Comment from './New_Profille_Comment';
import New_Profile_Mirror from './New_Profile_Mirror';
import New_Profile_Collect from './New_Profile_Collect';
import PostCard from '../Cards/PostCard';

import { posts, postsByprofile } from '../../lensprotocol/post/get-post';
import useInfiniteScroll from '../useInfiniteScroll';
import { useState } from 'react';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ padding: {xs : '5px' ,sm:'5px'},minWidth:'50px' }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function ProfileTabs({ id, state }) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const theme = useTheme();

    const greaterThanMid = useMediaQuery(theme.breakpoints.up("md"));
    const smallToMid = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const lessThanSmall = useMediaQuery(theme.breakpoints.down("sm"));
    const xsmall = useMediaQuery(theme.breakpoints.down("xs"));


    const [Items, setItems] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [page, setPage] = useState("{\"timestamp\":1,\"offset\":0}");
    const [HasMore, setHasMore] = useState(true);
    const [lastElementRef] = useInfiniteScroll(
        HasMore ? loadMoreItems : () => { },
        isFetching
    );
    React.useEffect(() => {
        loadMoreItems();
    }, [])



    async function loadMoreItems() { 
        setIsFetching(true);
        const results = await postsByprofile(page, id).then((res) => { 
            setItems((prevTitles) => {
                return [...new Set([...prevTitles, ...res.data.publications.items.map((b) => b)])];
            });
            setPage(res.data.publications.pageInfo.next);
            setHasMore(res.data.publications.items.length > 0);
            setIsFetching(false);
        })
            .catch((e) => {
                console.log(e);
            });
    } 

    return (
        <>

            <Box sx={{ width: '100%' }}>
                <Divider flexItem orientation="vertical" style={{ margin: '0 0px' }} />
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"   >
                        <Tab icon={<PostAddIcon />}
                            iconPosition="start"
                            className='profile-tab'
                            label={`(${ state.totalPosts })`}
                            {...a11yProps(0)} />
                        <Tab icon={< ModeCommentOutlinedIcon />}
                            iconPosition="start" className='profile-tab'
                            label={`(${ state.totalComments}) `}   {...a11yProps(1)} />
                        <Tab icon={< SwapHorizSharpIcon />} iconPosition="start"
                            className='profile-tab' label={`(${ state.totalMirrors})`}  {...a11yProps(2)} />
                        <Tab icon={< LibraryAddOutlinedIcon />}
                            iconPosition="start" className='profile-tab'
                            label={`(${ state.totalCollects })`}
                            {...a11yProps(3)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <Box sx={{ width: '100%', height: 'auto', overflowY: 'scroll', marginTop: '3%' }}>
                        <ImageList variant="masonry" cols={greaterThanMid && 2 || smallToMid && 2 || lessThanSmall && 1 || xsmall && 1} gap={4}>
                            {
                                Items && Items.map((item, i) => {
                                    return (
                                        <ImageListItem
                                            ref={lastElementRef}
                                            key={i}
                                            style={{ cursor: 'pointer',margin:'10px' }}
                                        >
                                            <PostCard item={item} />
                                        </ImageListItem>
                                    )
                                })
                            }
                        </ImageList>
                    </Box>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <New_Profile_Comment id={id}/>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <New_Profile_Mirror id={id} />
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <New_Profile_Collect id={id} />
                </TabPanel>
            </Box>
        </>
    );
}
