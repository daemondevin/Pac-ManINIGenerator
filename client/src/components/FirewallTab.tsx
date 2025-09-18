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
    edgeTraversal?: string;
    security?: string;
    icmpType?: string;
    icmpCode?: string;
}

interface FirewallTabProps {
    config: { firewallRules: FirewallRule[] };
    setConfig: React.Dispatch<any>;
    activeConfigType: string;
    InputField: React.ComponentType<any>;
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

    const handleUpdateRule = (index: number, field: keyof FirewallRule, value: string | boolean) => {
        const finalValue = typeof value === 'boolean' ? (value ? 'true' : 'false') : value;
        setConfig((prev: any) => ({
            ...prev,
            firewallRules: prev.firewallRules.map((item: FirewallRule, i: number) =>
                i === index ? { ...item, [field]: finalValue } : item
            )
        }));
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-6 text-gray-900">Firewall Rules</h2>

            {/* Firewall Rules */}
            <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Firewall Rules</h3>
                <Button
                onClick={() => setConfig((prev: any) => ({
                    ...prev,
                    firewallRules: [...prev.firewallRules, {
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
                    description: '',
                    edgeTraversal: 'false',
                    security: 'NotRequired',
                    icmpType: '',
                    icmpCode: ''
                }]
                }))}
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
                        onClick={() => setConfig((prev: any) => ({
                            ...prev,
                            firewallRules: prev.firewallRules.filter((_: any, i: number) => i !== index)
                        }))}
                        className="text-red-600 hover:text-red-800"
                        >
                        <Minus className="w-4 h-4" />
                        </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <InputField
                        label="Rule Name"
                        value={rule.name || ''}
                        onChange={(value: string) => handleUpdateRule(index, 'name', value)}
                        placeholder="MyApp HTTP Server"
                        description="Firewall rule name"
                        />
                        <InputField
                        label="Program"
                        value={rule.program || ''}
                        onChange={(value: string) => handleUpdateRule(index, 'program', value)}
                        placeholder="%PAL:AppDir%\server.exe"
                        description="Program executable path"
                        />
                    </div>
                    <div className="grid grid-cols-4 gap-4 mb-4">
                        <InputField
                        label="Direction"
                        type="select"
                        value={rule.direction || 'Inbound'}
                        onChange={(value: string) => handleUpdateRule(index, 'direction', value)}
                        placeholder={[
                            {value: 'Inbound', label: 'Inbound'},
                            {value: 'Outbound', label: 'Outbound'}
                        ]}
                        />
                        <InputField
                        label="Action"
                        type="select"
                        value={rule.action || 'Allow'}
                        onChange={(value: string) => handleUpdateRule(index, 'action', value)}
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
                        onChange={(value: string) => handleUpdateRule(index, 'protocol', value)}
                        placeholder={[
                            {value: 'TCP', label: 'TCP'},
                            {value: 'UDP', label: 'UDP'},
                            {value: 'ICMPv4', label: 'ICMPv4'},
                            {value: 'ICMPv6', label: 'ICMPv6'},
                            {value: 'Any', label: 'Any'}
                        ]}
                        />
                        <InputField
                            label="If Exists"
                            type="select"
                            value={rule.ifExists || 'replace'}
                            onChange={(value: string) => handleUpdateRule(index, 'ifExists', value)}
                            placeholder={[
                                { value: 'skip', label: 'Skip' },
                                { value: 'backup', label: 'Backup' },
                                { value: 'replace', label: 'Replace' }
                            ]}
                            description="Action if rule already exists"
                        />
                    </div>
                    <div className="grid grid-cols-4 gap-4 mb-4">
                        <InputField
                        label="Local Port"
                        value={rule.localPort || ''}
                        onChange={(value: string) => handleUpdateRule(index, 'localPort', value)}
                        placeholder="8080"
                        description="Port or port range"
                        />
                        <InputField
                            label="Remote Port"
                            value={rule.remotePort || ''}
                            onChange={(value: string) => handleUpdateRule(index, 'remotePort', value)}
                            placeholder="Any"
                            description="Remote port or range"
                        />
                        <InputField
                            label="Local Address"
                            value={rule.localAddress || ''}
                            onChange={(value: string) => handleUpdateRule(index, 'localAddress', value)}
                            placeholder="Any"
                            description="Local IP or subnet"
                        />
                        <InputField
                            label="Remote Address"
                            value={rule.remoteAddress || ''}
                            onChange={(value: string) => handleUpdateRule(index, 'remoteAddress', value)}
                            placeholder="Any"
                            description="Remote IP or subnet"
                        />
                    </div>
                    <div className="grid grid-cols-4 gap-4 mb-4">
                        <InputField
                            label="Service"
                            value={rule.service || ''}
                            onChange={(value: string) => handleUpdateRule(index, 'service', value)}
                            placeholder="MyAppSvc"
                            description="Windows service name"
                        />
                        <InputField
                            label="Profile"
                            value={rule.profile || 'Private,Public'}
                            onChange={(value: string) => handleUpdateRule(index, 'profile', value)}
                            placeholder="Domain,Private,Public"
                            description="Network profiles (comma-separated)"
                        />
                        <InputField
                            label="Interface Type"
                            type="select"
                            value={rule.interfaceType || 'Any'}
                            onChange={(value: string) => handleUpdateRule(index, 'interfaceType', value)}
                            placeholder={[{ value: 'Any', label: 'Any' }, { value: 'Wireless', label: 'Wireless' }, { value: 'Lan', label: 'LAN' }, { value: 'Ras', label: 'RAS' }]}
                            description="Network interface type"
                        />
                        <InputField
                            label="Security"
                            type="select"
                            value={rule.security || 'NotRequired'}
                            onChange={(value: string) => handleUpdateRule(index, 'security', value)}
                            placeholder={[{ value: 'NotRequired', label: 'Not Required' }, { value: 'Authenticate', label: 'Authenticate' }, { value: 'AuthEnc', label: 'Auth & Encrypt' }, { value: 'AuthNoEnc', label: 'Auth No Encrypt' }]}
                            description="IPsec security requirement"
                        />
                    </div>
                    <div className="mb-4">
                        <InputField
                        label="Description"
                        value={rule.description || ''}
                        onChange={(value: string) => handleUpdateRule(index, 'description', value)}
                        placeholder="Allow HTTP access to MyApp server"
                        description="Rule description"
                        />
                    </div>
                    {(rule.protocol === 'ICMPv4' || rule.protocol === 'ICMPv6') && (
                        <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-gray-50 rounded-lg border">
                            <InputField
                                label="ICMP Type"
                                value={rule.icmpType || ''}
                                onChange={(value: string) => handleUpdateRule(index, 'icmpType', value)}
                                placeholder="8"
                                description="ICMP type number (e.g., 8 for Echo Request)"
                            />
                            <InputField
                                label="ICMP Code"
                                value={rule.icmpCode || ''}
                                onChange={(value: string) => handleUpdateRule(index, 'icmpCode', value)}
                                placeholder="0"
                                description="ICMP code number (e.g., 0 for Echo Request)"
                            />
                        </div>
                    )}
                    <div className="grid grid-cols-3 gap-4 items-center">
                        <CheckboxField
                            label="Enabled"
                            checked={rule.enabled === 'true'}
                            onChange={(checked: boolean) => handleUpdateRule(index, 'enabled', checked)}
                        />
                        <CheckboxField
                            label="Required"
                            checked={rule.required === 'true'}
                            onChange={(checked: boolean) => handleUpdateRule(index, 'required', checked)}
                        />
                        <CheckboxField
                            label="Edge Traversal"
                            checked={rule.edgeTraversal === 'true'}
                            onChange={(checked: boolean) => handleUpdateRule(index, 'edgeTraversal', checked)}
                        />
                    </div>
                    </CardContent>
                </Card>
                ))
            )}
            </div>

            <Card className="bg-blue-50 border-blue-200 mt-8">
                <CardContent className="pt-4">
                    <div className="flex items-center">
                        <BrickWallFire className="w-5 h-5 text-blue-500 mr-2" />
                        <h4 className="text-sm font-medium text-blue-800">Firewall Rules Help</h4>
                    </div>
                    <div className="text-sm text-blue-700 mt-2 space-y-1">
                        <p>This section allows you to add and remove rules from the Windows Firewall for your application.</p>
                        <p><strong>Direction:</strong> 'Inbound' rules control traffic coming to your computer, while 'Outbound' rules control traffic leaving it.</p>
                        <p><strong>Profile:</strong> Apply rules to specific network profiles like 'Private', 'Public', or 'Domain'.</p>
                        <p><strong>Activation:</strong> Ensure the <code>Windows Firewall</code> feature is enabled in the <em>Features</em> tab for these settings to take effect.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default FirewallTab;