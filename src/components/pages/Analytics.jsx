import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { Box } from "@mui/material";
import AxisChart from "../charts/AxisChart";
import AnalyticTable from "../tables/AnalyticTable";
import { useEffect, useState } from "react";
import { AnalyticsFeatchData } from "../../dataApi/Data";
import ProgresChart from "../charts/ProgresChart";


const Analytics = () => {
  const [extnernal, setExternal] = useState("");
  const [internal, setInternal] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dashBordData = await AnalyticsFeatchData();
        
        setExternal(dashBordData.data.external_request);
        setInternal(dashBordData.data.internal_request);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>

      <div className="lg:px-2">
        <div className="grid grid-cols-12 lg:space-x-4 md:space-y-0 space-y-4 ">
          <div className="lg:col-span-4 md:col-span-6 col-span-12 border shadow-md shadow-green-200 rounded-lg">
            <div className="p-3 px-6">
              <div className="md:space-y-0 space-y-2">
                <div className="bg-[#dff7e9] w-fit p-3 rounded-full">
                  <CreditCardIcon className="text-[#6dd99d]" />
                </div>
                <div className="space-y-2 px-3">
                  <h2 className="text-[24px] font-bold">{internal.approveRequest}</h2>
                  <h1 className="text-[20px] font-semibold">
                    Internal Requests Approve
                  </h1>
                </div>
              </div>
            </div>
            <img src="/analytics/Graph.png" alt="" />
          </div>
          <div className="lg:col-span-4 md:col-span-6 col-span-12 border shadow-md shadow-green-200 rounded-lg">
            <div className="p-3 px-6">
              <div className="space-y-2">
                <div className="bg-[#dff7e9] w-fit p-3 rounded-full">
                  <CreditCardIcon className="text-[#6dd99d]" />
                </div>
                <div className="space-y-2 px-3">
                  <h2 className="text-[24px] font-bold">{extnernal.approveRequest}</h2>
                  <h1 className="text-[20px] font-semibold">
                    External Requests Approve
                  </h1>
                </div>
              </div>
            </div>
            <img src="/analytics/Graph.png" alt="" />
          </div>
          <div className="lg:col-span-4 col-span-12 space-y-5">
            <div className="shadow-md shadow-red-200 border rounded-lg p-8 px-8">
              <div className="flex gap-4 py-2 items-center">
                <div className="bg-[#fce5e6] p-3 rounded-xl">
                  <AccountTreeIcon className="text-[#ea595a] " />
                </div>
                <p className="text-[20px] font-semibold">{internal.declineRequest}</p>
              </div>
              <div className="space-y-2">
                <h5 className="font-semibold">Declined Internal Requests</h5>
                <h6 className="text-gray-400">
                  {" "}
                  <span className="text-black px-2">
                   {internal.DeclineRequestsPercentage}
                    <span> </span>
                  </span>{" "}
                  than last week
                </h6>
              </div>
            </div>
            <div className="border shadow-md shadow-red-200 rounded-lg p-8 px-8">
              <div className="flex gap-4 py-2 items-center">
                <div className="bg-[#fce5e6] p-3 rounded-xl">
                  <AccountTreeIcon className="text-[#ea595a]" />
                </div>
                <p className="text-[20px] font-semibold">{extnernal.declineRequest}</p>
              </div>
              <div className="space-y-2">
                <h5 className="font-semibold">Declined Extnernal Requests</h5>
                <h6 className="text-gray-400">
                  {" "}
                  <span className="text-black px-2">
                    {extnernal.DeclineRequestsPercentage}<span></span>
                  </span>{" "}
                  than last week
                </h6>
              </div>
            </div>
          </div>
        </div>
        <Box className="py-8" />
        <div>
          <div className="lg:grid grid-cols-12 md:space-x-4 md:space-y-0 space-y-4">
            <div className="col-span-7 rounded-lg shadow-md shadow-blue-100 border">
                <AxisChart />
            </div>
            <div className="col-span-5 rounded-lg shadow-md shadow-blue-100 border ">
              <div className="h-[500px]  ">
                <div className="flex justify-center items-center h-full ">
                  <ProgresChart />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Box className="py-8" />
        <div>
          <div className="lg:grid grid-cols-12 lg:space-x-4 lg:space-y-0  space-y-4 ">
            <div className="col-span-5">
              <div className="border shadow-md shadow-blue-100 rounded-lg p-8 px-8">
                <div className="flex gap-4 py-2 items-center">
                  <div className="bg-[#BFD8ED] p-3 rounded-xl">
                    <AccountTreeIcon className="text-[#1F8FEC]" />
                  </div>
                  <p className="text-[20px] font-semibold">{internal.pendingRequest}</p>
                </div>
                <div className="space-y-2">
                  <h5 className="font-semibold">Pending Internal Requests</h5>
                  <h6 className="text-gray-400">
                    {" "}
                    <span className="text-black px-2">
                      {internal.pendingRequestsPercentage} <span></span>
                    </span>{" "}
                    than last week
                  </h6>
                </div>
              </div>
              {/*  */}
              <div className="border shadow-md shadow-blue-100 rounded-lg p-8 px-8">
                <div className="flex gap-4 py-2 items-center">
                  <div className="bg-[#BFD8ED] p-3 rounded-xl">
                    <AccountTreeIcon className="text-[#1F8FEC]" />
                  </div>
                  <p className="text-[20px] font-semibold">{extnernal.pendingRequest}</p>
                </div>
                <div className="space-y-2">
                  <h5 className="font-semibold">Pending External Requests</h5>
                  <h6 className="text-gray-400">
                    {" "}
                    <span className="text-black px-2">
                      {extnernal.pendingRequestsPercentage} <span></span>
                    </span>{" "}
                    than last week
                  </h6>
                </div>
              </div>
            </div>
            <div className="col-span-7">
              <div>
                <AnalyticTable className="" />
              </div>
            </div>
          </div>
        </div>
        <Box className="py-1" />
      </div>
    </>
  );
};

export default Analytics;
