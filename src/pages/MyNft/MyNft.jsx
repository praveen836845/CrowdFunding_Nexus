import React, { useState, useEffect } from "react";
import CreateCampaign from "pages/Createcampaign";
import { toast } from "react-hot-toast"; 

//import Modal from "../../components/Modal";
import { CampaignNFTABI } from "abi/constants";
import WalletButton from "pages/Walletconnect";
import { Button, Img, List, Text } from "components";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
  useReadContract,
} from "wagmi";
import { config } from "App";
import { writeContract, waitForTransactionReceipt } from "wagmi/actions";
import { CrowdFundingABI } from "../../abi/constants";
import { CrowdFundingAddress } from "../../abi/constants";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Contract, formatUnits, parseEther , formatEther} from "ethers";
import { Link } from "react-router-dom";
import { useCampaignContext } from "pages/CampaignProvider";
import SideBar from "components/Sidebar/SideBar";

const MyNft = ({ onSubmit }) => {
  const [card, setCard] = useState(false);
  const { address, isConnected } = useAccount(); // This is the client address
  const { writeContractAsync, isPending } = useWriteContract();
  const [Approve, setApprove] = useState(false);
  const [campaignData, setCampaignData] = useState([]);
  const CONTRACT_ADDRESS = CrowdFundingAddress;

  // Adding this data to the
  const {
    data,
    isError,
    isLoading: contractLoading,
  } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CrowdFundingABI,
    functionName: "getCampaigns",
  });

  const {
    data: NFTdata,
    isErroroccur,
    isLoading: contractLoadings,
  } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CrowdFundingABI,
    functionName: "getNFTsForAccount",
    args: [address],
  });

  // console.log(data  , "getCampaign" );
  console.log(NFTdata, "NFTData");

  let matchedData;
  if (NFTdata) {
    matchedData = NFTdata.filter((newItem) => {
      console.log("inside the Main loop");

      const matchingCampaign = data.find(
        (campaign) => campaign.nftContract === newItem.nftContract
      );

      if (matchingCampaign && matchingCampaign.isActive) {
        console.log("matched", matchingCampaign);
        const matchingTier = matchingCampaign.tiers.find(
          (tier) => tier.tier === newItem.tier
        );

        if (matchingTier) {
          // Add tier image (URI) to the newItem
          newItem.tierImage = matchingTier.uri;
          return true;
        }
      }

      return false;
    });
  }

  console.log("NFTlisted", matchedData);
  // matchedData = [{
  //   tierImage : 'https://gateway.pinata.cloud/ipfs/QmQBpkP3F5WzxHaEc4UQEDS5GxoZcCfRe6XFttzHfSqkca'
  // }]

  // const HandleApprove = async(campaignid , nftContract , tokenId) => {
  //   try {
  //     console.log("changes in the inside" , campaignid , nftContract , tokenId)
  //     const hash = await writeContract(config ,{
  //       address: nftContract,
  //       abi: CampaignNFTABI,
  //       functionName: 'approve',
  //       args: [CONTRACT_ADDRESS , tokenId],
  //     });
  //     await  waitForTransactionReceipt(config , {hash, pollingInterval: 500})  // Time taken
  //     console.log("Approve Successfully: ", hash);

  //   } catch (error) {
  //     console.error("Error donating to campaign: ", error);
  //   }
  // }

  const HandleApprove = async (campaignid, nftContract, tokenId) => {
    try { 
      
      // Display loading toast message
      await toast.promise(
        (async () => {
          console.log(
            "changes in the inside",
            campaignid,
            nftContract,
            tokenId
          );

          // Call contract function to approve
          const hash = await writeContract(config, {
            address: nftContract,
            abi: CampaignNFTABI,
            functionName: "approve",
            args: [CONTRACT_ADDRESS, tokenId],
          });

          // Wait for transaction receipt
          await waitForTransactionReceipt(config, {
            hash,
            pollingInterval: 500,
          });

          // Return the success message and hash for further display in the toast
          console.log("Approve Successfully: ", hash);
          return hash; // this value will be used to display the success message
        })(),
        {
          loading: `Approving token ${tokenId}...`, // Loading state message
          success: (hash) => `Approval successful! Transaction Hash: ${hash}`, // Success state message with the hash
          error: (error) => `Approval failed: ${error.message}`, // Error state message
        }
      );
    } catch (error) {
      console.error("Error donating to campaign: ", error);
    }
  };

  // const HandleNFTlistsale = async (campaignId, nftContract, tokenId) => {
  //   try {
  //     console.log("changes in the inside", campaignId, nftContract, tokenId);
  //     await HandleApprove(campaignId, nftContract, tokenId);
  //     // Input taken from the User  : price
  //     const hash = await writeContractAsync({
  //       address: CONTRACT_ADDRESS,
  //       abi: CrowdFundingABI,
  //       functionName: "listNFTForSale",
  //       args: [campaignId, tokenId, "	1000000000000000000"], // Price in eth convert wei
  //     });
  //     console.log("Successfully Listed ", hash);
  //   } catch (error) {
  //     console.error("Error donating to campaign: ", error);
  //   }
  // };

