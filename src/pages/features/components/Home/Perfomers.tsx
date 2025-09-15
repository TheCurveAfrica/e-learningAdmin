import { performanceData } from "./utils";

const Perfomers = () => {
  return (
    <div className="bg-gray-100 rounded-lg p-4 mt-8">
      <h1 className="text-base font-semibold text-[#2D2F30] mb-3">
        Top Performers
      </h1>
      <p className="rounded-full bg-gray-200 w-fit p-2 text-xs">Week 1</p>

      <div className="space-y-4 mt-2" >
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
  );
};

export default Perfomers;
