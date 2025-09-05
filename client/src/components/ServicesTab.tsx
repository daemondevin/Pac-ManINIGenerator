import React from 'react';
import { Plus, Minus, Settings, AlertCircle } from 'lucide-react';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import internal from 'stream';

interface Services {
    name: string;
    path: string;
    type ?: string;
    start ?: string;
    depend ?: string;
    ifExists ?: string;
    description: string; 
    account: string; 
    password: string; 
    timeout: number; 
    critical: boolean;
};

interface ServicesTabProps {
    config: { services: Services[] };
    setConfig: (config: any) => void;
    activeConfigType: string;
    InputField: React.ComponentType<any>;
    addArrayItem: (section: 'services', value: any) => void;
    removeArrayItem: (section: 'services', index: number) => void;
    updateArrayItem: (section: 'services', index: number, field: string, value: any) => void;
    Button: React.ComponentType<any>;
    CheckboxField: React.ComponentType<any>;
    Card: React.ComponentType<any>;
    CardContent: React.ComponentType<any>;
}

const ServicesTab: React.FC<ServicesTabProps> = ({
    config,
    setConfig,
    activeConfigType,
    InputField,
    addArrayItem,
    removeArrayItem,
    updateArrayItem,
    Button,
    CheckboxField,
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
                        onClick={() => addArrayItem('services', { name: '', path: '', type: 'own', start: 'demand', depend: '', ifExists: 'skip' })}
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
                                        onChange={(value: string) => updateArrayItem('services', index, 'name', value)}
                                        placeholder="MyAppService"
                                        description="Internal service name"
                                    />
                                    <InputField
                                        label="Service Path"
                                        value={service.path || ''}
                                        onChange={(value: string) => updateArrayItem('services', index, 'path', value)}
                                        placeholder="%PAL:AppDir%\service.exe"
                                        description="Path to service executable"
                                    />
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <InputField
                                        label="Service Type"
                                        type="select"
                                        value={service.type || 'own'}
                                        onChange={(value: string) => updateArrayItem('services', index, 'type', value)}
                                        placeholder={[
                                            { value: 'own', label: 'Own Process' },
                                            { value: 'share', label: 'Shared Process' },
                                            { value: 'interact', label: 'Interactive' },
                                            { value: 'kernel', label: 'Kernel Driver' },
                                            { value: 'filesys', label: 'File System Driver' },
                                            { value: 'rec', label: 'Recognizer Driver' }
                                        ]}
                                        description="Type of service or driver"
                                    />
                                    <InputField
                                        label="Start Type"
                                        type="select"
                                        value={service.start || 'demand'}
                                        onChange={(value: string) => updateArrayItem('services', index, 'start', value)}
                                        placeholder={[
                                            { value: 'boot', label: 'Boot' },
                                            { value: 'system', label: 'System' },
                                            { value: 'auto', label: 'Automatic' },
                                            { value: 'demand', label: 'Manual' },
                                            { value: 'disabled', label: 'Disabled' },
                                            { value: 'delayed-auto', label: 'Automatic (Delayed)' }
                                        ]}
                                        description="When service should start"
                                    />
                                    <InputField
                                        label="If Exists"
                                        type="select"
                                        value={service.ifExists || 'skip'}
                                        onChange={(value: string) => updateArrayItem('services', index, 'ifExists', value)}
                                        placeholder={[
                                            { value: 'skip', label: 'Skip' },
                                            { value: 'replace', label: 'Replace' }
                                        ]}
                                        description="Action if service already exists"
                                    />
                                </div>
                                <div className="mt-4">
                                    <InputField
                                        label="Dependencies"
                                        value={service.depend || ''}
                                        onChange={(value: string) => updateArrayItem('services', index, 'depend', value)}
                                        placeholder="Service1/Service2"
                                        description="Service dependencies separated by forward slash"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>

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