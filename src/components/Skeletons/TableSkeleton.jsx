import React from "react";

const TableSkeleton = ({ rows = 8, columns = 2 }) => {
  return (
    <div className="skeleton-table-container">
      <table className="skeleton-table">
        <thead>
          <tr>
            {Array.from({ length: columns }).map((_, index) => (
              <th key={index}>
                <div className="skeleton skeleton-header"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <td key={colIndex}>
                  <div className="skeleton skeleton-cell"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSkeleton;
