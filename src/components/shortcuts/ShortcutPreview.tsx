import React from 'react';
import { Shortcut } from '../../types';

interface ShortcutPreviewProps {
  shortcut: Shortcut;
}

export function ShortcutPreview({ shortcut }: ShortcutPreviewProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold">{shortcut.name}</h3>
      <p className="text-gray-600 mt-1">{shortcut.description}</p>
      
      <div className="mt-4 space-y-2">
        <h4 className="font-medium">Actions:</h4>
        {shortcut.actions.map((action) => (
          <div
            key={action.id}
            className="bg-gray-50 p-2 rounded flex items-center space-x-2"
          >
            <span className="text-sm font-medium">{action.type}</span>
            <span className="text-sm text-gray-500">
              {JSON.stringify(action.parameters)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}