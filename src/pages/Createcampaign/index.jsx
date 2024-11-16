import React, { useState } from "react";
import { Sidebar } from "react-pro-sidebar";
import NFTprofile from "../../assets/images/NFTbackgrounfSocialImpact.png";

import { useNavigate } from "react-router-dom";

import './index.css';

import { Button, Img, Input, Line, List, Text } from "components";

const ShopInfoForm = ({ onSubmit }) => {
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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handletier1URI = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTier1URI(URL.createObjectURL(file));
    }
  };

  const handletier2URI = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTier2URI(URL.createObjectURL(file));
    }
  };

  const handletier3URI = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTier3URI(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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

  const navigate = useNavigate();

  return (
    <div className="flex h-screen">
      {/* Sidebar Section */}
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
                    <div className="flex flex-row gap-[18px] items-center justify-start ml-1.5 md:ml-[0] w-[55%] md:w-full common-pointer" onClick={() => navigate("/")}>
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

      {/* Main Content Section */}
      <div className="full-width-container">
  <div className="centered-container">
    <h1 className="heading-title">Create Campaign</h1>

    <div className="content-container">
      {/* Campaign Image Section */}
      <div className="image-upload-section">
        {/* <label className="label">Campaign Image</label> */}
        <div className="image-upload">
          <i className="folder-icon" style={{ fontSize: '100px', marginBottom: '10px' }}>📂</i><br />
          <label className="upload-label">Upload Campaign Image</label>
          <input type="file" id="campaignImage" className="input" required />
        </div>
      </div>

      {/* Form Data Section */}
      <div className="form-scrollable">
        <form onSubmit="handleSubmit(event)">
          <div className="form-group">
            <label className="label">Owner Wallet Address</label>
            <input
              type="text"
              className="input"
              placeholder="Owner Wallet Address"
              onChange="setOwner(event.target.value)"
              required
            />
          </div>
          <div className="form-group">
            <label className="label">Title</label>
            <input
              type="text"
              className="input"
              placeholder="Title"
              onChange="setTitle(event.target.value)"
              required
            />
          </div>
          <div className="form-group">
            <label className="label">Description</label>
            <textarea
              className="textarea"
              placeholder="Description"
              onChange="setDescription(event.target.value)"
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label className="label">Target Amount</label>
            <input
              type="number"
              className="input"
              placeholder="Target Amount"
              onChange="setTarget(event.target.value)"
              required
            />
          </div>
          <div className="form-group">
            <label className="label">Deadline</label>
            <input
              type="date"
              className="input"
              onChange="setDeadline(event.target.value)"
              required
            />
          </div>
          <div className="form-group">
            <label className="label">Minimum Amount</label>
            <input
              type="number"
              className="input"
              placeholder="Minimum Amount"
              onChange="setMinAmount(event.target.value)"
              required
            />
          </div>
          <div className="form-group">
            <label className="label">Tier 1 URI</label>
            <input type="file" className="input" onChange="handletier1URI(event)" />
          </div>
          <div className="form-group">
            <label className="label">Tier 2 URI</label>
            <input type="file" className="input" onChange="handletier2URI(event)" />
          </div>
          <div className="form-group">
            <label className="label">Tier 3 URI</label>
            <input type="file" className="input" onChange="handletier3URI(event)" />
          </div>
          <div className="form-actions">
            <button type="button" className="btn-cancel">Cancel</button>
            <button type="submit" className="btn-submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>


    </div>
  );
};

export default ShopInfoForm;
