import React, { useState, useEffect } from "react";
import CreateCampaign from "pages/Createcampaign";
//import Modal from "../../components/Modal";
import WalletButton from "pages/Walletconnect";

import { Button, Img, List, Text } from "components";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
  useReadContract,
} from "wagmi";import { CrowdFundingABI } from "../../abi/constants";
import { CrowdFundingAddress } from "../../abi/constants";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { formatUnits, parseEther } from "ethers";
import { Link } from "react-router-dom";
import { useCampaignContext } from "pages/CampaignProvider";
import SideBar from "components/Sidebar/SideBar";

const MyNft = ({ onSubmit }) => {
  const [card, setCard] = useState(false);
  const { address, isConnected } = useAccount(); // This is the client address

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
      data : NFTdata,
     isErroroccur,
    isLoading: contractLoadings,
  } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CrowdFundingABI,
    functionName: "getNFTsForAccount",
    args: [address]
  });

  console.log(data  , "getCampaign" );
  console.log(NFTdata, "NFTData");
  let matchedData;
  if (NFTdata) {
    matchedData = NFTdata.filter(newItem => {
      console.log("inside the Main loop");
      
      const matchingCampaign = data.find(
        campaign => campaign.nftContract === newItem.nftContract
      );
  
      if (matchingCampaign) {
        console.log("matched", matchingCampaign);
        const matchingTier = matchingCampaign.tiers.find(
          tier => tier.tier === newItem.tier
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

  console.log("NFTlisted" , matchedData);


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
  }, [data, card , NFTdata]);

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
        {/* <Sidebar className="!sticky !w-[302px] flex h-screen md:hidden justify-start overflow-auto md:px-5 top-[0]">
          <div className="bg-gray-50 border-gray-100 border-r-[1.5px] border-solid flex flex-col gap-[50px] items-start justify-start p-[18px] w-full">
            <div className="flex flex-row gap-3.5 items-start justify-start ml-4 md:ml-[0] mt-4 w-[67%] md:w-full">
              <Img
                className="h-14 md:h-auto rounded-[50%] w-14"
                src="images/avatar-1.png"
              />
              <div className="flex flex-col gap-1.5 items-start justify-start mt-1">
                <Text
                  className="text-black-900 text-lg tracking-[0.18px]"
                  size="txtOutfitSemiBold18"
                >
                  CrowdFund
                </Text>
                <Text
                  className="text-gray-500 text-sm tracking-[0.14px]"
                  size="txtOutfitRegular14"
                >
                  @CrowdFund
                </Text>
              </div>
            </div>
            <div className="flex flex-col font-urbanist gap-[30px] items-center justify-start w-full">
              <div className="flex flex-col gap-4 justify-start w-full">
                <Text
                  className="ml-4 md:ml-[0] text-black-900 text-xs tracking-[0.12px]"
                  size="txtUrbanistMedium12"
                >
                  GENERAL
                </Text>
                <div className="flex flex-col font-outfit gap-2 items-center justify-start w-full">
                  <div className="bg-gray-900_5f flex flex-col items-start justify-start p-2.5 rounded-[10px] w-full">
                    <div className="flex flex-row gap-[18px] items-center justify-start ml-1.5 md:ml-[0] w-[55%] md:w-full">
                      <Img
                        className="h-6 w-6"
                        src="images/img_eye.svg"
                        alt="eye"
                      />
                      <Text
                        className="text-gray-900 text-lg tracking-[0.18px]"
                        size="txtOutfitMedium18"
                      >
                        Dashboard
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4 justify-start w-full">
                <Text
                  className="ml-4 md:ml-[0] text-gray-901 text-xs tracking-[0.12px]"
                  size="txtUrbanistMedium12Gray901"
                >
                  MARKETPLACE
                </Text>
                <div className="flex flex-col gap-2 items-center justify-start w-full">
                  <div
                    className="common-pointer flex flex-col items-start justify-start p-2.5 w-full"
                    // onClick={() => navigate("/market")}
                  >
                    <div className="flex flex-row gap-[18px] items-center justify-start ml-1.5 md:ml-[0] w-[41%] md:w-full">
                      <Img
                        className="h-6 w-6"
                        src="images/img_user.svg"
                        alt="user"
                      />
                      <Text
                        className="common-pointer text-gray-500 text-lg tracking-[0.18px]"
                        size="txtUrbanistMedium18"
                        onClick={() => navigate("/market")}
                      >
                        Market
                      </Text>
                    </div>
                    <div className="flex flex-row gap-[18px] items-center justify-start ml-1.5 md:ml-[0] w-[41%] md:w-full mt-3">
                      <Img
                        className="h-6 w-6"
                        src="images/image-nft.svg"
                        alt="user"
                      />
                      <Text
                        className="common-pointer text-gray-500 text-lg tracking-[0.18px] whitespace-nowrap"
                        size="txtUrbanistMedium18"
                        onClick={() => navigate("/mynft")}
                      >
                        MY NFT
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="font-urbanist h-[258px] md:h-[263px] mb-[17px] ml-4 md:ml-[0] relative w-[88%]">
              <div className="absolute bg-gray-900 bottom-[0] h-[233px] inset-x-[0] mx-auto rounded-[15px] w-[234px]"></div>
              <div className="absolute flex flex-col gap-3.5 inset-x-[0] items-center justify-start mx-auto top-[0] w-[91%]">
                <Button
                  className="flex h-[50px] items-center justify-center shadow-bs w-[50px]"
                  shape="circle"
                  color="white_A700"
                  size="lg"
                  variant="fill"
                >
                  <Img
                    className="h-6"
                    src="images/img_question.svg"
                    alt="question"
                  />
                </Button>
                <Text
                  className="text-lg text-white-A700 tracking-[0.18px]"
                  size="txtUrbanistSemiBold18"
                >
                  Help Center
                </Text>
                <div className="flex flex-col gap-[30px] items-center justify-start w-full">
                  <Text
                    className="leading-[180.00%] text-center text-gray-400 text-sm tracking-[0.14px]"
                    size="txtUrbanistRegular14"
                  >
                    <>
                      Having trouble in Enefti?
                      <br />
                      Please contact us for more question
                    </>
                  </Text>
                  <Button
                    className="cursor-pointer font-medium min-w-[206px] text-center text-sm tracking-[0.14px]"
                    shape="round"
                    color="white_A700"
                    size="lg"
                    variant="fill"
                  >
                    Go To Help Center
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Sidebar> */}
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
            {matchedData.map((campaign, index) => {
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
                  <div
                    className="bg-cover bg-no-repeat flex flex-col h-[140px] items-end justify-start p-2 rounded-[12px] w-full"
                    style={{
                      backgroundImage: `url(${campaign.tierImage})`,
                    }}
                  >
                    <div className="flex flex-row gap-2 items-center justify-end mb-[94px] w-[55%] md:w-full">
                      <Button
                        className="cursor-pointer font-medium min-w-[75px] rounded-[14px] text-center text-xs tracking-[0.12px]"
                        color="gray_900_26"
                        size="xs"
                        variant="fill"
                      >
                        {/* {formatTime(campaign.timeLeft)} */}
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
                    </div>
                  </div>
                  <div className="flex flex-col gap-[18px] items-start justify-start mb-3 w-[93%] md:w-full">
                    <div className="flex flex-col items-start justify-start">
                      <Text
                        className="text-base text-black-900 tracking-[0.16px]"
                        size="txtUrbanistSemiBold16"
                      >
                        {"NFT"}
                      </Text>
                      <Text
                        className="mt-1 text-gray-500 text-xs tracking-[0.12px]"
                        size="txtUrbanistMedium12Gray500"
                      >
                        {campaign.creator}
                      </Text>
                    </div>
                    {true && (
                      <div className="w-full mt-2">
                        <Text
                          className="text-[10px] text-gray-500 tracking-[0.10px]"
                          size="txtOutfitRegular10"
                        >
                          Donation Target:{" "}
                          {campaign.currentRaised / campaign.donationTarget} ETH
                        </Text>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
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
                        </div>
                      </div>
                    )}
                    <div className="flex flex-row gap-[38px] items-center justify-between w-full">
                      <div className="flex flex-col font-outfit items-start justify-start">
                        <Text
                          className="text-[10px] text-gray-500 tracking-[0.10px]"
                          size="txtOutfitRegular10"
                        >
                          {campaign.isDonation
                            ? "Current Collection"
                            : "Total Collection"}
                        </Text>
                        <div className="flex flex-row font-urbanist gap-1.5 items-center justify-start mt-1 w-[98%] md:w-full">
                          <Img
                            className="h-4 w-4"
                            src="images/img_sort.svg"
                            alt="sort Two"
                          />
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
                          disabled={true}
                          // onClick={handleShowClick}
                          onClick={handleCardClick}

                          // onClick={() => HandleDonateClick(index)}
                        >
                          {/* {campaign.isDonation ? "Donate" : "Donate"} */}
                          List For Sale
                        </Button>
                      </Link>
                    </div>
                  </div>
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
