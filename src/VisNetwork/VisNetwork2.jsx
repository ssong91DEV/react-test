import React, { useState, useEffect, useRef } from "react";
import { Network } from "vis-network/peer/esm/vis-network";

export const basedOptions = {
  interaction: {
    hideEdgesOnDrag: true,
    hideEdgesOnZoom: true,
    hover: true,
    hoverConnectedEdges: true,
    multiselect: true,
    selectable: true,
  },
  autoResize: true,
  layout: {
    improvedLayout: false,
  },
  physics: {
    enabled: false,
    stabilization: {
      enabled: true,
      iterations: 1000,
      updateInterval: 50,
    },
    solver: "forceAtlas2Based", //'barnesHut', 'repulsion', 'hierarchicalRepulsion', 'forceAtlas2Based
  },

  height: "820px",
  edges: {
    // hidden: true,
    font: {
      strokeWidth: 0,
    },
    smooth: {
      enabled: true,
      type: "continuous", //'dynamic', 'continuous', 'discrete', 'diagonalCross', 'straightCross', 'horizontal', 'vertical', 'curvedCW', 'curvedCCW', 'cubicBezier'
    },
    arrows: {
      to: {
        enabled: true,
        scaleFactor: 1,
      },
    },
    // width: 1,
    // widthConstraint: 5,
    color: {
      inherit: false, // When changing the node color, the edge color does not change.
      opacity: 0.6,
    },
  },
  nodes: {
    chosen: {
      node: function (values, id, selected, hovering) {
        values.color = "#539bfc";
      },
    },
    shape: "dot",
    label: undefined,
    size: 10,
    font: {
      size: 14,
      face: "arial",
      color: "black",
    },
    scaling: {
      min: 10,
      max: 40,
    },
    color: {
      border: "#0053A2",
      background: "#0053A2",
      hover: {
        background: "#539bfc",
      },
    },
  },
};

const VisNetwork2 = ({ data }) => {
  const network = useRef(null);
  const container = useRef(null);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (data) {
      network.current = new Network(container.current, data, basedOptions);
    }
  }, [data]);

  if (!data) {
    return (
      <div>
        <div>No Data</div>
        <div>20220727 테스트1</div>
        <div>
          {time.toLocaleDateString()} {time.toLocaleTimeString()}
        </div>
      </div>
    );
  }

  return <div ref={container} />;
};

export default VisNetwork2;
