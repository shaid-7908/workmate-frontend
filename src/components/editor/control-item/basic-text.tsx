import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DEFAULT_FONT } from "@/data/fonts";
import { ICompactFont, IFont, ILayer } from "@/interfaces/editor";
import useDataState from "@/store/use-data-state";
import { loadFonts } from "@/utils/fonts";
import { EDIT_OBJECT, dispatcher } from "@/global";
import { ChevronDown, Ellipsis, Strikethrough, Underline } from "lucide-react";
import { useEffect, useState } from "react";
import Opacity from "./common/opacity";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { AlignCenter, AlignLeft, AlignRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import Transform from "./common/transform";
import ColorPicker from "@/components/color-picker";

interface ITextControlProps {
  color: string;
  colorDisplay: string;
  strokeColor: string;
  strokeColorDisplay: string;
  shadowColor: string;
  shadowColorDisplay: string;
  shadowX: number;
  shadowY: number;
  shadowBlur: number;
  fontSize: number;
  fontSizeDisplay: string;
  fontFamily: string;
  fontFamilyDisplay: string;
  opacity: number;
  opacityDisplay: string;
  textAlign: string;
  textDecoration: string;
}

const getStyleNameFromFontName = (fontName: string) => {
  const fontFamilyEnd = fontName.lastIndexOf("-");
  const styleName = fontName
    .substring(fontFamilyEnd + 1)
    .replace("Italic", " Italic");
  return styleName;
};

const BasicText = ({ item }: { item: ILayer }) => {
  const [properties, setProperties] = useState<ITextControlProps>({
    color: "#000000",
    colorDisplay: "#000000",
    strokeColor: "#000000",
    strokeColorDisplay: "#000000",
    shadowColor: "#000000",
    shadowColorDisplay: "#000000",
    shadowX: 0,
    shadowY: 0,
    shadowBlur: 0,
    fontSize: 12,
    fontSizeDisplay: "12px",
    fontFamily: "Open Sans",
    fontFamilyDisplay: "Open Sans",
    opacity: 1,
    opacityDisplay: "100%",
    textAlign: "none",
    textDecoration: "none",
  });

  const [selectedFont, setSelectedFont] = useState<ICompactFont>({
    family: "Open Sans",
    styles: [],
    default: DEFAULT_FONT,
    name: "Regular",
  });
  const { compactFonts, fonts } = useDataState();

  // Add alignment state
  const [alignment, setAlignment] = useState("left");

  useEffect(() => {
    const fontFamily = item.details.fontFamily || DEFAULT_FONT.postScriptName;
    const currentFont = fonts.find(
      (font) => font.postScriptName === fontFamily
    );
    const selectedFont = compactFonts.find(
      (font) => font.family === currentFont?.family
    );

    setSelectedFont({
      ...selectedFont,
      name: getStyleNameFromFontName(currentFont.postScriptName),
    });

    if (item.details.opacityDisplay == undefined) {
      item.details.opacityDisplay = "100";
    }

    if (item.details.fontSizeDisplay == undefined) {
      item.details.fontSizeDisplay = "62";
    }
    setProperties({
      color: item.details.color || "#ffffff",
      colorDisplay: item.details.color || "#ffffff",
      strokeColor: item.details.strokeColor || "#000000",
      strokeColorDisplay: item.details.strokeColor || "#000000",
      shadowColor: item.details.shadowColor || "#000000",
      shadowColorDisplay: item.details.shadowColor || "#000000",
      shadowX: item.details.shadowX || 0,
      shadowY: item.details.shadowY || 0,
      shadowBlur: item.details.shadowBlur || 0,
      fontSize: item.details.fontSize || 62,
      fontSizeDisplay: (item.details.fontSize || 62) + "px",
      fontFamily: selectedFont?.family || "Open Sans",
      fontFamilyDisplay: selectedFont?.family || "Open Sans",
      opacity: item.details.opacity || 1,
      opacityDisplay: (item.details.opacityDisplay || "100") + "%",
      textAlign: item.details.textAlign || "left",
      textDecoration: item.details.textDecoration || "none",
    });
    setAlignment(item.details.textAlign || "left");
  }, [item.id]);

  // Handler for color change
  const handleChangeColor = (color: string) => {
    setProperties({ ...properties, color, colorDisplay: color });
    dispatcher.dispatch(EDIT_OBJECT, {
      payload: {
        details: {
          color: color,
        },
      },
    });
  };

  // Handler for stroke color change
  const handleChangeStrokeColor = (strokeColor: string) => {
    setProperties({ ...properties, strokeColor, strokeColorDisplay: strokeColor });
    dispatcher.dispatch(EDIT_OBJECT, {
      payload: {
        details: {
          strokeColor: strokeColor,
        },
      },
    });
  };

  // Handler for shadow color change
  const handleChangeShadowColor = (shadowColor: string) => {
    console.log('Shadow color changed to:', shadowColor);
    setProperties({ ...properties, shadowColor, shadowColorDisplay: shadowColor });
    dispatcher.dispatch(EDIT_OBJECT, {
      payload: {
        details: {
          shadowColor: shadowColor,
          shadowX: properties.shadowX,
          shadowY: properties.shadowY,
          shadowBlur: properties.shadowBlur,
        },
      },
    });
  };

  // Handler for shadow X offset change
  const handleChangeShadowX = (shadowX: number) => {
    setProperties({ ...properties, shadowX });
    dispatcher.dispatch(EDIT_OBJECT, {
      payload: {
        details: {
          shadowColor: properties.shadowColor,
          shadowX: shadowX,
          shadowY: properties.shadowY,
          shadowBlur: properties.shadowBlur,
        },
      },
    });
  };

  // Handler for shadow Y offset change
  const handleChangeShadowY = (shadowY: number) => {
    setProperties({ ...properties, shadowY });
    dispatcher.dispatch(EDIT_OBJECT, {
      payload: {
        details: {
          shadowColor: properties.shadowColor,
          shadowX: properties.shadowX,
          shadowY: shadowY,
          shadowBlur: properties.shadowBlur,
        },
      },
    });
  };

  // Handler for shadow blur change
  const handleChangeShadowBlur = (shadowBlur: number) => {
    setProperties({ ...properties, shadowBlur });
    dispatcher.dispatch(EDIT_OBJECT, {
      payload: {
        details: {
          shadowColor: properties.shadowColor,
          shadowX: properties.shadowX,
          shadowY: properties.shadowY,
          shadowBlur: shadowBlur,
        },
      },
    });
  };

  const handleChangeFont = async (font: ICompactFont) => {
    const fontName = font.default.postScriptName;
    const fontUrl = font.default.url;

    await loadFonts([
      {
        name: fontName,
        url: fontUrl,
      },
    ]);
    setSelectedFont({ ...font, name: getStyleNameFromFontName(fontName) });
    setProperties({
      ...properties,
      fontFamily: font.default.family,
      fontFamilyDisplay: font.default.family,
    });

    dispatcher.dispatch(EDIT_OBJECT, {
      payload: {
        details: {
          fontFamily: fontName,
          fontUrl: fontUrl,
        },
      },
    });
  };

  const handleChangeFontStyle = async (font: IFont) => {
    const fontName = font.postScriptName;
    const fontUrl = font.url;
    const styleName = getStyleNameFromFontName(fontName);
    await loadFonts([
      {
        name: fontName,
        url: fontUrl,
      },
    ]);
    setSelectedFont({ ...selectedFont, name: styleName });
    dispatcher.dispatch(EDIT_OBJECT, {
      payload: {
        details: {
          fontFamily: fontName,
          fontUrl: fontUrl,
        },
      },
    });
  };

  // Handler for alignment change
  const handleAlignmentChange = (value: string) => {
    setAlignment(value);
    setProperties({ ...properties, textAlign: value });
    dispatcher.dispatch(EDIT_OBJECT, {
      payload: {
        details: {
          textAlign: value,
        },
      },
    });
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="text-md text-text-primary font-medium h-12  flex items-center px-4 flex-none">
        Text
      </div>
      <ScrollArea className="h-full">
        <div className="px-4 flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <FontFamily
                handleChangeFont={handleChangeFont}
                fontFamilyDisplay={properties.fontFamilyDisplay}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <FontStyle
                selectedFont={selectedFont}
                handleChangeFontStyle={handleChangeFontStyle}
              />
              <div className="relative">
                <Input
                  className="h-9"
                  type="number"
                  min={1}
                  value={properties.fontSize}
                  onChange={e => {
                    const newSize = Number(e.target.value);
                    setProperties({ ...properties, fontSize: newSize, fontSizeDisplay: newSize + 'px' });
                    dispatcher.dispatch(EDIT_OBJECT, {
                      payload: {
                        details: {
                          fontSize: newSize,
                        },
                      },
                    });
                  }}
                />
                <div className="absolute top-1/2 transform -translate-y-1/2 right-2.5 text-sm text-zinc-200">
                  px
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Alignment value={alignment} onChange={handleAlignmentChange} />
            <TextDecoration />
          </div>
        </div>
        <div className="p-4 flex flex-col gap-2">
          <div className="text-sm">Style</div>
          <Fill color={properties.color} onColorChange={handleChangeColor} />
          <Stroke strokeColor={properties.strokeColor} onStrokeColorChange={handleChangeStrokeColor} />
          {/* <Shadow 
            shadowColor={properties.shadowColor} 
            onShadowColorChange={handleChangeShadowColor}
            shadowX={properties.shadowX}
            onShadowXChange={handleChangeShadowX}
            shadowY={properties.shadowY}
            onShadowYChange={handleChangeShadowY}
            shadowBlur={properties.shadowBlur}
            onShadowBlurChange={handleChangeShadowBlur}
          /> */}
          <Background />
        </div>

        <div className="p-4">
          <Opacity />
        </div>
        <div className="p-4">
          <Transform />
        </div>
      </ScrollArea>
    </div>
  );
};

const Fill = ({ color, onColorChange }: { color: string; onColorChange: (color: string) => void }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 24px 24px",
        gap: "4px",
      }}
    >
      <div className="text-sm text-zinc-500 flex items-center">Fill</div>
      <div className="">
        <Popover>
          <PopoverTrigger asChild>
            <div 
              className="w-6 h-6 rounded-sm border-2 border-zinc-800 cursor-pointer"
              style={{ backgroundColor: color }}
            />
          </PopoverTrigger>
          <PopoverContent className="z-[300] md:w-[300px] p-3 mr-4">
            <ColorPicker
              value={color}
              format="hex"
              gradient={false}
              solid={true}
              onChange={onColorChange}
              allowAddGradientStops={false}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div>
        <Button size="icon" variant="ghost" className="h-6 w-6">
          <Ellipsis size={14} />
        </Button>
      </div>
    </div>
  );
};

const Stroke = ({ strokeColor, onStrokeColorChange }: { strokeColor: string; onStrokeColorChange: (strokeColor: string) => void }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 24px 24px",
        gap: "4px",
      }}
    >
      <div className="text-sm text-zinc-500 flex items-center">Stroke</div>
      <div>
        <Popover>
          <PopoverTrigger asChild>
            <div 
              className="w-6 h-6 rounded-sm border-2 border-zinc-800 cursor-pointer"
              style={{ backgroundColor: strokeColor }}
            />
          </PopoverTrigger>
          <PopoverContent className="z-[300] md:w-[300px] p-3 mr-4">
            <ColorPicker
              value={strokeColor}
              format="hex"
              gradient={false}
              solid={true}
              onChange={onStrokeColorChange}
              allowAddGradientStops={false}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div>
        <Button size="icon" variant="ghost" className="h-6 w-6">
          <Ellipsis size={14} />
        </Button>
      </div>
    </div>
  );
};
const Shadow = ({ 
  shadowColor, 
  onShadowColorChange,
  shadowX,
  onShadowXChange,
  shadowY,
  onShadowYChange,
  shadowBlur,
  onShadowBlurChange
}: { 
  shadowColor: string; 
  onShadowColorChange: (shadowColor: string) => void;
  shadowX: number;
  onShadowXChange: (shadowX: number) => void;
  shadowY: number;
  onShadowYChange: (shadowY: number) => void;
  shadowBlur: number;
  onShadowBlurChange: (shadowBlur: number) => void;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 24px 24px",
          gap: "4px",
        }}
      >
        <div className="text-sm text-zinc-500 flex items-center">Shadow</div>
        <div>
          <Popover>
            <PopoverTrigger asChild>
              <div 
                className="w-6 h-6 rounded-sm border-2 border-zinc-800 cursor-pointer"
                style={{ backgroundColor: shadowColor }}
              />
            </PopoverTrigger>
            <PopoverContent className="z-[300] md:w-[300px] p-3 mr-4">
              <ColorPicker
                value={shadowColor}
                format="hex"
                gradient={false}
                solid={true}
                onChange={onShadowColorChange}
                allowAddGradientStops={false}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-6 w-6"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <Ellipsis size={14} />
          </Button>
        </div>
      </div>
      
      {isExpanded && (
        <div className="flex flex-col gap-2 pl-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400 w-8">X:</span>
            <Input
              type="number"
              value={shadowX || ''}
              onChange={(e) => {
                const value = e.target.value === '' ? 0 : Number(e.target.value);
                onShadowXChange(value);
              }}
              className="h-6 text-xs"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400 w-8">Y:</span>
            <Input
              type="number"
              value={shadowY || ''}
              onChange={(e) => {
                const value = e.target.value === '' ? 0 : Number(e.target.value);
                onShadowYChange(value);
              }}
              className="h-6 text-xs"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400 w-8">Blur:</span>
            <Input
              type="number"
              value={shadowBlur || ''}
              onChange={(e) => {
                const value = e.target.value === '' ? 0 : Number(e.target.value);
                onShadowBlurChange(value);
              }}
              className="h-6 text-xs"
            />
          </div>
        </div>
      )}
    </div>
  );
};
const Background = () => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 24px 24px",
        gap: "4px",
      }}
    >
      <div className="text-sm text-zinc-500  flex items-center">Background</div>
      <div>
        <div className="w-6 h-6 rounded-sm border-2 border-zinc-800 bg-green-700"></div>
      </div>
      <div>
        <Button size="icon" variant="ghost" className="h-6 w-6">
          <Ellipsis size={14} />
        </Button>
      </div>
    </div>
  );
};

