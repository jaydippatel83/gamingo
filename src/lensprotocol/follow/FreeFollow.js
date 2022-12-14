
import { gql } from '@apollo/client' 
import { apolloClient } from '../services/ApolloClient'
import { getAddress } from '../services/ethers-service'

const FREE_FOLLOW = `
mutation ProxyAction {
    proxyAction(request: {
      follow: {
        freeFollow: {
          profileId: "0x01"
        }
      }
    })
  }
`

const IS_FOLLOW = ` 
query($request: DoesFollowRequest!) { 
  doesFollow(request: $request) {
    followerAddress
    profileId
    follows
  }
}
`

export const isFollow = (req) => { 
  return apolloClient.query({
    query: gql(IS_FOLLOW),
    variables:  { 
      request :{
        followInfos : req
      }
    }
  })
}

export const isFollowProfile = async (request) => { 
  const isFollowRes = await isFollow(request); 
  return isFollowRes;
};

export const freeFollow = (req) => {
  return apolloClient.query({
    query: gql(FREE_FOLLOW),
    variables: {
      request: {
        address: req,
      },
    },
  })
}

export const proxyActionStatusRequest = async (proxyActionId) => {
  const result = await apolloClient.query({
    query: gql(FREE_FOLLOW),
    variables: {
      proxyActionId,
    },
  });

  return result.data.proxyActionStatus;
};


export const proxyActionFreeFollow = async (data) => {

  const address = getAddress();
  console.log('proxy action free follow: address', address);

  await data.login(address);

  const result = await freeFollow({
    follow: {
      freeFollow: {
        profileId: data.followId,
      },
    },
  });
  console.log('proxy action free follow: result', result);

  while (true) {
    const statusResult = await proxyActionStatusRequest(result);
    console.log('proxy action free follow: status', statusResult);
    if (statusResult.__typename === 'ProxyActionStatusResult') {
      console.log(statusResult, "statusResult");
      //   if (statusResult.status === ProxyActionStatusTypes.Complete) {
      //      toast.success('proxy action free follow: complete', statusResult);
      //     break;
      //   }
    }
    if (statusResult.__typename === 'ProxyActionError') {
      console.log('proxy action free follow: failed', statusResult);
      break;
    }
    // await sleep(1000);
  }

  return result;

}

