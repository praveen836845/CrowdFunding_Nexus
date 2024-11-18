import React, { createContext, useContext, useState } from 'react';

const CampaignContext = createContext();

export const useCampaignContext = () => useContext(CampaignContext);

export const CampaignProvider = ({ children }) => {
  const [campaign, setCampaign] = useState(null);

  return (
    <CampaignContext.Provider value={{ campaign, setCampaign }}>
      {children}
    </CampaignContext.Provider>
  );
};
