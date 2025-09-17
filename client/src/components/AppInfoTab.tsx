import React from 'react';

interface AppInfoTabProps {
  config: any;
  setConfig: React.Dispatch<any>;
  activeConfigType: string;
  InputField: React.ComponentType<any>;
  CheckboxField: React.ComponentType<any>;
  categories: string[];
  languages: string[];
}

const AppInfoTab: React.FC<AppInfoTabProps> = ({
  config,
  setConfig,
  activeConfigType,
  InputField,
  CheckboxField,
  categories,
  languages
}) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 text-gray-900">
        {activeConfigType === 'launcher' ? 'Launch Configuration' : 'Application Information'}
      </h2>
      
      {activeConfigType === 'appinfo' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-4">[Details] Section</h3>
            <InputField
              label="Name"
              value={config.appInfo.name}
              onChange={(value: string) => {
                setConfig(prev => ({...prev, appInfo: {...prev.appInfo, name: value}}));
                if (!config.appInfo.start && value) {
                  const appId = value.replace(/\s+/g, '') + 'Portable';
                  setConfig(prev => ({...prev, appInfo: {...prev.appInfo, appId: appId, start: appId + '.exe'}}));
                }
              }}
              placeholder="My Portable App"
              required={true}
              description="Name as it appears in the PortableApps.com Menu"
            />
            <InputField
              label="AppID"
              value={config.appInfo.appId}
              onChange={(value: string) => setConfig(prev => ({...prev, appInfo: {...prev.appInfo, appId: value}}))}
              placeholder="MyPortableApp"
              required={true}
              description="Globally unique ID (no spaces). Use AppNamePortable-yourdomain.com for third-party releases"
            />
            <InputField
              label="Publisher"
              value={config.appInfo.publisher}
              onChange={(value: string) => setConfig(prev => ({...prev, appInfo: {...prev.appInfo, publisher: value}}))}
              placeholder="App Developer & PortableApps.com"
              description="Publisher name as it appears in hover tips"
            />
            <InputField
              label="Homepage"
              value={config.appInfo.homepage}
              onChange={(value: string) => setConfig(prev => ({...prev, appInfo: {...prev.appInfo, homepage: value}}))}
              placeholder="https://portableapps.com/apps/..."
              description="Homepage of the portable app"
            />
            <InputField
              label="Category"
              type="select"
              value={config.appInfo.category}
              onChange={(value: string) => setConfig(prev => ({...prev, appInfo: {...prev.appInfo, category: value}}))}
              placeholder={[{value: '', label: 'Select Category'}, ...categories.map(cat => ({value: cat, label: cat}))]}
              description="Category in the PortableApps.com Platform"
            />
          </div>
          <div>
            <InputField
              label="Description"
              type="textarea"
              value={config.appInfo.description}
              onChange={(value: string) => setConfig(prev => ({...prev, appInfo: {...prev.appInfo, description: value}}))}
              placeholder="Brief description of what this application does..."
              description="Maximum 512 characters"
            />
            <InputField
              label="Language"
              type="select"
              value={config.appInfo.language}
              onChange={(value: string) => setConfig(prev => ({...prev, appInfo: {...prev.appInfo, language: value}}))}
              placeholder={languages.map(lang => ({value: lang, label: lang}))}
              description="Primary language of the application"
            />
            
            <h3 className="text-lg font-medium mb-4 mt-6">[Version] Section</h3>
            <InputField
              label="Package Version"
              value={config.appInfo.packageVersion}
              onChange={(value: string) => setConfig(prev => ({...prev, appInfo: {...prev.appInfo, packageVersion: value}}))}
              placeholder="1.0.0.0"
              required={true}
              description="Version in 1.2.3.4 format, must increment with each release"
            />
            <InputField
              label="Display Version"
              value={config.appInfo.displayVersion}
              onChange={(value: string) => setConfig(prev => ({...prev, appInfo: {...prev.appInfo, displayVersion: value}}))}
              placeholder="1.0 Release 1"
              description="User-friendly version string"
            />
            
            <h3 className="text-lg font-medium mb-4 mt-6">[Control] Section</h3>
            <InputField
              label="Start Command"
              value={config.appInfo.start}
              onChange={(value: string) => setConfig(prev => ({...prev, appInfo: {...prev.appInfo, start: value}}))}
              placeholder="MyAppPortable.exe"
              required={true}
              description="Command to execute to start the app"
            />
          </div>
        </div>
      ) : (
        // Launcher configuration for launch settings
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <InputField
              label="App Name"
              value={config.launch.appName}
              onChange={(value: string) => setConfig(prev => ({...prev, launch: {...prev.launch, appName: value}}))}
              placeholder="My Portable App"
              description="Used for error messages. Defaults to name from appinfo.ini"
            />
            <InputField
              label="Program Executable"
              value={config.launch.programExecutable}
              onChange={(value: string) => setConfig(prev => ({...prev, launch: {...prev.launch, programExecutable: value}}))}
              placeholder="MyApp\\MyApp.exe"
              required={true}
              description="Path to application executable, relative to App directory"
            />
            <InputField
              label="Program Executable (64-bit)"
              value={config.launch.programExecutable64}
              onChange={(value: string) => setConfig(prev => ({...prev, launch: {...prev.launch, programExecutable64: value}}))}
              placeholder="MyApp\\MyApp64.exe"
              description="64-bit version (optional)"
            />
            <InputField
              label="Command Line Arguments"
              value={config.launch.commandLineArguments}
              onChange={(value: string) => setConfig(prev => ({...prev, launch: {...prev.launch, commandLineArguments: value}}))}
              placeholder="--data-directory=%PAL:DataDir%\\settings"
              description="Default arguments to pass to the application"
            />
          </div>
          <div>
            <InputField
              label="Working Directory"
              value={config.launch.workingDirectory}
              onChange={(value: string) => setConfig(prev => ({...prev, launch: {...prev.launch, workingDirectory: value}}))}
              placeholder="%PAL:AppDir%\\MyApp"
              description="Working directory for the application"
            />
            <InputField
              label="Run As Admin"
              type="select"
              value={config.launch.runAsAdmin}
              onChange={(value:string) => setConfig(prev => ({...prev, launch: {...prev.launch, runAsAdmin: value}}))}
              placeholder={[
                {value: 'none', label: 'None'},
                {value: 'try', label: 'Try (optional admin)'},
                {value: 'force', label: 'Force (required admin)'}
              ]}
              description="Administrative privilege requirements"
            />
            
            <div className="space-y-4">
              <CheckboxField
                label="Clean Temp"
                checked={config.launch.cleanTemp === 'true'}
                onChange={(checked: boolean) => setConfig(prev => ({...prev, launch: {...prev.launch, cleanTemp: checked ? 'true' : 'false'}}))}
                description="Give app a private temp directory that gets cleaned up"
              />
              <CheckboxField
                label="Wait for Program"
                checked={config.launch.waitForProgram === 'true'}
                onChange={(checked: boolean) => setConfig(prev => ({...prev, launch: {...prev.launch, waitForProgram: checked ? 'true' : 'false'}}))}
                description="Wait for program to close before cleanup"
              />
              <CheckboxField
                label="Hide Command Line Window"
                checked={config.launch.hideCommandLineWindow === 'true'}
                onChange={(checked: boolean) => setConfig(prev => ({...prev, launch: {...prev.launch, hideCommandLineWindow: checked ? 'true' : 'false'}}))}
                description="Hide command prompt window for console applications"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppInfoTab;