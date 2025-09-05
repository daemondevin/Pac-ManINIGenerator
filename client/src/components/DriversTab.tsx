import React from 'react';
import * as Tooltip from "@radix-ui/react-tooltip"
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Plus, Microchip, SquarePen, HardDrive, Minus, Database, Settings, CopyPlus, Asterisk } from 'lucide-react';

interface Driver {
    infFile: string;
    hardwareId: string | undefined;
    driverName: string;
    architecture: string;
    signed: string;
    ifExists: string;
    required: string;
    forceInstall: string;
    timeout: string;
    category: string;
    version: string;
    publisher: string;
}

interface DriversTabProps {
    config: {
        drivers: Driver[];
        [key: string]: any;
    };
    setConfig: (config: any) => void;
    activeConfigType: string;
    InputField: React.ComponentType<any>;
    addArrayItem: (key: string, value: any) => void;
    removeArrayItem: (key: string, index: number) => void;
    updateArrayItem: (key: string, index: number, field: string, value: any) => void;
    Button: React.ComponentType<any>;
    CheckboxField: React.ComponentType<any>;
    Card: React.ComponentType<any>;
    CardContent: React.ComponentType<any>;
}
const DriversTab: React.FC<DriversTabProps> = ({
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
                <Microchip className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>Device Driver configuration is only available for Launcher.ini files.</p>
                <p className="text-sm mt-1">Switch to Launcher configuration to access drivers settings.</p>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-xl font-semibold mb-6 text-gray-900">Device Drivers</h2>

            {/* Device Drivers Section */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Device Drivers</h3>
                    <Button
                        onClick={() => addArrayItem('drivers', {
                            infFile: '',
                            hardwareId: '',
                            driverName: '',
                            architecture: 'auto',
                            signed: 'false',
                            ifExists: 'update',
                            required: 'false',
                            forceInstall: 'false',
                            timeout: '60',
                            category: '',
                            version: '',
                            publisher: ''
                        })}
                        size="sm"
                    >
                        <Plus className="w-4 h-4 mr-1" />
                        Add Driver
                    </Button>
                </div>

                {config.drivers.length === 0 ? (
                    <Card className="border-dashed border-2 border-gray-300">
                        <CardContent className="text-center py-8">
                            <HardDrive className="w-8 h-8 mx-auto mb-2 opacity-50 text-gray-400" />
                            <p className="text-gray-500">No device drivers configured. Click "Add Driver" to get started.</p>
                        </CardContent>
                    </Card>
                ) : (
                    config.drivers.map((driver, index) => (
                        <Card key={index} className="mb-4">
                            <CardContent className="pt-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="font-medium">Device Driver {index + 1}</h4>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeArrayItem('drivers', index)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </Button>
                                </div>
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <InputField
                                        label="INF File"
                                        value={driver.infFile || ''}
                                        onChange={(value: string) => updateArrayItem('drivers', index, 'infFile', value)}
                                        placeholder="%PAL:AppDir%\drivers\mydevice.inf"
                                        description="Path to driver INF file"
                                        required
                                    />
                                    <InputField
                                        label="Hardware ID"
                                        value={driver.hardwareId || ''}
                                        onChange={(value: string) => updateArrayItem('drivers', index, 'hardwareId', value)}
                                        placeholder="USB\VID_1234&PID_5678"
                                        description="Hardware identifier to match"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <InputField
                                        label="Driver Name"
                                        value={driver.driverName || ''}
                                        onChange={(value: string) => updateArrayItem('drivers', index, 'driverName', value)}
                                        placeholder="My Custom USB Device"
                                        description="Display name for driver"
                                    />
                                    <InputField
                                        label="Category"
                                        value={driver.category || ''}
                                        onChange={(value: string) => updateArrayItem('drivers', index, 'category', value)}
                                        placeholder="USB"
                                        description="Driver category"
                                    />
                                </div>
                                <div className="grid grid-cols-4 gap-4 mb-4">
                                    <InputField
                                        label="Architecture"
                                        type="select"
                                        value={driver.architecture || 'auto'}
                                        onChange={(value: string) => updateArrayItem('drivers', index, 'architecture', value)}
                                        placeholder={[
                                            { value: 'auto', label: 'Auto-detect' },
                                            { value: 'x86', label: '32-bit (x86)' },
                                            { value: 'x64', label: '64-bit (x64)' }
                                        ]}
                                        description="Target architecture"
                                    />
                                    <InputField
                                        label="If Exists"
                                        type="select"
                                        value={driver.ifExists || 'update'}
                                        onChange={(value: string) => updateArrayItem('drivers', index, 'ifExists', value)}
                                        placeholder={[
                                            { value: 'skip', label: 'Skip' },
                                            { value: 'backup', label: 'Backup' },
                                            { value: 'replace', label: 'Replace' },
                                            { value: 'update', label: 'Update' }
                                        ]}
                                        description="Action if driver exists"
                                    />
                                    <InputField
                                        label="Timeout"
                                        value={driver.timeout || '60'}
                                        onChange={(value: string) => updateArrayItem('drivers', index, 'timeout', value)}
                                        placeholder="60"
                                        description="Installation timeout (seconds)"
                                    />
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                checked={driver.signed === 'true'}
                                                onCheckedChange={(checked) => updateArrayItem('drivers', index, 'signed', checked ? 'true' : 'false')}
                                            />
                                            <Label className="text-sm">Require Signed</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                checked={driver.forceInstall === 'true'}
                                                onCheckedChange={(checked) => updateArrayItem('drivers', index, 'forceInstall', checked ? 'true' : 'false')}
                                            />
                                            <Label className="text-sm">Force Install</Label>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <InputField
                                        label="Version"
                                        value={driver.version || ''}
                                        onChange={(value: string) => updateArrayItem('drivers', index, 'version', value)}
                                        placeholder="1.2.3.4"
                                        description="Expected driver version"
                                    />
                                    <InputField
                                        label="Publisher"
                                        value={driver.publisher || ''}
                                        onChange={(value: string) => updateArrayItem('drivers', index, 'publisher', value)}
                                        placeholder="My Company"
                                        description="Expected driver publisher"
                                    />
                                </div>
                                <div className="mt-4 flex items-center space-x-2">
                                    <Checkbox
                                        checked={driver.required === 'true'}
                                        onCheckedChange={(checked) => updateArrayItem('drivers', index, 'required', checked ? 'true' : 'false')}
                                    />
                                    <Label className="text-sm">Required Driver</Label>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>

            <Card className="bg-yellow-50 border-yellow-200">
                <CardContent className="pt-4">
                    <div className="flex items-center">
                        <Microchip className="w-5 h-5 text-yellow-500 mr-2" />
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

export default DriversTab;