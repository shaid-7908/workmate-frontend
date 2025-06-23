import React from 'react';
import { Button } from '@/components/ui/button';
import { Undo2, Redo2 } from 'lucide-react';
import { FabricCanvas } from './fabric/canvas';

interface UndoRedoButtonsProps {
  canvasRef: React.RefObject<FabricCanvas>;
  className?: string;
}

export const UndoRedoButtons: React.FC<UndoRedoButtonsProps> = ({ 
  canvasRef, 
  className = "" 
}) => {
  const handleUndo = () => {
    if (canvasRef.current?.canUndo()) {
      canvasRef.current.undo();
    }
  };

  const handleRedo = () => {
    if (canvasRef.current?.canRedo()) {
      canvasRef.current.redo();
    }
  };

  const canUndo = canvasRef.current?.canUndo() || false;
  const canRedo = canvasRef.current?.canRedo() || false;

  return (
    <div className={`flex gap-1 ${className}`}>
      <Button
        variant="outline"
        size="sm"
        onClick={handleUndo}
        disabled={!canUndo}
        title="Undo (Ctrl+Z)"
        className="flex items-center gap-1"
      >
        <Undo2 className="h-4 w-4" />
        <span className="hidden sm:inline">Undo</span>
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={handleRedo}
        disabled={!canRedo}
        title="Redo (Ctrl+Y)"
        className="flex items-center gap-1"
      >
        <Redo2 className="h-4 w-4" />
        <span className="hidden sm:inline">Redo</span>
      </Button>
    </div>
  );
}; 