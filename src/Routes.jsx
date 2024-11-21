import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NotFound from "pages/NotFound";
import { CampaignProvider } from "pages/CampaignProvider";
import CardView from "pages/CardView/CardView";
import MyNft from "pages/MyNft/MyNft";
import Timer from "components/Timer";
const MyProfileHistory = React.lazy(() => import("pages/MyProfileHistory"));
const MyProfileWallet = React.lazy(() => import("pages/MyProfileWallet"));
const MyProfileCollection = React.lazy(() =>
  import("pages/MyProfileCollection"),
);
const MyProfilePreview = React.lazy(() => import("pages/MyProfilePreview"));
const Saved = React.lazy(() => import("pages/Saved"));
const ActiveBid = React.lazy(() => import("pages/ActiveBid"));
const OtherUserProfile = React.lazy(() => import("pages/OtherUserProfile"));
const MarketDetail = React.lazy(() => import("pages/MarketDetail"));
const Market = React.lazy(() => import("pages/Market"));
const Settings = React.lazy(() => import("pages/Settings"));
const Message = React.lazy(() => import("pages/Message"));
const Dashboard = React.lazy(() => import("pages/Dashboard"));
const Createcampaign = React.lazy(() => import("pages/Createcampaign"));
const ProjectRoutes = () => {
  return (
    <React.Suspense fallback={<>Loading...</>}>
      <CampaignProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/message" element={<Message />} />
          <Route path="/mynft" element={<MyNft/>} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/market" element={<Market />} />
          <Route path="/marketdetail" element={<MarketDetail />} />
          <Route path="/card-view" element={<CardView />} />
          {/* <Route path="/card_view/:tier" element={<MarketDetail />} /> */}
          <Route path="/otheruserprofile" element={<OtherUserProfile />} />
          <Route path="/activebid" element={<ActiveBid />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/myprofilepreview" element={<MyProfilePreview />} />
          <Route
            path="/myprofilecollection"
            element={<MyProfileCollection />}
          />
          <Route path="/myprofilewallet" element={<MyProfileWallet />} />
          <Route path="/myprofilehistory" element={<MyProfileHistory />} />
          <Route path="/create-campaign" element={<Createcampaign/>}/>
          <Route path="/timer" element={<Timer/>}/>
         
        </Routes>
      </Router>
      </CampaignProvider>
    </React.Suspense>
  );
};
export default ProjectRoutes;
