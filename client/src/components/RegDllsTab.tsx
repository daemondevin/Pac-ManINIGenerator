import React from 'react';
import * as Tooltip from "@radix-ui/react-tooltip"
import { Plus, Asterisk, Minus, Settings, SquareLibrary } from 'lucide-react';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';

interface RegDLL {
    type: string;
    file: string;
    progId?: string;
};

interface RegDLLsTabProps {
    config: { registerDLLs: RegDLL[] };
    setConfig: (config: any) => void;
    activeConfigType: string;
    InputField: React.ComponentType<any>;
    Button: React.ComponentType<any>;
    CheckboxField: React.ComponentType<any>;
    Card: React.ComponentType<any>;
    CardContent: React.ComponentType<any>;
}

const RegDllsTab: React.FC<RegDLLsTabProps> = ({
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
                <SquareLibrary className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>Register DLL configuration is only available for Launcher.ini files.</p>
                <p className="text-sm mt-1">Switch to Launcher configuration to access DLL component settings.</p>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-xl font-semibold mb-6 text-gray-900">DLL Registration</h2>

            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">DLL Registration</h3>
                    <Button
                        onClick={() => setConfig((prev: any) => ({
                            ...prev,
                            registerDLLs: [...prev.registerDLLs, { progId: '', file: '', type: 'REGDLL' }]
                        }))}
                        size="sm"
                    >
                        <Plus className="w-4 h-4 mr-1" />
                        Add Component to Register
                    </Button>
                </div>

                {config.registerDLLs.length === 0 ? (
                    <Card className="border-dashed border-2 border-gray-300">
                        <CardContent className="text-center py-8">
                            <Settings className="w-8 h-8 mx-auto mb-2 opacity-50 text-gray-400" />
                            <p className="text-gray-500">No DLLs configured for registration. Click "Add Component to Register" to get started.</p>
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
                                        onClick={() => setConfig((prev: any) => ({
                                            ...prev,
                                            registerDLLs: prev.registerDLLs.filter((_: any, i: number) => i !== index)
                                        }))}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </Button>
                                </div>
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <InputField
                                        label="ProgID"
                                        value={dll.progId || ''}                                        
                                        onChange={(value: string) => setConfig((prev: any) => ({
                                            ...prev,
                                            registerDLLs: prev.registerDLLs.map((item: RegDLL, i: number) => i === index ? { ...item, progId: value } : item)
                                        }))}
                                        placeholder="MyApp.Component"
                                        description="Program ID for the DLL component"
                                    />
                                    <InputField
                                        label="DLL File Path"
                                        value={dll.file || ''}                                        
                                        onChange={(value: string) => setConfig((prev: any) => ({
                                            ...prev,
                                            registerDLLs: prev.registerDLLs.map((item: RegDLL, i: number) => i === index ? { ...item, file: value } : item)
                                        }))}
                                        placeholder="%PAL:AppDir%\components\mylib.dll"
                                        description="Path to DLL file"
                                    />
                                </div>
                                <div className="grid grid-cols-1 gap-4">
                                    <InputField
                                        label="Registration Type"
                                        type="select"
                                        value={dll.type || 'REGDLL'}                                        
                                        onChange={(value: string) => setConfig((prev: any) => ({
                                            ...prev,
                                            registerDLLs: prev.registerDLLs.map((item: RegDLL, i: number) => i === index ? { ...item, type: value } : item)
                                        }))}
                                        placeholder={[
                                            { value: 'REGDLL', label: 'Register DLL' },
                                            { value: 'REGTLB', label: 'Register Type Library' },
                                            { value: 'REGDLLTLB', label: 'Register DLL & Type Library' },
                                            { value: 'REGEXE', label: 'Register Executable' },
                                            { value: 'REGTLB for user', label: 'Register TLB for User' }
                                        ]}
                                        description="Type of registration to perform"
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
                        <SquareLibrary className="w-5 h-5 text-blue-500 mr-2" />
                        <h4 className="text-sm font-medium text-blue-800">Component Registration Configuration Help</h4>
                    </div>
                    <div className="text-sm text-blue-700 mt-2 space-y-1">
                        <p><strong>DLL Registration:</strong> Register and unregister COM components (DLLs, OCXs, EXEs) and type libraries.</p>
                        <p><strong>ProgID:</strong> The Programmatic Identifier for the component, like 'MyComponent.Object'.</p>
                        <p>
                            <strong>Activation:</strong> Ensure the <code>DLL Registration</code> feature is enabled in the <em>Features</em> tab for these settings to take effect.
                        </p>
                        <p><strong>PAL Variables:</strong> Use variables like <code>%PAL:AppDir%</code> in file paths for portability.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default RegDllsTab;