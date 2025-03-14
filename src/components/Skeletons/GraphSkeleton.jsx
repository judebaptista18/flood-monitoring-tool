const GraphSkeleton = () => {
    return (
      <div className="graph-skeleton">
        <div className="skeleton-chart">
          <div className="skeleton-bar" style={{ height: "40%" }}></div>
          <div className="skeleton-bar" style={{ height: "60%" }}></div>
          <div className="skeleton-bar" style={{ height: "80%" }}></div>
          <div className="skeleton-bar" style={{ height: "50%" }}></div>
          <div className="skeleton-bar" style={{ height: "70%" }}></div>
          <div className="skeleton-bar" style={{ height: "40%" }}></div>
          <div className="skeleton-bar" style={{ height: "60%" }}></div>
        </div>
      </div>
    );
};
export default GraphSkeleton;
