import React from 'react';
import { Plus, Minus, Cpu } from 'lucide-react';

interface VCRuntime {
    version: string;
    architecture: string;
    mode?: string;
    action?: string;
    source?: string;
    minVersion?: string;
    required?: string;
}

interface NETRuntime {
    framework: string;
    architecture?: string;
    mode?: string;
    action?: string;
    source?: string;
    minVersion?: string;
    required?: string;
}

interface RuntimesTabProps {
    config: {
        vcRuntimes: VCRuntime[];
        netRuntimes: NETRuntime[];
    };
    setConfig: React.Dispatch<any>;
    activeConfigType: string;
    InputField: React.ComponentType<any>;
    Button: React.ComponentType<any>;
    CheckboxField: React.ComponentType<any>;
    Card: React.ComponentType<any>;
    CardContent: React.ComponentType<any>;
}

const RuntimesTab: React.FC<RuntimesTabProps> = ({
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
                <Cpu className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>Runtime Dependencies configuration is only available for Launcher.ini files.</p>
                <p className="text-sm mt-1">Switch to Launcher configuration to access runtime settings.</p>
            </div>
        );
    }

    const addRuntime = (type: 'vcRuntimes' | 'netRuntimes') => {
        const newItem = type === 'vcRuntimes'
            ? { version: '2022', architecture: 'x86', mode: 'detect', action: 'warn', required: 'false' }
            : { framework: 'net80', architecture: 'anycpu', mode: 'detect', action: 'warn', required: 'false' };
        setConfig((prev: any) => ({
            ...prev,
            [type]: [...(prev[type] || []), newItem]
        }));
    };

    const removeRuntime = (type: 'vcRuntimes' | 'netRuntimes', index: number) => {
        setConfig((prev: any) => ({
            ...prev,
            [type]: prev[type].filter((_: any, i: number) => i !== index)
        }));
    };

    const updateRuntime = (type: 'vcRuntimes' | 'netRuntimes', index: number, field: string, value: any) => {
        const finalValue = typeof value === 'boolean' ? (value ? 'true' : 'false') : value;
        setConfig((prev: any) => ({
            ...prev,
            [type]: prev[type].map((item: any, i: number) =>
                i === index ? { ...item, [field]: finalValue } : item
            )
        }));
    };

    const renderVCSection = () => (
        <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Visual C++ Runtimes</h3>
                <Button onClick={() => addRuntime('vcRuntimes')} size="sm">
                    <Plus className="w-4 h-4 mr-1" /> Add VC++ Runtime
                </Button>
            </div>
            {(config.vcRuntimes || []).map((runtime, index) => (
                <Card key={index} className="mb-4">
                    <CardContent className="pt-4">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="font-medium">VC++ Runtime {index + 1}</h4>
                            <Button variant="ghost" size="sm" onClick={() => removeRuntime('vcRuntimes', index)} className="text-red-600 hover:text-red-800">
                                <Minus className="w-4 h-4" />
                            </Button>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <InputField
                                label="Version"
                                type="select"
                                value={runtime.version}
                                onChange={(v: string) => updateRuntime('vcRuntimes', index, 'version', v)}
                                placeholder={[{ value: '2022', label: '2022' }, { value: '2019', label: '2019' }, { value: '2017', label: '2017' }, { value: '2015', label: '2015' }, { value: '2013', label: '2013' }, { value: '2012', label: '2012' }, { value: '2010', label: '2010' }, { value: '2008', label: '2008' }, { value: '2005', label: '2005' }]}
                                description="VC++ Version"
                            />
                            <InputField
                                label="Architecture"
                                type="select"
                                value={runtime.architecture}
                                onChange={(v: string) => updateRuntime('vcRuntimes', index, 'architecture', v)}
                                placeholder={[{ value: 'x86', label: 'x86' }, { value: 'x64', label: 'x64' }, { value: 'both', label: 'Both' }]}
                                description="Target architecture"
                            />
                            <InputField
                                label="Mode"
                                type="select"
                                value={runtime.mode || 'detect'}
                                onChange={(v: string) => updateRuntime('vcRuntimes', index, 'mode', v)}
                                placeholder={[{ value: 'detect', label: 'Detect' }, { value: 'install', label: 'Install' }, { value: 'bundle', label: 'Bundle' }]}
                                description="How to handle the runtime"
                            />
                            <InputField
                                label="Action"
                                type="select"
                                value={runtime.action || 'warn'}
                                onChange={(v: string) => updateRuntime('vcRuntimes', index, 'action', v)}
                                placeholder={[{ value: 'skip', label: 'Skip' }, { value: 'warn', label: 'Warn' }, { value: 'install', label: 'Install' }, { value: 'bundle', label: 'Bundle' }]}
                                description="Action if not found"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <InputField
                                label="Source"
                                value={runtime.source || ''}
                                onChange={(v: string) => updateRuntime('vcRuntimes', index, 'source', v)}
                                placeholder="Path to redistributable"
                                description="Optional path to installer"
                            />
                            <InputField
                                label="Min Version"
                                value={runtime.minVersion || ''}
                                onChange={(v: string) => updateRuntime('vcRuntimes', index, 'minVersion', v)}
                                placeholder="e.g. 14.30.30704"
                                description="Minimum required version"
                            />
                        </div>
                        <CheckboxField label="Required" checked={runtime.required === 'true'} onChange={(checked: boolean) => updateRuntime('vcRuntimes', index, 'required', checked)} />
                    </CardContent>
                </Card>
            ))}
        </div>
    );

    const renderNETSection = () => (
        <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">.NET Runtimes</h3>
                <Button onClick={() => addRuntime('netRuntimes')} size="sm">
                    <Plus className="w-4 h-4 mr-1" /> Add .NET Runtime
                </Button>
            </div>
            {(config.netRuntimes || []).map((runtime, index) => (
                <Card key={index} className="mb-4">
                    <CardContent className="pt-4">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="font-medium">.NET Runtime {index + 1}</h4>
                            <Button variant="ghost" size="sm" onClick={() => removeRuntime('netRuntimes', index)} className="text-red-600 hover:text-red-800">
                                <Minus className="w-4 h-4" />
                            </Button>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <InputField
                                label="Framework"
                                type="select"
                                value={runtime.framework}
                                onChange={(v: string) => updateRuntime('netRuntimes', index, 'framework', v)}
                                placeholder={[{ value: 'net80', label: '.NET 8.0' }, { value: 'net70', label: '.NET 7.0' }, { value: 'net60', label: '.NET 6.0' }, { value: 'net50', label: '.NET 5.0' }, { value: 'net48', label: '.NET 4.8' }, { value: 'net47', label: '.NET 4.7' }, { value: 'net46', label: '.NET 4.6' }, { value: 'net45', label: '.NET 4.5' }, { value: 'net40', label: '.NET 4.0' }, { value: 'net35', label: '.NET 3.5' }, { value: 'net20', label: '.NET 2.0' }]}
                                description=".NET Framework version"
                            />
                            <InputField
                                label="Architecture"
                                type="select"
                                value={runtime.architecture || 'anycpu'}
                                onChange={(v: string) => updateRuntime('netRuntimes', index, 'architecture', v)}
                                placeholder={[{ value: 'anycpu', label: 'Any CPU' }, { value: 'x86', label: 'x86' }, { value: 'x64', label: 'x64' }, { value: 'both', label: 'Both' }]}
                                description="Target architecture"
                            />
                            <InputField
                                label="Mode"
                                type="select"
                                value={runtime.mode || 'detect'}
                                onChange={(v: string) => updateRuntime('netRuntimes', index, 'mode', v)}
                                placeholder={[{ value: 'detect', label: 'Detect' }, { value: 'install', label: 'Install' }, { value: 'bundle', label: 'Bundle' }]}
                                description="How to handle the runtime"
                            />
                            <InputField
                                label="Action"
                                type="select"
                                value={runtime.action || 'warn'}
                                onChange={(v: string) => updateRuntime('netRuntimes', index, 'action', v)}
                                placeholder={[{ value: 'skip', label: 'Skip' }, { value: 'warn', label: 'Warn' }, { value: 'install', label: 'Install' }, { value: 'bundle', label: 'Bundle' }]}
                                description="Action if not found"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <InputField label="Source" value={runtime.source || ''} onChange={(v: string) => updateRuntime('netRuntimes', index, 'source', v)} placeholder="Path to .NET installer" description="Optional path to installer" />
                            <InputField label="Min Version" value={runtime.minVersion || ''} onChange={(v: string) => updateRuntime('netRuntimes', index, 'minVersion', v)} placeholder="e.g. 8.0.1" description="Minimum required version" />
                        </div>
                        <CheckboxField
                            label="Required" checked={runtime.required === 'true'} onChange={(checked: boolean) => updateRuntime('netRuntimes', index, 'required', checked)}
                        />
                    </CardContent>
                </Card>
            ))}
        </div>
    );

    return (
        <div>
            <h2 className="text-xl font-semibold mb-6 text-gray-900">Runtime Dependencies</h2>
            {renderVCSection()}
            {renderNETSection()}
            <Card className="bg-blue-50 border-blue-200 mt-8">
                <CardContent className="pt-4">
                    <div className="flex items-center">
                        <Cpu className="w-5 h-5 text-blue-500 mr-2" />
                        <h4 className="text-sm font-medium text-blue-800">Runtime Dependencies Help</h4>
                    </div>
                    <div className="text-sm text-blue-700 mt-2 space-y-1">
                        <p><strong>VC++ Runtimes:</strong> Specify which versions of the Visual C++ Redistributable your application requires.</p>
                        <p><strong>.NET Runtimes:</strong> Specify which versions of the .NET Framework your application needs.</p>
                        <p><strong>Mode:</strong> 'Detect' checks if the runtime is present, 'Install' will install it if missing, and 'Bundle' includes it within your app.</p>
                        <p><strong>Action:</strong> If a dependency is missing, 'warn' will notify the user, 'install' will attempt installation, and 'skip' will do nothing.</p>
                        <p><strong>Activation:</strong> Ensure the <code>Runtime</code> feature is enabled in the <em>Features</em> tab for these settings to take effect.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default RuntimesTab;