import { TABLE_VIEW } from '../constants/settings';
// import defaultScheduleConfig from './defaultScheduleConfig';
import { ConfigMode } from '../models';

const configFromLocalStorage = JSON.parse(localStorage.getItem('config') as string) as ConfigMode;
const defaultScheduleConfig = {
  view: TABLE_VIEW,
  // mode: STUDENT_MODE,
  isMentor: false,
};

export default {
  settings: configFromLocalStorage || { ...defaultScheduleConfig },

  get isMentor(): boolean {
    return this.settings.isMentor;
  },

  set isMentor(newMode: boolean) {
    this.settings.isMentor = newMode;
    this.saveConfig();
  },

  // get mode(): string {
  //   return this.settings.mode;
  // },

  // set mode(newMode: string) {
  //   this.settings.mode = newMode;
  //   this.saveConfig();
  // },

  get view(): string {
    return this.settings.view;
  },

  set view(newView: string) {
    this.settings.view = newView;
    this.saveConfig();
  },

  saveConfig(): void {
    localStorage.setItem('config', JSON.stringify(this.settings));
  },
};
