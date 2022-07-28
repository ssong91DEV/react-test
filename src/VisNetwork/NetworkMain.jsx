import React, { useEffect, useState } from "react";
import axios from "axios";
import VisNetwork2 from "./VisNetwork2";

const NetworkMain = () => {
  const [networkKData, setNetworkData] = useState();
  useEffect(() => {
    const getGraph_gephi = async () => {
      console.log("계피데이터 받아오기 실행");

      // 6290757f13b36ad7ee1d304f work
      // 6290757f13b36ad7ee1d3185 club affillation
      // 6290757f13b36ad7ee1d30e9 personal help_with_attribute
      // 60efa9e8bd2811de8abe8cab 미디움 - Purchased on weekdays
      // 60efa9e8bd2811de8abe8b29 미디움 - contact
      // 62ce41bd99cd93b2b9a9ebeb 서울대도서관
      // 623d4dcf2f9778ef939d22de 속성 있는거
      // 60e67dc482f95d1c21be19a4 보육담당과
      // 61542734df54ad30855abdb0 corlink
      const result = await axios({
        method: "post",
        url: `http://192.168.3.75:9214/networklayout_Initial`,
        data: {
          objectid: "6290757f13b36ad7ee1d304f",
        },
      }).then((r) => r.data);

      // setNetworkData({
      //   nodes: result.networkData.nodes,
      //   edges: result.networkData.edges,
      // });
    };

    // getGraph_gephi();
  }, []);

  return <VisNetwork2 data={networkKData} />;
};

export default NetworkMain;
