import React from 'react';
import { Plus, Minus, Settings, AlertCircle } from 'lucide-react';
import { Checkbox } from './ui/checkbox';

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
            <h2 className="text-xl font-semibold mb-6 text-gray-900">Windows Services</h2>

            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Windows Services</h3>
                    <Button
                        onClick={() => setConfig((prev: any) => ({
                            ...prev,
                            services: [...prev.services, { name: '', path: '', type: 'own', start: 'demand', depend: '', ifExists: 'skip', description: '', account: '', password: '', timeout: 30000, critical: false }]
                        }))}
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
                                        onClick={() => setConfig((prev: any) => ({
                                            ...prev,
                                            services: prev.services.filter((_: any, i: number) => i !== index)
                                        }))}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </Button>
                                </div>
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <InputField
                                        label="Service Name"
                                        value={service.name || ''}                                        
                                        onChange={(value: string) => setConfig((prev: any) => ({
                                            ...prev,
                                            services: prev.services.map((item: Services, i: number) => i === index ? { ...item, name: value } : item)
                                        }))}
                                        placeholder="MyAppService"
                                        description="Internal service name"
                                    />
                                    <InputField
                                        label="Service Path"
                                        value={service.path || ''}                                        
                                        onChange={(value: string) => setConfig((prev: any) => ({
                                            ...prev,
                                            services: prev.services.map((item: Services, i: number) => i === index ? { ...item, path: value } : item)
                                        }))}
                                        placeholder="%PAL:AppDir%\service.exe"
                                        description="Path to service executable"
                                    />
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <InputField
                                        label="Service Type"
                                        type="select"
                                        value={service.type || 'own'}                                        
                                        onChange={(value: string) => setConfig((prev: any) => ({
                                            ...prev,
                                            services: prev.services.map((item: Services, i: number) => i === index ? { ...item, type: value } : item)
                                        }))}
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
                                        onChange={(value: string) => setConfig((prev: any) => ({
                                            ...prev,
                                            services: prev.services.map((item: Services, i: number) => i === index ? { ...item, start: value } : item)
                                        }))}
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
                                        onChange={(value: string) => setConfig((prev: any) => ({
                                            ...prev,
                                            services: prev.services.map((item: Services, i: number) => i === index ? { ...item, ifExists: value } : item)
                                        }))}
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
                                        onChange={(value: string) => setConfig((prev: any) => ({
                                            ...prev,
                                            services: prev.services.map((item: Services, i: number) => i === index ? { ...item, depend: value } : item)
                                        }))}
                                        placeholder="Service1/Service2"
                                        description="Service dependencies separated by forward slash"
                                    />
                                </div>
                                <div className="mt-4">
                                    <InputField
                                        label="Description"
                                        value={service.description || ''}
                                        onChange={(value: string) => setConfig((prev: any) => ({
                                            ...prev,
                                            services: prev.services.map((item: Services, i: number) => i === index ? { ...item, description: value } : item)
                                        }))}
                                        placeholder="My App's background service"
                                        description="Display description for the service"
                                    />
                                </div>
                                <div className="grid grid-cols-3 gap-4 mt-4">
                                    <InputField
                                        label="Account"
                                        value={service.account || ''}
                                        onChange={(value: string) => setConfig((prev: any) => ({
                                            ...prev,
                                            services: prev.services.map((item: Services, i: number) => i === index ? { ...item, account: value } : item)
                                        }))}
                                        placeholder="NT AUTHORITY\LocalService"
                                        description="Account to run service under"
                                    />
                                    <InputField
                                        label="Password"
                                        type="password"
                                        value={service.password || ''}
                                        onChange={(value: string) => setConfig((prev: any) => ({
                                            ...prev,
                                            services: prev.services.map((item: Services, i: number) => i === index ? { ...item, password: value } : item)
                                        }))}
                                        placeholder="Leave blank if not needed"
                                        description="Password for the account"
                                    />
                                    <InputField
                                        label="Timeout (ms)"
                                        value={service.timeout || 30000}
                                        onChange={(value: string) => setConfig((prev: any) => ({
                                            ...prev,
                                            services: prev.services.map((item: Services, i: number) => i === index ? { ...item, timeout: parseInt(value) || 0 } : item)
                                        }))}
                                        placeholder="30000"
                                        description="Timeout for service operations"
                                    />
                                </div>
                                <div className="mt-4">
                                    <CheckboxField
                                        label="Critical"
                                        checked={service.critical}
                                        onChange={(checked: boolean) => setConfig((prev: any) => ({
                                            ...prev,
                                            services: prev.services.map((item: Services, i: number) => i === index ? { ...item, critical: checked } : item)
                                        }))}
                                        description="If true, launcher will fail if service cannot start"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>

            <Card className="bg-blue-50 border-blue-200">
                <CardContent className="pt-4">
                    <div className="flex items-center">
                        <Settings className="w-5 h-5 text-blue-500 mr-2" />
                        <h4 className="text-sm font-medium text-blue-800">Windows Services Help</h4>
                    </div>
                    <div className="text-sm text-blue-700 mt-2 space-y-1">
                        <p>This section allows you to install, start, stop, and remove Windows services required by your application.</p>
                        <p><strong>Service Path:</strong> The path to the service executable. Use PAL variables like <code>%PAL:AppDir%</code> for portability.</p>
                        <p><strong>Start Type:</strong> 'Automatic' services start with Windows, while 'Manual' (demand) services must be started by an application or user.</p>
                        <p><strong>Account:</strong> Services can run under different user accounts, like `NT AUTHORITY\LocalService` or `NT AUTHORITY\System` for different privilege levels.</p>
                        <p><strong>Activation:</strong> Ensure the <code>Windows Services</code> feature is enabled in the <em>Features</em> tab for these settings to take effect.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ServicesTab;