import React from 'react';
import * as Tooltip from "@radix-ui/react-tooltip"
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Plus, BrickWallFire, SquarePen, HardDrive, Minus, Database, Settings, CopyPlus, Asterisk } from 'lucide-react';

interface FirewallRule {
    name: string;
    direction: string;
    action: string;
    protocol: string;
    localPort: string;
    remotePort: string;
    localAddress: string;
    remoteAddress: string;
    program: string;
    service: string;
    profile: string;
    interfaceType: string;
    enabled: string;
    ifExists: string;
    required: string;
    description: string;
}

interface FirewallTabProps {
    config: { firewallRules: FirewallRule[] };
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

const FirewallTab: React.FC<FirewallTabProps> = ({
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
                <BrickWallFire className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>Firewall configuration is only available for Launcher.ini files.</p>
                <p className="text-sm mt-1">Switch to Launcher configuration to access firewall rule settings.</p>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-xl font-semibold mb-6 text-gray-900">Firewall Rules</h2>

            {/* Firewall Rules */}
            <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Firewall Rules</h3>
                <Button 
                onClick={() => addArrayItem('firewallRules', {
                    name: '', 
                    direction: 'Inbound', 
                    action: 'Allow', 
                    protocol: 'TCP', 
                    localPort: '', 
                    remotePort: '', 
                    localAddress: '', 
                    remoteAddress: '', 
                    program: '', 
                    service: '', 
                    profile: 'Private,Public', 
                    interfaceType: '', 
                    enabled: 'true', 
                    ifExists: 'replace', 
                    required: 'false', 
                    description: ''
                })}
                size="sm"
                >
                <Plus className="w-4 h-4 mr-1" />
                Add Firewall Rule
                </Button>
            </div>
            
            {config.firewallRules.length === 0 ? (
                <Card className="border-dashed border-2 border-gray-300">
                <CardContent className="text-center py-8">
                    <BrickWallFire className="w-8 h-8 mx-auto mb-2 opacity-50 text-gray-400" />
                    <p className="text-gray-500">No firewall rules configured. Click "Add Firewall Rule" to get started.</p>
                </CardContent>
                </Card>
            ) : (
                config.firewallRules.map((rule, index) => (
                <Card key={index} className="mb-4">
                    <CardContent className="pt-4">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium">Firewall Rule {index + 1}</h4>
                        <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeArrayItem('firewallRules', index)}
                        className="text-red-600 hover:text-red-800"
                        >
                        <Minus className="w-4 h-4" />
                        </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <InputField
                        label="Rule Name"
                        value={rule.name || ''}
                        onChange={(value: string) => updateArrayItem('firewallRules', index, 'name', value)}
                        placeholder="MyApp HTTP Server"
                        description="Firewall rule name"
                        />
                        <InputField
                        label="Program"
                        value={rule.program || ''}
                        onChange={(value: string) => updateArrayItem('firewallRules', index, 'program', value)}
                        placeholder="%PAL:AppDir%\server.exe"
                        description="Program executable path"
                        />
                    </div>
                    <div className="grid grid-cols-4 gap-4 mb-4">
                        <InputField
                        label="Direction"
                        type="select"
                        value={rule.direction || 'Inbound'}
                        onChange={(value: string) => updateArrayItem('firewallRules', index, 'direction', value)}
                        placeholder={[
                            {value: 'Inbound', label: 'Inbound'},
                            {value: 'Outbound', label: 'Outbound'}
                        ]}
                        />
                        <InputField
                        label="Action"
                        type="select"
                        value={rule.action || 'Allow'}
                        onChange={(value: string) => updateArrayItem('firewallRules', index, 'action', value)}
                        placeholder={[
                            {value: 'Allow', label: 'Allow'},
                            {value: 'Block', label: 'Block'},
                            {value: 'Bypass', label: 'Bypass'}
                        ]}
                        />
                        <InputField
                        label="Protocol"
                        type="select"
                        value={rule.protocol || 'TCP'}
                        onChange={(value: string) => updateArrayItem('firewallRules', index, 'protocol', value)}
                        placeholder={[
                            {value: 'TCP', label: 'TCP'},
                            {value: 'UDP', label: 'UDP'},
                            {value: 'ICMPv4', label: 'ICMPv4'},
                            {value: 'ICMPv6', label: 'ICMPv6'},
                            {value: 'Any', label: 'Any'}
                        ]}
                        />
                        <InputField
                        label="Local Port"
                        value={rule.localPort || ''}
                        onChange={(value: string) => updateArrayItem('firewallRules', index, 'localPort', value)}
                        placeholder="8080"
                        description="Port or port range"
                        />
                    </div>
                    <div className="mb-4">
                        <InputField
                        label="Description"
                        value={rule.description || ''}
                        onChange={(value: string) => updateArrayItem('firewallRules', index, 'description', value)}
                        placeholder="Allow HTTP access to MyApp server"
                        description="Rule description"
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
                        <BrickWallFire className="w-5 h-5 text-yellow-500 mr-2" />
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

export default FirewallTab;