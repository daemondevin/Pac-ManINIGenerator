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
    addArrayItem: (section: 'registerDLLs', value: any) => void;
    removeArrayItem: (key: string, index: number) => void;
    updateArrayItem: (key: string, index: number, field: string, value: any) => void;
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
                        onClick={() => addArrayItem('registerDLLs', { progId: '', file: '', type: 'REGDLL' })}
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
                                        onChange={(value: string) => updateArrayItem('registerDLLs', index, 'progId', value)}
                                        placeholder="MyApp.Component"
                                        description="Program ID for the DLL component"
                                    />
                                    <InputField
                                        label="DLL File Path"
                                        value={dll.file || ''}
                                        onChange={(value: string) => updateArrayItem('registerDLLs', index, 'file', value)}
                                        placeholder="%PAL:AppDir%\components\mylib.dll"
                                        description="Path to DLL file"
                                    />
                                </div>
                                <div className="grid grid-cols-1 gap-4">
                                    <InputField
                                        label="Registration Type"
                                        type="select"
                                        value={dll.type || 'REGDLL'}
                                        onChange={(value: string) => updateArrayItem('registerDLLs', index, 'type', value)}
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
                                    Be sure to enable <code>RegDLLs</code> in the <em>Activate</em> tab.
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

export default RegDllsTab;