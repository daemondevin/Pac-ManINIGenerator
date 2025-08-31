import React from 'react';
import * as Tooltip from "@radix-ui/react-tooltip"
import { Plus, SquarePen, Minus, Database, Settings, CopyPlus, Asterisk } from 'lucide-react';

const RegistryTab = ({ 
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
        <Settings className="w-8 h-8 mx-auto mb-2 opacity-50" />
        <p>Registry configuration is only available for Launcher.ini files.</p>
        <p className="text-sm mt-1">Switch to Launcher configuration to access registry settings.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 text-gray-900">Registry Configuration</h2>
      
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Registry Keys</h3>
          <Button 
            onClick={() => addArrayItem('registryKeys', {name: '', path: ''})}
            size="sm"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Registry Key
          </Button>
        </div>
        
        {config.registryKeys.length === 0 ? (
          <Card className="border-dashed border-2 border-gray-300">
            <CardContent className="text-center py-8">
              <Database className="w-8 h-8 mx-auto mb-2 opacity-50 text-gray-400" />
              <p className="text-gray-500">No registry keys configured. Click "Add Registry Key" to get started.</p>
            </CardContent>
          </Card>
        ) : (
          config.registryKeys.map((key, index) => (
            <Card key={index} className="mb-4">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium">Registry Key {index + 1}</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeArrayItem('registryKeys', index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    label="Name"
                    value={key.name || ''}
                    onChange={(value) => updateArrayItem('registryKeys', index, 'name', value)}
                    placeholder="appname_portable"
                    description="File name for the saved registry key"
                  />
                  <InputField
                    label="Registry Path"
                    value={key.path || ''}
                    onChange={(value) => updateArrayItem('registryKeys', index, 'path', value)}
                    placeholder="HKCU\Software\Publisher\AppName"
                    description="Full path to the registry key"
                  />
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Registry Values to Write</h3>
          <Button 
            onClick={() => addArrayItem('registryValues', {key: '', type: 'REG_SZ', value: ''})}
            size="sm"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Registry Value
          </Button>
        </div>
        
        {config.registryValues.length === 0 ? (
          <Card className="border-dashed border-2 border-gray-300">
            <CardContent className="text-center py-8">
              <SquarePen  className="w-8 h-8 mx-auto mb-2 opacity-50 text-gray-400" />
              <p className="text-gray-500">No registry values configured. Click "Add Registry Value" to get started.</p>
            </CardContent>
          </Card>
        ) : (
          config.registryValues.map((value, index) => (
            <Card key={index} className="mb-4">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium">Registry Value {index + 1}</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeArrayItem('registryValues', index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <InputField
                    label="Registry Key Path"
                    value={value.key || ''}
                    onChange={(value_) => updateArrayItem('registryValues', index, 'key', value_)}
                    placeholder="HKCU\Software\MyApp\Setting"
                    description="Full path including value name"
                  />
                  <InputField
                    label="Value Type"
                    type="select"
                    value={value.type || 'REG_SZ'}
                    onChange={(value_) => updateArrayItem('registryValues', index, 'type', value_)}
                    placeholder={[
                      {value: 'REG_SZ', label: 'String (REG_SZ)'},
                      {value: 'REG_DWORD', label: 'DWORD (REG_DWORD)'},
                      {value: 'REG_EXPAND_SZ', label: 'Expandable String (REG_EXPAND_SZ)'},
                      {value: 'REG_BINARY', label: 'Binary (REG_BINARY)'},
                      {value: 'REG_MULTI_SZ', label: 'Multi-String (REG_MULTI_SZ)'}
                    ]}
                  />
                  <InputField
                    label="Value Data"
                    value={value.value || ''}
                    onChange={(value_) => updateArrayItem('registryValues', index, 'value', value_)}
                    placeholder={value.type === 'REG_DWORD' ? '1033' : 'MyValue'}
                    description={value.type === 'REG_DWORD' ? 'Use decimal format' : 'Value data'}
                  />
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Registry Copy Keys</h3>
          <Button 
              onClick={() => addArrayItem('registryCopyKeys', {path: ''})}
              size="sm"
            >
            <Plus className="w-4 h-4 mr-1" />
            Add Path to Key
          </Button>
        </div>

        {config.registryCopyKeys.length === 0 ? (
          <Card className="border-dashed border-2 border-gray-300">
            <CardContent className="text-center py-8">
              <CopyPlus className="w-8 h-8 mx-auto mb-2 opacity-50 text-gray-400" />
              <p className="text-gray-500">No registry keys for the launcher to copy. Click "Add Path to Key" to get started.</p>
            </CardContent>
          </Card>
        ) : (
          config.registryCopyKeys.map((key, index) => (
            <Card key={index} className="mb-4">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium">Key {index + 1}</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeArrayItem('registryCopyKeys', index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                </div>
                <InputField
                  label="Path to Key"
                  value={key.path || ''}
                  onChange={(value) => updateArrayItem('registryCopyKeys', index, 'key', value)}
                  placeholder="HKCU\Software\MyProgram\ExtraCareNeededKey"
                  description="Path to the registry key to copy"
                />
              </CardContent>
            </Card>
          ))
        )}
      </div>
      
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-4">
          <div className="flex items-center">
            <Settings className="w-5 h-5 text-blue-500 mr-2" />
            <h4 className="text-sm font-medium text-blue-800">Registry Configuration Help</h4>
          </div>
          <div className="text-sm text-blue-700 mt-2 space-y-1">
            <Tooltip.Provider delayDuration={200}>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <button
                    className="text-sm text-blue-700 mt-2 space-y-1"
                    aria-label="Footnote"
                  >
                    <strong>Registry Keys<sup>[<Asterisk className="w-3 h-3 inline-block align-text-top" />]</sup>:{"\u00A0"}</strong>
                  </button>
                </Tooltip.Trigger>
                <Tooltip.Content
                  className="rounded-lg bg-gray-900 text-white px-3 py-2 text-sm shadow-lg max-w-xs"
                  side="top"
                >
                  Be sure to enable <code>RegistryKeys</code> in the <em>Features</em> section.
                  <Tooltip.Arrow className="fill-gray-900" />
                </Tooltip.Content>
              </Tooltip.Root>
            </Tooltip.Provider>
            Entire registry keys that will be backed up and restored.

            
            <p><strong>Registry Values:</strong> Specific values to write during application startup.</p>
            
            <Tooltip.Provider delayDuration={200}>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <button
                    className="text-sm text-blue-700 mt-2 space-y-1"
                    aria-label="Footnote"
                  >
                    <strong>Registry Copy Keys<sup>[<Asterisk className="w-3 h-3 inline-block align-text-top" />]</sup>:{"\u00A0"}</strong>
                  </button>
                </Tooltip.Trigger>
                <Tooltip.Content
                  className="rounded-lg bg-gray-900 text-white px-3 py-2 text-sm shadow-lg max-w-xs"
                  side="top"
                >
                  Be sure to enable <code>RegCopyKeys</code> in the <em>Features</em> section.
                  <Tooltip.Arrow className="fill-gray-900" />
                </Tooltip.Content>
              </Tooltip.Root>
            </Tooltip.Provider>
            Copy registry keys to a special hive before launch and restores keys on exit.
            
            <p><strong>Supported Paths:</strong> Use HKCU, HKLM, or HKCR.</p>
            <p><strong>PAL Variables:</strong> You can use %PAL:DataDir%, %PAL:AppDir% in registry values.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistryTab;