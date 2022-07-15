import React, { useEffect, useRef } from "react";
import { Network } from "vis-network/peer/esm/vis-network";
import { data } from "./workInteract";

const defaultOptions = {
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
  //   physics: {
  //     enabled: true,
  //     stabilization: {
  //       enabled: true,
  //       iterations: 1000,
  //       updateInterval: 50,
  //     },
  //     solver: "forceAtlas2Based", //'barnesHut', 'repulsion', 'hierarchicalRepulsion', 'forceAtlas2Based
  //   },
  physics: {
    enabled: true,
    // barnesHut: {
    //   theta: 0.5,
    //   gravitationalConstant: -2000,
    //   centralGravity: 0.3,
    //   springLength: 95,
    //   springConstant: 0.04,
    //   damping: 0.09,
    //   avoidOverlap: 0,
    // },
    // forceAtlas2Based: {
    //   theta: 0.5,
    //   gravitationalConstant: -50,
    //   centralGravity: 0.1,
    //   springConstant: 0.08,
    //   springLength: 1000,
    //   damping: 0.4,
    //   avoidOverlap: 0,
    // },
    // repulsion: {
    //   centralGravity: 0.2,
    //   springLength: 200,
    //   springConstant: 0.05,
    //   nodeDistance: 100,
    //   damping: 0.09,
    // },
    // hierarchicalRepulsion: {
    //   centralGravity: 0.0,
    //   springLength: 100,
    //   springConstant: 0.01,
    //   nodeDistance: 120,
    //   damping: 0.09,
    //   avoidOverlap: 0,
    // },
    maxVelocity: 50,
    minVelocity: 0.1,
    solver: "forceAtlas2Based", //'barnesHut', 'repulsion', 'hierarchicalRepulsion', 'forceAtlas2Based'
    stabilization: {
      enabled: true,
      iterations: 1000,
      updateInterval: 100,
      onlyDynamicEdges: false,
      fit: true,
    },
    timestep: 0.5,
    adaptiveTimestep: true,
  },

  height: "800px",
  edges: {
    arrowStrikethrough: false,
    chosen: {
      //   edge: function (values, id, selected, hovering) {
      //     console.log("밸류", values);
      //     console.log("id", id);
      //     console.log("selected밸류", selected);
      //     console.log("hovering", hovering);
      //   },
    },
    // hidden: true,
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
    font: {
      strokeWidth: 0,
      align: "top",
    },
  },
  nodes: {
    chosen: {
      node: function (values, id, selected, hovering) {
        values.color = "#539bfc";
        values.borderWidth = 2;
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
      background: "#0053A2",
      hover: {
        background: "#539bfc",
      },
    },
  },
  groups: {
    useDefaultGroups: true,
  },
};

const sampleData = {
  nodes: [
    { id: 1, label: "node 1", group: "group1" },
    { id: 2, label: "node 2", group: "group2" },
    { id: 3, label: "node 3", group: "group1" },
    { id: 4, label: "node 4", group: "group2" },
    { id: 5, label: "node 5" },
  ],
  edges: [
    {
      id: 1,
      from: 1,
      to: 2,
      width: 3,
      label: "edge 1",
      dashes: [15, 10, 5, 10],
      font: {
        color: "red",
        size: 14,
        face: "arial",
      },
    },
    { id: 2, from: 1, to: 4 },
    { id: 3, from: 2, to: 4 },
    { id: 4, from: 3, to: 5 },
    { id: 5, from: 5, to: 2 },
    { id: 6, from: 4, to: 1 },
  ],
};

const VisNetwork = (props) => {
  const network = useRef(null);
  const container = useRef(null);

  useEffect(() => {
    const newNodes = data.nodes.map((v, i) => {
      if (i % 2 == 0) {
        return { ...v, group: "group1", label: "group1" };
      } else {
        return { ...v, group: "group2", label: "group2" };
      }
    });

    const newData = {
      // nodes: newNodes,
      nodes: data.nodes,
      edges: data.edges,
    };

    console.log("뉴 데이터", newData);

    console.log("샘플데이터", sampleData);
    network.current = new Network(
      container.current,
      //   sampleData,
      newData,
      defaultOptions
    );

    let options = {
      joinCondition: function (nodeOptions) {
        // console.log("노드옵션", nodeOptions);
        return nodeOptions.cid === 1;
      },
      processProperties: function (clusterOptions, childNodes, childEdges) {
        // console.log("클러스터 옵션", clusterOptions);
        // console.log("childNodes 옵션", childNodes);
        // console.log("childEdges 옵션", childEdges);
        return clusterOptions;
      },
    };
    network.current.clustering.cluster(options);
  }, []);

  return (
    <>
      <div ref={container} />
    </>
  );
};

export default VisNetwork;
