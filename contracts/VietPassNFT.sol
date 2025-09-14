// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title VietPass NFT
 * @dev VietPass membership NFT for Da Nang digital nomads
 * Deployed on U2U Network for VietBUIDL Hackathon
 */
contract VietPassNFT is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    
    // Base URI for metadata
    string private _baseTokenURI;
    
    // VietPass membership details
    struct Membership {
        uint256 tokenId;
        address holder;
        uint256 mintedAt;
        uint256 expiresAt;
        bool isActive;
        string memberEmail;
        string paymentIntentId;
    }
    
    mapping(uint256 => Membership) public memberships;
    mapping(address => uint256[]) public userMemberships;
    mapping(string => uint256) public emailToTokenId;
    mapping(string => bool) public usedPaymentIntents;
    
    // Events
    event VietPassMinted(
        uint256 indexed tokenId,
        address indexed to,
        string memberEmail,
        uint256 expiresAt
    );
    
    event MembershipRenewed(
        uint256 indexed tokenId,
        uint256 newExpiresAt
    );

    constructor(
        string memory name,
        string memory symbol,
        string memory baseTokenURI
    ) ERC721(name, symbol) {
        _baseTokenURI = baseTokenURI;
    }

    /**
     * @dev Mint a VietPass NFT to a user
     * @param to Address to mint the NFT to
     * @param memberEmail Email of the member
     * @param paymentIntentId Stripe payment intent ID
     */
    function mintVietPass(
        address to,
        string memory memberEmail,
        string memory paymentIntentId
    ) public onlyOwner returns (uint256) {
        require(!usedPaymentIntents[paymentIntentId], "Payment intent already used");
        require(bytes(memberEmail).length > 0, "Email required");
        
        _tokenIdCounter.increment();
        uint256 tokenId = _tokenIdCounter.current();
        
        _safeMint(to, tokenId);
        
        // Set membership details
        uint256 expiresAt = block.timestamp + 30 days;
        memberships[tokenId] = Membership({
            tokenId: tokenId,
            holder: to,
            mintedAt: block.timestamp,
            expiresAt: expiresAt,
            isActive: true,
            memberEmail: memberEmail,
            paymentIntentId: paymentIntentId
        });
        
        // Update mappings
        userMemberships[to].push(tokenId);
        emailToTokenId[memberEmail] = tokenId;
        usedPaymentIntents[paymentIntentId] = true;
        
        // Set token URI
        string memory tokenURI = string(
            abi.encodePacked(_baseTokenURI, _toString(tokenId), ".json")
        );
        _setTokenURI(tokenId, tokenURI);
        
        emit VietPassMinted(tokenId, to, memberEmail, expiresAt);
        
        return tokenId;
    }

    /**
     * @dev Check if a user has an active VietPass
     * @param user Address to check
     */
    function hasActiveVietPass(address user) public view returns (bool) {
        uint256[] memory userTokens = userMemberships[user];
        
        for (uint256 i = 0; i < userTokens.length; i++) {
            uint256 tokenId = userTokens[i];
            Membership memory membership = memberships[tokenId];
            
            if (membership.isActive && block.timestamp < membership.expiresAt) {
                return true;
            }
        }
        
        return false;
    }

    /**
     * @dev Get active membership for a user
     * @param user Address to check
     */
    function getActiveMembership(address user) 
        public 
        view 
        returns (Membership memory) 
    {
        uint256[] memory userTokens = userMemberships[user];
        
        for (uint256 i = 0; i < userTokens.length; i++) {
            uint256 tokenId = userTokens[i];
            Membership memory membership = memberships[tokenId];
            
            if (membership.isActive && block.timestamp < membership.expiresAt) {
                return membership;
            }
        }
        
        revert("No active membership found");
    }

    /**
     * @dev Renew membership (extend expiry)
     * @param tokenId Token ID to renew
     * @param paymentIntentId New payment intent ID
     */
    function renewMembership(
        uint256 tokenId,
        string memory paymentIntentId
    ) public onlyOwner {
        require(_exists(tokenId), "Token does not exist");
        require(!usedPaymentIntents[paymentIntentId], "Payment intent already used");
        
        Membership storage membership = memberships[tokenId];
        
        // Extend by 30 days from current expiry or now (whichever is later)
        uint256 baseTime = block.timestamp > membership.expiresAt 
            ? block.timestamp 
            : membership.expiresAt;
        
        membership.expiresAt = baseTime + 30 days;
        membership.isActive = true;
        membership.paymentIntentId = paymentIntentId;
        
        usedPaymentIntents[paymentIntentId] = true;
        
        emit MembershipRenewed(tokenId, membership.expiresAt);
    }

    /**
     * @dev Deactivate membership (admin function)
     * @param tokenId Token ID to deactivate
     */
    function deactivateMembership(uint256 tokenId) public onlyOwner {
        require(_exists(tokenId), "Token does not exist");
        memberships[tokenId].isActive = false;
    }

    /**
     * @dev Set base URI for metadata
     * @param baseTokenURI New base URI
     */
    function setBaseURI(string memory baseTokenURI) public onlyOwner {
        _baseTokenURI = baseTokenURI;
    }

    /**
     * @dev Get total supply of VietPass NFTs
     */
    function totalSupply() public view returns (uint256) {
        return _tokenIdCounter.current();
    }

    /**
     * @dev Get user's membership tokens
     * @param user Address to check
     */
    function getUserMemberships(address user) 
        public 
        view 
        returns (uint256[] memory) 
    {
        return userMemberships[user];
    }

    // Required overrides
    function _burn(uint256 tokenId) 
        internal 
        override(ERC721, ERC721URIStorage) 
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }

    /**
     * @dev Convert uint256 to string
     */
    function _toString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }

    /**
     * @dev Emergency withdraw (owner only)
     */
    function emergencyWithdraw() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    /**
     * @dev Support for receiving ETH
     */
    receive() external payable {}
}