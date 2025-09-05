/** @format */

import React, { useState, useEffect, useRef } from "react";
import { PngIcoConverter, IConvertInputItem } from "../lib/png2icojs";
import JSZip from "jszip";
import { useTheme } from "@/hooks/use-theme";
import { useToast } from "@/hooks/use-toast";
import {
    Stamp,
    MonitorCog,
    BrickWallFire,
    Layers,
    Microchip,
    Rocket,
    Upload,
    ShieldCheck,
    Database,
    Download,
    Play,
    Menu,
    LinkIcon,
    GitBranch,
    Link,
    Share2,
    Link2,
    Cpu,
    HardDrive,
    CalendarCheck,
    Settings,
    FolderOpen,
    CopyPlus,
    Plus,
    Minus,
    Eye,
    EyeOff,
    AlertCircle,
    CheckCircle,
    Info,
    Folder,
    Moon,
    Sun,
    FileText,
    Book,
    Crop,
    Library,
    ShieldPlus,
    Image as ImageIcon
} from "lucide-react";

// Import tab components
import AppInfoTab from "./AppInfoTab";
import LaunchTab from "./LaunchTab";
import FeaturesTab from "./FeaturesTab";
import FirewallTab from "./FirewallTab";
import DriversTab from "./DriversTab";
import RegistryTab from "./RegistryTab";
import FilesTab from "./FilesTab";
import ServicesTab from "./ServicesTab";
import AssociationsTab from "./AssociationsTab";
import AdvancedTab from "./AdvancedTab";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

