import React, { useState, useEffect } from 'react';
import { 
  Save, Upload, Download, Play, Settings, FolderOpen, Plus, Minus, 
  Eye, EyeOff, AlertCircle, CheckCircle, Info, Folder, Moon, Sun, FileText, Book
} from "lucide-react";

// Import tab components
import AppInfoTab from './AppInfoTab';
import LaunchTab from './LaunchTab';
import FeaturesTab from './FeaturesTab';
import RegistryTab from './RegistryTab';
import FilesTab from './FilesTab';
import ServicesTab from './ServicesTab';
import AdvancedTab from './AdvancedTab';

const PACConfigTool = () => {
  const [config, setConfig] = useState({
    appInfo: {
      // [Details] section
      name: '',
      appId: '',
      publisher: '',
      homepage: '',
      category: '',
      description: '',
      language: 'Multilingual',
      trademarks: '',
      installType: '',
      // [Version] section
      packageVersion: '1.0.0.0',
      displayVersion: '1.0',
      // [License] section
      shareable: 'true',
      openSource: 'false',
      freeware: 'true',
      commercialUse: 'true',
      eulaVersion: '1',
      // [Control] section
      icons: '1',
      start: '',
      extractIcon: '',
      // [Team] section
      developer: '',
      contributors: '',
      creator: '',
      certSigning: 'false',
      certAlgorithm: 'sha256',
      certExtension: 'pfx',
      certTimestamp: 'http://timestamp.sectigo.com/',
      // [SpecialPaths] section
      plugins: ''
    },
    launch: {
      appName: '',
      programExecutable: '',
      programExecutable64: '',
      programExecutableWhenParameters: '',
      commandLineArguments: '',
      workingDirectory: '',
      runAsAdmin: 'none',
      cleanTemp: 'false',
      singlePortableAppInstance: 'false',
      singleAppInstance: 'true',
      closeEXE: '',
      splashTime: '1500',
      launchAfterSplashScreen: 'false',
      waitForProgram: 'true',
      waitForOtherInstances: 'true',
      refreshShellIcons: 'none',
      hideCommandLineWindow: 'false',
      noSpacesInPath: 'false'
    },
    activate: {
      registry: 'false',
      regRedirection: 'false',
      regCopyKeys: 'false',
      redirection: 'false',
      forceRedirection: 'false',
      execAsUser: 'false',
      services: 'false',
      regDLLs: 'false',
      tasks: 'false',
      java: 'none',
      jdk: 'false',
      xml: 'false',
      ghostscript: 'false',
      fontsFolder: 'false',
      fileCleanup: 'false',
      directoryCleanup: 'false'
    },
    dependencies: {
      elevatedPrivileges: 'false',
      usesJava: 'false',
      usesGhostscript: 'false',
      usesDotNetVersion: '',
      useStdUtils: 'false',
      installINF: 'false',
      registryValueWrite: 'false',
      fileWriteReplace: 'false',
      fileLocking: 'false',
      firewall: 'false',
      junctions: 'false',
      aclRegSupport: 'false',
      aclDirSupport: 'false',
      rmEmptyDir: 'false',
      localLow: 'false',
      publicDoc: 'false',
      compareVersions: 'false',
      configFunctions: 'false',
      closeWindow: 'false',
      jsonSupport: 'false',
      restartSleep: '',
      winMessages: 'false',
      lineWrite: 'false',
      trimString: 'false',
      closeProcess: 'false',
      include64: 'false',
      includeWordRep: 'false',
      getBetween: 'false'
    },
    liveMode: {
      copyApp: 'false'
    },
    environment: [],
    registryKeys: [],
    registryValues: [],
    registryCleanupIfEmpty: [],
    registryCleanupForce: [],
    registryValueBackupDelete: [],
    registryCopyKeys: [],
    fileWrites: [],
    filesMove: [],
    filesCleanup: [],
    directoriesMove: [],
    directoriesCleanupIfEmpty: [],
    directoriesCleanupForce: [],
    registerDLLs: [],
    services: [],
    taskCleanup: [],
    language: {
      base: '%PortableApps.comLocaleglibc%',
      default: 'en',
      checkIfExists: '',
      defaultIfNotExists: ''
    },
    languageStrings: []
  });

  const [activeTab, setActiveTab] = useState('appInfo');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const [activeConfigType, setActiveConfigType] = useState('launcher');
  const [theme, setTheme] = useState('light');

  // Validation logic
  const validateConfig = () => {
    const errors = [];

    if (activeConfigType === 'launcher') {
      if (!config.launch.programExecutable.trim()) {
        errors.push('Program Executable is required');
      }
    } else {
      if (!config.appInfo.name.trim()) {
        errors.push('App Name is required');
      }
      if (!config.appInfo.appId.trim()) {
        errors.push('AppID is required');
      }
      if (!config.appInfo.packageVersion.trim()) {
        errors.push('Package Version is required');
      }
      if (!config.appInfo.start.trim()) {
        errors.push('Start command is required');
      }
    }

    setValidationErrors(errors);
    return errors.length === 0;
  };

  useEffect(() => {
    validateConfig();
  }, [config, activeConfigType]);

  const addArrayItem = (section, newItem) => {
    setConfig(prev => ({
      ...prev,
      [section]: [...prev[section], newItem]
    }));
  };

  const removeArrayItem = (section, index) => {
    setConfig(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const updateArrayItem = (section, index, field, value) => {
    setConfig(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const generateLauncherINI = () => {
    let ini = '; PortableApps Compiler Launcher Configuration\n';
    ini += '; Generated by PAC GUI Configuration Tool\n\n';

    // Launch section
    ini += '[Launch]\n';
    if (config.launch.appName) ini += `AppName=${config.launch.appName}\n`;
    ini += `ProgramExecutable=${config.launch.programExecutable}\n`;
    if (config.launch.programExecutable64) ini += `ProgramExecutable64=${config.launch.programExecutable64}\n`;
    if (config.launch.programExecutableWhenParameters) ini += `ProgramExecutableWhenParameters=${config.launch.programExecutableWhenParameters}\n`;
    if (config.launch.commandLineArguments) ini += `CommandLineArguments=${config.launch.commandLineArguments}\n`;
    if (config.launch.workingDirectory) ini += `WorkingDirectory=${config.launch.workingDirectory}\n`;
    if (config.launch.runAsAdmin !== 'none') ini += `RunAsAdmin=${config.launch.runAsAdmin}\n`;
    if (config.launch.cleanTemp === 'true') ini += `CleanTemp=${config.launch.cleanTemp}\n`;
    if (config.launch.singlePortableAppInstance === 'true') ini += `SinglePortableAppInstance=${config.launch.singlePortableAppInstance}\n`;
    if (config.launch.singleAppInstance !== 'true') ini += `SingleAppInstance=${config.launch.singleAppInstance}\n`;
    if (config.launch.closeEXE) ini += `CloseEXE=${config.launch.closeEXE}\n`;
    if (config.launch.splashTime !== '1500') ini += `SplashTime=${config.launch.splashTime}\n`;
    if (config.launch.launchAfterSplashScreen === 'true') ini += `LaunchAfterSplashScreen=${config.launch.launchAfterSplashScreen}\n`;
    if (config.launch.waitForProgram !== 'true') ini += `WaitForProgram=${config.launch.waitForProgram}\n`;
    if (config.launch.waitForOtherInstances !== 'true') ini += `WaitForOtherInstances=${config.launch.waitForOtherInstances}\n`;
    if (config.launch.refreshShellIcons !== 'none') ini += `RefreshShellIcons=${config.launch.refreshShellIcons}\n`;
    if (config.launch.hideCommandLineWindow === 'true') ini += `HideCommandLineWindow=${config.launch.hideCommandLineWindow}\n`;
    if (config.launch.noSpacesInPath === 'true') ini += `NoSpacesInPath=${config.launch.noSpacesInPath}\n`;
    ini += '\n';

    // Activate section
    const hasActivateOptions = Object.values(config.activate).some(v => v === 'true' || (v !== 'false' && v !== 'none' && v !== ''));
    if (hasActivateOptions) {
      ini += '[Activate]\n';
      Object.entries(config.activate).forEach(([key, value]) => {
        if (value === 'true' || (key === 'java' && value !== 'none')) {
          const iniKey = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, match => match);
          ini += `${iniKey}=${value}\n`;
        }
      });
      ini += '\n';
    }

    // Environment
    if (config.environment.length > 0) {
      ini += '[Environment]\n';
      config.environment.forEach(env => {
        ini += `${env.name}=${env.value}\n`;
      });
      ini += '\n';
    }

    // Registry sections
    if (config.registryKeys.length > 0) {
      ini += '[RegistryKeys]\n';
      config.registryKeys.forEach(key => {
        ini += `${key.name}=${key.path}\n`;
      });
      ini += '\n';
    }

    if (config.registryValues.length > 0) {
      ini += '[RegistryValueWrite]\n';
      config.registryValues.forEach(value => {
        ini += `${value.key}=${value.type}:${value.value}\n`;
      });
      ini += '\n';
    }

    return ini;
  };

  const generateAppInfoINI = () => {
    let ini = '; PortableApps AppInfo Configuration\n';
    ini += '; Generated by PAC GUI Configuration Tool\n\n';

    ini += '[Format]\n';
    ini += 'Type=PortableApps.comFormat\n';
    ini += 'Version=3.9\n\n';

    ini += '[Details]\n';
    ini += `Name=${config.appInfo.name}\n`;
    ini += `AppId=${config.appInfo.appId}\n`;
    ini += `Publisher=${config.appInfo.publisher}\n`;
    ini += `Homepage=${config.appInfo.homepage}\n`;
    ini += `Category=${config.appInfo.category}\n`;
    ini += `Description=${config.appInfo.description}\n`;
    ini += `Language=${config.appInfo.language}\n`;
    if (config.appInfo.trademarks) ini += `Trademarks=${config.appInfo.trademarks}\n`;
    if (config.appInfo.installType) ini += `InstallType=${config.appInfo.installType}\n`;
    ini += '\n';

    ini += '[License]\n';
    ini += `Shareable=${config.appInfo.shareable}\n`;
    ini += `OpenSource=${config.appInfo.openSource}\n`;
    ini += `Freeware=${config.appInfo.freeware}\n`;
    ini += `CommercialUse=${config.appInfo.commercialUse}\n`;
    if (config.appInfo.eulaVersion !== '1') ini += `EULAVersion=${config.appInfo.eulaVersion}\n`;
    ini += '\n';

    ini += '[Version]\n';
    ini += `PackageVersion=${config.appInfo.packageVersion}\n`;
    ini += `DisplayVersion=${config.appInfo.displayVersion}\n\n`;

    ini += '[Control]\n';
    ini += `Icons=${config.appInfo.icons}\n`;
    ini += `Start=${config.appInfo.start}\n`;
    if (config.appInfo.extractIcon) ini += `ExtractIcon=${config.appInfo.extractIcon}\n`;

    return ini;
  };

  const exportConfig = () => {
    if (!validateConfig()) {
      alert('Please fix validation errors before generating configuration');
      return;
    }

    const content = activeConfigType === 'launcher' ? generateLauncherINI() : generateAppInfoINI();
    const filename = activeConfigType === 'launcher' 
      ? `${config.appInfo.appId || 'app'}.ini` 
      : 'appinfo.ini';

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const tabs = [
    { id: 'appInfo', label: 'App Info', icon: Info },
    { id: 'launch', label: 'Launch', icon: Play },
    { id: 'activate', label: 'Features', icon: Settings },
    { id: 'registry', label: 'Registry', icon: FolderOpen },
    { id: 'files', label: 'Files & Dirs', icon: Folder },
    { id: 'services', label: 'Services', icon: Settings },
    { id: 'advanced', label: 'Advanced', icon: Settings }
  ];

  const categories = [
    'Accessibility', 'Development', 'Education', 'Games', 'Graphics & Pictures',
    'Internet', 'Music & Video', 'Office', 'Security', 'Utilities'
  ];

  const languages = [
    'Multilingual', 'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese',
    'Russian', 'Chinese', 'Japanese', 'Korean', 'Arabic'
  ];

  const Button = ({ children, onClick, className = '', variant = 'default', size = 'default', ...props }) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background';

    const variants = {
      default: 'bg-blue-600 text-white hover:bg-blue-700',
      outline: 'border border-gray-300 bg-transparent hover:bg-gray-100 text-gray-700',
      ghost: 'hover:bg-gray-100 hover:text-gray-900',
      destructive: 'bg-red-600 text-white hover:bg-red-700'
    };

    const sizes = {
      default: 'h-10 py-2 px-4',
      sm: 'h-9 px-3 text-xs',
      lg: 'h-11 px-8',
      icon: 'h-10 w-10'
    };

    return (
      <button
        className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    );
  };

  const Input = ({ className = '', ...props }) => (
    <input
      className={`flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );

  const Textarea = ({ className = '', ...props }) => (
    <textarea
      className={`flex min-h-[80px] w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );

  const Select = ({ value, onValueChange, children, className = '' }) => {
    return (
      <select
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        className={`flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      >
        {children}
      </select>
    );
  };

  const Checkbox = ({ checked, onCheckedChange, id, className = '' }) => (
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={(e) => onCheckedChange(e.target.checked)}
      className={`h-4 w-4 rounded border border-gray-300 text-blue-600 focus:ring-blue-500 ${className}`}
    />
  );

  const Label = ({ children, htmlFor, className = '' }) => (
    <label
      htmlFor={htmlFor}
      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
    >
      {children}
    </label>
  );

  const Card = ({ children, className = '' }) => (
    <div className={`rounded-lg border border-gray-200 bg-white shadow-sm ${className}`}>
      {children}
    </div>
  );

  const CardContent = ({ children, className = '' }) => (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );

  const InputField = ({ 
    label, 
    value, 
    onChange, 
    placeholder, 
    type = 'text', 
    required = false, 
    description 
  }) => (
    <div className="mb-4">
      <Label className="text-sm font-medium text-gray-700 mb-1 block">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      {type === 'textarea' ? (
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
        />
      ) : type === 'select' ? (
        <Select value={value} onValueChange={onChange}>
          {placeholder.map(option => (
            <option key={option.value || option} value={option.value || option}>
              {option.label || option}
            </option>
          ))}
        </Select>
      ) : (
        <Input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      )}
      {description && (
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      )}
    </div>
  );

  const CheckboxField = ({ label, checked, onChange, description }) => (
    <div className="mb-4">
      <div className="flex items-center space-x-2">
        <Checkbox
          checked={checked}
          onCheckedChange={onChange}
        />
        <Label className="text-sm font-medium text-gray-700">
          {label}
        </Label>
      </div>
      {description && (
        <p className="text-sm text-gray-500 mt-1 ml-6">{description}</p>
      )}
    </div>
  );

  const TabButton = ({ tab, isActive, onClick }) => {
    const Icon = tab.icon;
    return (
      <Button
        variant="ghost"
        onClick={onClick}
        className={`w-full justify-start ${
          isActive 
            ? 'bg-blue-600 text-white hover:bg-blue-700' 
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        <Icon className="w-4 h-4 mr-2" />
        {tab.label}
      </Button>
    );
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'}`}>
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">PortableApps Compiler</h1>
              <p className="text-gray-600">GUI Configuration Tool</p>
            </div>
            <div className="flex gap-3 items-center">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setActiveConfigType('launcher')}
                  className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                    activeConfigType === 'launcher' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Launcher.ini
                </button>
                <button
                  onClick={() => setActiveConfigType('appinfo')}
                  className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                    activeConfigType === 'appinfo' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  AppInfo.ini
                </button>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              >
                {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowAdvanced(!showAdvanced)}
              >
                {showAdvanced ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                {showAdvanced ? 'Hide' : 'Show'} Advanced
              </Button>
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Import
              </Button>
              <Button onClick={exportConfig} className="bg-green-600 hover:bg-green-700">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Validation Errors */}
        {validationErrors.length > 0 && (
          <Card className="mb-6 bg-red-50 border-red-200">
            <CardContent className="pt-4">
              <div className="flex items-center mb-2">
                <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                <h3 className="text-sm font-medium text-red-800">Please fix these issues:</h3>
              </div>
              <ul className="text-sm text-red-700 list-disc ml-7">
                {validationErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        <div className="flex gap-6">
          {/* Sidebar Navigation */}
          <div className="w-64 flex-shrink-0">
            <Card>
              <CardContent className="p-4">
                <div className="space-y-2">
                  {tabs.map(tab => (
                    <TabButton
                      key={tab.id}
                      tab={tab}
                      isActive={activeTab === tab.id}
                      onClick={() => setActiveTab(tab.id)}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <Card>
              <CardContent className="p-6">

                {/* AppInfo Tab */}
                {activeTab === 'appInfo' && (
                  <AppInfoTab
                    config={config}
                    setConfig={setConfig}
                    activeConfigType={activeConfigType}
                    InputField={InputField}
                    CheckboxField={CheckboxField}
                    categories={categories}
                    languages={languages}
                  />
                )}

                {/* Launcher Tab */}
                {activeTab === 'launch' && (
                  <LaunchTab
                    config={config}
                    setConfig={setConfig}
                    activeConfigType={activeConfigType}
                    InputField={InputField}
                    CheckboxField={CheckboxField}
                  />
                )}


                {/* Features/Activate Tab */}
                {activeTab === 'activate' && (
                  <FeaturesTab
                    config={config}
                    setConfig={setConfig}
                    activeConfigType={activeConfigType}
                    InputField={InputField}
                    CheckboxField={CheckboxField}
                  />
                )}

                {/* Registry Tab */}
                {activeTab === 'registry' && (
                  <RegistryTab
                    config={config}
                    setConfig={setConfig}
                    activeConfigType={activeConfigType}
                    InputField={InputField}
                    addArrayItem={addArrayItem}
                    removeArrayItem={removeArrayItem}
                    updateArrayItem={updateArrayItem}
                    Button={Button}
                    Card={Card}
                    CardContent={CardContent}
                  />
                )}

                {/* Files & Directories Tab */}
                {activeTab === 'files' && (
                  <FilesTab
                    config={config}
                    setConfig={setConfig}
                    activeConfigType={activeConfigType}
                    InputField={InputField}
                    addArrayItem={addArrayItem}
                    removeArrayItem={removeArrayItem}
                    updateArrayItem={updateArrayItem}
                    Button={Button}
                    Card={Card}
                    CardContent={CardContent}
                  />
                )}
                
                {/* Services Tab */}
                {activeTab === 'services' && (
                  <ServicesTab
                    config={config}
                    setConfig={setConfig}
                    showAdvanced={showAdvanced}
                    activeConfigType={activeConfigType}
                    InputField={InputField}
                    addArrayItem={addArrayItem}
                    removeArrayItem={removeArrayItem}
                    updateArrayItem={updateArrayItem}
                    Button={Button}
                    Card={Card}
                    CardContent={CardContent}
                  />
                )}

                {/* Advanced Tab */}
                {activeTab === 'advanced' && (
                  <AdvancedTab
                    config={config}
                    setConfig={setConfig}
                    activeConfigType={activeConfigType}
                    InputField={InputField}
                    addArrayItem={addArrayItem}
                    removeArrayItem={removeArrayItem}
                    updateArrayItem={updateArrayItem}
                    Button={Button}
                    Card={Card}
                    CardContent={CardContent}
                  />  
                )}

              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PACConfigTool;
