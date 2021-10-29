import React from "react";
import s from "../styles.module.scss";

const DateFilter = ({ filterAction }) => (
  <select onChange={(e) => filterAction(e)} className={s.dateFilter}>
    <option value="90">90 days</option>
    <option value="60">60 days</option>
    <option value="30">30 days</option>
    <option value="7">7 days</option>
  </select>
);

export default DateFilter;
