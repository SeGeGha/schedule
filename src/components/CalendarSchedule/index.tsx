/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { Calendar, Tag } from 'antd';
import { connect } from 'react-redux';
import { Moment } from 'moment';
import { formDate, parsingStr } from '../../utils';
import { ObjData } from '../../models';
import { defaultType } from '../../constants';
// import { Moment } from 'moment';

// function onPanelChange(value, mode) {
//   window.console.log(value.format('YYYY-MM-DD'), mode);
// }

type CalendarProps = {
  base: ObjData[],
  isMentor: boolean,
};

const CalendarSchedule: React.FC<CalendarProps> = (props: CalendarProps) => {
  const { base, isMentor } = props;
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
                {listEvents.map((item, index) => {
                  const { type } = item;
                  const typeObj = parsingStr(type, defaultType, defaultType);
                  if (typeObj) {
                    const { name, color } = typeObj;
                    return (
                      <a
                        href="#"
                        key={`${Date.now()}${String(index)}`}
                        onClick={() => {
                          if (isMentor) {
                            window.console.log('edit', item.id);
                          } else {
                            window.console.log('read', item.id);
                          }
                        }}
                      >
                        <Tag
                          title={item.name}
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
