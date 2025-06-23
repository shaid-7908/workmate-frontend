# Canvas Undo/Redo Functionality

This implementation adds comprehensive undo/redo functionality to the Fabric.js canvas.

## Features

- **Automatic State Tracking**: The canvas automatically saves states when objects are modified, added, removed, moved, scaled, or rotated
- **Keyboard Shortcuts**: 
  - `Ctrl+Z` (or `Cmd+Z` on Mac) for Undo
  - `Ctrl+Y` or `Ctrl+Shift+Z` for Redo
- **Global Event System**: Integrates with the existing global event dispatcher
- **UI Buttons**: Undo/Redo buttons in the navbar
- **History Management**: Configurable history size (default: 50 states)

## Implementation Details

### 1. FabricCanvas Class (`src/components/canvas/fabric/canvas.ts`)

The `FabricCanvas` class extends `fabric.Canvas` and adds undo/redo functionality:

```typescript
// Key methods:
public undo(): boolean
public redo(): boolean
public canUndo(): boolean
public canRedo(): boolean
public clearHistory(): void
```

### 2. Custom Hook (`src/components/canvas/hooks/use-undo-redo.ts`)

The `useUndoRedo` hook provides:
- Keyboard event handling
- Undo/redo functions
- State checking functions

### 3. UI Components

- **UndoRedoButtons**: Standalone component for undo/redo buttons
- **Navbar Integration**: Existing navbar already has undo/redo buttons

### 4. Global Events

The system integrates with the global event dispatcher:
- `HISTORY_UNDO`: Triggers undo operation
- `HISTORY_REDO`: Triggers redo operation

## Usage

### Basic Usage

```typescript
import { useUndoRedo } from './hooks/use-undo-redo';

const MyComponent = () => {
  const canvasRef = useRef<FabricCanvas>(null);
  const { undo, redo, canUndo, canRedo } = useUndoRedo(canvasRef);
  
  return (
    <div>
      <button onClick={undo} disabled={!canUndo()}>Undo</button>
      <button onClick={redo} disabled={!canRedo()}>Redo</button>
    </div>
  );
};
```

### Using the UndoRedoButtons Component

```typescript
import { UndoRedoButtons } from './undo-redo-buttons';

const MyComponent = () => {
  const canvasRef = useRef<FabricCanvas>(null);
  
  return (
    <div>
      <UndoRedoButtons canvasRef={canvasRef} />
    </div>
  );
};
```

### Programmatic Control

```typescript
// Direct canvas access
if (canvasRef.current?.canUndo()) {
  canvasRef.current.undo();
}

if (canvasRef.current?.canRedo()) {
  canvasRef.current.redo();
}

// Clear history
canvasRef.current?.clearHistory();
```

## Configuration

### History Size

The maximum number of states to keep in history can be configured:

```typescript
// In FabricCanvas constructor or after initialization
canvas.maxHistorySize = 100; // Default is 50
```

### Event Filtering

The system automatically tracks these events:
- `object:modified`
- `object:added`
- `object:removed`
- `object:moving`
- `object:scaling`
- `object:rotating`

## Performance Considerations

- States are stored as JSON strings for efficient serialization
- History size is limited to prevent memory issues
- Redo stack is cleared when new actions are performed
- States are only saved when not performing undo/redo operations

## Browser Compatibility

- Supports both `Ctrl` (Windows/Linux) and `Cmd` (Mac) modifier keys
- Keyboard shortcuts are disabled when focus is in input fields
- Works with all modern browsers that support Fabric.js

## Troubleshooting

### Common Issues

1. **Undo/Redo not working**: Ensure the canvas reference is properly passed to the hook
2. **Keyboard shortcuts not working**: Check if focus is in an input field
3. **Memory issues**: Reduce the `maxHistorySize` if dealing with large canvases

### Debug Mode

Enable debug logging by adding console logs in the `saveState()` method:

```typescript
private saveState() {
  const json = JSON.stringify(this.toJSON());
  this.undoStack.push(json);
  console.log('State saved, stack size:', this.undoStack.length);
  
  if (this.undoStack.length > this.maxHistorySize) {
    this.undoStack.shift();
  }
}
``` 