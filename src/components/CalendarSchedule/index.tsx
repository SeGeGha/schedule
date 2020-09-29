/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { Calendar, Tag } from 'antd';
import { connect } from 'react-redux';
import { Moment } from 'moment';
import { formDate, parsingStr } from '../../utils';
import { defaultType } from '../../constants';
import store from '../../store';
import { taskPage } from '../../store/modalReducer';
import { ObjData } from '../../models';
// import { Moment } from 'moment';

// function onPanelChange(value, mode) {
//   window.console.log(value.format('YYYY-MM-DD'), mode);
// }

type CalendarProps = {
  base: ObjData[],
  // isMentor: boolean,
};

const CalendarSchedule: React.FC<CalendarProps> = (props: CalendarProps) => {
  const { base } = props;
  const x = 0;
  return (
    <div>
      Calendar
      {x}
      {/* <Calendar onPanelChange={onPanelChange} /> */}
      <Calendar
        dateCellRender={(value: Moment) => {
          const val = value;
          const listEvents: ObjData[] = base.filter((item: ObjData): boolean => {
            const valStr: string = val.format('YYYY-MM-DD');
            const { dateTime, timeZone } = item;
            const date: string = formDate(dateTime, timeZone).slice(0, 10);
            const isToday: boolean = (valStr === date);
            return isToday;
          });
          // window.console.log(val);
          if (listEvents.length) {
            return (
              <>
                {listEvents.map((record, index) => {
                  const { type } = record;
                  const typeObj = parsingStr(type, defaultType, defaultType);
                  if (typeObj) {
                    const { name, color } = typeObj;
                    return (
                      <a
                        href="#"
                        key={`${Date.now()}${String(index)}`}
                        onClick={() => {
                          store.dispatch(taskPage(record));
                        }}
                      >
                        <Tag
                          title={record.name}
                          color={color}
                          style={{ fontSize: 10, padding: 2, marginBottom: 5 }}
                        >
                          {name}
                        </Tag>
                      </a>
                    );
                  }
                  return null;
                })}
              </>
            );
          }
          return null;
        }}
      />
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  base: state.data.dataBase,
});

export default connect(mapStateToProps)(CalendarSchedule);
