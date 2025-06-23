import { Canvas } from "fabric";
import * as fabric from "fabric";
import Artboard from "./artboard";

export default class FabricCanvas extends Canvas {
  public isFlipCanvas: boolean;
  private undoStack: string[] = [];
  private redoStack: string[] = [];
  private maxHistorySize = 50;
  private isUndoRedoAction = false;

  constructor(canvasEl: HTMLCanvasElement, options?: any) {
    super(canvasEl, options);
    this.initializeUndoRedo();
  }

  private initializeUndoRedo() {
    // Save initial state (without artboard)
    this.saveState();

    // Listen to object modifications
    this.on('object:modified', () => {
      if (!this.isUndoRedoAction) {
        this.saveState();
        this.clearRedoStack();
      }
    });

    this.on('object:added', () => {
      if (!this.isUndoRedoAction) {
        this.saveState();
        this.clearRedoStack();
      }
    });

    this.on('object:removed', () => {
      if (!this.isUndoRedoAction) {
        this.saveState();
        this.clearRedoStack();
      }
    });

    this.on('object:moving', () => {
      if (!this.isUndoRedoAction) {
        this.saveState();
        this.clearRedoStack();
      }
    });

    this.on('object:scaling', () => {
      if (!this.isUndoRedoAction) {
        this.saveState();
        this.clearRedoStack();
      }
    });

    this.on('object:rotating', () => {
      if (!this.isUndoRedoAction) {
        this.saveState();
        this.clearRedoStack();
      }
    });
  }

  private saveState(): string {
    // Get all objects except the artboard
    const objects = this.getObjects().filter(obj => 
      obj.type !== 'Artboard' && obj.constructor.name !== 'Artboard'
    );
    
    console.log('Saving state with objects:', objects.length, objects.map(obj => ({ 
      type: obj.type, 
      text: (obj as any).text 
    })));
    
    // Create a state object with only non-artboard objects
    const state = {
      objects: objects.map(obj => obj.toObject()),
      background: this.backgroundImage ? this.backgroundImage.toObject() : null,
      backgroundImage: this.backgroundImage ? this.backgroundImage.toObject() : null,
      clipPath: this.clipPath ? this.clipPath.toObject() : null,
      viewportTransform: this.viewportTransform,
      zoom: this.getZoom(),
      width: this.width,
      height: this.height
    };

    const json = JSON.stringify(state);
    this.undoStack.push(json);
    
    console.log('Saved state, undo stack size:', this.undoStack.length);
    
    // Limit history size
    if (this.undoStack.length > this.maxHistorySize) {
      this.undoStack.shift();
    }

    return json;
  }

  private clearRedoStack() {
    this.redoStack = [];
  }

  private customLoadFromJSON(json: any, callback?: () => void) {
    try {
      const state = JSON.parse(json);
      
      // Store current artboard and ensure it's preserved
      const artboard = this.getObjects().find(obj => obj.type === 'Artboard' || obj.constructor.name === 'Artboard');
      console.log('Current artboard:', artboard);
      
      // Clear all objects except artboard
      const objectsToRemove = this.getObjects().filter(obj => 
        obj.type !== 'Artboard' && obj.constructor.name !== 'Artboard'
      );
      console.log('Removing objects:', objectsToRemove.length);
      objectsToRemove.forEach(obj => this.remove(obj));
      
      // Verify artboard is still there
      const remainingArtboard = this.getObjects().find(obj => 
        obj.type === 'Artboard' || obj.constructor.name === 'Artboard'
      );
      console.log('Artboard after removal:', remainingArtboard);
      
      // Add back the objects from the saved state
      if (state.objects && Array.isArray(state.objects)) {
        console.log('Restoring objects:', state.objects.length);
        state.objects.forEach((objData: any) => {
          try {
            // Skip Artboard objects - they should not be in the state
            if (objData.type === 'Artboard') {
              console.log('Skipping Artboard object from state');
              return;
            }
            
            // Handle different object types
            if (objData.type === 'Textbox' || objData.type === 'textbox' || objData.type === 'text') {
              // Create textbox without setting the type property
              const { type, ...textboxData } = objData;
              const textbox = new (fabric as any).Textbox(textboxData.text || '', {
                ...textboxData,
                left: textboxData.left || 0,
                top: textboxData.top || 0
              });
              this.add(textbox);
              console.log('Added textbox:', textboxData.text);
            } else if (objData.type === 'image' || objData.type === 'Image') {
              // Create image object directly from data
              const { type, ...imageData } = objData;
              const img = new (fabric as any).Image();
              img.set(imageData);
              this.add(img);
              console.log('Added image');
            } else {
              // For other object types, try to create them using fabric's built-in methods
              const { type, ...objDataWithoutType } = objData;
              const objClass = (fabric as any).util.getKlass ? (fabric as any).util.getKlass(type) : null;
              if (objClass) {
                const obj = new objClass(objDataWithoutType);
                this.add(obj);
                console.log('Added object:', type);
              } else {
                console.warn('Unknown object type:', type);
              }
            }
          } catch (error) {
            console.warn('Could not restore object:', objData, error);
          }
        });
      }
      
      // Restore canvas properties
      if (state.viewportTransform) {
        this.setViewportTransform(state.viewportTransform);
      }
      if (state.zoom) {
        this.setZoom(state.zoom);
      }
      
      // Final check - ensure artboard is still visible
      const finalArtboard = this.getObjects().find(obj => 
        obj.type === 'Artboard' || obj.constructor.name === 'Artboard'
      );
      console.log('Final artboard check:', finalArtboard);
      
      this.renderAll();
      
      if (callback) {
        callback();
      }
    } catch (error) {
      console.error('Error loading state:', error);
      if (callback) {
        callback();
      }
    }
  }

