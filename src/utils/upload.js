const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1MmRmMjg0Ni02MGM4LTRhN2YtYTY5NC0yYjFmY2JmZGY5MDgiLCJlbWFpbCI6ImFsZXh3YWxrZXIwNzA4MDBAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImUwMTk1Y2M3Y2I4MWRhM2JlNDlmIiwic2NvcGVkS2V5U2VjcmV0IjoiMWQzZGU4MDNkZmI3MjU5ZmZjNTlhYzg2MTY5ODhiZmRiN2IwZmI3MWU5Y2NlMzk1ZDcwOTY4MmIxMGM5NzAxMSIsImV4cCI6MTc2MzMxNTI2MX0.SNwJDQBORNosF6dNSRqSnpcOlBynDXCevMhEAeGokfo";
// const JWT = process.env.REACT_APP_PINATA_JWT;
export const uploadFile = async(file) => {
    try {
        console.log(JWT);
        const data = new FormData();
        data.append("file", file);
        const request = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${JWT}`,
            },
            body: data,
        });
    
        const response = await request.json();

        if (response.error) {
            throw new Error(`Pinata API error: ${response.error}`);
          }
      
        console.log("File uploaded successfully:", response.IpfsHash);
        return response.IpfsHash;
        
    } catch (error) {
        console.error("Error uploading to IPFS:", error.message);
    }

}