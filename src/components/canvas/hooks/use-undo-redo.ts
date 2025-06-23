import { useEffect, useCallback } from 'react';
import { FabricCanvas } from '../fabric/canvas';

export const useUndoRedo = (canvasRef: React.RefObject<FabricCanvas>) => {
  const handleUndo = useCallback(() => {
    if (canvasRef.current?.canUndo()) {
      canvasRef.current.undo();
    }
  }, [canvasRef]);

  const handleRedo = useCallback(() => {
    if (canvasRef.current?.canRedo()) {
      canvasRef.current.redo();
    }
  }, [canvasRef]);

  const canUndo = useCallback(() => {
    return canvasRef.current?.canUndo() || false;
  }, [canvasRef]);

  const canRedo = useCallback(() => {
    return canvasRef.current?.canRedo() || false;
  }, [canvasRef]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if we're in an input field
      const target = event.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.contentEditable === 'true') {
        return;
      }

      // Ctrl+Z for undo
      if ((event.ctrlKey || event.metaKey) && event.key === 'z' && !event.shiftKey) {
        event.preventDefault();
        handleUndo();
      }

      // Ctrl+Y or Ctrl+Shift+Z for redo
      if ((event.ctrlKey || event.metaKey) && (event.key === 'y' || (event.key === 'z' && event.shiftKey))) {
        event.preventDefault();
        handleRedo();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleUndo, handleRedo]);

  return {
    undo: handleUndo,
    redo: handleRedo,
    canUndo,
    canRedo,
  };
}; 