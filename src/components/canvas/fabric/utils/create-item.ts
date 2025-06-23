import { ADD_IMAGE, ADD_TEXT } from "@/global";
import { IImage, ILayer } from "@/interfaces/editor";
import { EventBusData } from "@/interfaces/rxjs";
import { loadFonts } from "@/utils/fonts";
import { FabricImage, ITextProps, Textbox } from "fabric";
import { nanoid } from "nanoid";


export const createItem = async (event: EventBusData) => {
  if (event.key === ADD_TEXT) {
    const layer = event.val.payload as ILayer;
    await loadFonts([
      {
        name: layer.details.fontFamily,
        url: layer.details.fontUrl,
      },
    ]);
    const { text, ...options } = layer.details;

    const textbox = new Textbox(text, options as ITextProps);
    textbox.set({id:nanoid()})
    return textbox;
  }

  if (event.key === ADD_IMAGE) {
    const layer = event.val.payload as IImage;
    const image = await FabricImage.fromURL(layer.details.src);
    image.set({
      scaleX: 0.1,
      scaleY: 0.1,
      id:nanoid()
    });
    return image;
  }
};
