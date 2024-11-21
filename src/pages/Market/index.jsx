import React from "react";

import { formatUnits } from "ethers"; // Importing formatUnits directly from ethers

import { Sidebar } from "react-pro-sidebar";
import { useNavigate } from "react-router-dom";

import { Button, Img, Input, List, SelectBox, Text } from "components";

import { CloseSVG } from "../../assets/images";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
  useReadContract,
} from "wagmi";
import { CrowdFundingABI } from "../../abi/constants";
import { CrowdFundingAddress } from "../../abi/constants";
import { Link } from "react-router-dom";

const userTwoOptionsList = [
  { label: "Option1", value: "option1" },
  { label: "Option2", value: "option2" },
  { label: "Option3", value: "option3" },
];

const CONTRACT_ADDRESS = CrowdFundingAddress;

const MarketPage = () => {
  const navigate = useNavigate();

  const [searchinputvalue, setSearchinputvalue] = React.useState("");
  const {
    data: ListedNFT,
    isError,
    isLoading: contractLoading,
  } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CrowdFundingABI,
    functionName: "getAllCampaignListedNFTs",
  });

 console.log(">>>>getAllCampaignListedNFTs" , ListedNFT);


// const HandlebuyNFT =  async(campaignId , tokenId , price)=> {
//   try {
//     //  error need to capture if the price is not matched (use the wagmi converter)

