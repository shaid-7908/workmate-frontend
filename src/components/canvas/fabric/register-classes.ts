import * as fabric from 'fabric';
import Artboard from './artboard';

// Register custom classes with Fabric.js
export const registerCustomClasses = () => {
  try {
    // Try to register using the proper fabric.js API
    if (fabric && typeof (fabric as any).registerClass === 'function') {
      (fabric as any).registerClass('Artboard', Artboard);
    } else if (fabric && (fabric as any).util && (fabric as any).util.object) {
      // Try using the util.object.extend method
      (fabric as any).util.object.extend(fabric, {
        Artboard: Artboard,
      });
    } else {
      // Try to register on the global scope
      if (typeof window !== 'undefined') {
        (window as any).fabric = (window as any).fabric || {};
        (window as any).fabric.Artboard = Artboard;
      }
      
      // Also try to register on the fabric object using Object.defineProperty
      if (fabric) {
        Object.defineProperty(fabric, 'Artboard', {
          value: Artboard,
          writable: true,
          configurable: true,
          enumerable: true
        });
      }
    }
    
    console.log('Artboard class registered successfully');
  } catch (error) {
    console.error('Failed to register Artboard class:', error);
    
    // Last resort: try to register it globally
    try {
      if (typeof window !== 'undefined') {
        (window as any).fabric = (window as any).fabric || {};
        (window as any).fabric.Artboard = Artboard;
        console.log('Artboard class registered globally as fallback');
      }
    } catch (fallbackError) {
      console.error('Failed to register Artboard class globally:', fallbackError);
    }
  }
}; 