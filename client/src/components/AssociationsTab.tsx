import React from 'react';
import * as Tooltip from "@radix-ui/react-tooltip"
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Plus, Router, FileType, Menu, MessageCircleWarning, Minus, Database, Settings, CopyPlus, Asterisk } from 'lucide-react';

interface FileType {
    extension: string;
    progId: string;
    description: string;
    defaultIcon?: string;
    openCommand: string;
    editCommand?: string;
    printCommand?: string;
    ifExists?: string; // skip, backup, replace
    priority?: string; // high, normal, low
    mimeType?: string;
}

interface ProtocolHandlers {
    protocol: string;
    progId: string;
    description: string;
    defaultIcon?: string;
    openCommand: string;
    ifExists?: string; // skip, backup, replace
}

interface ContextMenu {
    extension: string; // File extension or * for all files
    menuText: string;
    menuCommand: string;
    menuIcon?: string;
    position?: string; // top, middle, bottom
    ifExists?: string; // skip, backup, replace
    condition?: string; // Registry condition to check
}

interface AssociationsTabProps {
    config: {
        filetypes: FileType[];
        protocolHandlers: ProtocolHandlers[];
        contextMenus: ContextMenu[];
    };
    setConfig: React.Dispatch<any>;
    activeConfigType: string;
    InputField: React.ComponentType<any>;    
    Button: React.ComponentType<{ children: React.ReactNode; [key: string]: any; }>;
    CheckboxField: React.ComponentType<any>;
    Card: React.ComponentType<{ children: React.ReactNode; [key: string]: any; }>;
    CardContent: React.ComponentType<{ children: React.ReactNode; [key: string]: any; }>;
}