//     const hash = await writeContractAsync({
//       address: CONTRACT_ADDRESS,
//       abi: CrowdFundingABI,
//       functionName: "donateToCampaign",
//       args: [campaignId , tokenId],
//       value: parseEther(price),
//     });
//     console.log("Donated Successfully: ", hash);
//   } catch (error) {
//     console.error("Error donating to campaign: ", error);
//   }
// }


  // const HandlebuyNFT =  async(campaignId , tokenId , price)=> {
  //   try {
  //     //  error need to capture if the price is not matched (use the wagmi converter)

  //     const hash = await writeContractAsync({
  //       address: CONTRACT_ADDRESS,
  //       abi: CrowdFundingABI,
  //       functionName: "donateToCampaign",
  //       args: [campaignId , tokenId],
  //       value: parseEther(price),
  //     });
  //     console.log("Donated Successfully: ", hash);
  //   } catch (error) {
  //     console.error("Error donating to campaign: ", error);
  //   }
  // }

  return (
    <>
      <div className="bg-white-A700 flex sm:flex-col md:flex-col flex-row font-outfit sm:gap-5 md:gap-5 items-start mx-auto pb-[50px] w-full">
        <Sidebar className="!sticky !w-[302px] flex h-screen md:hidden justify-start overflow-auto md:px-5 top-[0]">
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
                  <div className=" flex flex-col items-start justify-start p-2 rounded-[5px] w-full">
                    <div className="flex flex-row gap-[18px] items-center justify-start ml-1.5 md:ml-[0] w-[55%] md:w-full">
                      <Img
                        className="h-6 w-6"
                        src="images/img_eye.svg"
                        alt="eye"
                      />
                      <Text
                        className="text-gray-500 text-lg tracking-[0.18px]"
                        size="txtOutfitMedium18"
                        onClick={() => navigate("/")}
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
                  <div className="bg-gray-900_5f flex flex-col items-start justify-start p-2 rounded-[10px] w-full mt-3">
                    <div className="flex flex-row gap-[18px] items-center justify-start ml-1.5 md:ml-[0] w-[41%] md:w-full ">
                      <Img
                        className="h-6 w-6"
                        src="images/img_user.svg"
                        alt="user"
                      />
                      <Text
                        className="common-pointer text-lg tracking-[0.18px] whitespace-nowrap"
                        size="txtUrbanistMedium18"
                        onClick={() => navigate("/market")}
                      >
                        Market
                      </Text>
                    </div>
                  </div>
                  <div className="common-pointer flex flex-col items-start justify-start p-2.5 w-full">
                    <div className="flex flex-row gap-[18px] items-center justify-start ml-1.5 md:ml-[0] w-[41%] md:w-full">
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
        </Sidebar>
        <div className="flex flex-1 flex-col gap-[39px] items-center justify-start md:px-5 w-full">
          <div className="flex flex-col font-urbanist gap-5 items-start justify-start w-[95%] md:w-full">
            <div className="flex flex-col items-center justify-start ml-0.5 md:ml-[0] w-full">
              <div className="flex flex-col items-center justify-start mt-[30px] w-full">
                <div className="md:gap-5 gap-[19px] grid sm:grid-cols-1 md:grid-cols-2 grid-cols-4 justify-center min-h-[auto] w-full">
                  {/*                                                                       map over the    getall campaingh data                                                                      */}

                  {ListedNFT?.map((ListNFT, index) => {
                    console.log("ListedNFT", ListNFT);

                    return (
                      <div
                        className="bg-white-A700 flex flex-1 flex-col gap-5 items-center justify-start p-1.5 rounded-[15px] shadow-bs1 w-full"
                        key={index}
                      >
                        {/* this is the image container */}

                        <div
                          className="  bg-cover bg-no-repeat gap-5 items-center justify-start  rounded-[15px]  w-full  "
                          style={{
                            backgroundImage: `url(${ListNFT.nftURI})`,
                            backgroundSize: "100% 130%",
                            backgroundPosition: "center",
                          }}
                        >
                          <div className=" bg-black bg-opacity-80  flex flex-col items-end justify-start rounded-[15px]   w-full">
                            <div className="flex flex-col gap-[18px] items-start justify-start mb-3 mr-2 w-[93%] md:w-full  ">
                              <div className="flex flex-row justify-between w-full mr-6 mt-4">
                                <div className="flex flex-col items-start justify-start">
                                  <Text
                                    className="text-base   text-white-A700  tracking-[0.16px]"
                                    size="txtUrbanistSemiBold16"
                                  >
                                    {"NFT"}
                                  </Text>
                                  {/* <Text
                                      className="mt-1 text-white-A700   text-gray-500 text-xs tracking-[0.12px]"
                                      size="txtUrbanistMedium12Gray500"
                                    >
                                      {campaign.creator}
                                    </Text> */}
                                </div>

                                <div className="flex flex-row gap-2 items-center justify-end  mr-2 w-[55%] md:w-full">
                                  <Button
                                    className="cursor-pointer font-medium min-w-[75px] rounded-[14px] text-center text-xs tracking-[0.12px]"
                                    color="gray_900_26"
                                    size="xs"
                                    variant="fill"
                                  ></Button>
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
                              {true && (
                                <div className="w-full mt-2">
                                  <Text
                                    className="text-[10px]  text-white-A700  tracking-[0.10px]"
                                    size="txtOutfitRegular10"
                                  >
                                    {/* Token-Id: {`${ListNFT.tokenId}`} */}
                                    {/* Price ={" "}
                                      {formatUnits(`${ListNFT.price}`, "ether")}
                                      ETH{" "} */}
                                  </Text>
                                </div>
                              )}
                              <div className="flex flex-row gap-[20px] items-center justify-between w-full">
                                <div className="flex flex-col font-outfit items-start justify-start price-asd">
                                  <Text
                                    className="text-[15px]  text-white-A700   font-bold text-gray-500tracking-[0.10px]"
                                    size="txtOutfitRegular10"
                                  >
                                    <p className="  font-extrabold ">
                                      {" "}
                                      Price =  {" "}
                                      {formatUnits(`${ListNFT.price}`, "ether")}
                                      ETH{" "}
                                    </p>
                                  </Text>
                                  <div className="flex flex-row font-urbanist gap-1.5 items-center justify-start mt-1 w-[98%] md:w-full">
                                    <Img
                                      className="h-4 w-4  "
                                      src="images/img_sort.svg"
                                      alt="sort Two"
                                    />
                                    {/* <Text
                                      className="text-black-900 text-sm tracking-[0.14px]"
                                      size="txtUrbanistMedium14Black900"
                                    >
                                      {" "}
                                      {campaign.price}dfghj
                                    </Text> */}
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
                                    onClick={() => navigate("/marketdetail")}
                                  >
                                    Buy NFT
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          </div>{" "}
                        </div>

                        <div></div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <Button
                className="cursor-pointer font-medium min-w-[106px] mt-[50px] rounded-lg text-center text-sm tracking-[0.14px]"
                shape="round"
                color="gray_900"
                size="xs"
                variant="outline"
              >
                Load More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MarketPage;
