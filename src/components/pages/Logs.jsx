



import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { FixedSizeList as List } from 'react-window';
import { getSystemErrorLog, getSystemLog } from "../../dataApi/Data";
import './log.css';
import { useMediaQuery } from 'react-responsive';

const Logs = () => {
  const [logData, setLogData] = useState([]);
  const [logErrorData, setLogErrorData] = useState([]);
  const [isShowingErrors, setIsShowingErrors] = useState(false);


  const isMobile = useMediaQuery({ maxWidth: 768 });
  const itemSize = isMobile ? 150 : 60;

  useEffect(() => {
    const fetchLogs = async () => {
      const Data = await getSystemLog();
      setLogData(Data.data.data);
    };
    fetchLogs();
  }, []);

  useEffect(() => {
    const fetchErrorLogs = async () => {
      const Data = await getSystemErrorLog();
      setLogErrorData(Data.data.data);
    };
    fetchErrorLogs();
  }, []);

  const toggleLogs = () => {
    setIsShowingErrors(!isShowingErrors);
  };

  // const isSmallScreen = useMediaQuery('(max-width:768px)');

  const Row = ({ index, style }) => (
    <div style={style} className={isShowingErrors ? `text-red-500` : `text-white`}>
      {isShowingErrors ? logErrorData[index] : logData[index]}
    </div>
  );

  return (
    <div className="w-full">
      <div className="py-2 flex justify-end">
        <Button size={isMobile ? "small" : "medium"} variant="contained" onClick={toggleLogs}>
          {isShowingErrors ? "View System Logs" : "View Error Logs"}
        </Button>
      </div>
      <div className="lg:p-8 p-3 bg-black rounded-lg ">
        <div className="bg-black text-white h-[72vh] rounded-md overflow-y-auto custom-scrollbar">
      
          <List
            className="custom-scrollbar text-red-300"
            height={700}
            itemCount={isShowingErrors ? logErrorData.length : logData.length}
            // itemSize={45}
            itemSize={itemSize}
            width={"100%"}
            style={{ maxWidth: '100vw' }}
          >
            {Row}
          </List>
        </div>
      </div>
    </div>
  );
};

export default Logs;







