import React, { Fragment, useEffect, useState } from "react";
import { useRef } from "react";
import { FetchSeriesObservationData } from "../../Utilities/fetch-fred";
import {
  SetChartData,
  SetChartOptions,
} from "../../Utilities/chart-js-wrapper";
import { GetJsonFromFile, GetTestData } from "../../Utilities/fs_wrapper";
import LineChartLarge from "../../components/chart/LineChartLarge";
import classes from "../../styles/Economy/FREDSeries.module.css";

export default function SeriesPage(props) {
  //TODO- update function to change chart legend based on series UOM update axis labels

  const [currentChartOptions, setCurrentChartOptions] = useState(
    SetChartOptions(props.serries)
  );

  const [currentChartData, setCurrentChartData] = useState(
    SetChartData(
      props.data.observations.map((item) => item.value),
      props.data.observations.map((item) => item.date),
      "$"
    )
  );

  const [currentData, setCurrentData] = useState(props.data);

  const [currentSeries, setCurrentSeries] = useState({
    series: "GDP",
    type: "$",
    default: "pct-a",
    release: "",
    friendly: "Gross Domestic Product (Nominal)",
  });

  const series_id = useRef("GDP");
  const observation_start = useRef();
  const observation_end = useRef();
  const valueType = useRef();

  const todaysDate = new Date().toISOString().split("T")[0];
  const d = new Date();
  d.setFullYear(d.getFullYear() - 5);
  const startDate = d.toISOString().substring(0, 10);

  useEffect(() => {
    setCurrentChartData(
      SetChartData(
        currentData.observations.map((item) => item.value),
        currentData.observations.map((item) => item.date),
        currentSeries.type
      )
    );

    // const selectedCurrentIndex = series_id.current.selectedIndex;
    // const selectedOption = series_id.current.options[selectedCurrentIndex].text;
    // const title = selectedOption+' - '+series_id.current.value
    const title = currentSeries.friendly + " " + currentSeries.series;
    setCurrentChartOptions(SetChartOptions(title));
  }, [currentData]);

  const submitHandler = (event) => {
    event.preventDefault();
    const seriesId = event.target.series_id.value;
    const observation_start = event.target.observation_start.value;
    const observation_end = event.target.observation_end.value;
    const valueType = event.target.valueType.value;

    fetch("/api/fetch", {
      method: "POST",
      body: JSON.stringify({
        series: seriesId,
        observation_end: observation_end,
        observation_start: observation_start,
        valueType: valueType,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const selectedCurrentIndex = series_id.current.selectedIndex;
        const selectedOption =
          series_id.current.options[selectedCurrentIndex].text;
        const seriesOptions = props.fredItems[selectedOption];
        if (valueType != "value") {
          seriesOptions.type = "%";
        }
        setCurrentSeries(seriesOptions);
        setCurrentData(data);
      });
  };
  return (
    <Fragment >
      <div className={classes['page']}>
        <div className={classes["chart-container"]}>
        <LineChartLarge
            chartData={currentChartData}
            chartOptions={currentChartOptions}
        />
        </div>
   

        <form onSubmit={submitHandler}>
          <div className={classes['form-container']}>
            <div className={classes["form-control"]}>
              <label htmlFor="series_id" className={classes['form-label']}>Economic Series</label>
              <select
                id="series_id"
                ref={series_id}
                defaultValue="GDP"
                className={classes['form-input']}
              >
                {Object.keys(props.fredItems).map((key, index) => {
                  if (key === "GDP") {
                    return (
                      <option key={index} value={props.fredItems[key].series}>
                        {key}
                      </option>
                    );
                  } else {
                    return (
                      <option key={index} value={props.fredItems[key].series}>
                        {key}
                      </option>
                    );
                  }
                })}
              </select>
            </div>
            <div className={classes['form-control']}>
              <label htmlFor="observation_start" className={classes['form-label']}>
                Start Date
              </label>
              {/* <input id ='observation_start' ref={observation_start} placeholder='yyyy-mm-dd'  defaultValue= {startDate} className={classes.formInput}></input> */}
              <input
                id="observation_start"
                ref={observation_start}
                defaultValue={startDate}
                type="date"
                className={classes['form-input']}
              ></input>
            </div>
            <div className={classes['form-control']}>
              <label
                htmlFor="observation_end"
                placeholder="yyyy-mm-dd"
                className={classes['form-label']}
              > End Date</label>
              {/* <input id ='observation_end' ref={observation_end} placeholder='yyyy-mm-dd'defaultValue={todaysDate} className={classes.formInput}></input> */}
              <input
                id="observation_end"
                ref={observation_end}
                defaultValue={todaysDate}
                type="date"
                className={classes['form-input']}
              ></input>
            </div>
            <div className={classes['form-control']}>
              <label htmlFor="valueType" className={classes['form-label']}>
                Type
              </label>
              <select
                id="valueType"
                ref={valueType}
                defaultValue="value"
                className={classes['form-input']}
              >
                <option value="value"> Current Period</option>
                <option value="m-pct">% Change (Period)</option>
                <option value="y-pct">% Change (Yearly)</option>
                <option value="a-pct">Annualized % Change</option>
              </select>
            </div>
            <div className={classes['form-control']}>
              <button className={classes['form-button']}> Get Data </button>
            </div>
          </div>
        </form>
      </div>

    </Fragment>
  );
}

export async function getStaticProps(context) {
  const serries = "GDP";
  const now = new Date().toISOString().substring(0, 10);
  const d = new Date();
  d.setFullYear(d.getFullYear() - 5);
  const startDate = d.toISOString().substring(0, 10);
  const data = await FetchSeriesObservationData(serries, startDate, now);
  const fredItems = GetJsonFromFile("content/data", "FREDSeries.json");

  return {
    props: { data: data, serries: serries, fredItems: fredItems },
  };
}
