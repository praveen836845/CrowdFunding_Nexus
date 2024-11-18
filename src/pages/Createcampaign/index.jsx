import React, { useState } from "react";
import { Sidebar } from "react-pro-sidebar";
import { useNavigate } from "react-router-dom";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "viem";

import {CrowdFundingABI} from '../../abi/constants'
import {CrowdFundingAddress} from '../../abi/constants'

import './index.css';

import { Button, Img, Text } from "components";
import { uploadFile } from "utils/upload";


const ShopInfoForm = ({ onSubmit }) => {
  const [owner, setOwner] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [target, setTarget] = useState("");
  const [deadline, setDeadline] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [image, setImage] = useState("");
  const [tier1Image, setTier1Image] = useState("");
  const [tier2Image, setTier2Image] = useState("");
  const [tier3Image, setTier3Image] = useState("");
  const [transactionHash, setTransactionHash] = useState(""); // New state for tracking transaction hash


  const [imageURI, setImageURI] = useState("");
  const [tier1URI, setTier1URI] = useState("");
  const [tier2URI, setTier2URI] = useState("");
  const [tier3URI, setTier3URI] = useState("");
  
  const CONTRACT_ADDRESS = CrowdFundingAddress


  const GATEWAY = "gateway.pinata.cloud";
  
  const { address, isConnected } = useAccount(); // This is the client address

  const {writeContractAsync , isPending} = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash: transactionHash,
    onSuccess: () => {
      console.log("successfully Happen the transactions")
      // navigate("/");
    },
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); 
    }
  };

  const handletier1URI = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTier1Image(file);
    }
  };

  const handletier2URI = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTier2Image(file);
    }
  };

  const handletier3URI = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTier3Image(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("checking that address" , address);
    if (!owner || !title || !description || !target || !deadline || !minAmount || !image || !tier1Image || !tier2Image || !tier3Image) {
      alert("Please fill all the fields");
      return;
    }

    console.log("Upload file to ipfs");
    const imageIPFS = await uploadFile(image);
    setImageURI(`https://${GATEWAY}/ipfs/${imageIPFS}`);
    const tier1IPFS = await uploadFile(tier1Image);
    setTier1URI(`https://${GATEWAY}/ipfs/${tier1IPFS}`);
    const tier2IPFS = await uploadFile(tier2Image);
    setTier2URI(`https://${GATEWAY}/ipfs/${tier2IPFS}`);
    const tier3IPFS = await uploadFile(tier3Image);
    setTier3URI(`https://${GATEWAY}/ipfs/${tier3IPFS}`);
    console.log("Upload file to ipfs");
    
    const deadlineTimestamp = Math.floor(new Date(deadline).getTime() / 1000);

    // Prepare contract call
    console.log(">>>" , target )
    // const amt1  = parseEther(target.toString())
    // const amt2  = parseEther(minAmount.toString())
    const  hash  =   await writeContractAsync({
    
        address: CONTRACT_ADDRESS,
        abi: CrowdFundingABI,
        functionName: 'createCampaign',
        args: [
          address,                              // address _owner
          title,                              // string memory _title
          description,                        // string memory _description
          // parseEther(target.toString()),  
          10000000,    // uint256 _target
           deadlineTimestamp,          // uint256 _deadline
          // parseEther(minAmount.toString()),
            10000000,   // uint256 _minAmount
          imageURI,                           // string memory _image
          tier1URI,                           // string memory _tier1URI
          tier2URI,                          // string memory _tier2URI
          tier3URI                           // string memory _tier3URI
        ],
    });
    console.log("transaction Hash is there" , hash);
    setTransactionHash(hash);
 console.log("tranasaction has been called");
    // const waitForTransaction = async () => {
    //   try {
    //     const receipt = await useWaitForTransactionReceipt({ hash });
        
    //     if (receipt.status === 'success') {
    //     console.log("Successfully getting the added the transactions")
        
    //     } else {
    //       console.log("Transaction failed. Please try again.");
    //     }
    //   } catch (error) {
    //     console.log("Error confirming transaction: " + error.message);
    //   }
    // };

    // await waitForTransaction();


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
          <input type="file" id="campaignImage" className="input" onChange={(e) => handleImageUpload(e)} />
        </div>
      </div>

      {/* Form Data Section */}
      <div className="form-scrollable">
        <form onSubmit= {handleSubmit}>
          <div className="form-group">
            <label className="label">Owner Wallet Address</label>
            <input
              type="text"
              className="input"
              placeholder="Owner Wallet Address"
              onChange={(event) => setOwner(event.target.value)}
              
            />
          </div>
          <div className="form-group">
            <label className="label">Title</label>
            <input
              type="text"
              className="input"
              placeholder="Title"
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="label">Description</label>
            <textarea
              className="textarea"
              placeholder="Description"
              onChange={(event) => setDescription(event.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <label className="label">Target Amount</label>
            <input
              type="number"
              className="input"
              placeholder="Target Amount"
              onChange= {(event) => setTarget(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="label">Deadline</label>
            <input
              type="date"
              className="input"
              onChange={(event) => setDeadline(event.target.value)}
              
            />
          </div>
          <div className="form-group">
            <label className="label">Minimum Amount</label>
            <input
              type="number"
              className="input"
              placeholder="Minimum Amount"
              onChange={(event) => setMinAmount(event.target.value)}
              
            />
          </div>
          <div className="form-group">
            <label className="label">Tier 1 URI</label>
            <input type="file" className="input" onChange={(e) => handletier1URI(e)} />
          </div>
          <div className="form-group">
            <label className="label">Tier 2 URI</label>
            <input type="file" className="input" onChange={(e) => handletier2URI(e)} />
          </div>
          <div className="form-group">
            <label className="label">Tier 3 URI</label>
            <input type="file" className="input" onChange={(e) => handletier3URI(e)} />
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
