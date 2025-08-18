import React from 'react';
import { Plus, Minus, FolderOpen, Settings } from 'lucide-react';

const FilesTab = ({ 
  config, 
  setConfig, 
  activeConfigType, 
  InputField, 
  addArrayItem, 
  removeArrayItem, 
  updateArrayItem,
  Button,
  Card,
  CardContent
}) => {
  if (activeConfigType !== 'launcher') {
    return (
      <div className="text-center py-8 text-gray-500">
        <FolderOpen className="w-8 h-8 mx-auto mb-2 opacity-50" />
        <p>Files & Directories configuration is only available for Launcher.ini files.</p>
        <p className="text-sm mt-1">Switch to Launcher configuration to access file management settings.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Files & Directories Management</h2>
      
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Files Move</h3>
          <Button 
            onClick={() => addArrayItem('filesMove', {source: '', destination: ''})}
            size="sm"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add File Move
          </Button>
        </div>
        
        {config.filesMove.length === 0 ? (
          <Card className="border-dashed border-2 border-gray-300">
            <CardContent className="text-center py-8">
              <FolderOpen className="w-8 h-8 mx-auto mb-2 opacity-50 text-gray-400" />
              <p className="text-gray-500">No file moves configured. Click "Add File Move" to get started.</p>
            </CardContent>
          </Card>
        ) : (
          config.filesMove.map((file, index) => (
            <Card key={index} className="mb-4">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium">File Move {index + 1}</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeArrayItem('filesMove', index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    label="Source File"
                    value={file.source || ''}
                    onChange={(value) => updateArrayItem('filesMove', index, 'source', value)}
                    placeholder="settings\config.ini"
                    description="File path relative to Data directory"
                  />
                  <InputField
                    label="Destination"
                    value={file.destination || ''}
                    onChange={(value) => updateArrayItem('filesMove', index, 'destination', value)}
                    placeholder="%PAL:AppDir%\MyApp"
                    description="Target directory where file should be moved"
                  />
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Directory Moves</h3>
          <Button 
            onClick={() => addArrayItem('directoriesMove', {source: '', destination: ''})}
            size="sm"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Directory Move
          </Button>
        </div>
        
        {config.directoriesMove.length === 0 ? (
          <Card className="border-dashed border-2 border-gray-300">
            <CardContent className="text-center py-8">
              <FolderOpen className="w-8 h-8 mx-auto mb-2 opacity-50 text-gray-400" />
              <p className="text-gray-500">No directory moves configured. Click "Add Directory Move" to get started.</p>
            </CardContent>
          </Card>
        ) : (
          config.directoriesMove.map((dir, index) => (
            <Card key={index} className="mb-4">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium">Directory Move {index + 1}</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeArrayItem('directoriesMove', index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    label="Source Directory"
                    value={dir.source || ''}
                    onChange={(value) => updateArrayItem('directoriesMove', index, 'source', value)}
                    placeholder="settings"
                    description="Directory relative to Data directory"
                  />
                  <InputField
                    label="Destination Directory"
                    value={dir.destination || ''}
                    onChange={(value) => updateArrayItem('directoriesMove', index, 'destination', value)}
                    placeholder="%APPDATA%\Publisher\AppName"
                    description="Target system directory"
                  />
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Environment Variables</h3>
          <Button 
            onClick={() => addArrayItem('environment', {name: '', value: ''})}
            size="sm"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Variable
          </Button>
        </div>
        
        {config.environment.length === 0 ? (
          <Card className="border-dashed border-2 border-gray-300">
            <CardContent className="text-center py-8">
              <Settings className="w-8 h-8 mx-auto mb-2 opacity-50 text-gray-400" />
              <p className="text-gray-500">No environment variables configured. Click "Add Variable" to get started.</p>
            </CardContent>
          </Card>
        ) : (
          config.environment.map((env, index) => (
            <Card key={index} className="mb-4">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium">Environment Variable {index + 1}</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeArrayItem('environment', index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    label="Variable Name"
                    value={env.name || ''}
                    onChange={(value) => updateArrayItem('environment', index, 'name', value)}
                    placeholder="JAVA_HOME"
                    description="Environment variable name"
                  />
                  <InputField
                    label="Variable Value"
                    value={env.value || ''}
                    onChange={(value) => updateArrayItem('environment', index, 'value', value)}
                    placeholder="%PAL:AppDir%\java"
                    description="Environment variable value (supports PAL variables)"
                  />
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Card className="bg-green-50 border-green-200">
        <CardContent className="pt-4">
          <div className="flex items-center">
            <FolderOpen className="w-5 h-5 text-green-500 mr-2" />
            <h4 className="text-sm font-medium text-green-800">File & Directory Management Help</h4>
          </div>
          <div className="text-sm text-green-700 mt-2 space-y-1">
            <p><strong>File Moves:</strong> Individual files moved from Data directory to system locations during startup.</p>
            <p><strong>Directory Moves:</strong> Entire directories moved between portable and system locations.</p>
            <p><strong>Environment Variables:</strong> Custom environment variables set for the application.</p>
            <p><strong>PAL Variables:</strong> Use %PAL:DataDir%, %PAL:AppDir%, %APPDATA%, etc. for portable paths.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FilesTab;