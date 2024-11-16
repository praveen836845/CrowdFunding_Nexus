import React, {useState, useEffect} from "react";
import CreateCampaign from "pages/Createcampaign";
//import Modal from "../../components/Modal";
import WalletButton from "pages/Walletconnect";

import { Sidebar } from "react-pro-sidebar";
import { useNavigate } from "react-router-dom";

import { Button, Img, Input, Line, List, Text } from "components";

import { CloseSVG } from "../../assets/images";
import NFTbackground from "../../assets/images/NFTbackgrounfSocialImpact.png"

import { ConnectButton } from '@rainbow-me/rainbowkit';



const initialCampaignData = [
  {
    id: 1,
    title: "The Unfortable Facer",
    creator: "By Bane Riccardo",
    image: "images/img_group33917.png",
    timeLeft: 7200, // Time in seconds (e.g., 2 hours = 7200 seconds)
    currentBid: "18,99 ETH",
    donationTarget: 500,
    currentRaised: 150,
    isDonation: true,
    isEnded: false,
  },
  {
    id: 2,
    title: "Mad Ballot Holder",
    creator: "By Angelina Cruzz",
    image: "images/img_group33917_140X222.png",
    timeLeft: 0, // This campaign has ended
    currentBid: "4,32 ETH",
    donationTarget: 200,
    currentRaised: 75,
    isDonation: true,
    isEnded: true,
  },
  {
    id: 3,
    title: "Pile of Many Plates",
    creator: "By Ralphi Arness",
    image: "images/img_group33917_1.png",
    timeLeft: 5400, // Time in seconds (e.g., 1.5 hours)
    currentBid: "4,32 ETH",
    donationTarget: 300,
    currentRaised: 300,
    isDonation: true,
    isEnded: false,
  },
  // Add more campaigns as needed
];

const campaigns = [
  { id: 1, name: "Save the Oceans" },
  { id: 2, name: "Plant a Million Trees" },
  { id: 3, name: "Build Wells in Africa" },
  { id: 4, name: "Education for All" },
  { id: 5, name: "Wildlife Conservation" },
  { id: 6, name: "Health Care for Rural Areas" },
];


