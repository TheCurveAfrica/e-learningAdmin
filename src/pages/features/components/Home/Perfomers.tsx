import { performanceData } from "./utils";

const Perfomers = () => {
  return (
    <>
      <h2 className="text-lg font-semibold text-[#2D2F30] border-b pb-2 border-gray-200 mt-8">
        Top Performers
      </h2>
      <div className="bg-gray-100 rounded-lg p-4  mt-4">
        <p className="rounded-full bg-gray-200 w-fit p-2 text-xs">Week 1</p>

        <div className="space-y-4 mt-2">
          {performanceData.map((performer, index) => (
            <div className="flex items-center justify-between mt-8" key={index}>
              <div className="flex items-center space-x-3">
                <img
                  src={performer.avatar}
                  alt="avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-gray-900">{performer.name}</p>
                  <p className="text-sm text-gray-500">{performer.role}</p>
                </div>
              </div>
              <p className="text-sm text-gray-500">{performer.xp} XP</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Perfomers;
