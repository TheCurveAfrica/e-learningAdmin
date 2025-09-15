export default function Overview() {
  const totalStudents = 210;
  const summary = [
    { label: "Product design", value: 70, color: "bg-green-500" },
    { label: "Front-end", value: 70, color: "bg-gray-500" },
    { label: "Back-end", value: 70, color: "bg-blue-600" },
  ];

  return (
    <main className="mt-8">
      <h2 className="text-lg font-semibold text-[#2D2F30] border-b pb-2 border-gray-200">
        Overview
      </h2>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8 max-w-4xl mt-6 ">
        <div className="space-y-4 mr-16">
          <p className="text-gray-500 text-sm">Administrators</p>
          <p className="text-3xl font-bold">10</p>
        </div>
        <div className="w-px h-20 bg-gray-300"></div>

        <div className="flex-1">
          <span className="flex justify-between">
            <p className="text-gray-500 text-sm mb-2">Students Summary</p>
            <p className="text-gray-500 text-sm mb-2">
              {totalStudents} registered students
            </p>
          </span>

          <div className="flex w-full h-3 rounded overflow-hidden">
            {summary.map((s, idx) => (
              <div
                key={idx}
                className={`${s.color} ${
                  idx !== summary.length - 1 ? "mr-2" : ""
                }`}
                style={{
                  width: `${(s.value / totalStudents) * 100}%`,
                }}
              ></div>
            ))}
          </div>

          {/* Labels */}
          <div className="flex flex-wrap gap-4 mt-3 text-sm">
            {summary.map((s, idx) => (
              <div key={idx} className="flex items-center gap-1">
                <span className={`w-3 h-3 rounded-sm ${s.color}`}></span>
                <span className="text-gray-700">
                  {s.value} {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
