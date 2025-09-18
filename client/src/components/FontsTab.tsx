import React from 'react';
import { Plus, Minus, Settings, Type } from 'lucide-react';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';

interface Fonts {
    file?: string;
    name: string;
    path: string;
    scope: string; // Temporary, User, System
    ifExists: string; // skip, backup, replace
    validate: string; // true, false
    required: string; // true, false
};

interface FontsTabProps {
    config: { fonts: Fonts[] };
    setConfig: React.Dispatch<any>;
    activeConfigType: string;
    InputField: React.ComponentType<any>;
    Button: React.ComponentType<any>;
    CheckboxField: React.ComponentType<any>;
    Card: React.ComponentType<any>;
    CardContent: React.ComponentType<any>;
}

const FontsTab: React.FC<FontsTabProps> = ({
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
                <Type className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>Font configuration is only available for Launcher.ini files.</p>
                <p className="text-sm mt-1">Switch to Launcher configuration to access font settings.</p>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-xl font-semibold mb-6 text-gray-900">Fonts</h2>

            {/* Fonts Section */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Font Installation</h3>
                    <Button
                        onClick={() => setConfig((prev: any) => ({
                            ...prev,
                            fonts: [...prev.fonts, {
                            file: '',
                            name: '',
                            scope: 'Temporary',
                            ifExists: 'replace',
                            required: 'false',
                            validate: 'true'
                        }]
                        }))}
                        size="sm"
                    >
                        <Plus className="w-4 h-4 mr-1" />
                        Add Font
                    </Button>
                </div>

                {config.fonts.length === 0 ? (
                    <Card className="border-dashed border-2 border-gray-300">
                        <CardContent className="text-center py-8">
                            <Type className="w-8 h-8 mx-auto mb-2 opacity-50 text-gray-400" />
                            <p className="text-gray-500">No fonts configured. Click "Add Font" to get started.</p>
                        </CardContent>
                    </Card>
                ) : (
                    config.fonts.map((font, index) => (
                        <Card key={index} className="mb-4">
                            <CardContent className="pt-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="font-medium">Font {index + 1}</h4>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setConfig((prev: any) => ({
                                            ...prev,
                                            fonts: prev.fonts.filter((_: any, i: number) => i !== index)
                                        }))}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </Button>
                                </div>
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <InputField
                                        label="Font File"
                                        value={font.file || ''}                                        
                                        onChange={(value: string) => setConfig((prev: any) => ({
                                            ...prev,
                                            fonts: prev.fonts.map((item: Fonts, i: number) => i === index ? { ...item, file: value } : item)
                                        }))}
                                        placeholder="%PAL:AppDir%\Fonts\CustomFont.ttf"
                                        description="Path to font file (TTF, OTF, TTC, FON)"
                                        required
                                    />
                                    <InputField
                                        label="Font Name"
                                        value={font.name || ''}                                        
                                        onChange={(value: string) => setConfig((prev: any) => ({
                                            ...prev,
                                            fonts: prev.fonts.map((item: Fonts, i: number) => i === index ? { ...item, name: value } : item)
                                        }))}
                                        placeholder="Custom Font Family"
                                        description="Font family name (auto-detected if empty)"
                                    />
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <InputField
                                        label="Installation Scope"
                                        type="select"
                                        value={font.scope || 'Temporary'}                                        
                                        onChange={(value: string) => setConfig((prev: any) => ({
                                            ...prev,
                                            fonts: prev.fonts.map((item: Fonts, i: number) => i === index ? { ...item, scope: value } : item)
                                        }))}
                                        placeholder={[
                                            { value: 'Temporary', label: 'Temporary (Session)' },
                                            { value: 'User', label: 'Current User' },
                                            { value: 'System', label: 'All Users (System)' }
                                        ]}
                                        description="Font installation scope"
                                    />
                                    <InputField
                                        label="If Exists"
                                        type="select"
                                        value={font.ifExists || 'replace'}                                        
                                        onChange={(value: string) => setConfig((prev: any) => ({
                                            ...prev,
                                            fonts: prev.fonts.map((item: Fonts, i: number) => i === index ? { ...item, ifExists: value } : item)
                                        }))}
                                        placeholder={[
                                            { value: 'skip', label: 'Skip' },
                                            { value: 'backup', label: 'Backup' },
                                            { value: 'replace', label: 'Replace' }
                                        ]}
                                        description="Action if font exists"
                                    />
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                checked={font.validate === 'true'}                                                
                                                onCheckedChange={(checked) => setConfig((prev: any) => ({
                                                    ...prev,
                                                    fonts: prev.fonts.map((item: Fonts, i: number) => i === index ? { ...item, validate: checked ? 'true' : 'false' } : item)
                                                }))}
                                            />
                                            <Label className="text-sm">Validate Font File</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                checked={font.required === 'true'}                                                
                                                onCheckedChange={(checked) => setConfig((prev: any) => ({
                                                    ...prev,
                                                    fonts: prev.fonts.map((item: Fonts, i: number) => i === index ? { ...item, required: checked ? 'true' : 'false' } : item)
                                                }))}
                                            />
                                            <Label className="text-sm">Required</Label>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
            
            <Card className="bg-blue-50 border-blue-200 mt-8">
                <CardContent className="pt-4">
                    <div className="flex items-center">
                        <Type className="w-5 h-5 text-blue-500 mr-2" />
                        <h4 className="text-sm font-medium text-blue-800">Font Installation Help</h4>
                    </div>
                    <div className="text-sm text-blue-700 mt-2 space-y-1">
                        <p>This section allows you to install fonts for use with your portable application.</p>
                        <p><strong>Scope:</strong> 'Temporary' installs the font for the current session only. 'User' and 'System' install it permanently for the current user or all users, respectively.</p>
                        <p><strong>Font File:</strong> Use PAL variables like <code>%PAL:AppDir%</code> to point to font files within your app's directory.</p>
                        <p><strong>Activation:</strong> Ensure the <code>Fonts</code> feature is enabled in the <em>Features</em> tab for these settings to take effect.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default FontsTab;