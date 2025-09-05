import React from 'react';

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string | { value: string; label: string; }[];
  description?: string;
  type?: string;
}

interface ConfigType {
  activate: {
    [key: string]: string;
  };
  dependencies: {
    [key: string]: string;
  };
}

const FeaturesTab = ({ 
  config, 
  setConfig, 
  activeConfigType, 
  InputField, 
  CheckboxField 
}: {
  config: any;
  setConfig: (value: any) => void;
  activeConfigType: string;
  InputField: React.ComponentType<InputFieldProps>;
  CheckboxField: any;
}) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 text-gray-900">
        {activeConfigType === 'launcher' ? '[Activate] Section Features' : '[Dependencies] Section Features'}
      </h2>
      
      {activeConfigType === 'launcher' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Windows Core</h3>
            <CheckboxField
              label="Windows Registry"
              checked={config.activate.registry === 'true'}
              onChange={(checked: boolean) => setConfig((prev: { activate: any; }) => ({...prev, activate: {...prev.activate, registry: checked ? 'true' : 'false'}}))}
              description="Enable registry support and management"
            />
            <CheckboxField
              label="Windows Registry Redirection"
              checked={config.activate.regRedirection === 'true'}
              onChange={(checked: any) => setConfig((prev: { activate: any; }) => ({...prev, activate: {...prev.activate, regRedirection: checked ? 'true' : 'false'}}))}
              description="Enable support for enabling/disabling registry redirection."
            />
            <CheckboxField
              label="Windows Registry Value Write"
              checked={config.activate.registryValueWrite === 'true'}
              onChange={(checked: any) => setConfig((prev: { activate: any; }) => ({...prev, activate: {...prev.activate, registryValueWrite: checked ? 'true' : 'false'}}))}
              description="Enable [RegistryValueWrite] section support"
            />
            <CheckboxField
              label="Windows Registry Copy Keys"
              checked={config.activate.regCopyKeys === 'true'}
              onChange={(checked: any) => setConfig((prev: { activate: any; }) => ({...prev, activate: {...prev.activate, regCopyKeys: checked ? 'true' : 'false'}}))}
              description="Enable support for copying registry keys to a special hive."
            />
            <CheckboxField
              label="Windows Services"
              checked={config.activate.services === 'true'}
              onChange={(checked: any) => setConfig((prev: { activate: any; }) => ({...prev, activate: {...prev.activate, services: checked ? 'true' : 'false'}}))}
              description="Enable support for managing Windows services."
            />
            <CheckboxField
              label="Windows Tasks"
              checked={config.activate.tasks === 'true'}
              onChange={(checked: any) => setConfig((prev: { activate: any; }) => ({...prev, activate: {...prev.activate, tasks: checked ? 'true' : 'false'}}))}
              description="Enable support for managing Windows Tasks."
            />
            <CheckboxField
              label="Windows Firewall"
              checked={config.activate.firewall === 'true'}
              onChange={(checked: any) => setConfig((prev: { activate: any; }) => ({...prev, activate: {...prev.activate, firewall: checked ? 'true' : 'false'}}))}
              description="Enable support for managing Windows Firewall."
            />
            <h3 className="text-lg font-medium mb-4">Core Features</h3>
            <CheckboxField
              label="Execute As User"
              checked={config.activate.execAsUser === 'true'}
              onChange={(checked: any) => setConfig((prev: { activate: any; }) => ({...prev, activate: {...prev.activate, execAsUser: checked ? 'true' : 'false'}}))}
              description="For applications which need to run as normal user but need the launcher to have elevated privileges."
            />
            <CheckboxField
              label="DLL Registration"
              checked={config.activate.regDLLs === 'true'}
              onChange={(checked: any) => setConfig((prev: { activate: any; }) => ({...prev, activate: {...prev.activate, regDLLs: checked ? 'true' : 'false'}}))}
              description="Register/unregister COM components and DLLs."
            />
            <CheckboxField
              label="Drivers"
              checked={config.activate.drivers === 'true'}
              onChange={(checked: any) => setConfig((prev: { activate: any; }) => ({...prev, activate: {...prev.activate, drivers: checked ? 'true' : 'false'}}))}
              description="Enable support for managing device drivers."
            />
            <CheckboxField
              label="File Associations"
              checked={config.activate.associations === 'true'}
              onChange={(checked: any) => setConfig((prev: { activate: any; }) => ({...prev, activate: {...prev.activate, associations: checked ? 'true' : 'false'}}))}
              description="Enable support for file associations, protocol handlers, context menus, and shell integration."
            />
            <CheckboxField
              label="Fonts"
              checked={config.activate.fonts === 'true'}
              onChange={(checked: any) => setConfig((prev: { activate: any; }) => ({...prev, activate: {...prev.activate, fonts: checked ? 'true' : 'false'}}))}
              description="Support custom fonts"
            />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Runtime Dependencies</h3>
            <CheckboxField
              label="VC++ and .NET Runtime Support"
              checked={config.activate.runtime === 'true'}
              onChange={(checked: any) => setConfig((prev: { activate: any; }) => ({...prev, activate: {...prev.activate, runtime: checked ? 'true' : 'false'}}))}
              description="Handle VC++ and .NET runtime dependencies."
            />
            <InputField
              label="Java Support"
              type="select"
              value={config.activate.java}
              onChange={(value) => setConfig((prev: { activate: any; }) => ({...prev, activate: {...prev.activate, java: value}}))}
              placeholder={[
                {value: 'none', label: 'None'},
                {value: 'find', label: 'Find (optional)'},
                {value: 'require', label: 'Require (mandatory)'}
              ]}
              description="Java Runtime Environment requirements"
            />
            <CheckboxField
              label="JDK Support"
              checked={config.activate.jdk === 'true'}
              onChange={(checked: any) => setConfig((prev: { activate: any; }) => ({...prev, activate: {...prev.activate, jdk: checked ? 'true' : 'false'}}))}
              description="Java Development Kit support"
            />
            <CheckboxField
              label="XML Support"
              checked={config.activate.xml === 'true'}
              onChange={(checked: any) => setConfig((prev: { activate: any; }) => ({...prev, activate: {...prev.activate, xml: checked ? 'true' : 'false'}}))}
              description="XML processing support"
            />
            <CheckboxField
              label="Ghostscript Support"
              checked={config.activate.ghostscript === 'true'}
              onChange={(checked: any) => setConfig((prev: { activate: any; }) => ({...prev, activate: {...prev.activate, ghostscript: checked ? 'true' : 'false'}}))}
              description="Ghostscript for PDF processing"
            />
            <h3 className="text-lg font-medium mb-4">Filesystem</h3>
            <CheckboxField
              label="Filesystem Redirection"
              checked={config.activate.redirection === 'true'}
              onChange={(checked: any) => setConfig((prev: { activate: any; }) => ({...prev, activate: {...prev.activate, redirection: checked ? 'true' : 'false'}}))}
              description="Enable support for enabling/disabling filesystem redirection."
            />
            <CheckboxField
              label="Force Filesystem Redirection"
              checked={config.activate.forceRedirection === 'true'}
              onChange={(checked: any) => setConfig((prev: { activate: any; }) => ({...prev, activate: {...prev.activate, forceRedirection: checked ? 'true' : 'false'}}))}
              description="Enable support for checking the variable $Bit for enabling/disabling filesystem redirection."
            />
            <CheckboxField
              label="Symlinks/Junctions/Hardlinks"
              checked={config.activate.links === 'true'}
              onChange={(checked: any) => setConfig((prev: { activate: any; }) => ({...prev, activate: {...prev.activate, links: checked ? 'true' : 'false'}}))}
              description="Enable support for managing symbolic links, directory junctions, and hard links."
            />
            <CheckboxField
              label="File Write Replace"
              checked={config.activate.fileWriteReplace === 'true'}
              onChange={(checked: any) => setConfig((prev: { activate: any; }) => ({...prev, activate: {...prev.activate, fileWriteReplace: checked ? 'true' : 'false'}}))}
              description="Enable Replace functionality in the [FileWrite] section."
            />
            <CheckboxField
              label="File Cleanup"
              checked={config.activate.fileCleanup === 'true'}
              onChange={(checked: any) => setConfig((prev: { activate: any; }) => ({...prev, activate: {...prev.activate, fileCleanup: checked ? 'true' : 'false'}}))}
              description="Enable support for [FileCleanup]"
            />
            <CheckboxField
              label="Directory Cleanup"
              checked={config.activate.directoryCleanup === 'true'}
              onChange={(checked: any) => setConfig((prev: { activate: any; }) => ({...prev, activate: {...prev.activate, directoryCleanup: checked ? 'true' : 'false'}}))}
              description="Enable support for [DirectoryCleanup]"
            />
          </div>
        </div>
      ) : (
        // Dependencies for AppInfo
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-4">System Requirements</h3>
            <CheckboxField
              label="Elevated Privileges"
              checked={config.dependencies.elevatedPrivileges === 'true'}
              onChange={(checked: any) => setConfig((prev: { dependencies: any; }) => ({...prev, dependencies: {...prev.dependencies, elevatedPrivileges: checked ? 'true' : 'false'}}))}
              description="Launcher needs to run with elevated privileges"
            />
            <CheckboxField
              label="Dependency Setting"
              checked={config.dependencies.dependencySetting === 'true'}
              onChange={(checked: any) => setConfig((prev: { dependencies: any; }) => ({...prev, dependencies: {...prev.dependencies, dependencySetting: checked ? 'true' : 'false'}}))}
              description="Dependency setting description"
            />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Feature Support</h3>
            <CheckboxField
              label="JSON Support"
              checked={config.dependencies.jsonSupport === 'true'}
              onChange={(checked: any) => setConfig((prev: { dependencies: any; }) => ({...prev, dependencies: {...prev.dependencies, jsonSupport: checked ? 'true' : 'false'}}))}
              description="Include nsJSON plugin for JSON operations"
            />
            <InputField
              label="Restart Sleep (ms)"
              value={config.dependencies.restartSleep}
              onChange={(value) => setConfig((prev: { dependencies: any; }) => ({...prev, dependencies: {...prev.dependencies, restartSleep: value}}))}
              placeholder="500"
              description="Sleep value for applications that need to restart"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FeaturesTab;