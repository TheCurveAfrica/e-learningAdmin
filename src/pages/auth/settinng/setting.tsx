import TabComponent from "@/components/ui/tab";
import CommunitySettings from "./community";
import { useState } from "react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("Community");

  const tabs = [
    {
      label: "Community",
      content: <CommunitySettings />,
    },
  ];

  return (
    <div className="p-4 space-y-6 ">
      <div>
        <h1 className="text-lg font-semibold text-[#2D2F30]">Settings</h1>
        <span className="text-sm font-normal text-[#525454]">
          Here you can manage platform’s preferences
        </span>
      </div>

      <TabComponent
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  );
};

export default Settings;