const ImageProcessor = ({
    onIconsGenerated,
}: {
  onIconsGenerated: (icons: Record<string, string>) => void;
}) => {
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(
    null
  );
  const [previewIcons, setPreviewIcons] = useState<Record<string, string>>({});
  const [cropArea, setCropArea] = useState({ x: 0, y: 0, width: 0, height: 0 });

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const converter = useRef(new PngIcoConverter()).current;

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader(); 
      reader.onload = (e) => {
        const img = new window.Image();
        img.onload = () => {
          setOriginalImage(img);
          const size = Math.min(img.width, img.height);
          setCropArea({
            x: (img.width - size) / 2,
            y: (img.height - size) / 2,
            width: size,
            height: size,
          });
        };
        if (e.target) img.src = e.target.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const generateIcons = async () => {
    if (!originalImage) return;

    const sizes = [16, 32, 48, 128, 256, 512];
    const icons: Record<string, string> = {};

    const converterInputs: IConvertInputItem[] = [];

    for (const size of sizes) {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (!ctx) continue;

      ctx.drawImage(
        originalImage,
        cropArea.x,
        cropArea.y,
        cropArea.width,
        cropArea.height,
        0,
        0,
        size,
        size
      );

      const dataUrl = canvas.toDataURL("image/png");
      icons[`AppIcon_${size}.png`] = dataUrl;

      // Prepare input for ICO conversion
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      if (size <= 256) {
        converterInputs.push({ png: blob });
      }
    }

    // Convert to ICO
    const icoBlob = await converter.convertToBlobAsync(converterInputs);
    icons["AppIcon.ico"] = URL.createObjectURL(icoBlob);

    setPreviewIcons(icons);
    onIconsGenerated(icons);
  };

  return (
    <Card className="mb-6">
      <CardContent>
        <h3 className="text-lg font-medium mb-4">Icon Generator</h3>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
        <Button
          onClick={() => fileInputRef.current?.click()}
          variant="outline"
          className="w-full mb-4"
        >
        <Upload className="w-4 h-4 mr-2" />
          Upload Image
        </Button>

        {originalImage && (
          <div className="border rounded-lg p-4">
            <canvas
              width={200}
              height={200}
              className="border rounded"
              style={{
                backgroundImage: `url(${originalImage.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <Button onClick={generateIcons} className="w-full mt-4">
              <Crop className="w-4 h-4 mr-2" />
              Generate Icons
            </Button>
          </div>
        )}

        {previewIcons && (
          <div className="mt-6">
            <h4 className="font-medium mb-2">Preview Icons</h4>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(previewIcons).map(([name, src]) => (
                <div key={name} className="text-center">
                  <img src={src} alt={name} className="mx-auto border rounded" />
                  <p className="text-xs mt-1">{name}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const PACConfigTool = () => {
    const { toast } = useToast();
    const { theme, setTheme } = useTheme();
    const [config, setConfig] = useState({
        appInfo: {
            // [Details] section
            name: "",
            appId: "",
            publisher: "",
            homepage: "",
            category: "",
            description: "",
            language: "Multilingual",
            trademarks: "",
            installType: "",
            // [Version] section
            packageVersion: "1.0.0.0",
            displayVersion: "1.0",
            // [License] section
            shareable: "true",
            openSource: "false",
            freeware: "true",
            commercialUse: "true",
            eulaVersion: "1",
            // [Control] section
            icons: "1",
            start: "",
            extractIcon: "",
            // [Team] section
            developer: "",
            contributors: "",
            creator: "",
            certSigning: "false",
            certAlgorithm: "sha256",
            certExtension: "pfx",
            certTimestamp: "http://timestamp.sectigo.com/",
            // [SpecialPaths] section
            plugins: "",
        },
        launch: {
            appName: "",
            programExecutable: "",
            programExecutable64: "",
            programExecutableWhenParameters: "",
            commandLineArguments: "",
            workingDirectory: "",
            runAsAdmin: "none",
            cleanTemp: "false",
            singlePortableAppInstance: "false",
            singleAppInstance: "true",
            closeEXE: "",
            splashTime: "1500",
            launchAfterSplashScreen: "false",
            waitForProgram: "true",
            waitForOtherInstances: "true",
            refreshShellIcons: "none",
            hideCommandLineWindow: "false",
            noSpacesInPath: "false",
        },
        activate: {
            registry: "false",
            regRedirection: "false",
            registryValueWrite: "false",
            regCopyKeys: "false",
            redirection: "false",
            forceRedirection: "false",
            execAsUser: "false",
            services: "false",
            regDLLs: "false",
            drivers: "false",
            links: "false",
            tasks: "false",
            java: "none",
            jdk: "false",
            xml: "false",
            ghostscript: "false",
            firewall: "false",
            runtime: "false",
            associations: "false",
            fonts: "false",
            fileWriteReplace: "false",
            fileCleanup: "false",
            directoryCleanup: "false",
        },
        dependencies: {
            elevatedPrivileges: "false",
            usesJava: "false",
            usesGhostscript: "false",
            usesDotNetVersion: "",
            useStdUtils: "false",
            fileLocking: "false",
            aclRegSupport: "false",
            aclDirSupport: "false",
            rmEmptyDir: "false",
            localLow: "false",
            publicDoc: "false",
            compareVersions: "false",
            configFunctions: "false",
            closeWindow: "false",
            jsonSupport: "false",
            restartSleep: "",
            winMessages: "false",
            lineWrite: "false",
            trimString: "false",
            closeProcess: "false",
            include64: "false",
            includeWordRep: "false",
            getBetween: "false",
        },
        liveMode: {
            copyApp: "false",
        },
        environment: [] as { name: string; value: string }[],
        registryKeys: [] as { name: string; path: string }[],
        registryValues: [] as { key: string; type: string; value: string }[],
        registryCleanupIfEmpty: [],
        registryCleanupForce: [],
        registryValueBackupDelete: [],
        registryCopyKeys: [] as { key: string}[],
        fileWrites: [] as {
            type: string;
            file: string;
            section?: string;
            key?: string;
            value?: string;
            entry?: string;
            caseSensitive?: string;
            encoding?: string;
            find?: string;
            replace?: string;
        }[],
        filesMove: [] as { source: string; destination: string }[],
        filesCleanup: [],
        directoriesMove: [] as { source: string; destination: string }[],
        directoriesCleanupIfEmpty: [],
        directoriesCleanupForce: [],
        registerDLLs: [] as { progId?: string; file: string; type?: string }[],
        services: [] as { 
            name: string;
            path: string;
            type?: string;
            start?: string;
            depend?: string;
            ifExists?: string;
            description: string; 
            account: string; 
            password: string; 
            timeout: number; 
            critical: boolean;
        }[],
        // Fonts
        fonts: [] as {
            file: string;
            name?: string; // Font family name (auto-detected if not specified)
            scope?: string; // User, System, Temporary
            ifExists?: string; // skip, replace, backup
            required?: string; // true/false
            validate?: string; // true/false
        }[],
        // Scheduled Tasks
        scheduledTasks: [] as {
            name: string;
            command: string;
            arguments?: string;
            workingDir?: string;
            schedule: string; // ONCE, MINUTE, HOURLY, DAILY, WEEKLY, MONTHLY, ONIDLE, ONSTART, ONLOGON, ONEVENT
            modifier?: string; // Schedule modifier
            startTime?: string; // HH:MM format
            startDate?: string; // MM/DD/YYYY format
            endDate?: string; // MM/DD/YYYY format
            runAsUser?: string; // SYSTEM, current user, or specific username
            password?: string;
            runLevel?: string; // HIGHEST, LIMITED
            ifExists?: string; // skip, backup, replace
            enabled?: string; // true/false
            hidden?: string; // true/false
            required?: string; // true/false
            description?: string;
            idleTime?: string; // Idle time in minutes
            stopOnIdle?: string; // true/false
            restartOnIdle?: string; // true/false
        }[],
        // Device Drivers
        drivers: [] as {
            infFile: string;
            hardwareId?: string; // Hardware ID to match
            driverName?: string; // Display name
            architecture?: string; // x86, x64, auto
            signed?: string; // true/false
            ifExists?: string; // skip, backup, replace, update
            required?: string; // true/false
            forceInstall?: string; // true/false
            timeout?: string; // Installation timeout in seconds
            category?: string; // Driver category
            version?: string; // Expected driver version
            publisher?: string; // Expected driver publisher
        }[],
        // Firewall Rules
        firewallRules: [] as {
            name: string;
            direction: string; // Inbound, Outbound
            action: string; // Allow, Block, Bypass
            protocol?: string; // TCP, UDP, ICMPv4, ICMPv6, Any
            localPort?: string; // Port number or range
            remotePort?: string; // Remote port number or range
            localAddress?: string; // Local IP address or range
            remoteAddress?: string; // Remote IP address or range
            program?: string; // Path to program executable
            service?: string; // Windows service name
            profile?: string; // Domain, Private, Public, Any (comma-separated)
            interfaceType?: string; // Wireless, Lan, Ras, Any
            enabled?: string; // true/false
            ifExists?: string; // skip, backup, replace
            required?: string; // true/false
            description?: string;
            edgeTraversal?: string; // true/false
            security?: string; // Authenticate, AuthEnc, AuthNoEnc, NotRequired
            icmpType?: string; // ICMP type number
            icmpCode?: string; // ICMP code number
        }[],
        // File Associations
        filetypes: [] as {
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
        }[],
        // Protocol Handlers
        protocolHandlers: [] as {
            protocol: string;
            progId: string;
            description: string;
            defaultIcon?: string;
            openCommand: string;
            ifExists?: string; // skip, backup, replace
        }[],
        // Context Menus
        contextMenus: [] as {
            extension: string; // File extension or * for all files
            menuText: string;
            menuCommand: string;
            menuIcon?: string;
            position?: string; // top, middle, bottom
            ifExists?: string; // skip, backup, replace
            condition?: string; // Registry condition to check
        }[],
        // Symbolic Links
        symLinks: [] as {
            linkPath: string;
            targetPath: string;
            type?: string; // file, directory, auto
            ifExists?: string; // skip, backup, replace, update
            required?: string; // true/false
            relative?: string; // true/false
            temporary?: string; // true/false
        }[],
        // Directory Junctions
        junctions: [] as {
            junctionPath: string;
            targetPath: string;
            ifExists?: string; // skip, backup, replace
            required?: string; // true/false
            temporary?: string; // true/false
        }[],
        // Hard Links
        hardLinks: [] as {
            linkPath: string;
            targetPath: string;
            ifExists?: string; // skip, backup, replace
            required?: string; // true/false
            temporary?: string; // true/false
        }[],
        // VC++ Runtime Dependencies
        vcRuntimes: [] as {
            version: string; // 2005, 2008, 2010, 2012, 2013, 2015, 2017, 2019, 2022
            architecture: string; // x86, x64, both
            mode?: string; // detect, install, bundle
            action?: string; // skip, warn, install, bundle
            source?: string; // Path to redistributable installer
            minVersion?: string; // Minimum acceptable version
            required?: string; // true/false
        }[],
        // .NET Runtime Dependencies
        netRuntimes: [] as {
            framework: string; // net20, net35, net40, net45, net46, net47, net48, net50, net60, net70, net80
            architecture?: string; // x86, x64, anycpu, both
            mode?: string; // detect, install, bundle
            action?: string; // skip, warn, install, bundle
            source?: string; // Path to .NET installer
            minVersion?: string; // Minimum acceptable version
            required?: string; // true/false
        }[],
        language: {
            base: "%PortableApps.comLocaleglibc%",
            default: "en",
            checkIfExists: "",
            defaultIfNotExists: "",
        },
        languageStrings: [],
        icons: {},
    });

    const [activeTab, setActiveTab] = useState("appInfo");
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    const [activeConfigType, setActiveConfigType] = useState("launcher");

    // Validation logic
    const validateConfig = () => {
        const errors = [];

        if (activeConfigType === "launcher") {
            if (!config.launch.programExecutable.trim()) {
                errors.push("Program Executable is required");
            }
        } else {
            if (!config.appInfo.name.trim()) {
                errors.push("App Name is required");
            }
            if (!config.appInfo.appId.trim()) {
                errors.push("AppID is required");
            }
            if (!config.appInfo.packageVersion.trim()) {
                errors.push("Package Version is required");
            }
            if (!config.appInfo.start.trim()) {
                errors.push("Start command is required");
            }
        }

        setValidationErrors(errors);
        return errors.length === 0;
    };

    useEffect(() => {
        validateConfig();
    }, [config, activeConfigType]);

    const addArrayItem = (section: string | number | symbol, newItem: any) => {
        setConfig((prev) => {
            const currentSection = prev[section as keyof typeof config];
            if (Array.isArray(currentSection)) {
                return {
                    ...prev,
                    [section]: [...currentSection, newItem],
                };
            } else {
                // Optionally handle non-array sections or throw an error
                console.warn(`Section "${String(section)}" is not an array.`);
                return prev;
            }
        });
    };

    const removeArrayItem = (section: keyof typeof config, index: number) => {
        setConfig((prev) => {
            const currentSection = prev[section];
            if (Array.isArray(currentSection)) {
                return {
                    ...prev,
                    [section]: currentSection.filter((_, i) => i !== index),
                };
            } else {
                console.warn(`Section "${section}" is not an array.`);
                return prev;
            }
        });
    };

    const updateArrayItem = (
        section: keyof typeof config,
        index: number,
        field: string,
        value: any
    ) => {
        setConfig((prev) => ({
            ...prev,
            [section]: (prev[section] as any[]).map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            ),
        }));
    };

    const generateLauncherINI = () => {
        let ini = ";=#\n";
        ini += ";\n";
        ini += "; PORTABLEAPPS COMPILER\n";
        ini += "; Generated by Pac-Man INI Generator\n\n";
        ini += "; For more information, visit:\n";
        ini += "; https://github.com/daemondevin/Pac-ManINIGenerator\n\n";

        // Launch section
        ini += "[Launch]\n";
        if (config.launch.appName) ini += `AppName=${config.launch.appName}\n`;
        ini += `ProgramExecutable=${config.launch.programExecutable}\n`;
        if (config.launch.programExecutable64)
            ini += `ProgramExecutable64=${config.launch.programExecutable64}\n`;
        if (config.launch.programExecutableWhenParameters)
            ini += `ProgramExecutableWhenParameters=${config.launch.programExecutableWhenParameters}\n`;
        if (config.launch.commandLineArguments)
            ini += `CommandLineArguments=${config.launch.commandLineArguments}\n`;
        if (config.launch.workingDirectory)
            ini += `WorkingDirectory=${config.launch.workingDirectory}\n`;
        if (config.launch.runAsAdmin !== "none")
            ini += `RunAsAdmin=${config.launch.runAsAdmin}\n`;
        if (config.launch.cleanTemp === "true")
            ini += `CleanTemp=${config.launch.cleanTemp}\n`;
        if (config.launch.singlePortableAppInstance === "true")
            ini += `SinglePortableAppInstance=${config.launch.singlePortableAppInstance}\n`;
        if (config.launch.singleAppInstance !== "true")
            ini += `SingleAppInstance=${config.launch.singleAppInstance}\n`;
        if (config.launch.closeEXE)
            ini += `CloseEXE=${config.launch.closeEXE}\n`;
        if (config.launch.splashTime !== "1500")
            ini += `SplashTime=${config.launch.splashTime}\n`;
        if (config.launch.launchAfterSplashScreen === "true")
            ini += `LaunchAfterSplashScreen=${config.launch.launchAfterSplashScreen}\n`;
        if (config.launch.waitForProgram !== "true")
            ini += `WaitForProgram=${config.launch.waitForProgram}\n`;
        if (config.launch.waitForOtherInstances !== "true")
            ini += `WaitForOtherInstances=${config.launch.waitForOtherInstances}\n`;
        if (config.launch.refreshShellIcons !== "none")
            ini += `RefreshShellIcons=${config.launch.refreshShellIcons}\n`;
        if (config.launch.hideCommandLineWindow === "true")
            ini += `HideCommandLineWindow=${config.launch.hideCommandLineWindow}\n`;
        if (config.launch.noSpacesInPath === "true")
            ini += `NoSpacesInPath=${config.launch.noSpacesInPath}\n`;
        ini += "\n";

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
        
        // Live Mode
        if (config.liveMode.copyApp === 'true') {
            ini += '[LiveMode]\n';
            ini += `CopyApp=${config.liveMode.copyApp}\n\n`;
        }
        
        // Environment
        if (config.environment.length > 0) {
            ini += '[Environment]\n';
            config.environment.forEach(env => {
                ini += `${env.name}=${env.value}\n`;
            });
            ini += '\n';
        }

        // Fonts
        if (config.fonts.length > 0) {
            config.fonts.forEach((font, index) => {
                ini += `[Font${index + 1}]\n`;
                ini += `File=${font.file}\n`;
                if (font.name) ini += `Name=${font.name}\n`;
                if (font.scope && font.scope !== 'Temporary') ini += `Scope=${font.scope}\n`;
                if (font.ifExists && font.ifExists !== 'replace') ini += `IfExists=${font.ifExists}\n`;
                if (font.required && font.required !== 'false') ini += `Required=${font.required}\n`;
                if (font.validate && font.validate !== 'true') ini += `Validate=${font.validate}\n`;
                ini += '\n';
            });
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

        if (config.registryCopyKeys.length > 0) {
            ini += '[RegistryCopyKeys]\n';
            config.registryCopyKeys.forEach((value, index) => {
                ini += `${index + 1}=${value.key}\n`;
            });
            ini += '\n';
        }

        // FileWrite sections
        if (config.fileWrites.length > 0) {
            config.fileWrites.forEach((write, index) => {
                ini += `[FileWrite${index + 1}]\n`;
                ini += `Type=${write.type}\n`;
                ini += `File=${write.file}\n`;
                if (write.type === 'INI') {
                    ini += `Section=${write.section}\n`;
                    ini += `Key=${write.key}\n`;
                    ini += `Value=${write.value}\n`;
                } else if (write.type === 'ConfigWrite') {
                    ini += `Entry=${write.entry}\n`;
                    ini += `Value=${write.value}\n`;
                    if (write.caseSensitive) ini += `CaseSensitive=${write.caseSensitive}\n`;
                } else if (write.type === 'Replace') {
                    ini += `Find=${write.find}\n`;
                    ini += `Replace=${write.replace}\n`;
                    if (write.caseSensitive) ini += `CaseSensitive=${write.caseSensitive}\n`;
                    if (write.encoding) ini += `Encoding=${write.encoding}\n`;
                }
                ini += '\n';
            });
        }

        if (config.filesMove.length > 0) {
            ini += '[FilesMove]\n';
            config.filesMove.forEach(file => {
                ini += `${file.source}=${file.destination}\n`;
            });
            ini += '\n';
        }
        
        // Services
        if (config.services.length > 0) {
            config.services.forEach((service, index) => {
                ini += `[Service${index + 1}]\n`;
                ini += `Name=${service.name}\n`;
                ini += `Path=${service.path}\n`;
                if (service.type) ini += `Type=${service.type}\n`;
                if (service.start) ini += `Start=${service.start}\n`;
                if (service.depend) ini += `Depend=${service.depend}\n`;
                if (service.ifExists) ini += `IfExists=${service.ifExists}\n`;
                ini += '\n';
            });
        }
            
        // DLL Registration
        if (config.registerDLLs.length > 0) {
            config.registerDLLs.forEach((dll, index) => {
                ini += `[RegisterDLL${index + 1}]\n`;
                if (dll.progId) ini += `ProgID=${dll.progId}\n`;
                ini += `File=${dll.file}\n`;
                if (dll.type && dll.type !== 'REGDLL') ini += `Type=${dll.type}\n`;
                ini += '\n';
            });
        }

        // Scheduled Tasks
        if (config.scheduledTasks.length > 0) {
            config.scheduledTasks.forEach((task, index) => {
                ini += `[ScheduledTask${index + 1}]\n`;
                ini += `Name=${task.name}\n`;
                ini += `Command=${task.command}\n`;
                if (task.arguments) ini += `Arguments=${task.arguments}\n`;
                if (task.workingDir) ini += `WorkingDir=${task.workingDir}\n`;
                ini += `Schedule=${task.schedule}\n`;
                if (task.modifier) ini += `Modifier=${task.modifier}\n`;
                if (task.startTime) ini += `StartTime=${task.startTime}\n`;
                if (task.startDate) ini += `StartDate=${task.startDate}\n`;
                if (task.endDate) ini += `EndDate=${task.endDate}\n`;
                if (task.runAsUser) ini += `RunAsUser=${task.runAsUser}\n`;
                if (task.password) ini += `Password=${task.password}\n`;
                if (task.runLevel) ini += `RunLevel=${task.runLevel}\n`;
                if (task.ifExists && task.ifExists !== 'replace') ini += `IfExists=${task.ifExists}\n`;
                if (task.enabled && task.enabled !== 'true') ini += `Enabled=${task.enabled}\n`;
                if (task.hidden && task.hidden !== 'false') ini += `Hidden=${task.hidden}\n`;
                if (task.required && task.required !== 'false') ini += `Required=${task.required}\n`;
                if (task.description) ini += `Description=${task.description}\n`;
                if (task.idleTime) ini += `IdleTime=${task.idleTime}\n`;
                if (task.stopOnIdle && task.stopOnIdle !== 'false') ini += `StopOnIdle=${task.stopOnIdle}\n`;
                if (task.restartOnIdle && task.restartOnIdle !== 'false') ini += `RestartOnIdle=${task.restartOnIdle}\n`;
                ini += '\n';
            });
        }

        // Device Drivers
        config.drivers.forEach((driver, index) => {
            ini += `[Driver${index + 1}]\n`;
            ini += `InfFile=${driver.infFile}\n`;
            if (driver.hardwareId) ini += `HardwareId=${driver.hardwareId}\n`;
            if (driver.driverName) ini += `DriverName=${driver.driverName}\n`;
            if (driver.architecture && driver.architecture !== 'auto') ini += `Architecture=${driver.architecture}\n`;
            if (driver.signed && driver.signed !== 'false') ini += `Signed=${driver.signed}\n`;
            if (driver.ifExists && driver.ifExists !== 'replace') ini += `IfExists=${driver.ifExists}\n`;
            if (driver.required && driver.required !== 'false') ini += `Required=${driver.required}\n`;
            if (driver.forceInstall && driver.forceInstall !== 'false') ini += `ForceInstall=${driver.forceInstall}\n`;
            if (driver.timeout && driver.timeout !== '60') ini += `Timeout=${driver.timeout}\n`;
            if (driver.category) ini += `Category=${driver.category}\n`;
            if (driver.version) ini += `Version=${driver.version}\n`;
            if (driver.publisher) ini += `Publisher=${driver.publisher}\n`;
            ini += '\n';
        });

        // Firewall Rules
        config.firewallRules.forEach((rule, index) => {
            ini += `[FirewallRule${index + 1}]\n`;
            ini += `Name=${rule.name}\n`;
            ini += `Direction=${rule.direction}\n`;
            ini += `Action=${rule.action}\n`;
            if (rule.protocol && rule.protocol !== 'Any') ini += `Protocol=${rule.protocol}\n`;
            if (rule.localPort && rule.localPort !== 'Any') ini += `LocalPort=${rule.localPort}\n`;
            if (rule.remotePort && rule.remotePort !== 'Any') ini += `RemotePort=${rule.remotePort}\n`;
            if (rule.localAddress && rule.localAddress !== 'Any') ini += `LocalAddress=${rule.localAddress}\n`;
            if (rule.remoteAddress && rule.remoteAddress !== 'Any') ini += `RemoteAddress=${rule.remoteAddress}\n`;
            if (rule.program) ini += `Program=${rule.program}\n`;
            if (rule.service) ini += `Service=${rule.service}\n`;
            if (rule.profile && rule.profile !== 'Any') ini += `Profile=${rule.profile}\n`;
            if (rule.interfaceType && rule.interfaceType !== 'Any') ini += `InterfaceType=${rule.interfaceType}\n`;
            if (rule.enabled && rule.enabled !== 'true') ini += `Enabled=${rule.enabled}\n`;
            if (rule.ifExists && rule.ifExists !== 'replace') ini += `IfExists=${rule.ifExists}\n`;
            if (rule.required && rule.required !== 'false') ini += `Required=${rule.required}\n`;
            if (rule.description) ini += `Description=${rule.description}\n`;
            if (rule.edgeTraversal && rule.edgeTraversal !== 'false') ini += `EdgeTraversal=${rule.edgeTraversal}\n`;
            if (rule.security && rule.security !== 'NotRequired') ini += `Security=${rule.security}\n`;
            if (rule.icmpType) ini += `ICMPType=${rule.icmpType}\n`;
            if (rule.icmpCode) ini += `ICMPCode=${rule.icmpCode}\n`;
            ini += '\n';
        });

        // File Associations
        config.filetypes.forEach((filetype, index) => {
            ini += `[FileAssociation${index + 1}]\n`;
            ini += `Extension=${filetype.extension}\n`;
            ini += `ProgID=${filetype.progId}\n`;
            ini += `Description=${filetype.description}\n`;
            if (filetype.defaultIcon) ini += `DefaultIcon=${filetype.defaultIcon}\n`;
            ini += `OpenCommand=${filetype.openCommand}\n`;
            if (filetype.editCommand) ini += `EditCommand=${filetype.editCommand}\n`;
            if (filetype.printCommand) ini += `PrintCommand=${filetype.printCommand}\n`;
            if (filetype.ifExists && filetype.ifExists !== 'backup') ini += `IfExists=${filetype.ifExists}\n`;
            if (filetype.priority && filetype.priority !== 'normal') ini += `Priority=${filetype.priority}\n`;
            if (filetype.mimeType) ini += `MimeType=${filetype.mimeType}\n`;
            ini += '\n';
        });

        // Protocol Handlers
        config.protocolHandlers.forEach((handler, index) => {
            ini += `[ProtocolHandler${index + 1}]\n`;
            ini += `Protocol=${handler.protocol}\n`;
            ini += `ProgID=${handler.progId}\n`;
            ini += `Description=${handler.description}\n`;
            if (handler.defaultIcon) ini += `DefaultIcon=${handler.defaultIcon}\n`;
            ini += `OpenCommand=${handler.openCommand}\n`;
            if (handler.ifExists && handler.ifExists !== 'replace') ini += `IfExists=${handler.ifExists}\n`;
            ini += '\n';
        });

        // Context Menus
        config.contextMenus.forEach((menu, index) => {
            ini += `[ContextMenu${index + 1}]\n`;
            ini += `Extension=${menu.extension}\n`;
            ini += `MenuText=${menu.menuText}\n`;
            ini += `MenuCommand=${menu.menuCommand}\n`;
            if (menu.menuIcon) ini += `MenuIcon=${menu.menuIcon}\n`;
            if (menu.position && menu.position !== 'middle') ini += `Position=${menu.position}\n`;
            if (menu.ifExists && menu.ifExists !== 'replace') ini += `IfExists=${menu.ifExists}\n`;
            if (menu.condition) ini += `Condition=${menu.condition}\n`;
            ini += '\n';
        });

        // Symbolic Links
        config.symLinks.forEach((link, index) => {
            ini += `[SymLink${index + 1}]\n`;
            ini += `LinkPath=${link.linkPath}\n`;
            ini += `TargetPath=${link.targetPath}\n`;
            if (link.type && link.type !== 'auto') ini += `Type=${link.type}\n`;
            if (link.ifExists && link.ifExists !== 'backup') ini += `IfExists=${link.ifExists}\n`;
            if (link.required && link.required !== 'false') ini += `Required=${link.required}\n`;
            if (link.relative && link.relative !== 'false') ini += `Relative=${link.relative}\n`;
            if (link.temporary && link.temporary !== 'true') ini += `Temporary=${link.temporary}\n`;
            ini += '\n';
        });

        // Directory Junctions
        config.junctions.forEach((junction, index) => {
            ini += `[Junction${index + 1}]\n`;
            ini += `JunctionPath=${junction.junctionPath}\n`;
            ini += `TargetPath=${junction.targetPath}\n`;
            if (junction.ifExists && junction.ifExists !== 'replace') ini += `IfExists=${junction.ifExists}\n`;
            if (junction.required && junction.required !== 'false') ini += `Required=${junction.required}\n`;
            if (junction.temporary && junction.temporary !== 'true') ini += `Temporary=${junction.temporary}\n`;
            ini += '\n';
        });

        // Hard Links
        config.hardLinks.forEach((link, index) => {
            ini += `[HardLink${index + 1}]\n`;
            ini += `LinkPath=${link.linkPath}\n`;
            ini += `TargetPath=${link.targetPath}\n`;
            if (link.ifExists && link.ifExists !== 'backup') ini += `IfExists=${link.ifExists}\n`;
            if (link.required && link.required !== 'false') ini += `Required=${link.required}\n`;
            if (link.temporary && link.temporary !== 'true') ini += `Temporary=${link.temporary}\n`;
            ini += '\n';
        });

        // VC++ Runtime Dependencies
        config.vcRuntimes.forEach((runtime, index) => {
            ini += `[VCRuntime${index + 1}]\n`;
            ini += `Version=${runtime.version}\n`;
            ini += `Architecture=${runtime.architecture}\n`;
            if (runtime.mode && runtime.mode !== 'detect') ini += `Mode=${runtime.mode}\n`;
            if (runtime.action && runtime.action !== 'warn') ini += `Action=${runtime.action}\n`;
            if (runtime.source) ini += `Source=${runtime.source}\n`;
            if (runtime.minVersion) ini += `MinVersion=${runtime.minVersion}\n`;
            if (runtime.required && runtime.required !== 'false') ini += `Required=${runtime.required}\n`;
            ini += '\n';
        });

        // .NET Runtime Dependencies
        config.netRuntimes.forEach((runtime, index) => {
            ini += `[NETRuntime${index + 1}]\n`;
            ini += `Framework=${runtime.framework}\n`;
            if (runtime.architecture && runtime.architecture !== 'anycpu') ini += `Architecture=${runtime.architecture}\n`;
            if (runtime.mode && runtime.mode !== 'detect') ini += `Mode=${runtime.mode}\n`;
            if (runtime.action && runtime.action !== 'warn') ini += `Action=${runtime.action}\n`;
            if (runtime.source) ini += `Source=${runtime.source}\n`;
            if (runtime.minVersion) ini += `MinVersion=${runtime.minVersion}\n`;
            if (runtime.required && runtime.required !== 'false') ini += `Required=${runtime.required}\n`;
            ini += '\n';
        });

    
        return ini;
    };

    const generateAppInfoINI = () => {
        let ini = ";=#\n";
        ini += ";\n";
        ini += "; PORTABLEAPPS COMPILER\n";
        ini += "; Generated by Pac-Man INI Generator\n\n";
        ini += "; For more information, visit:\n";
        ini += "; https://github.com/daemondevin/Pac-ManINIGenerator\n\n";

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
        
        if (config.appInfo.developer || config.appInfo.contributors || config.appInfo.creator || config.appInfo.certSigning === 'true') {
        ini += '[Team]\n';
        if (config.appInfo.developer) ini += `Developer=${config.appInfo.developer}\n`;
        if (config.appInfo.contributors) ini += `Contributors=${config.appInfo.contributors}\n`;
        if (config.appInfo.creator) ini += `Creator=${config.appInfo.creator}\n`;
        if (config.appInfo.certSigning === 'true') {
            ini += `CertSigning=${config.appInfo.certSigning}\n`;
            ini += `CertAlgorithm=${config.appInfo.certAlgorithm}\n`;
            ini += `CertExtension=${config.appInfo.certExtension}\n`;
            ini += `CertTimestamp=${config.appInfo.certTimestamp}\n`;
        }
        ini += '\n';
        }
        
        ini += "[License]\n";
        ini += `Shareable=${config.appInfo.shareable}\n`;
        ini += `OpenSource=${config.appInfo.openSource}\n`;
        ini += `Freeware=${config.appInfo.freeware}\n`;
        ini += `CommercialUse=${config.appInfo.commercialUse}\n`;
        if (config.appInfo.eulaVersion !== "1")
            ini += `EULAVersion=${config.appInfo.eulaVersion}\n`;
        ini += "\n";

        ini += "[Version]\n";
        ini += `PackageVersion=${config.appInfo.packageVersion}\n`;
        ini += `DisplayVersion=${config.appInfo.displayVersion}\n\n`;
    
        if (config.appInfo.plugins) {
        ini += '[SpecialPaths]\n';
        ini += `Plugins=${config.appInfo.plugins}\n\n`;
        }
        
        // Dependencies
        const hasDependencies = Object.values(config.dependencies).some(v => v === 'true' || (v !== 'false' && v !== ''));
        if (hasDependencies) {
        ini += '[Dependencies]\n';
        Object.entries(config.dependencies).forEach(([key, value]) => {
            if (value === 'true' || (value !== 'false' && value !== '')) {
            const iniKey = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, match => match);
            ini += `${iniKey}=${value}\n`;
            }
        });
        ini += '\n';
        }

        ini += "[Control]\n";
        ini += `Icons=${config.appInfo.icons}\n`;
        ini += `Start=${config.appInfo.start}\n`;
        if (config.appInfo.extractIcon)
            ini += `ExtractIcon=${config.appInfo.extractIcon}\n`;

        return ini;
    };

    const exportConfig = () => {
        if (!validateConfig()) {
            alert(
                "Please fix validation errors before generating configuration"
            );
            return;
        }

        const content =
            activeConfigType === "launcher"
                ? generateLauncherINI()
                : generateAppInfoINI();
        const filename =
            activeConfigType === "launcher"
                ? `${config.appInfo.appId || "app"}.ini`
                : "appinfo.ini";

        const blob = new Blob([content], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);

        toast({
            title: "Configuration Exported",
            description: `Configuration saved as ${filename}`,
        });
    };

  const exportIcons = () => {
    if (Object.keys(config.icons).length === 0) {
      alert('No icons generated. Please upload and process an image first.');
      return;
    }

    /**
     * Create a ZIP file containing all icons and download it
     * @param {Object} icons - Object where keys are filenames and values are Data URLs
     * @param {string} [zipName="AppIcons.zip"] - Name of the output ZIP file
     */
    async function downloadZip(icons: Record<string, string>, zipName: string = "AppIcons.zip") {
        if (typeof JSZip === "undefined") {
            throw new Error("JSZip is not loaded. Include it via CDN or import.");
        }

        const zip = new JSZip();

        // Add each icon to the zip
        await Promise.all(
            Object.entries(icons).map(async ([filename, dataUrl]) => {
            // Split out base64 part
            const base64Data = dataUrl.split(",")[1];
            // Add as file
            zip.file(filename, base64Data, { base64: true });
            })
        );

        // Generate the zip as a Blob
        const blob = await zip.generateAsync({ type: "blob" });

        // Trigger browser download
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = zipName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
    }

    downloadZip(config.icons, "AppIcons.zip");

  };

    const importConfig = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target?.result as string;
            if (!content) return;

            // Split the content into lines and remove comments and empty lines
            const lines = content.split("\n")
                .map(line => line.trim())
                .filter(line => line && !line.startsWith(";"));

            let currentSection = "";
            const newConfig = { ...config };
            let isAppInfo = false;

            // Detect if this is an AppInfo.ini file
            if (content.includes("[Format]") && content.includes("Type=PortableApps.comFormat")) {
                isAppInfo = true;
                setActiveConfigType("appinfo");
            } else {
                setActiveConfigType("launcher");
            }

            // Reset arrays that will be populated
            if (!isAppInfo) {
                newConfig.environment = [];
                newConfig.services = [];
                newConfig.filesMove = [];
                newConfig.registryKeys = [];
                newConfig.registryValues = [];
            }

            let currentService: any = null;

            lines.forEach(line => {
                // Section header
                if (line.startsWith("[") && line.endsWith("]")) {
                    currentSection = line.slice(1, -1).toLowerCase();
                    if (currentSection.startsWith("service")) {
                        currentService = {};
                        newConfig.services.push(currentService);
                    }
                    return;
                }

                // Key-value pair
                const [key, ...valueParts] = line.split("=");
                const value = valueParts.join("="); // Rejoin in case value contains =

                if (!key || value === undefined) return;

                const keyTrim = key.trim();
                const valueTrim = value.trim();

                if (isAppInfo) {
                    switch (currentSection.toLowerCase()) {
                        case "details":
                            if (keyTrim in newConfig.appInfo) {
                                (newConfig.appInfo as any)[keyTrim] = valueTrim;
                            }
                            break;
                        case "version":
                            if (keyTrim === "PackageVersion") newConfig.appInfo.packageVersion = valueTrim;
                            if (keyTrim === "DisplayVersion") newConfig.appInfo.displayVersion = valueTrim;
                            break;
                        case "license":
                            if (keyTrim === "Shareable") newConfig.appInfo.shareable = valueTrim;
                            if (keyTrim === "OpenSource") newConfig.appInfo.openSource = valueTrim;
                            if (keyTrim === "Freeware") newConfig.appInfo.freeware = valueTrim;
                            if (keyTrim === "CommercialUse") newConfig.appInfo.commercialUse = valueTrim;
                            if (keyTrim === "EULAVersion") newConfig.appInfo.eulaVersion = valueTrim;
                            break;
                        case "control":
                            if (keyTrim === "Icons") newConfig.appInfo.icons = valueTrim;
                            if (keyTrim === "Start") newConfig.appInfo.start = valueTrim;
                            if (keyTrim === "ExtractIcon") newConfig.appInfo.extractIcon = valueTrim;
                            break;
                        case "team":
                            if (keyTrim === "Developer") newConfig.appInfo.developer = valueTrim;
                            if (keyTrim === "Contributors") newConfig.appInfo.contributors = valueTrim;
                            if (keyTrim === "Creator") newConfig.appInfo.creator = valueTrim;
                            if (keyTrim === "CertSigning") newConfig.appInfo.certSigning = valueTrim;
                            if (keyTrim === "CertAlgorithm") newConfig.appInfo.certAlgorithm = valueTrim;
                            if (keyTrim === "CertExtension") newConfig.appInfo.certExtension = valueTrim;
                            if (keyTrim === "CertTimestamp") newConfig.appInfo.certTimestamp = valueTrim;
                            break;
                        case "specialpaths":
                            if (keyTrim === "Plugins") newConfig.appInfo.plugins = valueTrim;
                            break;
                    }
                } else {
                    switch (currentSection.toLowerCase()) {
                        case "launch":
                            if (keyTrim in newConfig.launch) {
                                (newConfig.launch as any)[keyTrim] = valueTrim;
                            }
                            break;
                        case "activate":
                            if (keyTrim in newConfig.activate) {
                                (newConfig.activate as any)[keyTrim] = valueTrim;
                            }
                            break;
                        case "environment":
                            newConfig.environment.push({
                                name: keyTrim,
                                value: valueTrim
                            });
                            break;
                        case "registrykeys":
                            newConfig.registryKeys.push({
                                name: keyTrim,
                                path: valueTrim
                            });
                            break;
                        case "registryvaluewrite":
                            const [type, val] = valueTrim.split(":", 2);
                            newConfig.registryValues.push({
                                key: keyTrim,
                                type: type,
                                value: val || ""
                            });
                            break;
                        case "filesmove":
                            newConfig.filesMove.push({
                                source: keyTrim,
                                destination: valueTrim
                            });
                            break;
                        default:
                            if (currentSection.startsWith("service") && currentService) {
                                if (keyTrim === "Name") currentService.name = valueTrim;
                                if (keyTrim === "Path") currentService.path = valueTrim;
                                if (keyTrim === "Type") currentService.type = valueTrim;
                                if (keyTrim === "Start") currentService.start = valueTrim;
                                if (keyTrim === "Depend") currentService.depend = valueTrim;
                                if (keyTrim === "IfExists") currentService.ifExists = valueTrim;
                            }
                            break;
                    }
                }
            });

            setConfig(newConfig);
            toast({
                title: "Configuration Imported",
                description: `Successfully imported ${isAppInfo ? "AppInfo.ini" : "Launcher.ini"} configuration`,
            });
        };
        reader.readAsText(file);
    };

    const launcherIcons = [];
    const appinfoIcons = [];

    const tabs = [
        { id: "appInfo", label: activeConfigType === 'launcher' ? 'Launcher.ini' : 'AppInfo.ini', icon: activeConfigType === 'launcher' ? Rocket : FileText  },
        { id: "launch", label: activeConfigType === 'launcher' ? 'Additional' : 'License', icon: activeConfigType === 'launcher' ? Plus : Stamp },
        { id: "activate", label: activeConfigType === 'launcher' ? 'Activate' : 'Dependencies', icon: activeConfigType === 'launcher' ? ShieldPlus : Stamp },
        { id: "registry", label: activeConfigType === 'launcher' ? 'Registry' : 'Team', icon: Database },
        { id: "files", label: activeConfigType === 'launcher' ? 'Filesystem' : 'Signing', icon: Folder },
        { id: "services", label: "Services", icon: MonitorCog },
        { id: "associations", label: "Associations", icon: Link },
        { id: "firewall", label: "Firewall", icon: BrickWallFire },
        { id: "drivers", label: "Drivers", icon: Microchip },
        { id: "tasks", label: "Tasks", icon: CalendarCheck },
        { id: "symlinks", label: "Symbolic Links", icon: Link2 },
        { id: "runtime", label: "V++/.NET", icon: Cpu },
        { id: "dlls", label: "DLLs", icon: Library },
        { id: 'icons', label: 'Icons', icon: ImageIcon }
    ];

    const categories = [
        "Accessibility",
        "Development",
        "Education",
        "Games",
        "Graphics & Pictures",
        "Internet",
        "Music & Video",
        "Office",
        "Security",
        "Utilities",
    ];

    const languages = [
        "Multilingual",
        "English",
        "Spanish",
        "French",
        "German",
        "Italian",
        "Portuguese",
        "Russian",
        "Chinese",
        "Japanese",
        "Korean",
        "Arabic",
    ];

    const Button = ({
        children,
        onClick,
        className = "",
        variant = "default",
        size = "default",
        ...props
    }: {
        children: React.ReactNode;
        onClick?: React.MouseEventHandler<HTMLButtonElement>;
        className?: string;
        variant?: "default" | "outline" | "ghost" | "destructive";
        size?: "default" | "sm" | "lg" | "icon";
        [key: string]: any;
    }) => {
        const baseClasses =
            "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";

        const variants = {
            default: "bg-blue-600 text-white hover:bg-blue-700",
            outline:
                "border border-gray-300 bg-transparent hover:bg-gray-100 text-gray-700",
            ghost: "hover:bg-gray-100 hover:text-gray-900",
            destructive: "bg-red-600 text-white hover:bg-red-700",
        };

        const sizes = {
            default: "h-10 py-2 px-4",
            sm: "h-9 px-3 text-xs",
            lg: "h-11 px-8",
            icon: "h-10 w-10",
        };

        return (
            <button
                className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
                onClick={onClick}
                {...props}>
                {children}
            </button>
        );
    };

    const Input = ({ className = "", ...props }) => (
        <input
            className={`flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
            {...props}
        />
    );

    const Textarea = ({ className = "", ...props }) => (
        <textarea
            className={`flex min-h-[80px] w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
            {...props}
        />
    );

    const Select = ({
        value,
        onValueChange,
        children,
        className = "",
    }: {
        value: string;
        onValueChange: (value: string) => void;
        children: React.ReactNode;
        className?: string;
    }) => {
        return (
            <select
                value={value}
                onChange={(e) => onValueChange(e.target.value)}
                className={`flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}>
                {children}
            </select>
        );
    };

    const Checkbox = ({
        checked,
        onCheckedChange,
        id,
        className = "",
    }: {
        checked: boolean;
        onCheckedChange: (checked: boolean) => void;
        id?: string;
        className?: string;
    }) => (
        <input
            type="checkbox"
            id={id}
            checked={checked}
            onChange={(e) => onCheckedChange(e.target.checked)}
            className={`h-4 w-4 rounded border border-gray-300 text-blue-600 focus:ring-blue-500 ${className}`}
        />
    );

    const Label = ({
        children,
        htmlFor,
        className = "",
    }: {
        children: React.ReactNode;
        htmlFor?: string;
        className?: string;
    }) => (
        <label
            htmlFor={htmlFor}
            className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}>
            {children}
        </label>
    );

    const Card = ({
        children,
        className = "",
    }: {
        children: React.ReactNode;
        className?: string;
    }) => (
        <div
            className={`rounded-lg border border-gray-200 bg-white shadow-sm ${className}`}>
            {children}
        </div>
    );

    const CardContent = ({
        children,
        className = "",
    }: { children: React.ReactNode; className?: string }) => (
        <div className={`p-6 ${className}`}>{children}</div>
    );

    type InputFieldProps = {
        label: string;
        value: any;
        onChange: (value: any) => void;
        placeholder?: any;
        type?: string;
        required?: boolean;
        description?: string;
    };

    const InputField = ({
        label,
        value,
        onChange,
        placeholder,
        type = "text",
        required = false,
        description,
    }: InputFieldProps) => (
        <div className="mb-4">
            <Label className="text-sm font-medium text-gray-700 mb-1 block">
                {label} {required && <span className="text-red-500">*</span>}
            </Label>
            {type === "textarea" ? (
                <Textarea
                    value={value}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
                    placeholder={placeholder}
                    rows={3}
                />
            ) : type === "select" ? (
                <Select value={value} onValueChange={onChange}>
                    {placeholder.map((option: any) => (
                        <option
                            key={option.value || option}
                            value={option.value || option}>
                            {option.label || option}
                        </option>
                    ))}
                </Select>
            ) : (
                <Input
                    type={type}
                    value={value}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
                    placeholder={placeholder}
                />
            )}
            {description && (
                <p className="text-sm text-gray-500 mt-1">{description}</p>
            )}
        </div>
    );

    type CheckboxFieldProps = {
        label: string;
        checked: boolean;
        onChange: (checked: boolean) => void;
        description?: string;
    };

    const CheckboxField = ({ label, checked, onChange, description }: CheckboxFieldProps) => (
        <div className="mb-4">
            <div className="flex items-center space-x-2">
                <Checkbox checked={checked} onCheckedChange={onChange} />
                <Label className="text-sm font-medium text-gray-700">
                    {label}
                </Label>
            </div>
            {description && (
                <p className="text-sm text-gray-500 mt-1 ml-6">{description}</p>
            )}
        </div>
    );

    type TabType = {
        id: string;
        label: string;
        icon: React.ComponentType<{ className?: string }>;
    };

    const TabButton = ({
        tab,
        isActive,
        onClick,
    }: {
        tab: TabType;
        isActive: boolean;
        onClick: () => void;
    }) => {
        const Icon = tab.icon;
        return (
            <Button
                variant="ghost"
                onClick={onClick}
                className={`w-full justify-start ${
                    isActive
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "text-gray-700 hover:bg-gray-100"
                }`}>
                <Icon className="w-4 h-4 mr-2" />
                {tab.label}
            </Button>
        );
    };

    return (
        <div
            className={`min-h-screen dark bg-gray-900`}>
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                PortableApps Compiler
                            </h1>
                            <p className="text-gray-600">
                                AppInfo/Launcher INI Configuration Generator
                            </p>
                        </div>
                        <div className="flex gap-3 items-center">
                            <div className="flex bg-gray-100 rounded-lg p-1">
                                <button
                                    onClick={() =>
                                        setActiveConfigType("launcher")
                                    }
                                    className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                                        activeConfigType === "launcher"
                                            ? "bg-white text-gray-900 shadow-sm"
                                            : "text-gray-600 hover:text-gray-900"
                                    }`}>
                                    <Settings className="w-4 h-4 mr-2" />
                                    Launcher.ini
                                </button>
                                <button
                                    onClick={() =>
                                        setActiveConfigType("appinfo")
                                    }
                                    className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                                        activeConfigType === "appinfo"
                                            ? "bg-white text-gray-900 shadow-sm"
                                            : "text-gray-600 hover:text-gray-900"
                                    }`}>
                                    <FileText className="w-4 h-4 mr-2" />
                                    AppInfo.ini
                                </button>
                            </div>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() =>
                                    setTheme(
                                        theme === "light" ? "dark" : "light"
                                    )
                                }>
                                {theme === "light" ? (
                                    <Moon className="h-4 w-4" />
                                ) : (
                                    <Sun className="h-4 w-4" />
                                )}
                            </Button>
                            <input
                                type="file"
                                accept=".ini,.txt"
                                style={{ display: "none" }}
                                id="import-config-input"
                                onChange={importConfig}
                            />
                            <Button
                                variant="outline"
                                onClick={() => {
                                    const input = document.getElementById("import-config-input") as HTMLInputElement;
                                    if (input) input.click();
                                }}>
                                <Upload className="w-4 h-4 mr-2" />
                                Import
                            </Button>
                            <Button
                                onClick={exportConfig}
                                className="bg-green-600 hover:bg-green-700">
                                <Download className="w-4 h-4 mr-2" />
                                Export
                            </Button>
                            {Object.keys(config.icons).length > 0 && (
                                <Button onClick={exportIcons} variant="outline">
                                    <ImageIcon className="w-4 h-4 mr-2" />
                                    Export Icons
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-6">
                {/* Validation Errors */}
                {/*validationErrors.length > 0 && (
                    <Card className="mb-6 bg-red-50 border-red-200">
                        <CardContent className="pt-4">
                            <div className="flex items-center mb-2">
                                <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                                <h3 className="text-sm font-medium text-red-800">
                                    Please fix these issues:
                                </h3>
                            </div>
                            <ul className="text-sm text-red-700 list-disc ml-7">
                                {validationErrors.map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                )*/}

                <div className="flex gap-6">
                    {/* Sidebar Navigation */}
                    <div className="w-64 flex-shrink-0">
                        <Card>
                            <CardContent className="p-4">
                                <div className="space-y-2">
                                    {tabs.map((tab) => (
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
                                {activeTab === "appInfo" && (
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
                                {activeTab === "launch" && (
                                    <LaunchTab
                                        config={config}
                                        setConfig={setConfig}
                                        activeConfigType={activeConfigType}
                                        InputField={InputField}
                                        CheckboxField={CheckboxField}
                                    />
                                )}

                                {/* Features/Activate Tab */}
                                {activeTab === "activate" && (
                                    <FeaturesTab
                                        config={config}
                                        setConfig={setConfig}
                                        activeConfigType={activeConfigType}
                                        InputField={InputField}
                                        CheckboxField={CheckboxField}
                                    />
                                )}

                                {/* Registry Tab */}
                                {activeTab === "registry" && (
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
                                {activeTab === "files" && (
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
                                {activeTab === "services" && (
                                    <ServicesTab
                                        config={config}
                                        setConfig={setConfig}
                                        activeConfigType={activeConfigType}
                                        InputField={InputField}
                                        CheckboxField={CheckboxField}
                                        addArrayItem={addArrayItem}
                                        removeArrayItem={removeArrayItem}
                                        updateArrayItem={updateArrayItem}
                                        Button={Button}
                                        Card={Card}
                                        CardContent={CardContent}
                                    />
                                )}

                                {/* Associations Tab */}
                                {activeTab === "associations" && (
                                    <AssociationsTab
                                        config={config}
                                        setConfig={setConfig}
                                        activeConfigType={activeConfigType}
                                        InputField={InputField}
                                        CheckboxField={CheckboxField}
                                        addArrayItem={addArrayItem}
                                        removeArrayItem={removeArrayItem}
                                        updateArrayItem={updateArrayItem}
                                        Button={Button}
                                        Card={Card}
                                        CardContent={CardContent}
                                    />
                                )}

                                {/* Drivers Tab */}
                                {activeTab === "drivers" && (
                                    <DriversTab
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

                                {/* Firewall Tab */}
                                {activeTab === "firewall" && (
                                    <FirewallTab
                                        config={config}
                                        setConfig={setConfig}
                                        activeConfigType={activeConfigType}
                                        InputField={InputField}
                                        addArrayItem={addArrayItem}
                                        removeArrayItem={removeArrayItem}
                                        updateArrayItem={updateArrayItem}
                                        Button={Button}
                                        CheckboxField={CheckboxField}
                                        Card={Card}
                                        CardContent={CardContent}
                                    />
                                )}

                                {/* Advanced Tab */}
                                {activeTab === "advanced" && (
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
                                {/* Icons Tab */}
                                {activeTab === "icons" && (
                                    <ImageProcessor
                                        onIconsGenerated={ (icons) =>
                                            setConfig((prev) => ({ ...prev, icons }))
                                        }
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