const DashboardPage = ({ onSubmit }) => {
  const navigate = useNavigate();

  const [searchinputvalue, setSearchinputvalue] = React.useState("");

  const [campaignData, setCampaignData] = useState(initialCampaignData);

  // Function to convert seconds to "h m s" format
  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  useEffect(() => {
    // Timer to update timeLeft every second
    const timer = setInterval(() => {
      setCampaignData((prevCampaigns) =>
        prevCampaigns
          .map((campaign) => {
            if (campaign.timeLeft > 0) {
              return { ...campaign, timeLeft: campaign.timeLeft - 1 };
            } else {
              return { ...campaign, isEnded: true };
            }
          })
          .filter((campaign) => campaign.timeLeft > 0) // Remove campaigns with 0 time left
      );
    }, 1000);

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(timer);
  }, []);

  //NFts Ranking
  const users = [
    { id: 1, name: 'Doodle Lucu', avatar: 'images/img_ellipse1018.png', donation: 14.32, nfts: 10, campaigns: 18 },
    { id: 2, name: 'Kimawi Genesis', avatar: 'images/img_ellipse1018_42X42.png',  donation: 6.11, nfts: 8, campaigns: 21 },
    { id: 3, name: 'Crypto Kitty', avatar: 'images/img_ellipse1019.png',  donation: 20.55, nfts: 15, campaigns: 12 },
    { id: 4, name: 'Art Collection', avatar: 'images/img_ellipse1020.png', donation: 10.11, nfts: 12, campaigns: 5 },
    { id: 5, name: 'Galaxy Hoppers', avatar: 'images/img_ellipse1021.png',  donation: 5.33, nfts: 9, campaigns: 16 },
    // Add more users if necessary
  ];

  // Sort users by the number of NFTs (descending order)
  const sortedUsers = [...users].sort((a, b) => b.donation - a.donation);

  // State for managing users to display
  const [displayUsers, setDisplayUsers] = useState(sortedUsers.slice(0, 3)); // Show only top 3 initially

  // Function to show all users when "View All" is clicked
  const loadMoreUsers = () => {
    setDisplayUsers(sortedUsers); // Display all users
  };

  //create campaign
  const [owner, setOwner] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [target, setTarget] = useState("");
  const [deadline, setDeadline] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [image, setImage] = useState("");
  const [tier1URI, setTier1URI] = useState("");
  const [tier2URI, setTier2URI] = useState("");
  const [tier3URI, setTier3URI] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the onSubmit prop with form data
    onSubmit({
      owner,
      title,
      description,
      target,
      deadline,
      minAmount,
      image,
      tier1URI,
      tier2URI,
      tier3URI,
    });
  };

  //getDonators

  const dummyDonators = [
    {
      name: "Uzachi #4390",
      origin: "From Ragnarok Meta",
      amount: "2.15 ETH",
      avatar: "images/img_ellipse1018_1.png",
    },
    {
      name: "Doodles #3486",
      origin: "From Doodles",
      amount: "4.42 ETH",
      avatar: "images/img_ellipse1018_2.png",
    },
    {
      name: "Murakami #2766",
      origin: "From Murakami",
      amount: "1.08 ETH",
      avatar: "images/img_ellipse1018_3.png",
    },
    {
      name: "Doodles #2761",
      origin: "From Murakami",
      amount: "4.4 ETH",
      avatar: "images/img_ellipse1018_4.png",
    },
    {
      name: "Peachy Puch#22",
      origin: "From Mindblowonstudio",
      amount: "5.62 ETH",
      avatar: "images/img_ellipse1018_5.png",
    },
    {
      name: "Gemmy #3723",
      origin: "From GemmySolana",
      amount: "5.32 ETH",
      avatar: "images/img_ellipse1018_6.png",
    },
  ];

  
  //search bar

  const [searchInputValue, setSearchInputValue] = useState("");
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);

  // Filter campaigns based on search input
  const handleSearchChange = (e) => {
    const input = e.target.value;
    setSearchInputValue(input);

    if (input) {
      const filtered = campaigns.filter((campaign) =>
        campaign.name.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredCampaigns(filtered);
    } else {
      setFilteredCampaigns([]);
    }
  };

  const handleNavigate = () => {
    navigate("/create-campaign");
  }

  //from Model

  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const handleOpenModal = () => {
  //   setIsModalOpen(true);
  // };

  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  // };

  // const handleFormSubmit = (formData) => {
  //   console.log("Campaign Created:", formData);
  //   setIsModalOpen(false); // Close the modal after submission
  // };

  //wallet connection


  return (
    <>
      <div className="bg-white-A700 flex sm:flex-col md:flex-col flex-row font-outfit sm:gap-5 md:gap-5 items-start mx-auto w-full">
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
                  {/* <div
                    className="common-pointer flex flex-col font-urbanist items-start justify-start p-2.5 w-full"
                    onClick={() => navigate("/message")}
                  >
                    <div className="flex flex-row gap-[18px] items-center justify-start ml-1.5 md:ml-[0] w-[47%] md:w-full">
                      <Img
                        className="h-6 w-6"
                        src="images/img_car.svg"
                        alt="car"
                      />
                      <Text
                        className="common-pointer text-gray-500 text-lg tracking-[0.18px]"
                        size="txtUrbanistMedium18"
                        onClick={() => navigate("/message")}
                      >
                        Message
                      </Text>
                    </div>
                  </div> */}
                  {/* <div
                    className="common-pointer flex flex-col font-urbanist items-start justify-start p-2.5 w-full"
                    onClick={() => navigate("/settings")}
                  >
                    <div className="flex flex-row gap-[18px] items-center justify-start ml-1.5 md:ml-[0] w-[45%] md:w-full">
                      <Img
                        className="h-6 w-6"
                        src="images/img_settings.svg"
                        alt="settings"
                      />
                      <Text
                        className="common-pointer text-gray-500 text-lg tracking-[0.18px]"
                        size="txtUrbanistMedium18"
                        onClick={() => navigate("/settings")}
                      >
                        Settings
                      </Text>
                    </div>
                  </div> */}
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
                    onClick={() => navigate("/market")}
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
                  </div>
                  {/* <div
                    className="common-pointer flex flex-col items-start justify-start p-2.5 w-full"
                    onClick={() => navigate("/activebid")}
                  >
                    <div className="flex flex-row gap-[18px] items-center justify-start ml-1.5 md:ml-[0] w-1/2 md:w-full">
                      <Img
                        className="h-6 w-6"
                        src="images/img_judge.svg"
                        alt="judge"
                      />
                      <Text
                        className="common-pointer text-gray-500 text-lg tracking-[0.18px]"
                        size="txtUrbanistMedium18"
                        onClick={() => navigate("/activebid")}
                      >
                        Active Bid
                      </Text>
                    </div>
                  </div> */}
                  {/* <div
                    className="common-pointer flex flex-col items-start justify-start p-2.5 w-full"
                    onClick={() => navigate("/saved")}
                  >
                    <div className="flex flex-row gap-[18px] items-center justify-start ml-1.5 md:ml-[0] w-[39%] md:w-full">
                      <Img
                        className="h-6 w-6"
                        src="images/img_clock.svg"
                        alt="clock"
                      />
                      <Text
                        className="common-pointer text-gray-500 text-lg tracking-[0.18px]"
                        size="txtUrbanistMedium18"
                        onClick={() => navigate("/saved")}
                      >
                        Saved
                      </Text>
                    </div>
                  </div> */}
                </div>
              </div>
              {/* <div className="flex flex-col gap-4 justify-start w-full">
                <Text
                  className="ml-4 md:ml-[0] text-gray-901 text-xs tracking-[0.12px]"
                  size="txtUrbanistMedium12Gray901"
                >
                  MY PROFILE
                </Text>
                <div className="flex flex-col gap-2 items-center justify-start w-full">
                  <div
                    className="common-pointer flex flex-col items-start justify-start p-2.5 w-full"
                    onClick={() => navigate("/myprofilecollection")}
                  >
                    <div className="flex flex-row gap-[18px] items-center justify-start ml-1.5 md:ml-[0] w-1/2 md:w-full">
                      <Img
                        className="h-6 w-6"
                        src="images/img_user_24X24.svg"
                        alt="user One"
                      />
                      <Text
                        className="common-pointer text-gray-500 text-lg tracking-[0.18px]"
                        size="txtUrbanistMedium18"
                        onClick={() => navigate("/myprofilecollection")}
                      >
                        Collection
                      </Text>
                    </div>
                  </div>
                  <div
                    className="common-pointer flex flex-col items-start justify-start p-2.5 w-full"
                    onClick={() => navigate("/myprofilewallet")}
                  >
                    <div className="flex flex-row gap-[18px] items-center justify-start ml-1.5 md:ml-[0] w-[38%] md:w-full">
                      <Img
                        className="h-6 w-6"
                        src="images/img_computer.svg"
                        alt="computer"
                      />
                      <Text
                        className="common-pointer text-gray-500 text-lg tracking-[0.18px]"
                        size="txtUrbanistMedium18"
                        onClick={() => navigate("/myprofilewallet")}
                      >
                        Wallet
                      </Text>
                    </div>
                  </div>
                  <div
                    className="common-pointer flex flex-col items-start justify-start p-2.5 w-full"
                    onClick={() => navigate("/myprofilehistory")}
                  >
                    <div className="flex flex-row gap-[18px] items-center justify-start ml-1.5 md:ml-[0] w-2/5 md:w-full">
                      <Img
                        className="h-6 w-6"
                        src="images/img_clock_24X24.svg"
                        alt="clock One"
                      />
                      <Text
                        className="common-pointer text-gray-500 text-lg tracking-[0.18px]"
                        size="txtUrbanistMedium18"
                        onClick={() => navigate("/myprofilehistory")}
                      >
                        History
                      </Text>
                    </div>
                  </div>
                </div>
              </div> */}
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
        <div className="flex flex-1 flex-col items-center justify-start md:px-5 w-full">
          <div className="bg-white-A700 flex md:flex-col flex-row md:gap-10 items-center justify-between outline outline-gray-100 p-[34px] sm:px-5 w-full">
            <Input
              name="SearchInput"
              placeholder="Search items, collections, and users"
              value={searchinputvalue}
              onChange={(e) => setSearchinputvalue(e)}
              className="!placeholder:text-gray-500 !text-gray-500 p-0 text-left text-sm tracking-[0.14px] w-full"
              wrapClassName="border border-gray-300 border-solid flex md:flex-1 md:mt-0 my-0.5 md:w-full"
              prefix={
                <Img
                  className="cursor-pointer h-6 my-3.5 mx-4"
                  src="images/img_search.svg"
                  alt="search"
                />
              }
              suffix={
                <CloseSVG
                  fillColor="#93989a"
                  className="cursor-pointer h-6 my-auto"
                  onClick={() => setSearchinputvalue("")}
                  style={{
                    visibility:
                      searchinputvalue?.length <= 0 ? "hidden" : "visible",
                  }}
                  height={24}
                  width={24}
                  viewBox="0 0 24 24"
                />
              }
              shape="round"
              size="md"
            ></Input>
            <div className="flex flex-row font-urbanist gap-[30px] items-center justify-center md:mt-0 my-0.5">
              {/* <Button
                className="cursor-pointer flex items-center justify-center min-w-[137px]"
                leftIcon={
                  <Img
                    className="h-6 ml-4 mr-2.5 my-3.5"
                    src="images/img_sort.svg"
                    alt="sort"
                  />
                }
                shape="round"
                color="gray_100"
                size="xl"
                variant="outline"
              >
                <div className="font-medium text-base text-left tracking-[0.16px]">
                  3,421 ETH
                </div>
              </Button> */}
              
              <Button
                className="flex h-[52px] items-center justify-center rounded-[50%] w-[52px]"
                shape="circle"
                color="gray_100"
                size="lg"
                variant="outline"
              >
                <Img className="h-6" src="images/img_lock.svg" alt="lock" />
              </Button>
              <div className="flex flex-row gap-3 items-center justify-between w-[27%]">
                <Img
                  className="h-[52px] md:h-auto rounded-[50%] w-[52px]"
                  src="images/avatar-1.png"
                />
                <Img
                  className="h-6 w-6"
                  src="images/img_arrowdown.svg"
                  alt="arrowdown"
                />
              </div>
            </div>
          </div>
          <div className="flex md:flex-col flex-row font-urbanist gap-[34px] items-top justify-between w-[98%] md:w-full">
            <div className="flex flex-col items-center justify-start w-[68%] md:w-full">
              <div className="flex flex-col items-center justify-start w-full">
                <div
                  className="bg-cover bg-no-repeat flex flex-col h-[270px] items-center justify-start rounded-[15px] w-full"
                  style={{
                    backgroundImage: `url(${NFTbackground})`,
                  }}
                >
                  <div className="  flex flex-col gap-[34px] items-start justify-center p-[30px] sm:px-5 rounded-[15px] w-full">
                    <div className="flex flex-col gap-3.5 items-start justify-start mt-[19px]">
                      <Text
                        className="md:text-3xl sm:text-[28px] text-[32px] text-white-A700 tracking-[0.32px]"
                        size="txtUrbanistSemiBold32"
                      >
                        Support, Unlock, Collect
                      </Text>
                      <Text
                        className="text-sm text-white-A700_a2 tracking-[0.14px]"
                        size="txtUrbanistMedium14"
                      >
                        Donate to campaigns and receive one of three exclusive NFTs based on your contribution level
                      </Text>
                    </div>
                    <div className="flex flex-row gap-5 items-center justify-start mb-[19px] w-[39%] md:w-full">
                      <Button
                        className="cursor-pointer font-semibold min-w-[120px] rounded-lg text-center text-sm tracking-[0.14px]"
                        shape="round"
                        color="white_A700"
                        size="lg"
                        variant="fill"
                      >
                        Explore More
                      </Button>
                      <Button
                        className="cursor-pointer font-semibold min-w-[120px] rounded-lg text-center text-sm tracking-[0.14px]"
                        shape="round"
                        color="white_A700"
                        size="lg"
                        variant="outline"
                        onClick={handleNavigate}
                      >
                        Create Campaign
                      </Button>

                      {/* <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                        <CreateCampaign onSubmit={handleFormSubmit} />
                      </Modal> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-5 items-center justify-start mt-10 w-full">
                <div className="flex flex-row sm:gap-10 items-center justify-between w-full">
                  <Text
                    className="text-2xl md:text-[22px] text-black-900 sm:text-xl"
                    size="txtUrbanistSemiBold24"
                  >
                    Current Campaigns
                  </Text>
                  <Text
                    className="text-gray-900 text-sm tracking-[0.14px]"
                    size="txtUrbanistMedium14Gray900"
                  >
                    View All
                  </Text>
                </div>
                <List
                  className="sm:flex-col flex-row gap-[19px] grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 justify-center w-full"
                  orientation="horizontal"
                >
            
                  {campaignData.map((campaign, index) => {
                    const isButtonDisabled = campaign.isEnded || campaign.currentRaised >= campaign.donationTarget;

                    return (
                   <div className="bg-white-A700 flex flex-1 flex-col gap-5 items-center justify-start p-1.5 rounded-[15px] shadow-bs1 w-full">
                    <div
                      className="bg-cover bg-no-repeat flex flex-col h-[140px] items-end justify-start p-2 rounded-[12px] w-full"
                      style={{
                        backgroundImage: `url(${campaign.image})`,
                      }}
                    >
                      <div className="flex flex-row gap-2 items-center justify-end mb-[94px] w-[55%] md:w-full">
                        <Button
                          className="cursor-pointer font-medium min-w-[75px] rounded-[14px] text-center text-xs tracking-[0.12px]"
                          color="gray_900_26"
                          size="xs"
                          variant="fill"
                        >
                          {formatTime(campaign.timeLeft)}
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
                          {campaign.title}
                        </Text>
                        <Text
                          className="mt-1 text-gray-500 text-xs tracking-[0.12px]"
                          size="txtUrbanistMedium12Gray500"
                        >
                          {campaign.creator}
                        </Text>
                      </div>
                      {campaign.isDonation && (
                          <div className="w-full mt-2">
                            <Text className="text-[10px] text-gray-500 tracking-[0.10px]" size="txtOutfitRegular10">
                              Donation Target: {campaign.currentRaised} / {campaign.donationTarget} ETH
                            </Text>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                              <div
                                className="bg-blue-500 h-2 rounded-full"
                                style={{
                                  width: `${(campaign.currentRaised / campaign.donationTarget) * 100}%`,
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
                            {campaign.isDonation ? "Current Collection" : "Total Collection"}
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
                              {campaign.currentRaised}
                            </Text>
                          </div>
                        </div>
                        <Button
                          className="cursor-pointer font-medium font-urbanist min-w-[88px] rounded-lg text-center text-xs tracking-[0.12px]"
                          shape="round"
                          color="gray_900"
                          size="xs"
                          variant="fill"
                          disabled={isButtonDisabled}
                        >
                          {campaign.isDonation ? "Donate" : "Donate"}
                        </Button>
                      </div>
                    </div>
                  </div> 
                    );
                })}
                </List>
              </div>
              <div className="flex flex-col gap-5 items-center justify-start mt-[30px] w-full">
            <div className="flex flex-row sm:gap-10 items-center justify-between w-full">
              <Text className="text-2xl md:text-[22px] text-black-900 sm:text-xl" size="txtUrbanistSemiBold24">
                NFT Rankings
              </Text>
              <Text
                onClick={loadMoreUsers}
                className="text-gray-900 text-sm tracking-[0.14px] cursor-pointer"
                size="txtUrbanistMedium14Gray900"
              >
                View All
              </Text>
            </div>
            <div className="flex flex-col gap-5 items-center justify-start w-full">
              <div className="flex sm:flex-col flex-row sm:gap-10 items-start justify-between pb-0.5 w-full">
                <Text className="text-gray-500 text-xs tracking-[0.12px]" size="txtUrbanistMedium12Gray500">
                  User
                </Text>
                <div className="flex sm:flex-1 flex-row items-start justify-between w-[66%] sm:w-full">
                  <Text className="text-gray-500 text-xs tracking-[0.12px]" size="txtUrbanistMedium12Gray500">
                    Donation
                  </Text>
                  <Text className="text-gray-500 text-xs tracking-[0.12px]" size="txtUrbanistMedium12Gray500">
                    NFTs
                  </Text>
                  <Text className="text-gray-500 text-xs tracking-[0.12px]" size="txtUrbanistMedium12Gray500">
                    Campaigns
                  </Text>
                </div>
              </div>
              <div className="overflow-y-auto max-h-[400px] w-full"> {/* Scrollable list */}
                <List className="flex flex-col items-center pr-[7px] w-full" orientation="vertical">
                  {displayUsers.map((user) => (
                    <div key={user.id} className="flex flex-1 md:flex-col flex-row md:gap-10 items-center justify-between w-full">
                      <div className="flex md:flex-1 flex-row gap-3.5 items-center justify-between w-[21%] md:w-full">
                        <Img className="h-[42px] md:h-auto rounded-[50%] w-[42px]" src={user.avatar} alt={user.name} />
                        <div className="flex flex-col items-start justify-start">
                          <Text className="text-base text-black-900 tracking-[0.16px]" size="txtUrbanistSemiBold16">
                            {user.name}
                          </Text>
                          
                        </div>
                      </div>
                      <div className="flex md:flex-1 sm:flex-col flex-row sm:gap-5 items-center justify-between w-[55%] md:w-full">
                        <div className="flex flex-row font-urbanist items-center justify-evenly w-[11%] sm:w-full">
                          <Img className="h-4 w-4" src="images/img_sort.svg" alt="sort Three" />
                          <Text className="text-black-900 text-sm tracking-[0.14px]" size="txtUrbanistMedium14Black900">
                            {user.donation}
                          </Text>
                        </div>
                        <div className="flex flex-row font-urbanist items-center justify-end sm:ml-[0] ml-[53px] w-[9%] sm:w-full">
                          <Img className="h-4 w-4" src="images/img_sort.svg" alt="sort One" />
                          <Text className="h-[18px] ml-1 text-black-900 text-sm tracking-[0.14px]" size="txtUrbanistMedium14Black900">
                            {user.nfts}
                          </Text>
                        </div>
                        <Text className="sm:ml-[0] ml-[85px] text-black-900 text-sm tracking-[0.14px]" size="txtUrbanistMedium14Black900">
                          {user.campaigns}
                        </Text>
                      </div>
                    </div>
                  ))}
                </List>
              </div>
            </div>
          </div>
            </div>
            <div className="bg-white-A700 flex flex-col gap-10 items-center justify-start outline outline-gray-100 p-[26px] sm:px-5 w-[30%] md:w-full">
              {/* <div className="flex flex-col gap-5 items-center justify-start mt-3.5 w-full">
                <div className="flex flex-row items-start justify-between w-full">
                  <Text
                    className="text-black-900 text-lg"
                    size="txtUrbanistSemiBold18Black900"
                  >
                    Featured Creators
                  </Text>
                  <Text
                    className="mt-0.5 text-gray-900 text-sm tracking-[0.14px]"
                    size="txtUrbanistMedium14Gray900"
                  >
                    See All
                  </Text>
                </div>
                <div className="bg-white-A700 flex flex-col gap-3 items-center justify-start p-1.5 rounded-[15px] shadow-bs2 w-full">
                  <div className="flex flex-col relative w-full">
                    <Img
                      className="h-[120px] mx-auto object-cover rounded-[12px] w-full"
                      src="images/img_rectangle2043.png"
                      alt="Rectangle2043"
                    />
                    <Img
                      className="h-[52px] mt-[-26px] mx-auto rounded-[50%] w-[52px] z-[1]"
                      src="images/img_ellipse1019.png"
                      alt="Ellipse1019"
                    />
                  </div>
                  <div className="flex flex-col gap-3 items-center justify-start mb-2 w-[94%] md:w-full">
                    <div className="flex flex-row items-center justify-between w-full">
                      <div className="flex flex-col font-urbanist items-start justify-start">
                        <div className="flex flex-row items-center justify-evenly w-full">
                          <Text
                            className="text-black-900 text-sm tracking-[0.14px]"
                            size="txtUrbanistSemiBold14"
                          >
                            Murakami Flowers
                          </Text>
                          <Img
                            className="h-[18px] w-[18px]"
                            src="images/img_checkmark.svg"
                            alt="checkmark"
                          />
                        </div>
                        <Text
                          className="mt-1 text-gray-500 text-xs tracking-[0.12px]"
                          size="txtUrbanistMedium12Gray500"
                        >
                          @mftmkkus
                        </Text>
                      </div>
                      <Button
                        className="cursor-pointer font-outfit min-w-[64px] my-[5px] rounded-[14px] text-center text-xs tracking-[0.12px]"
                        color="gray_900"
                        size="xs"
                        variant="fill"
                      >
                        Follow
                      </Button>
                    </div>
                    <Line className="bg-gray-100 h-px w-full" />
                    <Text
                      className="leading-[180.00%] text-gray-500 text-xs tracking-[0.12px] w-full"
                      size="txtUrbanistRegular12"
                    >
                      Murakami.Flowers is a work in which artist Takashi
                      Murakami’s representative artwork.....
                    </Text>
                  </div>
                </div>
              </div> */}
              {/* <CreateCampaign/> */}
              {/* <div className="flex flex-col gap-5 items-center justify-start mb-[15px] pt-[3px] w-full">
                <div className="flex flex-row items-start justify-between w-full">
                  <Text
                    className="text-black-900 text-lg"
                    size="txtUrbanistSemiBold18Black900"
                  >
                    Recent Donation
                  </Text>
                  <Text
                    className="mb-0.5 text-gray-900 text-sm tracking-[0.14px]"
                    size="txtUrbanistMedium14Gray900"
                  >
                    See All
                  </Text>
                </div>
                <List
                  className="flex flex-col gap-5 items-center w-full"
                  orientation="vertical"
                >
                  <div className="flex flex-1 flex-row gap-[34px] items-center justify-between w-full">
                    <div className="flex flex-row gap-3.5 items-center justify-between w-[62%]">
                      <Img
                        className="h-[42px] md:h-auto rounded-[50%] w-[42px]"
                        src="images/img_ellipse1018_1.png"
                        alt="Ellipse1018 Two"
                      />
                      <div className="flex flex-col items-start justify-start">
                        <Text
                          className="text-base text-black-900 tracking-[0.16px]"
                          size="txtUrbanistSemiBold16"
                        >
                          Uzachi #4390
                        </Text>
                        <Text
                          className="mt-1 text-gray-500 text-xs tracking-[0.12px]"
                          size="txtUrbanistMedium12Gray500"
                        >
                          From Ragnarok Meta
                        </Text>
                      </div>
                    </div>
                    <div className="flex flex-row gap-1.5 items-center justify-start w-[27%]">
                      <Img
                        className="h-4 w-4"
                        src="images/img_sort.svg"
                        alt="sort Five"
                      />
                      <Text
                        className="text-black-900 text-sm tracking-[0.14px]"
                        size="txtUrbanistMedium14Black900"
                      >
                        2.15 ETH
                      </Text>
                    </div>
                  </div>
                  <Line className="self-center h-px bg-gray-100 w-full" />
                  <div className="flex flex-1 flex-row gap-[34px] items-center justify-between w-full">
                    <div className="flex flex-row gap-3.5 items-start justify-between w-3/5">
                      <Img
                        className="h-[42px] md:h-auto rounded-[50%] w-[42px]"
                        src="images/img_ellipse1018_2.png"
                        alt="Ellipse1018 Three"
                      />
                      <div className="flex flex-col items-start justify-start">
                        <Text
                          className="text-base text-black-900 tracking-[0.16px]"
                          size="txtUrbanistSemiBold16"
                        >
                          Doodles #3486
                        </Text>
                        <Text
                          className="mt-1 text-gray-500 text-xs tracking-[0.12px]"
                          size="txtUrbanistMedium12Gray500"
                        >
                          From Doodles
                        </Text>
                      </div>
                    </div>
                    <div className="flex flex-row gap-1.5 items-center justify-start w-[29%]">
                      <Img
                        className="h-4 w-4"
                        src="images/img_sort.svg"
                        alt="sort Six"
                      />
                      <Text
                        className="text-black-900 text-sm tracking-[0.14px]"
                        size="txtUrbanistMedium14Black900"
                      >
                        4.42 ETH
                      </Text>
                    </div>
                  </div>
                  <Line className="self-center h-px bg-gray-100 w-full" />
                  <div className="flex flex-1 flex-row gap-5 items-center justify-between w-full">
                    <div className="flex flex-row gap-3.5 items-start justify-between w-[66%]">
                      <Img
                        className="h-[42px] md:h-auto rounded-[50%] w-[42px]"
                        src="images/img_ellipse1018_3.png"
                        alt="Ellipse1018 Four"
                      />
                      <div className="flex flex-col items-start justify-start">
                        <Text
                          className="text-base text-black-900 tracking-[0.16px]"
                          size="txtUrbanistSemiBold16"
                        >
                          Murakami #2766
                        </Text>
                        <Text
                          className="mt-1 text-gray-500 text-xs tracking-[0.12px]"
                          size="txtUrbanistMedium12Gray500"
                        >
                          From Murakami
                        </Text>
                      </div>
                    </div>
                    <div className="flex flex-row gap-1.5 items-center justify-start w-[27%]">
                      <Img
                        className="h-4 w-4"
                        src="images/img_sort.svg"
                        alt="sort Seven"
                      />
                      <Text
                        className="text-black-900 text-sm tracking-[0.14px]"
                        size="txtUrbanistMedium14Black900"
                      >
                        1.08 ETH
                      </Text>
                    </div>
                  </div>
                  <Line className="self-center h-px bg-gray-100 w-full" />
                  <div className="flex flex-1 flex-row items-center justify-between w-full">
                    <div className="flex flex-row gap-3.5 items-start justify-between w-[59%]">
                      <Img
                        className="h-[42px] md:h-auto rounded-[50%] w-[42px]"
                        src="images/img_ellipse1018_4.png"
                        alt="Ellipse1018 Five"
                      />
                      <div className="flex flex-col items-start justify-start">
                        <Text
                          className="text-base text-black-900 tracking-[0.16px]"
                          size="txtUrbanistSemiBold16"
                        >
                          Doodles #2761
                        </Text>
                        <Text
                          className="mt-1 text-gray-500 text-xs tracking-[0.12px]"
                          size="txtUrbanistMedium12Gray500"
                        >
                          From Murakami
                        </Text>
                      </div>
                    </div>
                    <div className="flex flex-row gap-1.5 items-start justify-start w-[26%]">
                      <Img
                        className="h-4 w-4"
                        src="images/img_sort.svg"
                        alt="sort Eight"
                      />
                      <Text
                        className="text-black-900 text-sm tracking-[0.14px]"
                        size="txtUrbanistMedium14Black900"
                      >
                        4.4 ETH
                      </Text>
                    </div>
                  </div>
                  <Line className="self-center h-px bg-gray-100 w-full" />
                  <div className="flex flex-1 flex-row gap-3.5 items-center justify-between w-full">
                    <div className="flex flex-row gap-3.5 items-start justify-between w-[67%]">
                      <Img
                        className="h-[42px] md:h-auto rounded-[50%] w-[42px]"
                        src="images/img_ellipse1018_5.png"
                        alt="Ellipse1018 Six"
                      />
                      <div className="flex flex-col items-start justify-start">
                        <Text
                          className="text-base text-black-900 tracking-[0.16px]"
                          size="txtUrbanistSemiBold16"
                        >
                          Peachy Puch#22
                        </Text>
                        <Text
                          className="mt-1 text-gray-500 text-xs tracking-[0.12px]"
                          size="txtUrbanistMedium12Gray500"
                        >
                          From Mindblowonstudio
                        </Text>
                      </div>
                    </div>
                    <div className="flex flex-row gap-1.5 items-center justify-start w-[29%]">
                      <Img
                        className="h-4 w-4"
                        src="images/img_sort.svg"
                        alt="sort Nine"
                      />
                      <Text
                        className="text-black-900 text-sm tracking-[0.14px]"
                        size="txtUrbanistMedium14Black900"
                      >
                        5.62 ETH
                      </Text>
                    </div>
                  </div>
                  <Line className="self-center h-px bg-gray-100 w-full" />
                  <div className="flex flex-1 flex-row gap-[33px] items-center justify-between w-full">
                    <div className="flex flex-row gap-3.5 items-center justify-between w-[61%]">
                      <Img
                        className="h-[42px] md:h-auto rounded-[50%] w-[42px]"
                        src="images/img_ellipse1018_6.png"
                        alt="Ellipse1018 Seven"
                      />
                      <div className="flex flex-col items-center justify-start">
                        <Text
                          className="text-base text-black-900 tracking-[0.16px]"
                          size="txtUrbanistSemiBold16"
                        >
                          Gemmy #3723
                        </Text>
                        <Text
                          className="mt-1 text-gray-500 text-xs tracking-[0.12px]"
                          size="txtUrbanistMedium12Gray500"
                        >
                          From GemmySolana
                        </Text>
                      </div>
                    </div>
                    <div className="flex flex-row gap-1.5 items-center justify-start w-[28%]">
                      <Img
                        className="h-4 w-4"
                        src="images/img_sort.svg"
                        alt="sort Ten"
                      />
                      <Text
                        className="text-black-900 text-sm tracking-[0.14px]"
                        size="txtUrbanistMedium14Black900"
                      >
                        5.32 ETH
                      </Text>
                    </div>
                  </div>
                </List>
              </div> */}
              <div className="flex flex-col gap-5 items-center justify-start mb-[15px] pt-[3px] w-full">
      {/* Header */}
      <div className="flex flex-row items-start justify-between w-full">
        <Text className="text-black-900 text-lg font-bold" size="txtUrbanistSemiBold18Black900">
          Recent Donations
        </Text>
        <Text className="mb-0.5 text-gray-900 text-sm tracking-[0.14px] cursor-pointer hover:text-blue-500 transition duration-300" size="txtUrbanistMedium14Gray900">
          See All
        </Text>
      </div>

      {/* Donation List */}
      <div className="flex flex-col gap-5 items-center w-full bg-white shadow-lg rounded-lg p-5">
        {dummyDonators.map((donator, index) => (
          <div key={index} className="flex flex-row items-center justify-between w-full p-3 border-b last:border-b-0 hover:bg-gray-100 transition duration-200">
            <div className="flex flex-row gap-4 items-center">
              <Img className="h-10 w-10 rounded-full" src={donator.avatar} alt={`${donator.name} avatar`} />
              <div className="flex flex-col">
                <Text className="text-lg font-semibold text-black-900">{donator.name}</Text>
                <Text className="text-sm text-gray-500">{donator.origin}</Text>
              </div>
            </div>
            <div className="flex flex-row items-center text-sm text-black-900 font-medium">
              <Img className="h-5 w-5 mr-2" src="images/img_sort.svg" alt="sort icon" />
              {donator.amount}
            </div>
          </div>
        ))}
      </div>
    </div>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
