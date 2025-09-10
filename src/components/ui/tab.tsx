interface Tab {
  label: string;
  content: React.ReactNode;
}

interface TabComponentProps {
  tabs: Tab[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabComponent = ({ tabs, activeTab, setActiveTab }: TabComponentProps) => {
  return (
    <div className="w-full">
      <>
        <div className="w-full border-b border-gray-200 flex">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              className={`relative pb-1 px-4  text-lg font-medium transition-colors duration-200 ${
                activeTab === tab.label
                  ? "text-orange-500 font-normal"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
              {activeTab === tab.label ? (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 transform transition-all duration-300 ease-in-out"></div>
              ) : null}
            </button>
          ))}
        </div>
        <div className="mt-6">
          <div>
            {tabs.map(
              (tab) =>
                tab.label === activeTab && (
                  <div key={tab.label}>
                    <div>{tab.content}</div>
                  </div>
                )
            )}
          </div>
        </div>
      </>
    </div>
  );
};

export default TabComponent;