  public undo(): boolean {
    if (this.undoStack.length <= 1) {
      console.log('Cannot undo - at initial state');
      return false; // Can't undo beyond initial state
    }

    console.log('Undo: current stack size:', this.undoStack.length);
    
    // Get current state before undoing (don't save it yet)
    const currentObjects = this.getObjects().filter(obj => 
      obj.type !== 'Artboard' && obj.constructor.name !== 'Artboard'
    );
    const currentState = {
      objects: currentObjects.map(obj => obj.toObject()),
      background: this.backgroundImage ? this.backgroundImage.toObject() : null,
      backgroundImage: this.backgroundImage ? this.backgroundImage.toObject() : null,
      clipPath: this.clipPath ? this.clipPath.toObject() : null,
      viewportTransform: this.viewportTransform,
      zoom: this.getZoom(),
      width: this.width,
      height: this.height
    };
    
    // Save current state for redo
    this.redoStack.push(JSON.stringify(currentState));
    console.log('Saved current state for redo, redo stack size:', this.redoStack.length);

    // Remove current state and get previous state
    this.undoStack.pop();
    const previousState = this.undoStack[this.undoStack.length - 1];
    
    console.log('Loading previous state, remaining undo stack size:', this.undoStack.length);

    this.isUndoRedoAction = true;
    this.customLoadFromJSON(previousState, () => {
      this.renderAll();
      this.isUndoRedoAction = false;
      console.log('Undo completed');
    });

    return true;
  }

  public redo(): boolean {
    if (this.redoStack.length === 0) {
      console.log('Cannot redo - no redo states available');
      return false;
    }

    console.log('Redo: redo stack size:', this.redoStack.length);
    
    // Get current state before redoing (don't save it yet)
    const currentObjects = this.getObjects().filter(obj => 
      obj.type !== 'Artboard' && obj.constructor.name !== 'Artboard'
    );
    const currentState = {
      objects: currentObjects.map(obj => obj.toObject()),
      background: this.backgroundImage ? this.backgroundImage.toObject() : null,
      backgroundImage: this.backgroundImage ? this.backgroundImage.toObject() : null,
      clipPath: this.clipPath ? this.clipPath.toObject() : null,
      viewportTransform: this.viewportTransform,
      zoom: this.getZoom(),
      width: this.width,
      height: this.height
    };
    
    // Save current state for undo
    this.undoStack.push(JSON.stringify(currentState));
    console.log('Saved current state for undo, undo stack size:', this.undoStack.length);

    // Get the next state from redo stack
    const nextState = this.redoStack.pop()!;
    console.log('Loading next state, remaining redo stack size:', this.redoStack.length);

    this.isUndoRedoAction = true;
    this.customLoadFromJSON(nextState, () => {
      this.renderAll();
      this.isUndoRedoAction = false;
      console.log('Redo completed');
    });

    return true;
  }

  public canUndo(): boolean {
    return this.undoStack.length > 1;
  }

  public canRedo(): boolean {
    return this.redoStack.length > 0;
  }

  public clearHistory() {
    this.undoStack = [];
    this.redoStack = [];
    this.saveState(); // Save current state as initial
  }

  public centerArtboards() {
    const canvasWidth = this.width;
    const canvasHeight = this.height;
    const vt = this.viewportTransform;
    const requestedSize = this.getRequestedSize();
    vt[4] = (canvasWidth - requestedSize.width) / 2;
    vt[5] = (canvasHeight - requestedSize.height) / 2;
    this.requestRenderAll();
  }

  public getRequestedSize() {
    const artboards = this.getObjects("Artboard");
    const artboardsWidth = artboards[0].width;
    let artboardsHeight = 0;
    artboards.forEach((artboard) => {
      artboardsHeight += artboard.height;
    });
    return {
      width: artboardsWidth,
      height: artboardsHeight,
    };
  }

  public async dispose(): Promise<boolean> {
    this.off('object:modified');
    this.off('object:added');
    this.off('object:removed');
    this.off('object:moving');
    this.off('object:scaling');
    this.off('object:rotating');
    return super.dispose();
  }
}
