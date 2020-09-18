import defaultScheduleConfig from '../config/defaultScheduleConfig';

const configFromLocalStorage = JSON.parse(localStorage.getItem('config') as string) as {[key: string]: string};

export default {
  settings: configFromLocalStorage || { ...defaultScheduleConfig },

  get mode(): string {
    return this.settings.mode;
  },

  set mode(newMode: string) {
    this.settings.mode = newMode;
    this.saveConfig();
  },

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
