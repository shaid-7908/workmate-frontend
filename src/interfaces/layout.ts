export type IMenuItem =
  | 'uploads'
  | 'templates'
  | 'videos'
  | 'images'
  | 'shapes'
  | 'audios'
  | 'transitions'
  | 'texts';
export interface ILayoutState {
  activeMenuItem: IMenuItem | null;
  showMenuItem: boolean;
  showControlItem: boolean;
  showToolboxItem: boolean;
  activeToolboxItem: string | null;
  artBoardSize: {
    width: number;
    height: number;
  };
  setArtboardSize: (size: { width: number; height: number }) => void;
  setActiveMenuItem: (showMenu: IMenuItem | null) => void;
  setShowMenuItem: (showMenuItem: boolean) => void;
  setShowControlItem: (showControlItem: boolean) => void;
  setShowToolboxItem: (showToolboxItem: boolean) => void;
  setActiveToolboxItem: (activeToolboxItem: string | null) => void;
}
