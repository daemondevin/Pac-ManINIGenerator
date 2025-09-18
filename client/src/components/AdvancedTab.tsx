import React from 'react';
import { Plus, Minus, Settings } from 'lucide-react';

interface LanguageConfig {
  base: string;
  default: string;
  checkIfExists: string;
  defaultIfNotExists: string;
}

interface LanguageString {
  from: string;
  to: string;
}

interface AdvancedConfig {
  language: LanguageConfig;
  languageStrings: LanguageString[];
}

interface InputFieldProps {
  label: string;
  value: string | number;
  onChange: (value: any) => void;
  type?: 'text' | 'select' | 'textarea';
  placeholder?: any;
  description?: string;
  required?: boolean;
}

interface AdvancedTabProps {
  config: AdvancedConfig;
  setConfig: React.Dispatch<React.SetStateAction<any>>;
  activeConfigType: string;
  InputField: React.ComponentType<InputFieldProps>;
  Button: React.ComponentType<any>;
  Card: React.ComponentType<any>;
  CardContent: React.ComponentType<any>;
}

const AdvancedTab: React.FC<AdvancedTabProps> = ({
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
        <Settings className="w-8 h-8 mx-auto mb-2 opacity-50" />
        <p>Advanced configuration is only available for Launcher.ini files.</p>
        <p className="text-sm mt-1">Switch to Launcher configuration to access advanced settings.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 text-gray-900">Advanced Configuration</h2>
      
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Language Configuration</h3>
        <Card>
          <CardContent className="pt-4">
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Base Language Variable"
                value={config.language.base || '%PortableApps.comLocaleglibc%'}
                onChange={(value: string) => setConfig((prev: any) => ({...prev, language: {...prev.language, base: value}}))}
                placeholder="%PortableApps.comLocaleglibc%"
                description="Base string for language detection"
              />
              <InputField
                label="Default Language"
                value={config.language.default || 'en'}
                onChange={(value: string) => setConfig((prev: any) => ({...prev, language: {...prev.language, default: value}}))}
                placeholder="en"
                description="Default language code if base not found"
              />
              <InputField
                label="Check If Exists Path"
                value={config.language.checkIfExists || ''}
                onChange={(value: string) => setConfig((prev: any) => ({...prev, language: {...prev.language, checkIfExists: value}}))}
                placeholder="%PAL:AppDir%\Languages\%PAL:LanguageCustom%\*.*"
                description="Path to check for language files"
              />
              <InputField
                label="Default If Not Exists"
                value={config.language.defaultIfNotExists || ''}
                onChange={(value: string) => setConfig((prev: any) => ({...prev, language: {...prev.language, defaultIfNotExists: value}}))}
                placeholder="en"
                description="Fallback if language files don't exist"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Language String Mappings</h3>
          <Button 
            onClick={() => setConfig((prev: any) => ({
              ...prev,
              languageStrings: [...prev.languageStrings, { from: '', to: '' }]
            }))}
            size="sm"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Language Mapping
          </Button>
        </div>
        
        {config.languageStrings.length === 0 ? (
          <Card className="border-dashed border-2 border-gray-300">
            <CardContent className="text-center py-8">
              <Settings className="w-8 h-8 mx-auto mb-2 opacity-50 text-gray-400" />
              <p className="text-gray-500">No language mappings configured. Click "Add Language Mapping" to get started.</p>
            </CardContent>
          </Card>
        ) : (
          config.languageStrings.map((lang, index) => (
            <Card key={index} className="mb-4">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium">Language Mapping {index + 1}</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setConfig((prev: any) => ({
                      ...prev,
                      languageStrings: prev.languageStrings.filter((_: any, i: number) => i !== index)
                    }))}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    label="From (System Language)"
                    value={lang.from || ''}                    
                    onChange={(value: string) => setConfig((prev: any) => ({
                        ...prev,
                        languageStrings: prev.languageStrings.map((item: LanguageString, i: number) => i === index ? { ...item, from: value } : item)
                    }))}
                    placeholder="en_US"
                    description="System language code to match"
                  />
                  <InputField
                    label="To (App Language)"
                    value={lang.to || ''}                    
                    onChange={(value: string) => setConfig((prev: any) => ({
                        ...prev,
                        languageStrings: prev.languageStrings.map((item: LanguageString, i: number) => i === index ? { ...item, to: value } : item)
                    }))}
                    placeholder="en"
                    description="Application language code to use"
                  />
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Card className="bg-purple-50 border-purple-200">
        <CardContent className="pt-4">
          <div className="flex items-center">
            <Settings className="w-5 h-5 text-purple-500 mr-2" />
            <h4 className="text-sm font-medium text-purple-800">Advanced Configuration Help</h4>
          </div>
          <div className="text-sm text-purple-700 mt-2 space-y-1">
            <p><strong>Language Configuration:</strong> Customize how the launcher detects and maps system languages to application languages.</p>
            <p><strong>Language Mappings:</strong> Map system language codes (like en_US) to application-specific language codes (like en).</p>
            <p><strong>Live Mode:</strong> Controls behavior when running from read-only media like CD/DVD.</p>
            <p><strong>PAL Variables:</strong> All fields support PAL environment variables like %PAL:AppDir%, %PAL:DataDir%, etc.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedTab;