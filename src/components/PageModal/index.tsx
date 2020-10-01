/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
// import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import {
  Button,
  Checkbox,
  Input,
  Modal,
} from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import InputField from '../InputField';
import store from '../../store';
import { taskPage } from '../../store/modalReducer';
import DateField from '../DateField';
import TypeField from '../TypeField';
import { ObjData } from '../../models';
import { parsingStr } from '../../utils';
import { keyMapboxgl } from '../../constants';
import './page.scss';

const { TextArea } = Input;

type PageModalProps = {
  isVisible: boolean,
  accessFn: any,
  defaultData: ObjData|undefined,
  isEdit: boolean,
};

const PageModal1: React.FC<PageModalProps> = (props: PageModalProps) => {
  const {
    isVisible,
    accessFn,
    defaultData,
    isEdit,
  } = props;
  const defaultComment = { name: '', message: '' };
  const [state, changes] = useState(defaultData);
  const [isChanged, changeStatus] = useState(false);

  const [parseUrl, changeUrl] = useState(parsingStr(defaultData && defaultData.descriptionUrl, [] as string[]));
  const [newUrl, changeNewUrl] = useState('');
  const [parseComment, changeComment] = useState(parsingStr(defaultData && defaultData.comment, [] as ObjData[]));
  const [newComment, changeNewComment] = useState(defaultComment);
  const [parsePlace, changePlace] = useState(parsingStr(defaultData && defaultData.place, {} as ObjData));
  const [isMap, showMap] = useState(false);

  type CoordType = [number, number];
  const defaultCoord = [27.6, 53.9] as CoordType;

  const mapDiv = useRef<HTMLDivElement>(null);

  type MapType = { map?: mapboxgl.Map, marker?: mapboxgl.Marker };
  const [mapData, setMap] = useState({} as MapType);
  mapboxgl.accessToken = keyMapboxgl;

  useEffect(() => {
    const initMap = (coordObj: CoordType) => {
      if (!mapDiv.current) {
        return {};
      }

      const map = new mapboxgl.Map({
        container: mapDiv.current || '',
        style: 'mapbox://styles/mapbox/outdoors-v11',
        center: coordObj,
        zoom: 8,
        doubleClickZoom: false,
      });
      map.on('dblclick', (e) => {
        const short = (num: number): number => Math.floor(num * 1000) / 1000;
        const { lng, lat } = e.lngLat;
        const value = JSON.stringify([short(lng), short(lat)]);
        changes({ ...state, place: JSON.stringify({ ...parsePlace, coord: value }) });
      });

      const marker = new mapboxgl.Marker()
        .setLngLat(coordObj)
        .addTo(map);
      return { map, marker };
    };

    const newCoord = parsingStr((parsePlace && parsePlace.coord) || '', defaultCoord);
    let coordArr: CoordType;
    if (
      newCoord instanceof Array
      && newCoord.length === 2
      && typeof newCoord[0] === 'number'
      && typeof newCoord[1] === 'number'
    ) {
      coordArr = newCoord as CoordType;
    } else {
      coordArr = defaultCoord;
    }

    window.console.log('init', coordArr);
    if (mapData.marker && mapData.map) {
      mapData.map.setCenter(coordArr);
      mapData.marker.setLngLat(coordArr);
    } else {
      setMap(initMap(coordArr));
    }
  }, [parsePlace && parsePlace.coord, state && state.place]);

  useEffect(() => {
    changes(defaultData);
    changeStatus(false);
  }, [defaultData]);

  useEffect(() => {
    window.console.log('state', state);
    changeUrl(parsingStr(state && state.descriptionUrl, [] as string[]));
    changeComment(parsingStr(state && state.comment, [] as ObjData[]));
    changePlace(parsingStr(state && state.place, {} as ObjData));

    if (defaultData && state && Object.keys(defaultData).some((key) => defaultData[key] !== state[key])) {
      changeStatus(true);
    }
    // changeType(parsingStr(defaultData && defaultData.type, defaultType) as ObjData);
  }, [state]);
  return (
    <div>
      <Modal
        visible={isVisible}
        bodyStyle={{ minHeight: '50vh' }}
        width={1000}
        okText={isChanged ? 'Save' : 'Ok'}
        onOk={() => {
          if (isEdit) {
            accessFn(state);
          } else if (defaultData && state && defaultData.comment !== state.comment) {
            accessFn(state);
            window.console.log('data page ', defaultData);
            window.console.log('state page ', state);
            window.console.log('ok');
          }
          setMap({});
          store.dispatch(taskPage(undefined));
        }}
        onCancel={() => {
          setMap({});
          store.dispatch(taskPage(undefined));
        }}
      >
        {state && (
          <>
            {JSON.stringify(defaultData)}
            <hr />
            {isEdit ? 'Edit' : 'Read'}
            <hr />
            {JSON.stringify(parseComment)}
            <h3>
              Date &amp; Time:
            </h3>
            <DateField
              canEdit={isEdit}
              record={state}
              accessFn={(newRecord: ObjData) => {
                changes(newRecord);
              }}
            />
            <h3>
              Type:
            </h3>
            <TypeField
              canEdit={isEdit}
              record={state}
              accessFn={(newRecord: ObjData) => {
                changes(newRecord);
              }}
            />
            <h3>
              Name:
            </h3>
            <InputField
              canEdit={isEdit}
              defaultValue={state.name}
              accessFn={(value: any) => {
                changes({ ...state, name: value });
              }}
            />
            <h3>
              Description:
            </h3>
            <InputField
              canEdit={isEdit}
              defaultValue={state.description}
              accessFn={(value: any) => {
                changes({ ...state, description: value });
              }}
            />
            <h3>
              Url
            </h3>
            {parseUrl && !!parseUrl.length && parseUrl.map((itemUrl, index, allList) => (
              <div key={`${itemUrl}${String(index)}`}>
                {isEdit
                  ? (
                    <div className="flex" style={{ marginBottom: 5 }}>
                      <InputField
                        defaultValue={itemUrl}
                        canEdit={isEdit}
                        accessFn={(newValue) => {
                          const newAllList = [...allList];
                          newAllList[index] = newValue;
                          changes({ ...state, descriptionUrl: JSON.stringify(newAllList) });
                        }}
                      />
                      <Button
                        size="small"
                        style={{ marginLeft: 10 }}
                        className="no-expand"
                        icon={<DeleteOutlined />}
                        onClick={() => {
                          if (parseUrl) {
                            const newAllList = [...allList];
                            newAllList.splice(index, 1);
                            window.console.log(newAllList);
                            changes({ ...state, descriptionUrl: JSON.stringify(newAllList) });
                          }
                        }}
                      />
                    </div>
                  )
                  : (
                    <a
                      href={itemUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="expand"
                    >
                      {itemUrl}
                    </a>
                  )}
              </div>
            ))}
            {isEdit && (
              <div className="flex">
                <Input
                  className="expand"
                  size="small"
                  value={newUrl}
                  onChange={(e) => changeNewUrl(e.target.value)}
                />
                <Button
                  className="no-expand"
                  size="small"
                  onClick={() => {
                    if (parseUrl) {
                      const newAllList = [...parseUrl, newUrl];
                      window.console.log(newAllList);
                      changeNewUrl('');
                      changes({ ...state, descriptionUrl: JSON.stringify(newAllList) });
                    }
                  }}
                >
                  Add
                </Button>
              </div>
            )}
            <h3>
              Place
            </h3>
            <div>
              <InputField
                canEdit={isEdit}
                defaultValue={(parsePlace && parsePlace.name) || ''}
                accessFn={(value: any) => {
                  changes({ ...state, place: JSON.stringify({ ...parsePlace, name: value }) });
                }}
              />
              <Checkbox
                // checked={!!parsePlace && !!parsePlace.coord}
                disabled={!(parsePlace && parsePlace.name)}
                onChange={(e) => {
                  window.console.log('check map', e.target.checked);
                  showMap(e.target.checked);
                }}
              >
                map
              </Checkbox>
              {/* {isMap && ( */}
              {isMap && 'map'}
              <div>
                Location:
                {parsePlace && parsePlace.coord}
                <InputField
                  canEdit={isEdit}
                  defaultValue={(parsePlace && parsePlace.coord) || '27.9,53.6'}
                  accessFn={(value: any) => {
                    changes({ ...state, place: JSON.stringify({ ...parsePlace, coord: value }) });
                  }}
                />
                <div
                  ref={mapDiv}
                  className="map"
                  style={{ height: 300, border: '1px solid #999' }}
                />
              </div>
              {/* )} */}
            </div>
            <h3>
              Organizer
            </h3>
            <h3>
              Comment
            </h3>
            {parseComment && !!parseComment.length && parseComment.map((itemComment, index, allList) => (
              <div key={`${String(index)}`}>
                <div className="flex">
                  <div className="expand comment">
                    <h4>
                      {itemComment.name ? itemComment.name : 'Anonymous'}
                    </h4>
                    <div>
                      {itemComment.message}
                    </div>
                  </div>
                  {isEdit && (
                    <Button
                      size="small"
                      style={{ marginLeft: 10 }}
                      className="no-expand"
                      icon={<DeleteOutlined />}
                      onClick={() => {
                        if (parseUrl) {
                          const newAllList = [...allList];
                          newAllList.splice(index, 1);
                          window.console.log(newAllList);
                          changes({ ...state, comment: JSON.stringify(newAllList) });
                        }
                      }}
                    />
                  )}
                </div>
              </div>
            ))}
            <div>
              <div>
                Name:
                <Input
                  value={newComment.name}
                  onChange={(e) => changeNewComment({ ...newComment, name: e.target.value })}
                />
              </div>
              <div>
                <div>
                  Comment:
                </div>
                <TextArea
                  rows={2}
                  value={newComment.message}
                  onChange={(e) => changeNewComment({ ...newComment, message: e.target.value })}
                />
              </div>
              <Button
                size="small"
                icon={<PlusOutlined />}
                onClick={() => {
                  if (parseComment && newComment.message) {
                    const newAllList = [...parseComment, newComment];
                    changeNewComment({ ...newComment, message: '' });
                    window.console.log(newAllList);
                    changes({ ...state, comment: JSON.stringify(newAllList) });
                  }
                }}
              >
                Add comment
              </Button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default PageModal1;
