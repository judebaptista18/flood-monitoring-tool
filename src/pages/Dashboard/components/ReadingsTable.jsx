import React,{useState} from "react";

const ReadingsTable = ({ readings }) => {

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const totalPages = Math.ceil(readings.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = [...readings].slice(startIdx, startIdx + itemsPerPage);


  return (
    <div className="table-container">
    <table className="styled-table">
      <thead>
        <tr>
          <th>Time</th>
          <th>Water Level (m)</th>
        </tr>
      </thead>
      <tbody>
        {currentItems.map((reading) => (
          <tr key={reading['@id'] }>
            <td>{new Date(reading.dateTime).formatDateTime() }</td>
            <td>{reading.value}</td>
          </tr>
        ))}
      </tbody>
    </table>

      <div className="pagination">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ◀ Prev
        </button>
        <span> Page {currentPage} of {totalPages} </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next ▶
        </button>
      </div>
    </div>
  );
};

export default React.memo(ReadingsTable);