const FontFamily = ({
  handleChangeFont,
  fontFamilyDisplay,
}: {
  handleChangeFont: (font: ICompactFont) => void;
  fontFamilyDisplay: string;
}) => {
  const { compactFonts } = useDataState();
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          className="flex items-center justify-between text-sm w-full"
          variant="outline"
        >
          <div className="w-full text-left ">
            <p className="truncate">{fontFamilyDisplay}</p>
          </div>
          <ChevronDown size={14} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-56 z-[300]">
        <ScrollArea className="h-[400px] w-full py-2">
          {compactFonts.map((font, index) => (
            <div
              onClick={() => {
                handleChangeFont(font);
                setOpen(false);
              }}
              className="hover:bg-zinc-800/50 cursor-pointer px-2 py-1"
              key={index}
            >
              <img
                style={{
                  filter: "invert(100%)",
                }}
                src={font.default.preview}
                alt={font.family}
              />
            </div>
          ))}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

const FontStyle = ({
  selectedFont,
  handleChangeFontStyle,
}: {
  selectedFont: ICompactFont;
  handleChangeFontStyle: (font: IFont) => void;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          className="w-full flex items-center justify-between text-sm"
          variant="outline"
        >
          <div className="w-full text-left overflow-hidden">
            <p className="truncate"> {selectedFont.name}</p>
          </div>
          <ChevronDown size={14} />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-0 w-28 z-[300]">
        {selectedFont.styles.map((style, index) => {
          const fontFamilyEnd = style.postScriptName.lastIndexOf("-");
          const styleName = style.postScriptName
            .substring(fontFamilyEnd + 1)
            .replace("Italic", " Italic");
          return (
            <div
              className="text-sm h-6 hover:bg-zinc-800 flex items-center px-2 py-3.5 cursor-pointer text-zinc-300 hover:text-zinc-100"
              key={index}
              onClick={() => {
                handleChangeFontStyle(style);
                setOpen(false);
              }}
            >
              {styleName}
            </div>
          );
        })}
      </PopoverContent>
    </Popover>
  );
};
const TextDecoration = () => {
  const [value, setValue] = useState(["left"]);
  const onChangeAligment = (value: string[]) => {
    setValue(value);
  };
  return (
    <ToggleGroup
      value={value}
      size="sm"
      className="grid grid-cols-3"
      type="multiple"
      onValueChange={onChangeAligment}
    >
      <ToggleGroupItem size="sm" value="left" aria-label="Toggle left">
        <Underline size={18} />
      </ToggleGroupItem>
      <ToggleGroupItem value="strikethrough" aria-label="Toggle italic">
        <Strikethrough size={18} />
      </ToggleGroupItem>
      <ToggleGroupItem value="overline" aria-label="Toggle strikethrough">
        <div>
          <svg
            width={18}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.59996 1.75977C5.43022 1.75977 5.26744 1.82719 5.14741 1.94722C5.02739 2.06724 4.95996 2.23003 4.95996 2.39977C4.95996 2.5695 5.02739 2.73229 5.14741 2.85231C5.26744 2.97234 5.43022 3.03977 5.59996 3.03977H18.4C18.5697 3.03977 18.7325 2.97234 18.8525 2.85231C18.9725 2.73229 19.04 2.5695 19.04 2.39977C19.04 2.23003 18.9725 2.06724 18.8525 1.94722C18.7325 1.82719 18.5697 1.75977 18.4 1.75977H5.59996ZM7.99996 6.79977C7.99996 6.58759 7.91568 6.38411 7.76565 6.23408C7.61562 6.08405 7.41213 5.99977 7.19996 5.99977C6.98779 5.99977 6.7843 6.08405 6.63428 6.23408C6.48425 6.38411 6.39996 6.58759 6.39996 6.79977V15.2798C6.39996 16.765 6.98996 18.1894 8.04016 19.2396C9.09037 20.2898 10.5147 20.8798 12 20.8798C13.4852 20.8798 14.9096 20.2898 15.9598 19.2396C17.01 18.1894 17.6 16.765 17.6 15.2798V6.79977C17.6 6.58759 17.5157 6.38411 17.3656 6.23408C17.2156 6.08405 17.0121 5.99977 16.8 5.99977C16.5878 5.99977 16.3843 6.08405 16.2343 6.23408C16.0842 6.38411 16 6.58759 16 6.79977V15.2798C16 16.3406 15.5785 17.358 14.8284 18.1082C14.0782 18.8583 13.0608 19.2798 12 19.2798C10.9391 19.2798 9.92168 18.8583 9.17153 18.1082C8.42139 17.358 7.99996 16.3406 7.99996 15.2798V6.79977Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

const Alignment = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
  return (
    <ToggleGroup
      value={value}
      size="sm"
      className="grid grid-cols-3"
      type="single"
      onValueChange={onChange}
    >
      <ToggleGroupItem size="sm" value="left" aria-label="Toggle left">
        <AlignLeft size={18} />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Toggle center">
        <AlignCenter size={18} />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Toggle right">
        <AlignRight size={18} />
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default BasicText;
