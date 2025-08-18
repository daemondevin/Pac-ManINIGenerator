import React from 'react';
import { Plus, Minus, Settings, AlertCircle } from 'lucide-react';

const ServicesTab = ({ 
  config, 
  setConfig, 
  activeConfigType, 
  showAdvanced,
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
        <p>Services & DLL configuration is only available for Launcher.ini files.</p>
        <p className="text-sm mt-1">Switch to Launcher configuration to access services settings.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 text-gray-900">Windows Services & DLL Registration</h2>
      
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Windows Services</h3>
          <Button 
            onClick={() => addArrayItem('services', {name: '', path: '', type: 'own', start: 'demand', depend: '', ifExists: 'skip'})}
            size="sm"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Service
          </Button>
        </div>
        
        {config.services.length === 0 ? (
          <Card className="border-dashed border-2 border-gray-300">
            <CardContent className="text-center py-8">
              <Settings className="w-8 h-8 mx-auto mb-2 opacity-50 text-gray-400" />
              <p className="text-gray-500">No services configured. Click "Add Service" to get started.</p>
            </CardContent>
          </Card>
        ) : (
          config.services.map((service, index) => (
            <Card key={index} className="mb-4">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium">Service {index + 1}</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeArrayItem('services', index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <InputField
                    label="Service Name"
                    value={service.name || ''}
                    onChange={(value) => updateArrayItem('services', index, 'name', value)}
                    placeholder="MyAppService"
                    description="Internal service name"
                  />
                  <InputField
                    label="Service Path"
                    value={service.path || ''}
                    onChange={(value) => updateArrayItem('services', index, 'path', value)}
                    placeholder="%PAL:AppDir%\service.exe"
                    description="Path to service executable"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <InputField
                    label="Service Type"
                    type="select"
                    value={service.type || 'own'}
                    onChange={(value) => updateArrayItem('services', index, 'type', value)}
                    placeholder={[
                      {value: 'own', label: 'Own Process'},
                      {value: 'share', label: 'Shared Process'},
                      {value: 'interact', label: 'Interactive'},
                      {value: 'kernel', label: 'Kernel Driver'},
                      {value: 'filesys', label: 'File System Driver'},
                      {value: 'rec', label: 'Recognizer Driver'}
                    ]}
                    description="Type of service or driver"
                  />
                  <InputField
                    label="Start Type"
                    type="select"
                    value={service.start || 'demand'}
                    onChange={(value) => updateArrayItem('services', index, 'start', value)}
                    placeholder={[
                      {value: 'boot', label: 'Boot'},
                      {value: 'system', label: 'System'},
                      {value: 'auto', label: 'Automatic'},
                      {value: 'demand', label: 'Manual'},
                      {value: 'disabled', label: 'Disabled'},
                      {value: 'delayed-auto', label: 'Automatic (Delayed)'}
                    ]}
                    description="When service should start"
                  />
                  <InputField
                    label="If Exists"
                    type="select"
                    value={service.ifExists || 'skip'}
                    onChange={(value) => updateArrayItem('services', index, 'ifExists', value)}
                    placeholder={[
                      {value: 'skip', label: 'Skip'},
                      {value: 'replace', label: 'Replace'}
                    ]}
                    description="Action if service already exists"
                  />
                </div>
                <div className="mt-4">
                  <InputField
                    label="Dependencies"
                    value={service.depend || ''}
                    onChange={(value) => updateArrayItem('services', index, 'depend', value)}
                    placeholder="Service1/Service2"
                    description="Service dependencies separated by forward slash"
                  />
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">DLL Registration</h3>
          <Button 
            onClick={() => addArrayItem('registerDLLs', {progId: '', file: '', type: 'REGDLL'})}
            size="sm"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add DLL
          </Button>
        </div>
        
        {config.registerDLLs.length === 0 ? (
          <Card className="border-dashed border-2 border-gray-300">
            <CardContent className="text-center py-8">
              <Settings className="w-8 h-8 mx-auto mb-2 opacity-50 text-gray-400" />
              <p className="text-gray-500">No DLLs configured for registration. Click "Add DLL" to get started.</p>
            </CardContent>
          </Card>
        ) : (
          config.registerDLLs.map((dll, index) => (
            <Card key={index} className="mb-4">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium">DLL Registration {index + 1}</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeArrayItem('registerDLLs', index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <InputField
                    label="ProgID"
                    value={dll.progId || ''}
                    onChange={(value) => updateArrayItem('registerDLLs', index, 'progId', value)}
                    placeholder="MyApp.Component"
                    description="Program ID for the DLL component"
                  />
                  <InputField
                    label="DLL File Path"
                    value={dll.file || ''}
                    onChange={(value) => updateArrayItem('registerDLLs', index, 'file', value)}
                    placeholder="%PAL:AppDir%\components\mylib.dll"
                    description="Path to DLL file"
                  />
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <InputField
                    label="Registration Type"
                    type="select"
                    value={dll.type || 'REGDLL'}
                    onChange={(value) => updateArrayItem('registerDLLs', index, 'type', value)}
                    placeholder={[
                      {value: 'REGDLL', label: 'Register DLL'},
                      {value: 'REGTLB', label: 'Register Type Library'},
                      {value: 'REGDLLTLB', label: 'Register DLL & Type Library'},
                      {value: 'REGEXE', label: 'Register Executable'},
                      {value: 'REGTLB for user', label: 'Register TLB for User'}
                    ]}
                    description="Type of registration to perform"
                  />
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {showAdvanced && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Task Cleanup</h3>
            <Button 
              onClick={() => addArrayItem('taskCleanup', {name: ''})}
              size="sm"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Task
            </Button>
          </div>
          
          {config.taskCleanup.length === 0 ? (
            <Card className="border-dashed border-2 border-gray-300">
              <CardContent className="text-center py-8">
                <Settings className="w-8 h-8 mx-auto mb-2 opacity-50 text-gray-400" />
                <p className="text-gray-500">No scheduled tasks configured for cleanup. Click "Add Task" to get started.</p>
              </CardContent>
            </Card>
          ) : (
            config.taskCleanup.map((task, index) => (
              <Card key={index} className="mb-4">
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium">Task {index + 1}</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeArrayItem('taskCleanup', index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                  </div>
                  <InputField
                    label="Task Name"
                    value={task.name || ''}
                    onChange={(value) => updateArrayItem('taskCleanup', index, 'name', value)}
                    placeholder="MyAppScheduledTask"
                    description="Windows scheduled task name to remove after app exits"
                  />
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}

      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="pt-4">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-yellow-500 mr-2" />
            <h4 className="text-sm font-medium text-yellow-800">Services & DLL Registration Warning</h4>
          </div>
          <p className="text-sm text-yellow-700 mt-1">
            Services and DLL registration require careful configuration and may require administrator privileges. 
            Ensure you understand the security implications before enabling these features.
          </p>
          <div className="mt-3 text-sm text-yellow-700">
            <p><strong>Services:</strong> Will be installed/started when the app launches and properly cleaned up when it exits.</p>
            <p><strong>DLL Registration:</strong> COM components will be registered during startup and unregistered during cleanup.</p>
            <p><strong>Task Cleanup:</strong> Windows scheduled tasks created by the app will be removed on exit.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServicesTab;