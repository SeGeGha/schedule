export interface ScheduleState {
  // mode: string,
  isMentor: boolean,
  view: string,
  toggleModes: (newMode: boolean) => void,
  // toggleMode: (newMode: string) => void,
  changeView: (newView: string) => void,
}

export interface ConfigMode {
  // mode: string,
  isMentor: boolean,
  view: string,
}
