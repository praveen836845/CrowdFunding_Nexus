import { Button, Img, Input, Line, List, Text } from "components";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "react-pro-sidebar";

const SideBar = () => {
  const navigate = useNavigate();

  return (
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
                  <Img className="h-6 w-6" src="images/img_eye.svg" alt="eye" />
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
              <div className="common-pointer flex flex-col items-start justify-start p-2.5 w-full">
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
                <div className="bg-gray-900_5f flex flex-col items-start justify-start p-2 rounded-[10px] w-full mt-3">
                <div className="flex flex-row gap-[18px] items-center justify-start ml-1.5 md:ml-[0] w-[41%] md:w-full ">
                  <Img
                    className="h-6 w-6"
                    src="images/image-nft.svg"
                    alt="user"
                  />
                  <Text
                    className="common-pointer text-gray-900 text-lg tracking-[0.18px] whitespace-nowrap"
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
  );
};

export default SideBar;
