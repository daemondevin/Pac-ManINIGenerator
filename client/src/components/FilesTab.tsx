import React from 'react';
import { Plus, Minus, FolderOpen, Settings } from 'lucide-react';

interface FilesTabProps {
    config: any;
    setConfig: (config: any) => void;
    activeConfigType: string;
    InputField: React.ComponentType<any>;
    Button: React.ComponentType<any>;
    Card: React.ComponentType<any>;
    CardContent: React.ComponentType<any>;
}

const FilesTab: React.FC<FilesTabProps> = ({
    config,
    setConfig,
    activeConfigType,
    InputField,
    Button,
    Card,
    CardContent
}) => {
    if (activeConfigType !== 'launcher') {
        return (
            <div className="text-center py-8 text-gray-500">
                <FolderOpen className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>Files & Directories configuration is only available for Launcher.ini files.</p>
                <p className="text-sm mt-1">Switch to Launcher configuration to access file management settings.</p>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-xl font-semibold mb-6">Files & Directories Management</h2>

            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">File Writes</h3>
                    <Button
                        onClick={() => setConfig((prev: any) => ({
                            ...prev,
                            fileWrites: [...(prev.fileWrites || []), { type: 'INI', file: '', section: '', key: '', value: '' }]
                        }))}
                        size="sm"
                    >
                        <Plus className="w-4 h-4 mr-1" />
                        Add File Write
                    </Button>
                </div>
                {(config.fileWrites || []).map((write: any, index: number) => (
                    <Card key={index} className="mb-4">
                        <CardContent className="pt-4">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="font-medium">File Write {index + 1}</h4>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setConfig((prev: any) => ({
                                        ...prev,
                                        fileWrites: prev.fileWrites.filter((_: any, i: number) => i !== index)
                                    }))}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    <Minus className="w-4 h-4" />
                                </Button>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <InputField
                                    label="Type"
                                    type="select"
                                    value={write.type || 'INI'}
                                    onChange={(value: string) => setConfig((prev: any) => ({ ...prev, fileWrites: prev.fileWrites.map((item: any, i: number) => i === index ? { ...item, type: value } : item) }))}
                                    placeholder={[{ value: 'INI', label: 'INI' }, { value: 'Replace', label: 'Replace' }, { value: 'ConfigWrite', label: 'ConfigWrite' }]}
                                />
                                <InputField
                                    label="File"
                                    value={write.file || ''}
                                    onChange={(value: string) => setConfig((prev: any) => ({ ...prev, fileWrites: prev.fileWrites.map((item: any, i: number) => i === index ? { ...item, file: value } : item) }))}
                                    placeholder="%PAL:DataDir%\settings\config.ini"
                                />
                            </div>
                            {write.type === 'INI' && (
                                <div className="grid grid-cols-3 gap-4 mt-4">
                                    <InputField
                                        label="Section"
                                        value={write.section || ''}
                                        onChange={(value: string) => setConfig((prev: any) => ({ ...prev, fileWrites: prev.fileWrites.map((item: any, i: number) => i === index ? { ...item, section: value } : item) }))}
                                    />
                                    <InputField
                                        label="Key"
                                        value={write.key || ''}
                                        onChange={(value: string) => setConfig((prev: any) => ({ ...prev, fileWrites: prev.fileWrites.map((item: any, i: number) => i === index ? { ...item, key: value } : item) }))}
                                    />
                                    <InputField
                                        label="Value"
                                        value={write.value || ''}
                                        onChange={(value: string) => setConfig((prev: any) => ({ ...prev, fileWrites: prev.fileWrites.map((item: any, i: number) => i === index ? { ...item, value: value } : item) }))}
                                    />
                                </div>
                            )}
                            {write.type === 'Replace' && (
                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    <InputField
                                        label="Find"
                                        value={write.find || ''}
                                        onChange={(value: string) => setConfig((prev: any) => ({ ...prev, fileWrites: prev.fileWrites.map((item: any, i: number) => i === index ? { ...item, find: value } : item) }))}
                                    />
                                    <InputField
                                        label="Replace"
                                        value={write.replace || ''}
                                        onChange={(value: string) => setConfig((prev: any) => ({ ...prev, fileWrites: prev.fileWrites.map((item: any, i: number) => i === index ? { ...item, replace: value } : item) }))}
                                    />
                                </div>
                            )}
                            {write.type === 'ConfigWrite' && (
                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    <InputField
                                        label="Entry"
                                        value={write.entry || ''}
                                        onChange={(value: string) => setConfig((prev: any) => ({ ...prev, fileWrites: prev.fileWrites.map((item: any, i: number) => i === index ? { ...item, entry: value } : item) }))}
                                    />
                                    <InputField
                                        label="Value"
                                        value={write.value || ''}
                                        onChange={(value: string) => setConfig((prev: any) => ({ ...prev, fileWrites: prev.fileWrites.map((item: any, i: number) => i === index ? { ...item, value: value } : item) }))}
                                    />
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Files Move</h3>
                    <Button
                        onClick={() => setConfig((prev: any) => ({
                            ...prev,
                            filesMove: [...prev.filesMove, { source: '', destination: '' }]
                        }))}
                        size="sm"
                    >
                        <Plus className="w-4 h-4 mr-1" />
                        Add File Move
                    </Button>
                </div>

                {config.filesMove.length === 0 ? (
                    <Card className="border-dashed border-2 border-gray-300">
                        <CardContent className="text-center py-8">
                            <FolderOpen className="w-8 h-8 mx-auto mb-2 opacity-50 text-gray-400" />
                            <p className="text-gray-500">No file moves configured. Click "Add File Move" to get started.</p>
                        </CardContent>
                    </Card>
                ) : (
                    config.filesMove.map((file: { source: string; destination: string }, index: number) => (
                        <Card key={index} className="mb-4">
                            <CardContent className="pt-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="font-medium">File Move {index + 1}</h4>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setConfig((prev: any) => ({
                                            ...prev,
                                            filesMove: prev.filesMove.filter((_: any, i: number) => i !== index)
                                        }))}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </Button>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <InputField
                                        label="Source File"
                                        value={file.source || ''}                                        
                                        onChange={(value: string) => setConfig((prev: any) => ({
                                            ...prev,
                                            filesMove: prev.filesMove.map((item: any, i: number) => i === index ? { ...item, source: value } : item)
                                        }))}
                                        placeholder="settings\config.ini"
                                        description="File path relative to Data directory"
                                    />
                                    <InputField
                                        label="Destination"
                                        value={file.destination || ''}                                        
                                        onChange={(value: string) => setConfig((prev: any) => ({
                                            ...prev,
                                            filesMove: prev.filesMove.map((item: any, i: number) => i === index ? { ...item, destination: value } : item)
                                        }))}
                                        placeholder="%PAL:AppDir%\MyApp"
                                        description="Target directory where file should be moved"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>

            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Directory Moves</h3>
                    <Button
                        onClick={() => setConfig((prev: any) => ({
                            ...prev,
                            directoriesMove: [...prev.directoriesMove, { source: '', destination: '' }]
                        }))}
                        size="sm"
                    >
                        <Plus className="w-4 h-4 mr-1" />
                        Add Directory Move
                    </Button>
                </div>

                {config.directoriesMove.length === 0 ? (
                    <Card className="border-dashed border-2 border-gray-300">
                        <CardContent className="text-center py-8">
                            <FolderOpen className="w-8 h-8 mx-auto mb-2 opacity-50 text-gray-400" />
                            <p className="text-gray-500">No directory moves configured. Click "Add Directory Move" to get started.</p>
                        </CardContent>
                    </Card>
                ) : (
                    config.directoriesMove.map((dir: { source: string; destination: string }, index: number) => (
                        <Card key={index} className="mb-4">
                            <CardContent className="pt-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="font-medium">Directory Move {index + 1}</h4>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setConfig((prev: any) => ({
                                            ...prev,
                                            directoriesMove: prev.directoriesMove.filter((_: any, i: number) => i !== index)
                                        }))}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </Button>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <InputField
                                        label="Source Directory"
                                        value={dir.source || ''}                                        
                                        onChange={(value: string) => setConfig((prev: any) => ({
                                            ...prev,
                                            directoriesMove: prev.directoriesMove.map((item: any, i: number) => i === index ? { ...item, source: value } : item)
                                        }))}
                                        placeholder="settings"
                                        description="Directory relative to Data directory"
                                    />
                                    <InputField
                                        label="Destination Directory"
                                        value={dir.destination || ''}                                        
                                        onChange={(value: string) => setConfig((prev: any) => ({
                                            ...prev,
                                            directoriesMove: prev.directoriesMove.map((item: any, i: number) => i === index ? { ...item, destination: value } : item)
                                        }))}
                                        placeholder="%APPDATA%\Publisher\AppName"
                                        description="Target system directory"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>

            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Environment Variables</h3>
                    <Button
                        onClick={() => setConfig((prev: any) => ({
                            ...prev,
                            environment: [...prev.environment, { name: '', value: '' }]
                        }))}
                        size="sm"
                    >
                        <Plus className="w-4 h-4 mr-1" />
                        Add Variable
                    </Button>
                </div>

                {config.environment.length === 0 ? (
                    <Card className="border-dashed border-2 border-gray-300">
                        <CardContent className="text-center py-8">
                            <Settings className="w-8 h-8 mx-auto mb-2 opacity-50 text-gray-400" />
                            <p className="text-gray-500">No environment variables configured. Click "Add Variable" to get started.</p>
                        </CardContent>
                    </Card>
                ) : (
                    config.environment.map((env: { name: string; value: string }, index: number) => (
                        <Card key={index} className="mb-4">
                            <CardContent className="pt-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="font-medium">Environment Variable {index + 1}</h4>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setConfig((prev: any) => ({
                                            ...prev,
                                            environment: prev.environment.filter((_: any, i: number) => i !== index)
                                        }))}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </Button>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <InputField
                                        label="Variable Name"
                                        value={env.name || ''}                                        
                                        onChange={(value: string) => setConfig((prev: any) => ({
                                            ...prev,
                                            environment: prev.environment.map((item: any, i: number) => i === index ? { ...item, name: value } : item)
                                        }))}
                                        placeholder="JAVA_HOME"
                                        description="Environment variable name"
                                    />
                                    <InputField
                                        label="Variable Value"
                                        value={env.value || ''}                                        
                                        onChange={(value: string) => setConfig((prev: any) => ({
                                            ...prev,
                                            environment: prev.environment.map((item: any, i: number) => i === index ? { ...item, value: value } : item)
                                        }))}
                                        placeholder="%PAL:AppDir%\java"
                                        description="Environment variable value (supports PAL variables)"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>

            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">File Cleanup</h3>
                    <Button
                        onClick={() => setConfig((prev: any) => ({
                            ...prev,
                            filesCleanup: [...(prev.filesCleanup || []), { source: '' }]
                        }))}
                        size="sm"
                    >
                        <Plus className="w-4 h-4 mr-1" />
                        Add File to Cleanup
                    </Button>
                </div>
                {(config.filesCleanup || []).map((file: { source: string }, index: number) => (
                    <Card key={index} className="mb-4">
                        <CardContent className="pt-4">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="font-medium">File Cleanup {index + 1}</h4>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setConfig((prev: any) => ({
                                        ...prev,
                                        filesCleanup: prev.filesCleanup.filter((_: any, i: number) => i !== index)
                                    }))}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    <Minus className="w-4 h-4" />
                                </Button>
                            </div>
                            <InputField
                                label="File to Cleanup"
                                value={file.source || ''}
                                onChange={(value: string) => setConfig((prev: any) => ({ ...prev, filesCleanup: prev.filesCleanup.map((item: any, i: number) => i === index ? { ...item, source: value } : item) }))}
                                placeholder="%TEMP%\myapp.log"
                                description="Path to file to be deleted on exit"
                            />
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Directory Cleanup If Empty</h3>
                    <Button
                        onClick={() => setConfig((prev: any) => ({
                            ...prev,
                            directoriesCleanupIfEmpty: [...(prev.directoriesCleanupIfEmpty || []), { source: '' }]
                        }))}
                        size="sm"
                    >
                        <Plus className="w-4 h-4 mr-1" />
                        Add Directory to Cleanup
                    </Button>
                </div>
                {(config.directoriesCleanupIfEmpty || []).map((dir: { source: string }, index: number) => (
                    <Card key={index} className="mb-4">
                        <CardContent className="pt-4">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="font-medium">Directory Cleanup {index + 1}</h4>
                                <Button variant="ghost" size="sm" onClick={() => setConfig((prev: any) => ({ ...prev, directoriesCleanupIfEmpty: prev.directoriesCleanupIfEmpty.filter((_: any, i: number) => i !== index) }))} className="text-red-600 hover:text-red-800">
                                    <Minus className="w-4 h-4" />
                                </Button>
                            </div>
                            <InputField
                                label="Directory to Cleanup"
                                value={dir.source || ''}
                                onChange={(value: string) => setConfig((prev: any) => ({ ...prev, directoriesCleanupIfEmpty: prev.directoriesCleanupIfEmpty.map((item: any, i: number) => i === index ? { ...item, source: value } : item) }))}
                                placeholder="%APPDATA%\MyApp"
                                description="Directory to be deleted on exit if empty"
                            />
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Directory Cleanup Force</h3>
                    <Button
                        onClick={() => setConfig((prev: any) => ({
                            ...prev,
                            directoriesCleanupForce: [...(prev.directoriesCleanupForce || []), { source: '' }]
                        }))}
                        size="sm"
                    >
                        <Plus className="w-4 h-4 mr-1" />
                        Add Directory to Force Cleanup
                    </Button>
                </div>
                {(config.directoriesCleanupForce || []).map((dir: { source: string }, index: number) => (
                    <Card key={index} className="mb-4">
                        <CardContent className="pt-4">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="font-medium">Directory Force Cleanup {index + 1}</h4>
                                <Button variant="ghost" size="sm" onClick={() => setConfig((prev: any) => ({ ...prev, directoriesCleanupForce: prev.directoriesCleanupForce.filter((_: any, i: number) => i !== index) }))} className="text-red-600 hover:text-red-800">
                                    <Minus className="w-4 h-4" />
                                </Button>
                            </div>
                            <InputField
                                label="Directory to Force Cleanup"
                                value={dir.source || ''}
                                onChange={(value: string) => setConfig((prev: any) => ({ ...prev, directoriesCleanupForce: prev.directoriesCleanupForce.map((item: any, i: number) => i === index ? { ...item, source: value } : item) }))}
                                placeholder="%TEMP%\MyAppCache"
                                description="Directory to be deleted on exit regardless of content"
                            />
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card className="bg-green-50 border-green-200">
                <CardContent className="pt-4">
                    <div className="flex items-center">
                        <FolderOpen className="w-5 h-5 text-green-500 mr-2" />
                        <h4 className="text-sm font-medium text-green-800">File & Directory Management Help</h4>
                    </div>
                    <div className="text-sm text-green-700 mt-2 space-y-2">
                        <p><strong>File Writes:</strong> Write or replace text in configuration files (like INI) at launch time. Useful for setting dynamic paths or options.</p>
                        <p><strong>File Moves:</strong> Individual files moved from Data directory to system locations during startup.</p>
                        <p><strong>Directory Moves:</strong> Entire directories moved between portable and system locations.</p>
                        <p><strong>File/Directory Cleanup:</strong> Specify files or directories to be deleted on application exit. `Cleanup If Empty` only removes a directory if it contains no files.</p>
                        <p><strong>Environment Variables:</strong> Custom environment variables set for the application.</p>
                        <p><strong>PAL Variables:</strong> Use variables like <code>%PAL:DataDir%</code>, <code>%PAL:AppDir%</code>, and <code>%APPDATA%</code> for portable paths.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default FilesTab;