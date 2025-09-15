import { useState } from "react";
import { stack, tableHeaders } from "./utils";

const Table = () => {
  const [selectedStack, setSelectedStack] = useState(stack[0]?.stack || "");

  return (
    <main className="mt-10">
      <h2 className="text-lg font-semibold text-[#2D2F30] border-b pb-2 border-gray-200">
        Assessment
      </h2>
      <div className="mt-8 overflow-hidden">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-48 bg-gray-50 ">
            {stack.map((item) => (
              <li
                key={item.stack}
                className={`px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer ${
                  selectedStack === item.stack
                    ? "bg-blue-100 text-blue-600"
                    : ""
                }`}
                onClick={() => setSelectedStack(item.stack)}
              >
                {item.stack}
              </li>
            ))}
          </div>

          <div className="flex-1 overflow-x-auto ml-4 rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              {/* Table Head  */}
              <thead className="bg-[#F1F6F9]">
                <tr>
                  {tableHeaders.map((header) => (
                    <th
                      key={header}
                      className="px-4 py-3 text-left text-sm font-medium text-gray-600"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Table body */}
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-700 flex items-center space-x-2">
                    <span className="h-2 w-2 rounded-full bg-orange-400"></span>
                    <span>Submitted</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-orange-500">
                    JavaScript fundamentals
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    Chiroma Bisi Adamu
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    Assignment
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-700 flex items-center space-x-2">
                    <span className="h-2 w-2 rounded-full bg-orange-400"></span>
                    <span>Submitted</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-orange-500">
                    JavaScript fundamentals
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    Chiroma Bisi Adamu
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    Assignment
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-700 flex items-center space-x-2">
                    <span className="h-2 w-2 rounded-full bg-orange-400"></span>
                    <span>Submitted</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-orange-500">
                    JavaScript fundamentals
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    Chiroma Bisi Adamu
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">Project</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-700 flex items-center space-x-2">
                    <span className="h-2 w-2 rounded-full bg-orange-400"></span>
                    <span>Submitted</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-orange-500">
                    JavaScript fundamentals
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    Chiroma Bisi Adamu
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    Assignment
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Table;
