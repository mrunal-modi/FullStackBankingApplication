import React from "react";
import "../styles/table.module.css";

export default function Table(props) {
  const { header, rows } = props;
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          {header.map((el, i) => (
            <th key={"th" + i}>{el}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={"tr" + i}>
            {row.map((value, i) => (
              <td key={"td" + i}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}