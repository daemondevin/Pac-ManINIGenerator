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
    };
    setConfig: React.Dispatch<any>;
    activeConfigType: string;
    InputField: React.ComponentType<any>;
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
                        onClick={() => setConfig((prev: any) => ({
                            ...prev,
                            drivers: [...prev.drivers, {
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
                        }]
                        }))}
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
                                        onClick={() => setConfig((prev: any) => ({
                                            ...prev,
                                            drivers: prev.drivers.filter((_: any, i: number) => i !== index)
                                        }))}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </Button>
                                </div>
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <InputField
                                        label="INF File"
                                        value={driver.infFile || ''}                                        
                                        onChange={(value: string) => setConfig((prev: any) => ({
                                            ...prev,
                                            drivers: prev.drivers.map((item: Driver, i: number) => i === index ? { ...item, infFile: value } : item)
                                        }))}
                                        placeholder="%PAL:AppDir%\drivers\mydevice.inf"
                                        description="Path to driver INF file"
                                        required
                                    />
                                    <InputField
                                        label="Hardware ID"
                                        value={driver.hardwareId || ''}                                        
                                        onChange={(value: string) => setConfig((prev: any) => ({
                                            ...prev,
                                            drivers: prev.drivers.map((item: Driver, i: number) => i === index ? { ...item, hardwareId: value } : item)
                                        }))}
                                        placeholder="USB\VID_1234&PID_5678"
                                        description="Hardware identifier to match"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <InputField
                                        label="Driver Name"
                                        value={driver.driverName || ''}                                        
                                        onChange={(value: string) => setConfig((prev: any) => ({
                                            ...prev,
                                            drivers: prev.drivers.map((item: Driver, i: number) => i === index ? { ...item, driverName: value } : item)
                                        }))}
                                        placeholder="My Custom USB Device"
                                        description="Display name for driver"
                                    />
                                    <InputField
                                        label="Category"
                                        value={driver.category || ''}                                        
                                        onChange={(value: string) => setConfig((prev: any) => ({
                                            ...prev,
                                            drivers: prev.drivers.map((item: Driver, i: number) => i === index ? { ...item, category: value } : item)
                                        }))}
                                        placeholder="USB"
                                        description="Driver category"
                                    />
                                </div>
                                <div className="grid grid-cols-4 gap-4 mb-4">
                                    <InputField
                                        label="Architecture"
                                        type="select"
                                        value={driver.architecture || 'auto'}                                        
                                        onChange={(value: string) => setConfig((prev: any) => ({
                                            ...prev,
                                            drivers: prev.drivers.map((item: Driver, i: number) => i === index ? { ...item, architecture: value } : item)
                                        }))}
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
                                        onChange={(value: string) => setConfig((prev: any) => ({
                                            ...prev,
                                            drivers: prev.drivers.map((item: Driver, i: number) => i === index ? { ...item, ifExists: value } : item)
                                        }))}
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
                                        onChange={(value: string) => setConfig((prev: any) => ({
                                            ...prev,
                                            drivers: prev.drivers.map((item: Driver, i: number) => i === index ? { ...item, timeout: value } : item)
                                        }))}
                                        placeholder="60"
                                        description="Installation timeout (seconds)"
                                    />
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                checked={driver.signed === 'true'}                                                
                                                onCheckedChange={(checked) => setConfig((prev: any) => ({
                                                    ...prev,
                                                    drivers: prev.drivers.map((item: Driver, i: number) => i === index ? { ...item, signed: checked === true ? 'true' : 'false' } : item)
                                                }))}
                                            />
                                            <Label className="text-sm">Require Signed</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                checked={driver.forceInstall === 'true'}                                                
                                                onCheckedChange={(checked) => setConfig((prev: any) => ({
                                                    ...prev,
                                                    drivers: prev.drivers.map((item: Driver, i: number) => i === index ? { ...item, forceInstall: checked === true ? 'true' : 'false' } : item)
                                                }))}
                                            />
                                            <Label className="text-sm">Force Install</Label>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <InputField
                                        label="Version"
                                        value={driver.version || ''}                                        
                                        onChange={(value: string) => setConfig((prev: any) => ({
                                            ...prev,
                                            drivers: prev.drivers.map((item: Driver, i: number) => i === index ? { ...item, version: value } : item)
                                        }))}
                                        placeholder="1.2.3.4"
                                        description="Expected driver version"
                                    />
                                    <InputField
                                        label="Publisher"
                                        value={driver.publisher || ''}                                        
                                        onChange={(value: string) => setConfig((prev: any) => ({
                                            ...prev,
                                            drivers: prev.drivers.map((item: Driver, i: number) => i === index ? { ...item, publisher: value } : item)
                                        }))}
                                        placeholder="My Company"
                                        description="Expected driver publisher"
                                    />
                                </div>
                                <div className="mt-4 flex items-center space-x-2">
                                    <Checkbox
                                        checked={driver.required === 'true'}                                        
                                        onCheckedChange={(checked) => setConfig((prev: any) => ({
                                            ...prev,
                                            drivers: prev.drivers.map((item: Driver, i: number) => i === index ? { ...item, required: checked === true ? 'true' : 'false' } : item)
                                        }))}
                                    />
                                    <Label className="text-sm">Required Driver</Label>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>

            <Card className="bg-blue-50 border-blue-200 mt-8">
                <CardContent className="pt-4">
                    <div className="flex items-center">
                        <Microchip className="w-5 h-5 text-blue-500 mr-2" />
                        <h4 className="text-sm font-medium text-blue-800">Device Drivers Help</h4>
                    </div>
                    <div className="text-sm text-blue-700 mt-2 space-y-1">
                        <p>This section allows you to manage the installation of device drivers required by your portable application.</p>
                        <p><strong>INF File:</strong> The setup information file that contains all the information needed to install the driver.</p>
                        <p><strong>Hardware ID:</strong> A vendor-defined identification string that Windows uses to match a device to a driver package.</p>
                        <p><strong>Activation:</strong> Ensure the <code>Drivers</code> feature is enabled in the <em>Features</em> tab for these settings to take effect.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default DriversTab;