import React from 'react';
import { Plus, Minus, Link2 } from 'lucide-react';

interface LinkItem {
    linkPath: string;
    targetPath: string;
    type?: string;
    ifExists?: string;
    required?: string;
    relative?: string;
    temporary?: string;
}

interface JunctionItem {
    junctionPath: string;
    targetPath: string;
    ifExists?: string;
    required?: string;
    temporary?: string;
}

interface SymlinksTabProps {
    config: {
        symLinks: LinkItem[];
        junctions: JunctionItem[];
        hardLinks: LinkItem[];
    };
    setConfig: React.Dispatch<any>;
    activeConfigType: string;
    InputField: React.ComponentType<any>;
    Button: React.ComponentType<any>;
    CheckboxField: React.ComponentType<any>;
    Card: React.ComponentType<any>;
    CardContent: React.ComponentType<any>;
}

const SymlinksTab: React.FC<SymlinksTabProps> = ({
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
                <Link2 className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>Links configuration is only available for Launcher.ini files.</p>
                <p className="text-sm mt-1">Switch to Launcher configuration to access link settings.</p>
            </div>
        );
    }

    const addLink = (type: 'symLinks' | 'junctions' | 'hardLinks') => {
        const baseItem = { targetPath: '', ifExists: type === 'symLinks' ? 'backup' : 'replace', required: 'false', temporary: 'false' };
        const newItem = type === 'junctions' 
            ? { ...baseItem, junctionPath: '' } 
            : { ...baseItem, linkPath: '' };

        if (type === 'symLinks') {
            (newItem as LinkItem).type = 'auto';
            (newItem as LinkItem).relative = 'false';
        }
        setConfig((prev: any) => ({
            ...prev,
            [type]: [...(prev[type] || []), newItem]
        }));
    };

    const removeLink = (type: 'symLinks' | 'junctions' | 'hardLinks', index: number) => {
        setConfig((prev: any) => ({
            ...prev,
            [type]: prev[type].filter((_: any, i: number) => i !== index)
        }));
    };

    const updateLink = (type: 'symLinks' | 'junctions' | 'hardLinks', index: number, field: string, value: any) => {
        const finalValue = typeof value === 'boolean' ? (value ? 'true' : 'false') : value;
        setConfig((prev: any) => ({
            ...prev,
            [type]: prev[type].map((item: any, i: number) =>
                i === index ? { ...item, [field]: finalValue } : item
            )
        }));
    };

    const renderSection = (title: string, type: 'symLinks' | 'junctions' | 'hardLinks', items: any[]) => {
        const pathField = type === 'junctions' ? 'junctionPath' : 'linkPath';
        const ifExistsOptions = type === 'symLinks'
            ? [{ value: 'skip', label: 'Skip' }, { value: 'backup', label: 'Backup' }, { value: 'replace', label: 'Replace' }, { value: 'update', label: 'Update' }]
            : [{ value: 'skip', label: 'Skip' }, { value: 'backup', label: 'Backup' }, { value: 'replace', label: 'Replace' }];
        const defaultIfExists = type === 'symLinks' ? 'backup' : 'replace';

        return (
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">{title}</h3>
                    <Button onClick={() => addLink(type)} size="sm">
                        <Plus className="w-4 h-4 mr-1" />
                        Add {title.slice(0, -1)}
                    </Button>
                </div>
                {(items || []).length === 0 ? (
                    <Card className="border-dashed border-2 border-gray-300">
                        <CardContent className="text-center py-8">
                            <Link2 className="w-8 h-8 mx-auto mb-2 opacity-50 text-gray-400" />
                            <p className="text-gray-500">No {title.toLowerCase()} configured.</p>
                        </CardContent>
                    </Card>
                ) : (
                    (items || []).map((item, index) => (
                        <Card key={index} className="mb-4">
                            <CardContent className="pt-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="font-medium">{title.slice(0, -1)} {index + 1}</h4>
                                    <Button variant="ghost" size="sm" onClick={() => removeLink(type, index)} className="text-red-600 hover:text-red-800">
                                        <Minus className="w-4 h-4" />
                                    </Button>
                                </div>
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <InputField
                                        label="Link/Junction Path"
                                        value={item[pathField] || ''}
                                        onChange={(value: string) => updateLink(type, index, pathField, value)}
                                        placeholder="%APPDATA%\MyApp\link"
                                        required
                                    />
                                    <InputField
                                        label="Target Path"
                                        value={item.targetPath || ''}
                                        onChange={(value: string) => updateLink(type, index, 'targetPath', value)}
                                        placeholder="%PAL:AppDir%\DefaultData\target"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                    {type === 'symLinks' && (
                                        <InputField
                                            label="Type"
                                            type="select"
                                            value={item.type || 'auto'}
                                            onChange={(value: string) => updateLink(type, index, 'type', value)}
                                            placeholder={[
                                                { value: 'auto', label: 'Auto' },
                                                { value: 'file', label: 'File' },
                                                { value: 'directory', label: 'Directory' }
                                            ]}
                                            description="Type of symbolic link"
                                        />
                                    )}
                                    <InputField
                                        label="If Exists"
                                        type="select"
                                        value={item.ifExists || defaultIfExists}
                                        onChange={(value: string) => updateLink(type, index, 'ifExists', value)}
                                        placeholder={ifExistsOptions}
                                        description="Action if link already exists"
                                    />
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
                                    <CheckboxField label="Required" checked={item.required === 'true'} onChange={(checked: boolean) => updateLink(type, index, 'required', checked)} />
                                    <CheckboxField label="Temporary" checked={item.temporary === 'true'} onChange={(checked: boolean) => updateLink(type, index, 'temporary', checked)} />
                                    {type === 'symLinks' && (
                                        <CheckboxField
                                            label="Relative"
                                            checked={item.relative === 'true'}
                                            onChange={(checked: boolean) => updateLink(type, index, 'relative', checked)}
                                        />
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        );
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-6 text-gray-900">Symbolic Links, Junctions, and Hard Links</h2>
            {renderSection("Symbolic Links", "symLinks", config.symLinks)}
            {renderSection("Junctions", "junctions", config.junctions)}
            {renderSection("Hard Links", "hardLinks", config.hardLinks)}
            <Card className="bg-blue-50 border-blue-200 mt-8">
                <CardContent className="pt-4">
                    <div className="flex items-center">
                        <Link2 className="w-5 h-5 text-blue-500 mr-2" />
                        <h4 className="text-sm font-medium text-blue-800">Links, Junctions, and Hard Links Help</h4>
                    </div>
                    <div className="text-sm text-blue-700 mt-2 space-y-1">
                        <p><strong>Symbolic Links:</strong> Create a link to a file or directory. Can be relative and point across volumes.</p>
                        <p><strong>Junctions:</strong> A type of symbolic link for directories on Windows. They are processed faster than symlinks.</p>
                        <p><strong>Hard Links:</strong> Create another directory entry for a file. The link and the original file are indistinguishable. Must be on the same volume.</p>
                        <p><strong>Activation:</strong> Ensure the <code>Symlinks/Junctions/Hardlinks</code> feature is enabled in the <em>Features</em> tab for these settings to take effect.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default SymlinksTab;