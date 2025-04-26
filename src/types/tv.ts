
export interface Channel {
  number: number;
  name: string;
  logo?: string;
  contentType: string;
  description: string;
}

export interface TVState {
  powerState: boolean;
  currentChannel: number;
  volume: number;
  isMuted: boolean;
  showVolume: boolean;
  showMenu: boolean;
  menuSelection: string;
  menuIndex: number;
  showInfo: boolean;
  showSleepTimer: boolean;
  sleepTime: number;
  aspectRatio: string;
  tvMessage: string | null;
  isSearching: boolean;
  channelSearchProgress: number;
}
