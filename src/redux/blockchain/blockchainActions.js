// constants
import Web3EthContract from "web3-eth-contract";
import Web3 from "web3";
// log
// import { fetchData } from "../data/dataActions";
import Swal from "sweetalert2";

export const setAccount =(payload)=>{
  return {
    type: "SET_ACCOUNT",
    payload
  }
}

const connectRequest = () => {
  return {
    type: "CONNECTION_REQUEST",
  };
};

const connectSuccess = (payload) => {
  return {
    type: "CONNECTION_SUCCESS",
    payload: payload,
  };
};

export const connectFailed = (payload) => {
  return {
    type: "CONNECTION_FAILED",
    payload: payload,
  };
};

export const updateAccountRequest = (payload) => {
  return {
    type: "UPDATE_ACCOUNT",
    payload: payload,
  };
};


export const connectMetaMask = () => {
  return async (dispatch) => {
    dispatch(connectRequest());
    const abiResponse = await fetch("/config/abi.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const abi = await abiResponse.json();
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const CONFIG = await configResponse.json();
    const { ethereum } = window;
    const metamaskIsInstalled = ethereum && ethereum.isMetaMask;
    if (metamaskIsInstalled) {
      Web3EthContract.setProvider(ethereum);
      let web3 = new Web3(ethereum);
      try {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        const networkId = await ethereum.request({
          method: "net_version",
        });
        if (networkId == CONFIG.NETWORK.ID) {
          const SmartContractObj = new Web3EthContract(
            abi,
            CONFIG.CONTRACT_ADDRESS
          );
          dispatch(
            connectSuccess({
              account: accounts[0],
              smartContract: SmartContractObj,
              web3,
            })
          );
         
          
          // Add listeners end
        } else {
          Swal.fire({
            icon: 'error',
            title: `Change network to ${CONFIG.NETWORK.NAME}.`
          })
          dispatch(connectFailed(`Change network to ${CONFIG.NETWORK.NAME}.`));

        }
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `Something went wrong.`
        })
        dispatch(connectFailed("Something went wrong."));

      }
    } else {
      Swal.fire({
        icon: 'error',
        title: `Install Metamask.`
      })
      dispatch(connectFailed("Install Metamask."));

    }
  };
};

// export const updateAccount = (account) => {
//   return async (dispatch) => {
//     dispatch(updateAccountRequest({ account: account }));
//     dispatch(fetchData(account));
//   };
// };
