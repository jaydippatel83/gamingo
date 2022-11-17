import { Button, CircularProgress, Divider, Skeleton } from '@mui/material'
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LensAuthContext } from '../context/LensContext';
import { follow } from '../lensprotocol/follow/follow';
import { exploreProfile } from '../lensprotocol/profile/explore-profiles';
import UserListView from './Lists/UserListView';


export default function RightNav() {
    const [Items, setItems] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [page, setPage] = useState("{\"timestamp\":1,\"offset\":0}");


    useEffect(() => {
        loadMoreItems();
    }, [])




    async function loadMoreItems() {
        setIsFetching(true);
        const results = await exploreProfile(page).then((res) => {

            setItems((prevTitles) => {
                return [...new Set([prevTitles, ...res.exploreProfiles.items.map((b) => b)])];
            });
            setPage(res.exploreProfiles.pageInfo.next);
            setIsFetching(false);
        })
            .catch((e) => {
                console.log(e);
                setIsFetching(false);
            });
    }

    const skele = [0, 1, 2, 3, 4, 5, 6, 7];


    return (
        <>
            <div><p style={{ textAlign: "left" }}>Trending Profile</p></div>
            <div className='container rightnav'>
                {/* {
                    isFetching && <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <CircularProgress />
                    </Box>
                } */}

                {
                  !isFetching &&  Items && Items.slice(1).map((e, i) => {
                        return (
                            < UserListView e={e} key={i} index={i} />
                        )
                    })
                }

                {
                    isFetching && skele.map((e, i) => {
                        return (
                            <div key={i}>
                                <Skeleton animation="wave" variant="circular" width={25} height={25} />
                                <Skeleton
                                    animation="wave"
                                    height={10}
                                    width="80%"
                                    style={{ marginBottom: 6 }}
                                />
                                <Skeleton animation="wave" height={10} width="40%" />
                            </div>
                        )
                    })
                }
                <div className='text-center'>
                    {
                        isFetching ? <Skeleton
                            animation="wave"
                            height={10}
                            width="80%"
                            style={{ marginBottom: 6 }}
                        /> : <Button onClick={loadMoreItems} >Show More Creators</Button>
                    }
                </div>
            </div>

        </>

    )
}