const AssociationTab: React.FC<AssociationsTabProps> = ({
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
                <FileType className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>File Associations configuration is only available for Launcher.ini files.</p>
                <p className="text-sm mt-1">Switch to Launcher configuration to access association settings.</p>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-xl font-semibold mb-6 text-gray-900">File Associations</h2>

            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Filetype Associations</h3>
                    <Button
                        onClick={() => setConfig((prev: any) => ({
                            ...prev,
                            filetypes: [...prev.filetypes, { extension: '', progId: '', description: '', defaultIcon: '', openCommand: '', editCommand: '', printCommand: '', ifExists: 'own', priority: 'normal', mimeType: '' }]
                        }))}
                        size="sm"
                    >
                        <Plus className="w-4 h-4 mr-1" />
                        Add Filetype Association
                    </Button>
                </div>

                {config.filetypes.length === 0 ? (
                    <Card className="border-dashed border-2 border-gray-300">
                        <CardContent className="text-center py-8">
                            <FileType className="w-8 h-8 mx-auto mb-2 opacity-50 text-gray-400" />
                            <p className="text-gray-500">No filetype associations configured. Click "Add Filetype Association" to get started.</p>
                        </CardContent>
                    </Card>
                ) : (
                    config.filetypes.map((filetype, index) => (
                        <Card key={index} className="mb-4">
                            <CardContent className="pt-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="font-medium">FileAssociation {index + 1}</h4>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setConfig((prev: any) => ({
                                            ...prev,
                                            filetypes: prev.filetypes.filter((_: any, i: number) => i !== index)
                                        }))}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </Button>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <InputField
                                        label="Extension"
                                        value={filetype.extension || ''}
                                        onChange={(value: string) => setConfig((prev: any) => ({
                                            ...prev,
                                            filetypes: prev.filetypes.map((item: FileType, i: number) => i === index ? { ...item, extension: value } : item)
                                        }))}
                                        placeholder=".myext"
                                        description="File extension (include leading dot)"
                                    />
                                    <InputField
                                        label="ProgID"
                                        value={filetype.progId || ''}
                                        onChange={(value: string) => setConfig((prev: any) => ({
                                            ...prev,
                                            filetypes: prev.filetypes.map((item: FileType, i: number) => i === index ? { ...item, progId: value } : item)
                                        }))}
                                        placeholder="MyApp.Document"
                                        description="Program identifier for the filetype"
                                    />
                                    <InputField
                                        label="Default Icon"
                                        value={filetype.defaultIcon || ''}
                                        onChange={(value: string) => setConfig((prev: any) => ({
                                            ...prev,
                                            filetypes: prev.filetypes.map((item: FileType, i: number) => i === index ? { ...item, defaultIcon: value } : item)
                                        }))}
                                        placeholder="%PAL:AppDir%\App\myapp.exe,0"
                                        description="Path to the icon file,index"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <InputField
                                        label="Description"
                                        value={filetype.description || ''}
                                        onChange={(value: string) => setConfig((prev: any) => ({
                                            ...prev,
                                            filetypes: prev.filetypes.map((item: FileType, i: number) => i === index ? { ...item, description: value } : item)
                                        }))}
                                        placeholder="My Portable App Document"
                                        description="Short description of the filetype."
                                    />
                                    <InputField
                                        label="Open Command"
                                        value={filetype.openCommand || ''}
                                        onChange={(value: string) => setConfig((prev: any) => ({
                                            ...prev,
                                            filetypes: prev.filetypes.map((item: FileType, i: number) => i === index ? { ...item, openCommand: value } : item)
                                        }))}
                                        placeholder='"%PAL:AppDir%\App\myapp.exe" "%1"'
                                        description="Command to open files (%1 = filepath)"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <InputField
                                        label="Edit Command"
                                        value={filetype.editCommand || ''}
                                        onChange={(value: string) => setConfig((prev: any) => ({
                                            ...prev,
                                            filetypes: prev.filetypes.map((item: FileType, i: number) => i === index ? { ...item, editCommand: value } : item)
                                        }))}
                                        placeholder='"%PAL:AppDir%\App\myapp.exe" --edit "%1"'
                                        description="Command to edit files (optional)"
                                    />
                                    <InputField
                                        label="Print Command"
                                        value={filetype.printCommand || ''}
                                        onChange={(value: string) => setConfig((prev: any) => ({
                                            ...prev,
                                            filetypes: prev.filetypes.map((item: FileType, i: number) => i === index ? { ...item, printCommand: value } : item)
                                        }))}
                                        placeholder='"%PAL:AppDir%\App\MyGraphicsApp.exe" --print "%1"'
                                        description="Command to print files (optional)"
                                    />
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <InputField
                                        label="If Exists"
                                        type="select"
                                        value={filetype.ifExists || 'own'}
                                        onChange={(value: string) => setConfig((prev: any) => ({
                                            ...prev,
                                            filetypes: prev.filetypes.map((item: FileType, i: number) => i === index ? { ...item, ifExists: value } : item)
                                        }))}
                                        placeholder={[
                                            { value: 'skip', label: 'Skip' },
                                            { value: 'backup', label: 'Backup' },
                                            { value: 'replace', label: 'Replace' }
                                        ]}
                                        description="If the filetype association already exists, you can either skip it or replace it with the portable version."
                                    />
                                    <InputField
                                        label="Priority"
                                        type="select"
                                        value={filetype.priority || 'normal'}
                                        onChange={(value: string) => setConfig((prev: any) => ({
                                            ...prev,
                                            filetypes: prev.filetypes.map((item: FileType, i: number) => i === index ? { ...item, priority: value } : item)
                                        }))}
                                        placeholder={[
                                            { value: 'high', label: 'High' },
                                            { value: 'normal', label: 'Normal' },
                                            { value: 'low', label: 'Low)' }
                                        ]}
                                        description="For conflicting associations, higher priority takes precedence."
                                    />
                                    <InputField
                                        label="MIME Type"
                                        value={filetype.mimeType || ''}
                                        onChange={(value: string) => setConfig((prev: any) => ({
                                            ...prev,
                                            filetypes: prev.filetypes.map((item: FileType, i: number) => i === index ? { ...item, mimeType: value } : item)
                                        }))}
                                        placeholder="application/x-myapp-document"
                                        description="MIME type for web integration (optional)"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
            
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Protocol Handler</h3>
                    <Button
                        onClick={() => setConfig((prev: any) => ({
                            ...prev,
                            protocolHandlers: [...prev.protocolHandlers, { protocol: '', progId: '', description: '', defaultIcon: '', openCommand: '', ifExists: '' }]
                        }))}
                        size="sm"
                    >
                        <Plus className="w-4 h-4 mr-1" />
                        Add Protocol Association
                    </Button>
                </div>

                {config.protocolHandlers.length === 0 ? (
                    <Card className="border-dashed border-2 border-gray-300">
                        <CardContent className="text-center py-8">
                            <Router className="w-8 h-8 mx-auto mb-2 opacity-50 text-gray-400" />
                            <p className="text-gray-500">No protocols configured. Click "Add Protocol Association" to get started.</p>
                        </CardContent>
                    </Card>
                ) : (
                    config.protocolHandlers.map((protocol, index) => (
                        <Card key={index} className="mb-4">
                            <CardContent className="pt-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="font-medium">ProtocolHandler {index + 1}</h4>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setConfig((prev: any) => ({
                                            ...prev,
                                            protocolHandlers: prev.protocolHandlers.filter((_: any, i: number) => i !== index)
                                        }))}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </Button>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <InputField
                                        label="Protocol"
                                        value={protocol.protocol || ''}
                                        onChange={(value: string) => setConfig((prev: any) => ({
                                            ...prev,
                                            protocolHandlers: prev.protocolHandlers.map((item: ProtocolHandlers, i: number) => i === index ? { ...item, protocol: value } : item)
                                        }))}
                                        placeholder="myvideoplayer"
                                        description="Protocol name (e.g., myapp, mailto)"
                                    />
                                    <InputField
                                        label="ProgID"
                                        value={protocol.progId || ''}
                                        onChange={(value: string) => setConfig((prev: any) => ({
                                            ...prev,
                                            protocolHandlers: prev.protocolHandlers.map((item: ProtocolHandlers, i: number) => i === index ? { ...item, progId: value } : item)
                                        }))}
                                        placeholder="MyVideoPlayer.Stream"
                                        description="Program identifier for the protocol handler"
                                    />
                                    <InputField
                                        label="If Exists"
                                        type="select"
                                        value={protocol.ifExists || 'own'}
                                        onChange={(value: string) => setConfig((prev: any) => ({
                                            ...prev,
                                            protocolHandlers: prev.protocolHandlers.map((item: ProtocolHandlers, i: number) => i === index ? { ...item, ifExists: value } : item)
                                        }))}
                                        placeholder={[
                                            { value: 'skip', label: 'Skip' },
                                            { value: 'backup', label: 'Backup' },
                                            { value: 'replace', label: 'Replace' }
                                        ]}
                                        description="Skip, Backup, or Replace"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <InputField
                                        label="Open Command"
                                        value={protocol.openCommand || ''}
                                        onChange={(value: string) => setConfig((prev: any) => ({
                                            ...prev,
                                            protocolHandlers: prev.protocolHandlers.map((item: ProtocolHandlers, i: number) => i === index ? { ...item, openCommand: value } : item)
                                        }))}
                                        placeholder='"%PAL:AppDir%\App\myapp.exe" "%1"'
                                        description="Command to handle protocol (%1 = full URL)"
                                    />
                                    <InputField
                                        label="Default Icon"
                                        value={protocol.defaultIcon || ''}
                                        onChange={(value: string) => setConfig((prev: any) => ({
                                            ...prev,
                                            protocolHandlers: prev.protocolHandlers.map((item: ProtocolHandlers, i: number) => i === index ? { ...item, defaultIcon: value } : item)
                                        }))}
                                        placeholder="%PAL:AppDir%\App\myapp.exe,0"
                                        description="Path to the icon file,index"
                                    />
                                </div>
                                <div className="mb-4">
                                    <InputField
                                        label="Description"
                                        value={protocol.description || ''}
                                        onChange={(value: string) => setConfig((prev: any) => ({
                                            ...prev,
                                            protocolHandlers: prev.protocolHandlers.map((item: ProtocolHandlers, i: number) => i === index ? { ...item, description: value } : item)
                                        }))}
                                        placeholder="MyVideo Streaming Protocol"
                                        description="Protocol description"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>

            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Context Menus</h3>
                    <Button
                        onClick={() => setConfig((prev: any) => ({
                            ...prev,
                            contextMenus: [...prev.contextMenus, { extension: '', menuText: '', menuCommand: '', menuIcon: '', position: '', ifExists: '', condition: '' }]
                        }))}
                        size="sm"
                    >
                        <Plus className="w-4 h-4 mr-1" />
                        Add Context Menu Items
                    </Button>
                </div>

                {config.contextMenus.length === 0 ? (
                    <Card className="border-dashed border-2 border-gray-300">
                        <CardContent className="text-center py-8">
                            <Menu className="w-8 h-8 mx-auto mb-2 opacity-50 text-gray-400" />
                            <p className="text-gray-500">No context menus configured. Click "Add Context Menu" to get started.</p>
                        </CardContent>
                    </Card>
                ) : (
                    config.contextMenus.map((menu, index) => (
                        <Card key={index} className="mb-4">
                            <CardContent className="pt-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="font-medium">ContextMenu {index + 1}</h4>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setConfig((prev: any) => ({
                                            ...prev,
                                            contextMenus: prev.contextMenus.filter((_: any, i: number) => i !== index)
                                        }))}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </Button>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <InputField
                                        label="Extension"
                                        value={menu.extension || ''}
                                        onChange={(value: string) => setConfig((prev: any) => ({
                                            ...prev,
                                            contextMenus: prev.contextMenus.map((item: ContextMenu, i: number) => i === index ? { ...item, extension: value } : item)
                                        }))}
                                        placeholder=".jpg,.png,.gif,.bmp"
                                        description="File extension or * for all files"
                                    />
                                    <InputField
                                        label="Menu Text"
                                        value={menu.menuText || ''}
                                        onChange={(value: string) => setConfig((prev: any) => ({
                                            ...prev,
                                            contextMenus: prev.contextMenus.map((item: ContextMenu, i: number) => i === index ? { ...item, menuText: value } : item)
                                        }))}
                                        placeholder="Edit with MyGraphics"
                                        description="Text to show in context menu"
                                    />
                                    <InputField
                                        label="Menu Icon"
                                        value={menu.menuIcon || ''}
                                        onChange={(value: string) => setConfig((prev: any) => ({
                                            ...prev,
                                            contextMenus: prev.contextMenus.map((item: ContextMenu, i: number) => i === index ? { ...item, menuIcon: value } : item)
                                        }))}
                                        placeholder="%PAL:AppDir%\icons\edit.ico,0"
                                        description="Path to icon file,index (optional)"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <InputField
                                        label="Menu Command"
                                        value={menu.menuCommand || ''}
                                        onChange={(value: string) => setConfig((prev: any) => ({
                                            ...prev,
                                            contextMenus: prev.contextMenus.map((item: ContextMenu, i: number) => i === index ? { ...item, menuCommand: value } : item)
                                        }))}
                                        placeholder='"%PAL:AppDir%\MyGraphicsApp.exe" --quick-edit "%1"'
                                        description="Command to execute (%1 = filepath)"
                                    />
                                    <InputField
                                        label="Position"
                                        value={menu.position || ''}
                                        onChange={(value: string) => setConfig((prev: any) => ({
                                            ...prev,
                                            contextMenus: prev.contextMenus.map((item: ContextMenu, i: number) => i === index ? { ...item, position: value } : item)
                                        }))}
                                        placeholder="top"
                                        description="Top, Middle, or Bottom."
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <InputField
                                        label="If Exists"
                                        type="select"
                                        value={menu.ifExists || 'own'}
                                        onChange={(value: string) => setConfig((prev: any) => ({
                                            ...prev,
                                            contextMenus: prev.contextMenus.map((item: ContextMenu, i: number) => i === index ? { ...item, ifExists: value } : item)
                                        }))}
                                        placeholder={[
                                            { value: 'skip', label: 'Skip' },
                                            { value: 'backup', label: 'Backup' },
                                            { value: 'replace', label: 'Replace' }
                                        ]}
                                        description="Skip, Backup, or Replace"
                                    />
                                    <InputField
                                        label="Condition"
                                        value={menu.condition || ''}
                                        onChange={(value: string) => setConfig((prev: any) => ({
                                            ...prev,
                                            contextMenus: prev.contextMenus.map((item: ContextMenu, i: number) => i === index ? { ...item, condition: value } : item)
                                        }))}
                                        placeholder=''
                                        description="Registry condition to check (optional)"
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
                        <FileType className="w-5 h-5 text-blue-500 mr-2" />
                        <h4 className="text-sm font-medium text-blue-800">File Association Help</h4>
                    </div>
                    <div className="text-sm text-blue-700 mt-2 space-y-1">
                        <p><strong>Filetype Associations:</strong> Link file extensions (e.g., .txt) to your portable application.</p>
                        <p><strong>Protocol Handlers:</strong> Register your app to handle custom URL protocols (e.g., <code>myapp://</code>).</p>
                        <p><strong>Context Menus:</strong> Add custom actions to the right-click menu for specific file types.</p>
                        <p>
                            <strong>Activation:</strong> Ensure the <code>Associations</code> feature is enabled in the <em>Features</em> tab for these settings to take effect.
                        </p>
                        <p><strong>PAL Variables:</strong> Use variables like <code>%PAL:AppDir%</code> in commands for portability.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default AssociationTab;