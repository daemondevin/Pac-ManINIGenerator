import React from 'react';

const FeaturesTab = ({ 
  config, 
  setConfig, 
  activeConfigType, 
  InputField, 
  CheckboxField 
}) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 text-gray-900">
        {activeConfigType === 'launcher' ? '[Activate] Features' : '[Dependencies] Features'}
      </h2>
      
      {activeConfigType === 'launcher' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Windows Core</h3>
            <CheckboxField
              label="Windows Registry"
              checked={config.activate.registry === 'true'}
              onChange={(checked) => setConfig(prev => ({...prev, activate: {...prev.activate, registry: checked ? 'true' : 'false'}}))}
              description="Enable registry support and management"
            />
            <CheckboxField
              label="Windows Registry Redirection"
              checked={config.activate.regredirection === 'true'}
              onChange={(checked) => setConfig(prev => ({...prev, activate: {...prev.activate, regredirection: checked ? 'true' : 'false'}}))}
              description="Enable support for enabling/disabling registry redirection."
            />
            <CheckboxField
              label="Windows Registry Copy Keys"
              checked={config.activate.regcopykeys === 'true'}
              onChange={(checked) => setConfig(prev => ({...prev, activate: {...prev.activate, regcopykeys: checked ? 'true' : 'false'}}))}
              description="Enable support for copying registry keys to a special hive."
            />
            <CheckboxField
              label="Windows Services"
              checked={config.activate.services === 'true'}
              onChange={(checked) => setConfig(prev => ({...prev, activate: {...prev.activate, services: checked ? 'true' : 'false'}}))}
              description="Enable support for managing Windows services."
            />
            <CheckboxField
              label="Windows Tasks"
              checked={config.activate.tasks === 'true'}
              onChange={(checked) => setConfig(prev => ({...prev, activate: {...prev.activate, tasks: checked ? 'true' : 'false'}}))}
              description="Enable support for managing Windows Tasks."
            />
            <CheckboxField
              label="Windows Firewall"
              checked={config.activate.firewall === 'true'}
              onChange={(checked) => setConfig(prev => ({...prev, activate: {...prev.activate, firewall: checked ? 'true' : 'false'}}))}
              description="Enable support for managing Windows Firewall."
            />
            <h3 className="text-lg font-medium mb-4">Core Features</h3>
            <CheckboxField
              label="Execute As User"
              checked={config.activate.execasuser === 'true'}
              onChange={(checked) => setConfig(prev => ({...prev, activate: {...prev.activate, execasuser: checked ? 'true' : 'false'}}))}
              description="For applications which need to run as normal user but need the launcher to have elevated privileges."
            />
            <CheckboxField
              label="DLL Registration"
              checked={config.activate.regDLLs === 'true'}
              onChange={(checked) => setConfig(prev => ({...prev, activate: {...prev.activate, regDLLs: checked ? 'true' : 'false'}}))}
              description="Register/unregister COM components and DLLs."
            />
            <CheckboxField
              label="Drivers"
              checked={config.activate.drivers === 'true'}
              onChange={(checked) => setConfig(prev => ({...prev, activate: {...prev.activate, drivers: checked ? 'true' : 'false'}}))}
              description="Enable support for managing device drivers."
            />
            <CheckboxField
              label="File Associations"
              checked={config.activate.associations === 'true'}
              onChange={(checked) => setConfig(prev => ({...prev, activate: {...prev.activate, associations: checked ? 'true' : 'false'}}))}
              description="Enable support for file associations, protocol handlers, context menus, and shell integration."
            />
            <CheckboxField
              label="Fonts"
              checked={config.activate.fonts === 'true'}
              onChange={(checked) => setConfig(prev => ({...prev, activate: {...prev.activate, fonts: checked ? 'true' : 'false'}}))}
              description="Support custom fonts"
            />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Runtime Dependencies</h3>
            <CheckboxField
              label="VC++ and .NET Runtime Support"
              checked={config.activate.runtime === 'true'}
              onChange={(checked) => setConfig(prev => ({...prev, activate: {...prev.activate, runtime: checked ? 'true' : 'false'}}))}
              description="Handle VC++ and .NET runtime dependencies."
            />
            <InputField
              label="Java Support"
              type="select"
              value={config.activate.java}
              onChange={(value) => setConfig(prev => ({...prev, activate: {...prev.activate, java: value}}))}
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
              onChange={(checked) => setConfig(prev => ({...prev, activate: {...prev.activate, jdk: checked ? 'true' : 'false'}}))}
              description="Java Development Kit support"
            />
            <CheckboxField
              label="XML Support"
              checked={config.activate.xml === 'true'}
              onChange={(checked) => setConfig(prev => ({...prev, activate: {...prev.activate, xml: checked ? 'true' : 'false'}}))}
              description="XML processing support"
            />
            <CheckboxField
              label="Ghostscript Support"
              checked={config.activate.ghostscript === 'true'}
              onChange={(checked) => setConfig(prev => ({...prev, activate: {...prev.activate, ghostscript: checked ? 'true' : 'false'}}))}
              description="Ghostscript for PDF processing"
            />
            <h3 className="text-lg font-medium mb-4">Filesystem</h3>
            <CheckboxField
              label="Filesystem Redirection"
              checked={config.activate.redirection === 'true'}
              onChange={(checked) => setConfig(prev => ({...prev, activate: {...prev.activate, redirection: checked ? 'true' : 'false'}}))}
              description="Enable support for enabling/disabling filesystem redirection."
            />
            <CheckboxField
              label="Force Filesystem Redirection"
              checked={config.activate.forceredirection === 'true'}
              onChange={(checked) => setConfig(prev => ({...prev, activate: {...prev.activate, forceredirection: checked ? 'true' : 'false'}}))}
              description="Enable support for checking the variable $Bit for enabling/disabling filesystem redirection."
            />
            <CheckboxField
              label="Symlinks/Junctions/Hardlinks"
              checked={config.activate.links === 'true'}
              onChange={(checked) => setConfig(prev => ({...prev, activate: {...prev.activate, links: checked ? 'true' : 'false'}}))}
              description="Enable support for managing symbolic links, directory junctions, and hard links."
            />
            <CheckboxField
              label="Files Cleanup"
              checked={config.activate.filescleanup === 'true'}
              onChange={(checked) => setConfig(prev => ({...prev, activate: {...prev.activate, filescleanup: checked ? 'true' : 'false'}}))}
              description="Enable support for [FilesCleanup]"
            />
            <CheckboxField
              label="Directory Cleanup"
              checked={config.activate.directorycleanup === 'true'}
              onChange={(checked) => setConfig(prev => ({...prev, activate: {...prev.activate, directorycleanup: checked ? 'true' : 'false'}}))}
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
              onChange={(checked) => setConfig(prev => ({...prev, dependencies: {...prev.dependencies, elevatedPrivileges: checked ? 'true' : 'false'}}))}
              description="Launcher needs to run with elevated privileges"
            />
            <CheckboxField
              label="Uses Java"
              checked={config.dependencies.usesJava === 'true'}
              onChange={(checked) => setConfig(prev => ({...prev, dependencies: {...prev.dependencies, usesJava: checked ? 'true' : 'false'}}))}
              description="Portable app makes use of Java Portable"
            />
            <CheckboxField
              label="Uses Ghostscript"
              checked={config.dependencies.usesGhostscript === 'true'}
              onChange={(checked) => setConfig(prev => ({...prev, dependencies: {...prev.dependencies, usesGhostscript: checked ? 'true' : 'false'}}))}
              description="Portable app makes use of Ghostscript Portable"
            />
            <InputField
              label=".NET Framework Version"
              value={config.dependencies.usesDotNetVersion}
              onChange={(value) => setConfig(prev => ({...prev, dependencies: {...prev.dependencies, usesDotNetVersion: value}}))}
              placeholder="4.5"
              description="Minimum .NET Framework version (e.g., 1.1, 2.0, 3.5, 4.7)"
            />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Feature Support</h3>
            <CheckboxField
              label="Registry Value Write"
              checked={config.dependencies.registryValueWrite === 'true'}
              onChange={(checked) => setConfig(prev => ({...prev, dependencies: {...prev.dependencies, registryValueWrite: checked ? 'true' : 'false'}}))}
              description="Enable [RegistryValueWrite] section support"
            />
            <CheckboxField
              label="File Write Replace"
              checked={config.dependencies.fileWriteReplace === 'true'}
              onChange={(checked) => setConfig(prev => ({...prev, dependencies: {...prev.dependencies, fileWriteReplace: checked ? 'true' : 'false'}}))}
              description="Enable Replace functionality in [FileWrite]"
            />
            <CheckboxField
              label="JSON Support"
              checked={config.dependencies.jsonSupport === 'true'}
              onChange={(checked) => setConfig(prev => ({...prev, dependencies: {...prev.dependencies, jsonSupport: checked ? 'true' : 'false'}}))}
              description="Include nsJSON plugin for JSON operations"
            />
            <InputField
              label="Restart Sleep (ms)"
              value={config.dependencies.restartSleep}
              onChange={(value) => setConfig(prev => ({...prev, dependencies: {...prev.dependencies, restartSleep: value}}))}
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