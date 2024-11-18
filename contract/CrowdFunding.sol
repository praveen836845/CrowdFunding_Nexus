// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// NFT Contract for each campaign
contract CampaignNFT is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    // Events
    event TierURISet(uint8 indexed tier, string uri);
    event NFTMinted(address indexed recipient, uint8 indexed tier, uint256 indexed tokenId);
    
    // NFT tier metadata URIs
    mapping(uint8 => string) public tierURIs;
    address public immutable campaignAddress;
    string public campaignTitle;
    
    constructor(
        string memory _campaignTitle,
        address _campaignAddress
    ) ERC721(
        string(abi.encodePacked(_campaignTitle, " Supporter NFT")),
        string(abi.encodePacked("CNFT-", _campaignTitle))
    ) {
        campaignAddress = _campaignAddress;
        campaignTitle = _campaignTitle;
    }
    
    function setTierURI(uint8 tier, string memory uri) external {
        require(msg.sender == campaignAddress, "Only campaign contract can set URIs");
        tierURIs[tier] = uri;
        emit TierURISet(tier, uri);
    }
    
    function mintNFT(address recipient, uint8 tier) external returns (uint256) {
        require(msg.sender == campaignAddress, "Only campaign contract can mint");
        require(bytes(tierURIs[tier]).length > 0, "Tier URI not set");
        
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        
        emit NFTMinted(recipient, tier, newItemId);
        return newItemId;
    }
    
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(ownerOf(tokenId) != address(0), "Token does not exist");
        uint8 tier = 1; // Default to tier 1, you might want to store tier info per token
        return tierURIs[tier];
    }
}

contract CrowdFunding {
    using Counters for Counters.Counter;
    
    // Events
    event CampaignCreated(
        uint256 indexed campaignId,
        address indexed owner,
        string title,
        uint256 target,
        uint256 deadline,
        uint256 minimumAmount,
        address nftContract
    );
    
    event DonationReceived(
        uint256 indexed campaignId,
        address indexed donor,
        uint256 amount,
        uint8 nftTier
    );
    
    event CampaignFinalized(
        uint256 indexed campaignId,
        uint256 totalAmount,
        uint256 numberOfDonors,
        bool successful
    );
    
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 minimumAmount;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations;
        CampaignNFT nftContract; // Each campaign has its own NFT contract
        mapping(uint8 => string) nftTierURIs;
        bool isActive;
    }

    struct CampaignInfo {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 minimumAmount;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations;
        address nftContract;
        NFTTierInfo[] tiers;
        bool isActive;
    }

    struct NFTTierInfo {
        uint8 tier;
        string uri;
        uint256 threshold;
    }

    struct DonationInfo {
    string campaignName;
    uint256 donation;
}

    mapping(uint256 => Campaign) public campaigns;
    uint256 public numberOfCampaigns = 0;
    
    uint256 public constant TIER1_THRESHOLD = 0.0000001 ether;
    uint256 public constant TIER2_THRESHOLD = 0.0000005 ether;
    
    function createCampaign(
        address _owner,
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        uint256 _minAmount,
        string memory _image,
        string memory _tier1URI,
        string memory _tier2URI,
        string memory _tier3URI
    ) public returns (uint256) {
        require(_deadline > block.timestamp, "The deadline should be a date in the future.");

        uint256 campaignId = numberOfCampaigns;
        Campaign storage campaign = campaigns[campaignId];

        // Create a new NFT contract specifically for this campaign
        CampaignNFT newNFTContract = new CampaignNFT(
            _title,
            address(this)
        );

        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.minimumAmount = _minAmount;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;
        campaign.nftContract = newNFTContract;
        campaign.isActive = true;
        
        // Set NFT URIs for different tiers
        campaign.nftTierURIs[1] = _tier1URI;
        campaign.nftTierURIs[2] = _tier2URI;
        campaign.nftTierURIs[3] = _tier3URI;
        
        // Set URIs in the campaign's NFT contract
        newNFTContract.setTierURI(1, _tier1URI);
        newNFTContract.setTierURI(2, _tier2URI);
        newNFTContract.setTierURI(3, _tier3URI);

        numberOfCampaigns++;

        emit CampaignCreated(
            campaignId,
            _owner,
            _title,
            _target,
            _deadline,
            _minAmount,
            address(newNFTContract)
        );

        return campaignId;
    }

    function donateToCampaign(uint256 _id) public payable {
        uint256 amount = msg.value;
        Campaign storage campaign = campaigns[_id];
        
        require(campaign.isActive, "Campaign does not exist");
        require(block.timestamp <= campaign.deadline, "Campaign has ended");
        require(amount >= campaign.minimumAmount, "Amount is below minimum donation");

        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        (bool sent,) = payable(campaign.owner).call{value: amount}("");

        if(sent) {
            campaign.amountCollected = campaign.amountCollected + amount;
            
            // Determine NFT tier based on donation amount
            uint8 tier;
            if (amount >= TIER2_THRESHOLD) {
                tier = 3;
            } else if (amount >= TIER1_THRESHOLD) {
                tier = 2;
            } else {
                tier = 1;
            }
            campaign.nftContract.mintNFT(msg.sender, tier);
            
            emit DonationReceived(_id, msg.sender, amount, tier);
            
            // Check if campaign has reached its target
            if (campaign.amountCollected >= campaign.target) {
                emit CampaignFinalized(
                    _id,
                    campaign.amountCollected,
                    campaign.donators.length,
                    true
                );
            }
        }
    }

    function getDonators(uint256 _id) view public returns (address[] memory, uint256[] memory) {
        require(campaigns[_id].isActive, "Campaign does not exist");
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    function getCampaigns() public view returns (CampaignInfo[] memory) {
        CampaignInfo[] memory allCampaigns = new CampaignInfo[](numberOfCampaigns);

        for(uint i = 0; i < numberOfCampaigns; i++) {
            Campaign storage campaign = campaigns[i];
            
            NFTTierInfo[] memory tiers = new NFTTierInfo[](3);
            tiers[0] = NFTTierInfo(1, campaign.nftTierURIs[1], campaign.minimumAmount);
            tiers[1] = NFTTierInfo(2, campaign.nftTierURIs[2], TIER1_THRESHOLD);
            tiers[2] = NFTTierInfo(3, campaign.nftTierURIs[3], TIER2_THRESHOLD);
            
            allCampaigns[i] = CampaignInfo({
                owner: campaign.owner,
                title: campaign.title,
                description: campaign.description,
                target: campaign.target,
                deadline: campaign.deadline,
                minimumAmount: campaign.minimumAmount,
                amountCollected: campaign.amountCollected,
                image: campaign.image,
                donators: campaign.donators,
                donations: campaign.donations,
                nftContract: address(campaign.nftContract),
                tiers: tiers,
                isActive: campaign.isActive
            });
        }

        return allCampaigns;
    }

    function getNFTAddress(uint256 campaignId) public view returns (address) {
        require(campaigns[campaignId].isActive, "Campaign does not exist");
        return address(campaigns[campaignId].nftContract);
    }

    function getDonations(address donor) public view returns (DonationInfo[] memory) {
        uint256 count = 0;

        for (uint i = 0; i < numberOfCampaigns; i++) {
            for (uint j = 0; j < campaigns[i].donators.length; j++) {
                if (campaigns[i].donators[j] == donor) {
                    count++;
                }
            }
        }

        DonationInfo[] memory donationInfo = new DonationInfo[](count);
        uint256 index = 0;

        for (uint i = 0; i < numberOfCampaigns; i++) {
            for (uint j = 0; j < campaigns[i].donators.length; j++) {
                if (campaigns[i].donators[j] == donor) {
                    donationInfo[index] = DonationInfo({
                    campaignName: campaigns[i].title,
                    donation: campaigns[i].donations[j]
                });
                    index++;
                }
            }
        }

        return donationInfo;
    }
}