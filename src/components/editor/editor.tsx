import Navbar from "./navbar";
import MenuList from "./menu-list";
import { MenuItem } from "./menu-item";
import ControlList from "./control-list";
import { ControlItem } from "./control-item";

import useHotkeys from "./use-hotkeys";
import { useEffect } from "react";
import { getCompactFontData } from "@/utils/fonts";
import { FONTS } from "@/data/fonts";
import useDataState from "@/store/use-data-state";
import Canvas from "../canvas/canvas";
import Footer from "./footer";

const ImageEditor = () => {
  const { setCompactFonts, setFonts } = useDataState();

  useHotkeys();

  useEffect(() => {
    setCompactFonts(getCompactFontData(FONTS));
    setFonts(FONTS);
  }, []);

  return (
    <div className="flex h-screen w-screen flex-col">
      <Navbar />
      <div className="relative flex flex-1 overflow-hidden">
        <MenuList />
        <MenuItem />
        <ControlList />
        <ControlItem />
        <Canvas />
      </div>
      <Footer />
    </div>
  );
};

export default ImageEditor;
