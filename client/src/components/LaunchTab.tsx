import React from 'react';

const LaunchTab = ({ 
  config, 
  setConfig, 
  activeConfigType, 
  InputField, 
  CheckboxField 
}) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 text-gray-900">Launch Configuration Details</h2>
      
      {activeConfigType === 'appinfo' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-4">[License] Section</h3>
            <CheckboxField
              label="Shareable"
              checked={config.appInfo.shareable === 'true'}
              onChange={(checked) => setConfig(prev => ({...prev, appInfo: {...prev.appInfo, shareable: checked ? 'true' : 'false'}}))}
              description="App is allowed to be copied from one drive to another"
            />
            <CheckboxField
              label="Open Source"
              checked={config.appInfo.openSource === 'true'}
              onChange={(checked) => setConfig(prev => ({...prev, appInfo: {...prev.appInfo, openSource: checked ? 'true' : 'false'}}))}
              description="App is fully open source under OSI approved license"
            />
            <CheckboxField
              label="Freeware"
              checked={config.appInfo.freeware === 'true'}
              onChange={(checked) => setConfig(prev => ({...prev, appInfo: {...prev.appInfo, freeware: checked ? 'true' : 'false'}}))}
              description="App is free (no cost)"
            />
            <CheckboxField
              label="Commercial Use"
              checked={config.appInfo.commercialUse === 'true'}
              onChange={(checked) => setConfig(prev => ({...prev, appInfo: {...prev.appInfo, commercialUse: checked ? 'true' : 'false'}}))}
              description="App is allowed to be used in commercial environments"
            />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">[Team] Section</h3>
            <InputField
              label="Developer"
              value={config.appInfo.developer}
              onChange={(value) => setConfig(prev => ({...prev, appInfo: {...prev.appInfo, developer: value}}))}
              placeholder="Your Name"
              description="Developer who created the portable application"
            />
            <InputField
              label="Contributors"
              value={config.appInfo.contributors}
              onChange={(value) => setConfig(prev => ({...prev, appInfo: {...prev.appInfo, contributors: value}}))}
              placeholder="Helper1, Helper2"
              description="Anyone who helped create the portable application"
            />
            
            <h3 className="text-lg font-medium mb-4 mt-6">Code Signing</h3>
            <CheckboxField
              label="Enable Code Signing"
              checked={config.appInfo.certSigning === 'true'}
              onChange={(checked) => setConfig(prev => ({...prev, appInfo: {...prev.appInfo, certSigning: checked ? 'true' : 'false'}}))}
              description="Enable digital code signing for the launcher"
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Additional Launch Options</h3>
            <InputField
              label="Splash Time (ms)"
              value={config.launch.splashTime}
              onChange={(value) => setConfig(prev => ({...prev, launch: {...prev.launch, splashTime: value}}))}
              placeholder="1500"
              description="Time to show splash screen in milliseconds"
            />
            <InputField
              label="Close EXE"
              value={config.launch.closeEXE}
              onChange={(value) => setConfig(prev => ({...prev, launch: {...prev.launch, closeEXE: value}}))}
              placeholder="helper.exe"
              description="Additional executable that must be closed"
            />
            <InputField
              label="Refresh Shell Icons"
              type="select"
              value={config.launch.refreshShellIcons}
              onChange={(value) => setConfig(prev => ({...prev, launch: {...prev.launch, refreshShellIcons: value}}))}
              placeholder={[
                {value: 'none', label: 'None'},
                {value: 'before', label: 'Before'},
                {value: 'after', label: 'After'},
                {value: 'both', label: 'Both'}
              ]}
              description="When to refresh shell icons for file associations"
            />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Instance Management</h3>
            <CheckboxField
              label="Single Portable App Instance"
              checked={config.launch.singlePortableAppInstance === 'true'}
              onChange={(checked) => setConfig(prev => ({...prev, launch: {...prev.launch, singlePortableAppInstance: checked ? 'true' : 'false'}}))}
              description="Only allow one instance of the portable version"
            />
            <CheckboxField
              label="Single App Instance"
              checked={config.launch.singleAppInstance === 'true'}
              onChange={(checked) => setConfig(prev => ({...prev, launch: {...prev.launch, singleAppInstance: checked ? 'true' : 'false'}}))}
              description="Prevent portable and local versions from running concurrently"
            />
            <CheckboxField
              label="Wait for Other Instances"
              checked={config.launch.waitForOtherInstances === 'true'}
              onChange={(checked) => setConfig(prev => ({...prev, launch: {...prev.launch, waitForOtherInstances: checked ? 'true' : 'false'}}))}
              description="Wait for all instances before cleanup"
            />
            <CheckboxField
              label="No Spaces in Path"
              checked={config.launch.noSpacesInPath === 'true'}
              onChange={(checked) => setConfig(prev => ({...prev, launch: {...prev.launch, noSpacesInPath: checked ? 'true' : 'false'}}))}
              description="Show error if app is in a path with spaces"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LaunchTab;