const HandleNFTlistsale = async (campaignId, nftContract, tokenId) => {
  try {
    // Display loading toast message for the entire listing process
    await HandleApprove(campaignId, nftContract, tokenId);
    await toast.promise(
      (async () => {
        console.log("changes in the inside", campaignId, nftContract, tokenId);

        const price = prompt("Set the price of NFT (in ETH):");
        const priceset  = parseEther(price).toString()
        console.log(priceset , typeof priceset);
        // Then, list the NFT for sale
        const hash = await writeContractAsync({
          address: CONTRACT_ADDRESS,
          abi: CrowdFundingABI,
          functionName: "listNFTForSale",
          args: [campaignId, tokenId, priceset], // Price in wei (1 ETH = 1000000000000000000 wei)
        });

        console.log("Successfully Listed", hash);
        return "Successfully Listed"; // Return the transaction hash for use in the success toast
      })(),
      {
        loading: `Listing NFT ${tokenId} for sale...`, // Loading message
        success: (hash) => `NFT listed for sale successfully! Transaction Hash: ${hash}`, // Success message with hash
        error: (error) => `Error listing NFT for sale: ${error.message}`, // Error message
      }
    );
  } catch (error) {
    // Catch any unexpected errors
    console.error("Error in HandleNFTlistsale: ", error);
  }
};


  useEffect(() => {
    if (!data) return;

    async function processCampaigns() {
      try {
        setCampaignData(data);
      } catch (error) {
        console.error("Error processing campaigns:", error);
      }
    }

    processCampaigns();
  }, [data, card, NFTdata, Approve]);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  console.log(">>>campigndata", campaignData);

  const { setCampaign } = useCampaignContext();

  return (
    <>
      <div className="bg-white-A700 flex sm:flex-col md:flex-col flex-row font-outfit sm:gap-5 md:gap-5 items-start mx-auto w-full">
        <SideBar />

        <div className="flex flex-col gap-5 items-center justify-start  w-[68%] px-10">
          <div className="flex flex-row sm:gap-10 items-center justify-between w-full">
            <Text
              className="text-2xl md:text-[22px] text-black-900 sm:text-xl"
              size="txtUrbanistSemiBold24"
            >
              My NFTs
            </Text>
          </div>
          <List
            className="sm:flex-col flex-row gap-[19px] grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 justify-center w-full"
            orientation="horizontal"
          >
            {matchedData?.map((campaign, index) => {
              // const isButtonDisabled =
              // //   campaign.isEnded ||
              // //   campaign.currentRaised >= campaign.donationTarget;

              const handleCardClick = () => {
                setCampaign(campaign); // Store the selected campaign in Context
              };

              return (
                <div
                  className="bg-white-A700 flex flex-1 flex-col gap-5 items-center justify-start p-1.5 rounded-[15px] shadow-bs1 w-full"
                  key={index}
                >
                  {/* this is the image container */}

                  <div
                    className="  bg-cover bg-no-repeat gap-5 items-center justify-start  rounded-[15px]  w-full  "
                    style={{
                      backgroundImage: `url(${campaign.tierImage})`,
                    }}
                  >
                    <div
                      className=" bg-black bg-opacity-80  flex flex-col items-end justify-start rounded-[15px]   w-full"
                      // style={{ filter: "brightness(1) contrast(1.2) " }}
                    >
                      <div className="flex flex-col gap-[18px] items-start justify-start mb-3 mr-2 w-[93%] md:w-full  ">
                        <div className="flex flex-row justify-between w-full mr-6 mt-4">
                          <div className="flex flex-col items-start justify-start">
                            <Text
                              // className="text-base text-black-900 tracking-[0.16px]"
                              className="text-base   text-white-A700  tracking-[0.16px]"
                              size="txtUrbanistSemiBold16"
                            >
                              {"NFT"}
                            </Text>
                            <Text
                              className="mt-1 text-white-A700   text-gray-500 text-xs tracking-[0.12px]"
                              size="txtUrbanistMedium12Gray500"
                            >
                              {campaign.creator}
                            </Text>
                          </div>
                          {/* <Img
                      className="h-[18px] mr-2 mt-2"
                      src="images/img_heart.svg"
                      alt="heart Two"
                    />  */}
                          <div className="flex flex-row gap-2 items-center justify-end  mr-2 w-[55%] md:w-full">
                            <Button
                              className="cursor-pointer font-medium min-w-[75px] rounded-[14px] text-center text-xs tracking-[0.12px]"
                              color="gray_900_26"
                              size="xs"
                              variant="fill"
                            ></Button>
                            {/* <Button
                              className="flex h-[30px] items-center justify-center rounded-[50%] w-[30px]"
                              shape="circle"
                              color="gray_900_26"
                              size="xs"
                              variant="fill"
                            >
                              <Img
                                className="h-[18px]"
                                src="images/img_heart.svg"
                                alt="heart Two"
                              />
                            </Button> */}
                          </div>
                        </div>
                        {true && (
                          <div className="w-full mt-2">
                            {/* <Text
                              className="text-[10px]  text-white-A700  tracking-[0.10px]"
                              size="txtOutfitRegular10"
                            >
                              Donation Target:{" "}
                              {campaign.currentRaised / campaign.donationTarget}{" "}
                              ETH
                            </Text> */}
                            {/* <div className="w-full   bg-white-A700 bg-gray-200  rounded-full h-2 mt-1">
                              <div
                                className="bg-blue-500 h-2 rounded-full"
                                style={{
                                  width: `${
                                    (campaign.currentRaised /
                                      campaign.donationTarget) *
                                    100
                                  }%`,
                                }}
                              ></div>
                            </div> */}
                          </div>
                        )}
                        <div className="flex flex-row gap-[38px] items-center justify-between w-full">
                          <div className="flex flex-col font-outfit items-start justify-start">
                            <Text
                              className="text-[10px]  text-white-A700  text-gray-500tracking-[0.10px]"
                              size="txtOutfitRegular10"
                            >
                              {campaign.isDonation
                                ? "Current Collection"
                                : ""}
                            </Text>
                            <div className="flex flex-row font-urbanist gap-1.5 items-center justify-start mt-1 w-[98%] md:w-full">
                              {/* <Img
                                className="h-4 w-4 bg-white-A700 "
                                src="images/img_sort.svg"
                                alt="sort Two"
                              /> */}
                              <Text
                                className="text-black-900 text-sm tracking-[0.14px]"
                                size="txtUrbanistMedium14Black900"
                              >
                                {/* {formatUnits(campaign.target).toString()} */}
                              </Text>
                            </div>
                          </div>

                          <Link to={"/"}>
                            <Button
                              className="cursor-pointer font-medium font-urbanist min-w-[88px] rounded-lg text-center text-xs tracking-[0.12px]"
                              shape="round"
                              color="gray_900"
                              size="xs"
                              variant="fill"
                              // onClick={handleShowClick}
                              onClick={() => {
                                HandleNFTlistsale(
                                  campaign.campaignId,
                                  campaign.nftContract,
                                  campaign.tokenId
                                );
                              }}

                              // onClick={() => HandleDonateClick(index)}
                            >
                              {/* {campaign.isDonation ? "Donate" : "Donate"} */}
                              List For Sale
                            </Button>
                          </Link>
                        </div>
                      </div>
                      {/* <div className="flex flex-row gap-2 items-center justify-end mb-[94px] w-[55%] md:w-full">
                      <Button
                        className="cursor-pointer font-medium min-w-[75px] rounded-[14px] text-center text-xs tracking-[0.12px]"
                        color="gray_900_26"
                        size="xs"
                        variant="fill"
                      >
                      </Button>
                      <Button
                        className="flex h-[30px] items-center justify-center rounded-[50%] w-[30px]"
                        shape="circle"
                        color="gray_900_26"
                        size="xs"
                        variant="fill"
                      >
                        <Img
                          className="h-[18px]"
                          src="images/img_heart.svg"
                          alt="heart Two"
                        />
                      </Button>
                    </div> */}
                    </div>{" "}
                  </div>
                  {/* this is the bottom div */}

                  <div>
                    {/* {
  campaignData[3].tiers.map((tier, index) => { return(
    <div>{tier.uri}</div>
  )})
} */}
                  </div>
                </div>
              );
            })}
          </List>
        </div>
      </div>
    </>
  );
};

export default MyNft;
